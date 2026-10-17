# Rapport de revue — Claude Code → Codex

**Version produite :** v0.2
**Base revue :** commit `6877054`, `indicators/nq_key_levels.pine` v0.1
**Auteur de la revue :** Claude (Opus 5), via Claude Code
**Date :** 2026-10-17

Ce fichier existe pour que la prochaine session Codex sache exactement ce qui a changé, ce qui a été vérifié, ce qui ne l'a pas été, et ce qui a été volontairement laissé tel quel. Le cahier des charges d'origine reste `docs/GPT-HANDOFF.md`, non modifié.

---

## 1. Ce qui a été vérifié et jugé correct

Lu intégralement et confronté au cahier des charges. Ces points sont **corrects, ne pas les « corriger »** :

- **`f_range()`** respecte la spec à la lettre : corps uniquement, extrême chronologiquement antérieur = 0, refus explicite quand les deux extrêmes tombent sur la même bougie, exigence de la première bougie de fenêtre. La borne `time_close == d + rangeEnd * 60000` est juste.
- **Variance de Welford pondérée** (`mean` / `m2` / `weight`). C'est le bon choix : la forme naïve `E[x²] − E[x]²` perd de la précision à l'échelle de prix du NQ (~31 000). Le prototype PowerShell de référence utilisait la forme naïve et était donc moins robuste sur ce point précis.
- **Répartition du volume par recouvrement** (`overlap / (high - low)`) plutôt qu'uniformément sur les lignes touchées. Plus fidèle que le prototype.
- **Balayage de confluence par graine** : correctement borné, `max − min <= tolérance`, aucun chaînage transitif. Pour des points, se réduit exactement à la règle voulue.
- **Égalité gauche / droite dans la value area** : les deux `if` non exclusifs sont intentionnels et documentés ; la boucle progresse dans tous les cas de bord, pas de blocage possible.
- **Sécurité HTF** : décalage `[1]` + `lookahead_on` est le motif non-repaint correct. Rejet `[2]` / confirmation `[1]` pour les RB également.
- **Armement de l'expansion** : ne pas tester l'invalidation sur la bougie d'armement est juste, sinon une mèche antérieure tuerait rétroactivement un niveau qui venait de naître.
- **`"0930-1600:23456"`** : correct, les jours Pine commencent à 1 = dimanche, donc 2–6 = lundi–vendredi.

---

## 2. Correctif principal — conservation des Fib

### Le défaut

La purge était calendaire :

```pine
if array.get(fibs, i).epoch < utcDay - DAY_MS
    array.remove(fibs, i)
```

