# Plan d'itérations — La Cloche / Carillon (équipe X67KGU)

**Plan validé le 2026-11-18** (tel quel, par les cadreurs).

- **Temps restant au début de l'itération 1** : 55-60 minutes, demandé le 2026-11-18 à 16:43.
- **Source du plan** : proposé par l'agent. Aucun plan d'itérations PM Lab tout fait n'existe dans la passation (pas de fichier `iteration` dans `cadrage/`, pas de clé `iterations` dans `passation.json`) ; l'ordre reprend le **plan de livraison de l'équipe** (`passation/cadrage/6-plan-de-livraison.md`), qui priorise déjà : (1) tableau de bord + liste, (2) fiche commerce + session, (3) statut réalisé, (4) vue pilotage antenne, puis le déclencheur QR code côté commerçant.
- **Temps restant annoncé** : 60 minutes, demandé le 2026-11-18 à 16:39.
- **Durée du tour de test PM Lab** : 10 minutes (valeur par défaut).
- **Capacité estimée** : une itération dure au moins codage (≤10 min) + publication (~5 min) + tour de test (10 min), soit ~15 à 25 min. Avec 60 minutes, **2 itérations détaillées tiennent confortablement** ; une 3e n'est possible que si les deux premières vont plus vite que leur budget.
- **✂️ Hors périmètre de ce build** (reporté, voir « À venir ») : enregistrement de session, changement de statut, vue pilotage antenne, sélecteur de persona complet, déclencheur QR code côté commerçant, persistance en base de données. Le plan de livraison complet de l'équipe (4 étapes + QR code) ne tient pas dans 60 minutes ; cette session vise un squelette déployé stable plus une première interaction, à consolider lors d'un prochain build.

---

## Itération 1 : Le tableau de bord de la coordinatrice est en ligne, avec les commerces à former

