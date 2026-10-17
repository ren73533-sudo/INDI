# Décisions de V0.1 — à revoir avec le trader et Claude Code

Le handoff original est conservé sans modification dans [GPT-HANDOFF.md](GPT-HANDOFF.md). Ce fichier distingue les règles demandées des conventions nécessaires à leur première implémentation. Ces dernières sont proposées, pas présentées comme des réponses déjà données par le trader.

## Règles conservées

- Aucune direction privilégiée ni condition BOS. L'indicateur affiche des zones de reversal ; il ne produit pas de signaux d'entrée.
- Fib sur les **corps**, jamais les mèches. Ordre chronologique des extrêmes, formule `p0 + L * (p1 - p0)`, signe relatif à la jambe.
- ±2 / ±2.25 / ±2.5 actifs ; ±3 / ±3.5 / ±4 dormants avant armement. 0 / 1 / 1.5 de contexte uniquement.
- VWAP ±2 / ±3 éligibles ; VWAP centrale et ±1 restent du contexte.
- Deux types de concepts au minimum par défaut. Les Fib des deux jours comptent pour un type ; tous les RB comptent pour un type.
- Un dépassement de prix invalide sans attendre une clôture. Les RB sont des zones de retour après formation confirmée.

## Conventions explicites et réglables

| Question | Choix V0.1 | Pourquoi / point à confirmer |
| --- | --- | --- |
| Unité des corps Fib | 5m, choix 1m / 5m / 15m | Le vecteur du prototype est calculé avec du 5m. Des corps 1m ne donnent pas nécessairement les mêmes extrêmes. |
| Tolérance POI | 15 points, réglable 5–50 | Valeur proposée dans le handoff, à calibrer visuellement. |
| Deux concepts | Deux **types distincts**, désactivable | Fib + Fib n'est pas suffisant par défaut. |
| Armement expansion | Tous les signes à la première clôture au-delà de ±2.5 ; option par signe | Le texte ne tranche pas entre activation globale et activation de chaque bande. L'unité de clôture est celle du graphique. |
| Session VWAP | 22:00 UTC fixe par défaut | Reproduit l'option du handoff. Un autre choix suit 18:00 New York, soit 22:00 UTC l'été et 23:00 UTC l'hiver. |
| RTH | 09:30–16:00 America/New_York ; accumulation hors séance désactivée | Suit le DST américain. Le tableau de sessions du handoff mentionne aussi 19:50 UTC, contradictoire avec 16:00 New York : pas de filtre de trading ajouté. |
| Mèche RB | ≥2× corps et ≥60% de high–low | Les deux contraintes doivent passer ; réglables. Corps doji ramené à un tick pour le ratio. |
| Impulsion précédant un RB | Hausse / baisse nette entre deux clôtures avant la bougie de rejet | « Le côté dominant mène » n'est pas une définition mécanique complète. Recul réglable, 2 bougies par défaut. |
| Confirmation RB | La bougie immédiatement suivante inverse la couleur et clôture au-delà du corps du rejet | Option plus stricte : au-delà de son extrême. Le RB devient disponible au début de la bougie HTF suivante, après confirmation, jamais sur la bougie de rejet. |
| Invalidation | 15 points ; comparaison inclusive `>=` / `<=` | Réglable, notamment à 20. Une résistance est invalidée au-dessus de son bord haut et un support sous son bord bas. |
| Vie des bandes VWAP / VP | Invalidation du **dernier prix connu avant la bougie**, sans renaissance avant reset | Le handoff ne définit pas la vie d'un niveau mobile. Ce comportement évite une résurrection immédiate par recalcul. Peut être désactivé séparément des Fib / RB. |
| Initialisation | VWAP 5 minutes, VP 15 minutes | Évite d'activer des bandes sans dispersion ou un profil d'une seule bougie. Réglable. |
| POC dans les POI | Non par défaut ; affiché en contexte | Le handoff le décrit comme cible / absorption, pas comme niveau d'entrée à lui seul. |

## Conventions d'implémentation

