# Déploiement

Suivi des besoins de formation des commerces du réseau **Carillon**, pour l'association **La Cloche**. La coordinatrice de terrain y repère les commerces à former et suit leurs sessions, sans reconstituer l'historique à la main.

## Services

- `frontend/` : Next.js en export statique, servi par nginx sur le port 80 du conteneur (8080 publié). C'est le service exposé.
- `api/` : Node sans dépendance, sur le port 8081 (publié). Routes `/health` et `/sante` seulement pour l'instant.

## Services externes appelés

Aucun pour l'instant : pas de base de données, pas d'appel IA, pas d'e-mail. Les données du tableau de bord sont en dur dans `frontend/src/app/commerces-data.ts`.

## Fragile ou inachevé

- Les données affichées (commerces à former, formations prévues/réalisées, commerces formés) sont en dur, pas lues depuis une base : tout changement doit encore être fait dans le code.
- Aucune interaction : ni clic sur un commerce, ni enregistrement de session, ni changement de statut (prévu dans une itération suivante).
- Pas de menu de navigation latéral (Commerces, Formations, Calendrier, Rapports) : un seul écran existe.
- Pas de sélecteur de persona (« Qui êtes-vous ? ») : l'écran ne distingue pas encore les rôles.

## Contact

- Équipe : Visionteam (X67KGU).
- Association : La Cloche — coordinatrice de terrain (voir `passation/contexte/association.md`).
