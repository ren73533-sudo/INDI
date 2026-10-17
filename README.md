# INDI — NQ Key Levels & Reversal Zones

Première version d'un indicateur **TradingView Pine Script v6**, construit selon la stratégie décrite dans [le handoff original](docs/GPT-HANDOFF.md). Il affiche les niveaux et leurs confluences ; il ne prend aucune décision de trade.

**Téléchargement complet : [INDI-v0.1.0.zip](downloads/INDI-v0.1.0.zip).** Sur GitHub, ouvrir ce fichier puis utiliser le bouton de téléchargement. Après extraction, lire `START_HERE.md`. Le code source, les tests et les documents sont aussi disponibles directement dans ce dépôt.

## Lancer dans TradingView

1. Ouvrir **NQ1!**, en bougies standard **1 minute**. Le 5 minutes est aussi accepté ; l'unité du graphique ne doit pas dépasser celle de construction Fib.
2. Ouvrir Pine Editor, créer un indicateur vide et remplacer son contenu par [indicators/nq_key_levels.pine](indicators/nq_key_levels.pine).
3. Enregistrer, puis **Ajouter au graphique**. La compilation dans TradingView reste à vérifier lors de ce premier essai.
4. Charger suffisamment d'historique pour inclure le début de la fenêtre Fib, le début de la session VWAP et le jour précédent. Une fenêtre incomplète est signalée et n'est pas inventée.
5. Ouvrir les paramètres de l'indicateur pour ajuster le calibrage et les couleurs. Le fuseau du graphique peut être UTC ; les calculs utilisent des fuseaux explicites et ne dépendent pas de cet affichage.

## Ce qui est inclus

| Élément | Comportement initial |
| --- | --- |
| Fib STDV | Corps des bougies 5m, fenêtre 00:00–07:30 UTC ; 0 = extrême apparu en premier |
| Niveaux principaux | ±2, ±2.25 et ±2.5, aujourd'hui et jour UTC précédent |
| Expansion | ±3, ±3.5 et ±4 dormants, activés après clôture hors de ±2.5 |
| VWAP | hlc3, moyenne et variance pondérées par le volume ; ±2 / ±3 éligibles aux POI |
| Profil journalier | VAH / VAL / POC **estimés**, jour UTC courant uniquement |
| Rejection Blocks | Mèches en 5m / 10m / 15m ; confirmation par la bougie suivante avant disponibilité |
| POI | Au moins 2 types de concepts distincts, tolérance de 15 points |
| Invalidation | 15 points au-delà du niveau / bord externe de la mèche, sur high / low, sans attendre une clôture |

Les POI au-dessus du prix sont rouges, ceux sous le prix verts, ceux au prix jaunes. Ces couleurs et celles de chaque famille sont modifiables. Le détail des niveaux composant un POI apparaît dans l'infobulle de son étiquette. Le signe du multiplicateur Fib ne désigne jamais une direction d'ordre.

## Personnalisation

Les sept groupes de paramètres regroupent les réglages :

- **Calibrage / confluences** : tolérance 5–50 points, types distincts ou nombre de niveaux, minimum 2–4, distance d'invalidation, règle pour les niveaux mobiles, nombre de POI et marge visuelle.
- **Fib** : bougies 1m / 5m / 15m, fenêtre UTC, armement global ou par signe, veille, géométrie 0 / 1 / 1.5 et bandes dormantes. La géométrie reste exclue des confluences.
- **VWAP** : ancrage futures fixe 22:00 UTC, CME 18:00 New York, RTH, jour UTC ou heure UTC personnalisée ; durée d'initialisation, courbes, ±1 SD de contexte.
- **Profil** : taille des lignes en ticks, pourcentage de value area, capacité, initialisation et participation éventuelle du POC. POC est exclu des POI par défaut.
- **RB** : unités activées, rapport mèche / corps, proportion minimale de mèche, impulsion préalable, confirmation, capacité et expiration facultative.
- **Affichage** : étiquettes, tableau, niveaux invalidés, projection, décalage des textes, épaisseur, style, taille des textes et transparences.
- **Couleurs** : couleurs indépendantes pour Fib J / J−1, VWAP, SD2, SD3, VAH, VAL, POC, RB hauts / bas, POI hauts / bas / au prix, niveaux inactifs, textes et tableau.

Masquer une famille avec « Afficher » ne la retire pas du moteur. Utiliser « Activer … dans les confluences » pour modifier la participation aux POI.

## Limites à connaître pour cette V1

- **Pas encore compilé dans TradingView.** L'analyse et les exécutions locales utilisent PineTS, un moteur tiers. Elles ne garantissent ni la compatibilité parfaite du compilateur TradingView ni son budget d'exécution.
- **DRW non comparé** : sans son code source, le VWAP suit la formule du handoff. Aucune équivalence exacte avec l'indicateur DRW n'est revendiquée.
- **Profil estimé** : connaître le volume total d'une bougie ne donne pas sa répartition réelle par prix. La V1 répartit ce volume uniformément sur high–low. Les résultats peuvent différer du Volume Profile TradingView, même avec les données CME.
- **Graphiques standard 1m / 5m uniquement** : pas de Heikin Ashi, Renko, range ou graphique 15m / 1H / 4H dans cette V1. Les RB 5m / 10m / 15m restent calculés indépendamment du graphique. Le contexte structurel 4H est facultatif et n'est pas encore affiché.
- Les ancrages Fib terminés et les RB confirmés sont stables. **VWAP, profil et POI évoluent** avec les nouvelles données. Les boîtes représentent l'état courant, sans historique de signaux rétrospectifs.
- Les courbes VWAP sont du contexte, y compris après l'invalidation d'une bande. Seuls les niveaux encore actifs entrent dans les POI. « Afficher aussi les niveaux invalidés en gris » permet de voir leurs références horizontales.
- Si la limite RB est atteinte, le plus ancien est retiré et le tableau le signale. Un profil dépassant sa capacité est désactivé et signalé. Augmenter la taille des lignes peut résoudre ce dernier cas.

Les conventions qui demandent une validation avec le trader sont détaillées dans [docs/DECISIONS.md](docs/DECISIONS.md). Les tests à faire sur ton graphique sont dans [docs/TRADINGVIEW-CHECKLIST.md](docs/TRADINGVIEW-CHECKLIST.md).

## Développer et tester avec Claude Code

Le fichier Pine est autonome : aucun serveur, clé API ou dépendance JavaScript n'est nécessaire pour l'utiliser dans TradingView. **Node.js 22+** sert uniquement aux tests locaux.

```bash
cd /workspace/INDI
npm ci --ignore-scripts --no-audit --no-fund --cache /tmp/indi-npm-cache
npm test
```

Les tests exécutent le code Pine avec des données synthétiques, vérifient les exemples numériques du handoff, le cycle des niveaux, le calcul du VWAP, les profils, les RB et les confluences. Ils ne téléchargent pas de cours et ne prouvent pas la reproduction des bougies réelles du 23 septembre 2026. Le harnais applique un contournement documenté d'une limite de PineTS sur le contrôle de l'unité du graphique ; le fichier destiné à TradingView reste intact.

[CLAUDE.md](CLAUDE.md) donne les points de reprise et les consignes de revue. Aucun échange direct avec une session Claude Code n'a été effectué depuis cet environnement.