- **Veille = jour calendaire UTC précédent**, pas dernier jour de trading. Un vendredi n'est pas conservé jusqu'au lundi. Les séries J−2 et plus sont supprimées au changement de jour. Ce choix évite de porter des ancrages anciens sur des journées vides ; à confirmer si le trader veut « dernière séance ».
- **Extrêmes égaux** : on garde leur première occurrence. Si haut et bas du corps extrême appartiennent à la même bougie, leur ordre interne est inconnu : aucun Fib n'est publié. Une fenêtre absente ou sans sa première bougie est également refusée.
- **Pas d'anticipation HTF** : les sorties Fib sont décalées de `[1]`. Les RB utilisent le rejet `[2]`, la confirmation `[1]` et les données antérieures. `lookahead_on` ne consulte donc pas la bougie HTF en formation. Le mode OFF seul, sans décalage, ne garantirait pas la stabilité en temps réel.
- **Naissance et invalidation** : les Fib principaux naissent à la fin de la fenêtre, par rapport au prix d'ouverture alors connu. Une expansion naît à la clôture qui l'arme ; sa mèche antérieure à cette clôture ne la tue pas rétroactivement. Les RB ne sont pas dessinés dans le passé comme s'ils avaient été disponibles sur la bougie de rejet.
- **Zones RB et tolérance** : les RB sont des intervalles. Un niveau à l'intérieur d'une mèche peut confluer avec elle sans être près de son milieu. Pour un groupe, `max(bases) - min(sommets) <= tolérance`. Pour des points, cela devient exactement `prix_max - prix_min <= tolérance`. Pas de chaînage 100 → 110 → 120 dans une zone de 15 points.
- **POI multiples** : une grande mèche peut contribuer à plusieurs groupes séparés. Les groupes inclus dans un groupe déjà trouvé ne sont pas redessinés. S'il existe trop de zones, les plus proches du prix sont retenues. La marge visuelle n'intervient pas dans les calculs.
- **Profil** : UTC 00:00 à maintenant, uniquement le dernier jour du graphique. Lignes alignées sur une grille fixe en ticks, sans redistribuer l'ancien volume quand le range augmente. Chaque bougie répartit son volume proportionnellement à la longueur de son intersection avec les lignes. Une bougie de range nul donne tout son volume à sa ligne.
- **Ancrages pendant une fermeture** : pour VWAP / VP, un historique observé avant la borne permet de reconnaître une session complète même si la première bougie vient après la borne (maintenance CME ou week-end). Un historique chargé seulement en milieu de session n'est pas accepté. La fenêtre Fib exige toujours sa première bougie et sa borne finale.
- **Value area** : POC = ligne de plus fort volume, centre de ligne. Égalité de POC : ligne la plus basse. Expansion vers la ligne voisine la plus chargée jusqu'au pourcentage demandé ; égalité gauche / droite : inclusion des deux, quitte à dépasser légèrement le seuil. VAL / VAH = bords externes des lignes retenues.
- **Capacité** : le profil devient indisponible s'il dépasse sa limite, plutôt que de publier un profil tronqué. Les RB les plus anciens peuvent être retirés à la limite de conservation ; compteur visible. Pas d'expiration temporelle des RB par défaut.
- **Graphique 1m recommandé** : le VWAP utilise le hlc3 et le volume de l'unité du graphique. Passer au 5m change cet échantillonnage, ainsi que la précision d'invalidation et la clôture d'armement. Les ancrages Fib restent dans l'unité de construction choisie.
- **Références évolutives** : les courbes VWAP, le profil et les POI courants changent avec les données. La stabilité promise concerne les ancrages Fib terminés et les RB confirmés, pas des boîtes de confluence figées à jamais.

## En attente d'une validation externe

1. Compilation et budgets d'exécution réels dans TradingView.
2. Comparaison à une matinée annotée par le trader, y compris RB et invalidations intrabar.
3. Source DRW pour comparer / adapter la variance et l'ancrage exacts.
4. Choix globaux : veille calendaire ou dernière séance, armement global ou par signe, invalidation des niveaux mobiles, définition de confirmation RB.
5. Cas de rollover NQ1!, historique ajusté et jours fériés. Les données synthétiques ne valident pas ces comportements de flux.
