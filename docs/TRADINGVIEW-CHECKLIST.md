# Premier essai TradingView

Statut initial : contrôles hors ligne disponibles, **aucune compilation TradingView ni observation du graphique réel effectuée ici**.

## Installation et comportement

- [ ] Coller le fichier Pine complet dans un nouvel indicateur v6 ; sauvegarder le message exact et la ligne en cas d'erreur.
- [ ] Utiliser NQ1!, bougies standard 1m, historique incluant minuit UTC et la session précédente.
- [ ] Vérifier que le tableau ne signale pas de fenêtre ou d'ancrage incomplet.
- [ ] Vérifier qu'aucun Fib du jour n'apparaît avant 07:30 UTC et que les ancrages restent stables ensuite, après rechargement aussi.
- [ ] Afficher provisoirement la géométrie pour vérifier 0 / 1 sur les **corps 5m** ; la désactiver ensuite.
- [ ] Comparer les Fib de la série précédente et vérifier qu'il n'en reste que deux.
- [ ] **Ouvrir un lundi matin** : la série du vendredi doit être présente en mode « Séance précédente » (défaut v0.2) et absente en mode « Jour calendaire précédent ». C'est le test du correctif principal de la v0.2.
- [ ] Vérifier que l'étiquette de la série précédente affiche sa date UTC réelle, pas « J-1 ».
- [ ] Vérifier qu'une mèche dépassant le seuil invalide même avec une clôture revenue dans le niveau.
- [ ] Vérifier qu'une mèche seule ne suffit pas à armer l'expansion ; une clôture au-delà de ±2.5 l'arme.
- [ ] Vérifier que les RB apparaissent après la bougie de confirmation, puis restent pour un retour et disparaissent à l'invalidation.
- [ ] Activer / désactiver chaque famille dans les confluences ; masquer seulement son affichage doit conserver sa participation.
- [ ] Vérifier le détail des concepts dans les infobulles POI et les couleurs au-dessus / en dessous / au prix.
- [ ] Tester couleurs, transparences, tailles, projection et étiquettes sur ton thème habituel.
- [ ] Tester temps réel puis rechargement pour détecter une différence HTF ou de rollback non couverte par PineTS.
- [ ] Vérifier l'absence d'erreur de temps de boucle / mémoire sur ton historique et ton abonnement TradingView.

## Remonter dans l'historique (validation)

Tout sauf les Fib principaux n'est dessiné que sur la dernière bougie. Deux méthodes, à ne pas confondre :

- [ ] **Bar Replay** sur la matinée annotée : rejoue la journée, la dernière bougie devient celle de la matinée et **tout** s'affiche (VWAP, profil, RB, POI). Seule méthode pour valider une confluence passée.
- [ ] **Option « Tracer les Fib principaux dans l'historique »** : trace ±2 / ±2.25 / ±2.5 de chaque jour publié sans Bar Replay. Pratique pour vérifier rapidement des ancrages sur plusieurs semaines, mais ne montre ni VWAP, ni profil, ni POI.

## Comparaisons métier

- [ ] Comparer le VWAP à DRW avec **la même session, source et unité du graphique**. Ne pas ajuster la formule pour faire coïncider un seul instant.
- [ ] Comparer VAH / VAL / POC avec un profil journalier UTC ; accepter que l'estimation par bougie diffère d'un profil de volume à prix réel.
- [ ] Vérifier les RB sur tes annotations manuelles ; ajuster ratio, pourcentage et confirmation si nécessaire.
- [ ] Calibrer 15 points de tolérance et 15 / 20 points d'invalidation sans confondre ces deux réglages.
- [ ] Confirmer si Fib + Fib suffit ou si deux types distincts sont requis.
- [ ] Vérifier une séance d'été, une d'hiver, un changement de contrat et une reprise après un week-end.

## Retour à transmettre à Claude Code et Codex

Pour chaque correction : version du fichier, date et heure UTC, symbole / flux exact, unité du graphique, réglages modifiés, comportement observé et comportement attendu. Pour une erreur de compilation, inclure le texte exact et la ligne. Une capture annotée est utile pour comparer les zones, mais ne remplace pas ces paramètres.
