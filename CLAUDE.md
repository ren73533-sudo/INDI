# Reprise de INDI avec Claude Code

Le trader a demandé une première version itérative des key levels et reversal zones, avec calibrage et couleurs personnalisables. Il prévoit des modifications après essais. Aucun canal automatique ne relie les sessions Claude Code et Codex : la passation passe par ce dépôt et les retours du trader.

## Lire d'abord

1. `docs/GPT-HANDOFF.md` : cahier des charges d'origine, conservé sans modification.
2. `REPORT.md` : revue de la V0.1 et correctifs de la V0.2. À lire avant de toucher au Pine.
3. `docs/DECISIONS.md` : choix explicites, ambiguïtés et limites.
4. `docs/TRADINGVIEW-CHECKLIST.md` : recette sur données réelles.
5. `indicators/nq_key_levels.pine` : source autonome à coller dans TradingView.

## Invariants de stratégie

Ne pas remplacer les définitions par ICT/SMC standard. Corps pour les Fib, ordre chronologique 0 / 1, pas de biais directionnel ni de filtre BOS, deux concepts minimum, invalidation par distance sur les extrêmes, RB pour retour après confirmation. Pas d'ordres, flèches ou alertes de trading. Toute modification de ces règles demande une instruction explicite du trader.

La structure candle-colour du handoff n'est pas utilisée comme précondition. Aucun pivot standard n'est introduit. Le contexte 4H facultatif n'est pas encore implémenté.

## Développement

Utiliser le checkout existant ; une tâche cloud est déjà isolée. Ne pas créer de worktree sans demande explicite. Le produit livré est un fichier Pine ; Node sert uniquement à la validation hors ligne.

```bash
npm ci --ignore-scripts --no-audit --no-fund --cache /tmp/indi-npm-cache
npm test
```

Les tests exécutent le source avec PineTS 0.11.1 sur un fournisseur OHLC synthétique local, sans requête de cours externe. `tests/helpers.mjs` décrit précisément le seul shim : le contrôle initial de l'unité du graphique est désactivé **dans la copie de test**, car PineTS l'exécute aussi dans ses contextes `request.security`. Le fichier de production est transpillé sans modification dans le premier test.

La transpilation PineTS ne constitue pas une compilation TradingView. Ne pas déclarer l'indicateur validé en temps réel sans essai dans TradingView. Ne pas déclarer le VWAP équivalent à DRW sans son source ; ne pas présenter le profil estimé comme du volume à prix réel.

Conserver les requêtes HTF sur bougies confirmées : `[1]` + `lookahead_on`, ou rejet `[2]` / confirmation `[1]` pour les RB. En cas de changement de règle ou de correction métier, ajouter un cas de régression ciblé et mettre à jour `docs/DECISIONS.md`.

## Priorités de revue

- Compiler dans TradingView et corriger les incompatibilités éventuelles avant tout enrichissement.
- Comparer à une matinée annotée par le trader et obtenir le source DRW si disponible.
- Confirmer les conventions : veille calendaire, armement global, vie des bandes mobiles, impulsion / confirmation RB.
- Contrôler le coût de la confluence par intervalles sur des historiques / capacités RB élevés et les limites de l'abonnement TradingView.