Conséquence en conditions réelles : le dimanche ne publie aucune série (la fenêtre 00:00–07:30 UTC n'existe pas), et le samedi non plus. Le lundi, `utcDay - DAY_MS` vaut dimanche ; la série du vendredi est donc antérieure et supprimée. **Le lundi matin ouvrait sans aucune série précédente** — un jour de bourse sur cinq avec un concept en moins, sans aucun signal visible pour le trader.

Le cahier des charges dit « la veille reste valable, sans expiration ». Pour un trader de futures, « la veille » est la séance précédente, pas la date calendaire précédente. `docs/DECISIONS.md` posait d'ailleurs correctement la question au lieu de trancher — elle est maintenant tranchée, mais reste réglable.

### Le correctif

Conservation par **génération** et non par durée. On garde les deux dernières séries **réellement publiées** :

```pine
if not array.includes(fibEpochs, utcDay)
    array.push(fibEpochs, utcDay)
if not calendarRetention
    while array.size(fibEpochs) > 2
        int stale = array.shift(fibEpochs)
        // retrait de tous les niveaux portant cet epoch
```

Nouvel input `fibRetention` : « Séance précédente » (défaut) ou « Jour calendaire précédent » (comportement v0.1 conservé). La purge calendaire ne s'exécute plus que dans le second mode.

**À confirmer par le trader.** J'ai choisi « séance » par défaut parce que c'est la lecture naturelle pour un trader de futures, mais il ne l'a jamais dit explicitement.

---

## 3. Deuxième correctif — validation historique

### Le problème

Tout le dessin est dans `if barstate.islast`, et le profil ne se calcule que sur `f_day(last_bar_time)`. Le raisonnement est bon — des boîtes POI figées dans le passé suggéreraient des signaux rétrospectifs — mais il a une conséquence pratique que personne n'avait relevée : **la méthode de recette recommandée par les deux documents (comparer à une matinée annotée à la main) est impossible en faisant simplement défiler le graphique.** Rien ne s'affiche en dehors de la dernière bougie.

### Le correctif

Deux volets, sans toucher au comportement par défaut :

1. **Documentation** : `docs/TRADINGVIEW-CHECKLIST.md` a une nouvelle section. **Bar Replay est la vraie méthode** — elle fait de la bougie visée la dernière bougie, donc tout s'affiche, VWAP et POI compris.
2. **Option `persistFib`** (OFF par défaut) : trace ±2 / ±2.25 / ±2.5 de chaque jour publié, de leur naissance à la fin de leur journée UTC, dans un tableau `staticLines` que la boucle de redessin ne vide jamais.

Limites volontaires de cette option, à ne pas « compléter » sans demande du trader :

- **Primaires uniquement.** L'expansion s'arme plus tard dans la journée ; la tracer à la naissance montrerait un niveau qui n'était pas encore disponible ce matin-là.
- **Pas de VWAP, pas de profil, pas de POI.** Ces objets se recalculent en continu ; les figer serait du rétrospectif.
- Plafond `persistDays * 6` lignes, `max_lines_count` porté à 500. Les plus anciennes sont supprimées en premier.
- La couleur est celle du jour au moment du tracé et n'est pas réactualisée ensuite. C'est voulu : la ligne représente la série qui était active ce jour-là.

---

## 4. Correctif mineur — étiquette de la série précédente

`f_name()` renvoyait `"Fib J-1 "`. Dès lors que la conservation suit les séances, « J-1 » est faux un lundi : la série affichée est celle du vendredi. Remplacé par la date UTC réelle via `str.format_time(level.epoch, "dd/MM", "UTC")`.

---

## 5. Liste exhaustive des modifications

| Fichier | Modification |
| --- | --- |
| `nq_key_levels.pine` | `v0.1` → `v0.2` ; `max_lines_count` 400 → 500 |
| | Nouvel input `fibRetention` (groupe 02) |
| | Nouveaux inputs `persistFib`, `persistDays` (groupe 06) |
| | Libellé / tooltip de `showPrevious` reformulés |
| | Nouveaux états `fibEpochs`, `staticLines`, booléen `calendarRetention` |
| | Purge calendaire rendue conditionnelle |
| | Bloc de publication : enregistrement d'epoch, purge par génération, tracé statique, plafond |
| | `f_name()` : date UTC au lieu de « J-1 » |
| | Tableau de bord : 10 → 11 lignes, ligne « Conservation », version |
| `docs/DECISIONS.md` | Entrée « veille » réécrite ; deux lignes ajoutées au tableau des conventions |
| `docs/TRADINGVIEW-CHECKLIST.md` | Test de rétention corrigé, test du lundi ajouté, section « remonter dans l'historique » |
| `REPORT.md` | Ce fichier |

---

## 6. Ce que je n'ai PAS pu vérifier

À prendre au sérieux avant de considérer la v0.2 comme acquise :

- **Aucune compilation TradingView.** Comme pour la v0.1. Mes modifications sont donc non compilées. Points à surveiller en priorité : signature de `str.format_time`, `array.includes` sur `array<int>`, budget d'objets réel avec les lignes statiques actives.
- **Aucun test PineTS exécuté.** Node n'est pas installé sur la machine du trader — `npm ci` et `npm test` n'ont pas pu tourner. **Merci de faire tourner la suite côté Codex** et d'ajouter une régression ciblée sur la conservation par génération (lundi après un vendredi publié).
- **Aucune donnée réelle traversée.** Rollover NQ1!, jours fériés, maintenance CME : inchangés et toujours non validés.

---

## 7. Relevé mais délibérément non modifié

- **Publication ~5 min après 07:30** (décalage `[1]` sur l'unité de construction 5 m). C'est le prix du non-repaint, pas un défaut. Documenté auprès du trader.
- **Profil limité au dernier jour** : choix de performance, couvert par Bar Replay.
- **Extrêmes sur la même bougie → aucune publication** : conforme à la spec. En revanche la **fréquence réelle** de ce cas mérite d'être mesurée sur quelques mois ; si elle n'est pas négligeable, il faudra une règle de départage plutôt qu'un refus.
- **Coût de `f_findPois`** : environ O(n²) plus le test de sous-ensemble. Correct aux tailles actuelles, à surveiller si `rbLimit` monte vers 100. Déjà listé dans les priorités de `CLAUDE.md`.

---

## 8. Toujours ouvert, côté trader

Inchangé depuis le handoff, par ordre de valeur :

1. **Source DRW.** C'est le plus gros écart d'exactitude restant. Tant qu'il manque, le VWAP est une reconstruction de principe, pas une équivalence — le tableau de bord l'affiche honnêtement (`≠ DRW vérifié`), garder cette mention.
2. **Une matinée annotée à la main, avec sa date**, pour la comparaison. Maintenant réalisable via Bar Replay.
3. Conservation séance vs calendaire — défaut posé, à confirmer.
4. Tolérance, types distincts, ancrage VWAP, seuils de mèche RB : toujours des inputs, aucun n'est tranché.

---

## 9. Répartition suggérée

Le fichier Pine n'a jamais été compilé. **La compilation prime sur tout enrichissement**, comme le disait déjà `CLAUDE.md`. Si la v0.2 ne compile pas, les erreurs viennent très probablement de mes ajouts — je les corrige, il suffit de me transmettre le texte exact et la ligne.

Une fois compilée : faire tourner PineTS côté Codex, ajouter la régression lundi/vendredi, puis attendre le retour terrain du trader avant toute nouvelle fonctionnalité. Le contexte 4H reste non implémenté et non prioritaire — la stratégie n'a pas de filtre directionnel, c'est de l'affichage.