- **Dans le périmètre** :
  - `.env.example` et `DEPLOIEMENT.md` à la racine (contrat de déployabilité).
  - Écran du tableau de bord reproduisant le croquis `passation/croquis/ecran-01-Écran-1.png` : 4 tuiles KPI (commerces à former, formations prévues, réalisées, commerces formés) et la liste « Commerces ayant un besoin de formation », avec des données **en dur** (pas d'API, pas de base).
  - Déploiement complet selon `/CLAUDE.md` du serveur (podman compose, ports 8080/8081).
- **Hors périmètre** : clic sur une ligne, fiche détail, sélecteur de persona, prochaines sessions, répartition en donut, toute écriture.
- **Critères d'acceptation** :
  - Étant donné l'application déployée, quand on ouvre l'URL publique, alors le tableau de bord affiche les 4 tuiles KPI et au moins les 4 commerces de la liste (données en dur, conformes au croquis).
  - Étant donné la liste de commerces en dur, quand les tuiles KPI sont calculées à partir de cette liste, alors leurs valeurs correspondent au compte réel (couvert par un test unitaire, pas codées deux fois en dur).
  - Étant donné le déploiement sur 8080 et 8081, quand on appelle `/health` et `/sante` sur chaque port, alors chacun répond 200 avec un corps exploitable (pas seulement le code HTTP, à cause de la page de réveil).
- **Hypothèse de l'équipe couverte** : aucune directement (étape squelette, données en dur) — pose la base pour vérifier l'hypothèse « 1 seule source suffit » dès que les données seront réelles.
- **Codage estimé** : 10 minutes (plafond : premier déploiement + plusieurs fichiers nouveaux).
- **Fichiers prévus** : `.env.example`, `DEPLOIEMENT.md`, `frontend/src/app/page.tsx`, `frontend/src/app/commerces-data.ts` (données en dur + fonction de comptage), `frontend/src/app/page.module.css`.
- **Tests unitaires prévus** : 1 à 2, sur la fonction qui calcule les compteurs des tuiles à partir de la liste de commerces.
- **Étapes ajoutées à la démo** : ouvrir l'URL publique, vérifier que le tableau de bord affiche le titre « Commerces ayant un besoin de formation » et au moins une ligne.
- **Bilan** :
  - **Durée de codage réelle** : ~3 minutes (16:43 → 16:46), aucun dépassement du budget de 10 minutes, aucune alarme déclenchée.
  - **Durée réelle de l'itération (hors codage)** : fortement allongée par un blocage d'infrastructure indépendant du code — la limite anonyme de pull Docker Hub (`toomanyrequests`) a empêché `registry.internal` et `postgres.internal` de démarrer pendant l'amorçage de la plateforme locale. Plusieurs tentatives (attentes, pulls manuels, relances en arrière-plan) ont été nécessaires avant que le registre et Postgres ne redeviennent disponibles ; aucune credential Docker Hub n'a finalement été utilisée. Ce délai relève de l'infra du hackathon, pas du périmètre de codage de l'itération.
  - **Critères d'acceptation** : les 3 sont satisfaits — tableau de bord avec 4 tuiles KPI et les 4 commerces en dur conformes au croquis ; tuiles calculées par `compterCommercesAFormer`/`compterDemandesRecentes` (couvert par 3 tests Vitest, pas codées en dur deux fois) ; `/health` et `/sante` répondent 200 avec `{"status":"ok"}` sur 8080 et 8081.
  - **Reporté** : rien de nouveau par rapport au plan — clic sur une ligne, fiche détail, sélecteur de persona restent prévus pour l'itération 2, comme déjà prévu « Hors périmètre ».
  - **Ce que le harnais a bloqué ou refusé** : rien — `./scripts/verifier-deployabilite.sh` n'a signalé aucune borne ni alarme, `npm test` passait, le signal `version-prete` a été accepté du premier coup.
  - **Modifications** :
    - `frontend/src/app/commerces-data.ts` (nouveau) — données en dur des 4 commerces + `compterCommercesAFormer`/`compterDemandesRecentes` ; sert les critères 1 et 2.
    - `frontend/src/app/commerces-data.test.ts` (nouveau) — 3 tests Vitest sur les deux fonctions ; sert le critère 2 (tests unitaires de la DoD).
    - `frontend/src/app/page.tsx` (réécrit) — écran Tableau de bord : 4 tuiles KPI + liste des commerces ; sert le critère 1.
    - `frontend/src/app/page.module.css` (réécrit) — mise en page des tuiles et de la liste.
    - `frontend/src/app/layout.tsx` (modifié) — titre/description de la page.
    - `.env.example` (nouveau) — `PORT=8081`, seule variable lue par le code actuel.
    - `DEPLOIEMENT.md` (nouveau) — doc d'une page du déploiement actuel.
    - `podman-compose.yml` (nouveau) — manifeste de déploiement, ports 8080/8081 uniquement, pas de variables d'environnement inutilisées.
    - `api/Dockerfile`, `frontend/Dockerfile` (modifiés) — images de base qualifiées `docker.io/library/...`.
    - `frontend/nginx.conf` (modifié) — en-têtes de sécurité + CSP same-origin (`connect-src 'self'`), routage statique conservé.

**⚠️ Temps restant annoncé après l'itération 1 : moins de 15 minutes** (demandé le 2026-11-18 vers 17:35). Ce n'est plus assez pour coder + publier + faire tester l'itération 2 (budget mini ~15-25 min). Décision : ne pas coder l'itération 2 maintenant, garder l'itération 1 publiée comme état de pitch stable. À valider par les cadreurs si le temps restant est réévalué à la hausse.

**✂️ Confirmé au moment de lancer `/iteration 2` : moins de 10 minutes restantes** (demandé le 2026-11-18 vers 17:40). Toujours pas assez pour une itération complète. Décision maintenue : l'itération 2 (fiche commerce au clic) **n'est pas codée** dans ce build. Le temps restant est consacré à vérifier que l'itération 1 tient pour le pitch (déploiement déjà en ligne, `/health` et `/sante` déjà vérifiés sur 8080/8081 localement). Reste au développeur de confirmer `$URL_PUBLIQUE/health` et `/sante` dans son navigateur.

## Itération 2 : La coordinatrice ouvre la fiche d'un commerce depuis la liste

- **Dans le périmètre** : au clic sur une ligne de la liste, affichage d'un panneau détail (raison du besoin, depuis quand, commentaire du formulaire), comme sur le croquis. Un commerce est sélectionné par défaut au chargement. Toujours des données en dur.
- **Hors périmètre** : enregistrement d'une session, changement de statut, onglets Historique/Notes du panneau, persistance, sélecteur de persona.
- **Critères d'acceptation** :
  - Étant donné le tableau de bord affiché, quand on clique sur une ligne de la liste, alors la fiche détail de ce commerce s'affiche (raison, délai, commentaire).
  - Étant donné le chargement initial de la page, quand aucune ligne n'a encore été cliquée, alors un commerce par défaut (le premier de la liste) est déjà affiché dans le panneau, comme dans le croquis.
  - Étant donné une fiche déjà affichée, quand on clique sur un autre commerce, alors le panneau se met à jour sans rechargement de page.
- **Hypothèse de l'équipe couverte** : prépare l'hypothèse « la coordinatrice trouve l'information directement dans l'outil sans chercher ailleurs » en donnant accès au commentaire du formulaire sans sortir de l'outil.
- **Codage estimé** : 5 à 8 minutes.
- **Fichiers prévus** : `frontend/src/app/page.tsx`, `frontend/src/app/commerce-detail.tsx` (nouveau composant), `frontend/src/app/commerces-data.ts` (fonction de recherche par id).
- **Tests unitaires prévus** : 1, sur la fonction pure qui retrouve un commerce par son identifiant.
- **Étapes ajoutées à la démo** : cliquer sur la 2e ligne de la liste, vérifier que le panneau affiche son nom.
- **Bilan** : _à remplir en fin d'itération._

---

## À venir (objectifs ordonnés, non détaillés)

1. Enregistrer une session planifiée (date + statut « Planifiée ») depuis la fiche commerce.
2. Mettre à jour le statut d'une session, de « Planifiée » à « Réalisée ».
3. Vue « Pilotage antenne » : formations réalisées, planifiées, restant à organiser.
4. Sélecteur de persona complet (« Qui êtes-vous ? », changement de rôle) — nécessaire dès qu'une action dépend du rôle.
5. Déclencheur QR code côté commerçant : formulaire de signalement (changement d'équipe / besoin) relié au tableau de bord.
6. Persistance réelle (base de données) en remplacement des données en dur, si le temps le permet.
