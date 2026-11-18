// Données en dur de l'itération 1 : reproduisent le croquis passation/croquis/ecran-01.
// À remplacer par un appel à /api/v1/commerces dans une itération ultérieure.

export type RaisonBesoin =
  | "Changement d'équipe"
  | "Demande du commerce"
  | "Formulaire de suivi"
  | "Nouveau commerce";

export type StatutCommerce = "À contacter" | "À planifier";

export type Commerce = {
  id: string;
  nom: string;
  quartier: string;
  raison: RaisonBesoin;
  depuis: string;
  recent: boolean;
  statut: StatutCommerce;
  commentaire: string;
};

export const commercesAFormer: Commerce[] = [
  {
    id: "cafe-des-arts",
    nom: "Café des Arts",
    quartier: "Paris 11e",
    raison: "Changement d'équipe",
    depuis: "il y a 2 semaines",
    recent: true,
    statut: "À contacter",
    commentaire: "Une nouvelle équipe arrive, besoin d'une formation pour bien accueillir.",
  },
  {
    id: "librairie-du-canal",
    nom: "Librairie du Canal",
    quartier: "Paris 19e",
    raison: "Demande du commerce",
    depuis: "il y a 3 semaines",
    recent: true,
    statut: "À contacter",
    commentaire: "Le commerce a demandé spontanément une formation à l'accueil.",
  },
  {
    id: "le-comptoir-bio",
    nom: "Le Comptoir Bio",
    quartier: "Paris 20e",
    raison: "Formulaire de suivi",
    depuis: "il y a 1 mois",
    recent: false,
    statut: "À planifier",
    commentaire: "Besoin signalé via la case du formulaire de suivi semestriel.",
  },
  {
    id: "bistrot-central",
    nom: "Bistrot Central",
    quartier: "Paris 10e",
    raison: "Nouveau commerce",
    depuis: "il y a 1 mois",
    recent: false,
    statut: "À planifier",
    commentaire: "Intégration récente au réseau Carillon, formation initiale à prévoir.",
  },
];

export function compterCommercesAFormer(commerces: Commerce[]): number {
  return commerces.length;
}

export function compterDemandesRecentes(commerces: Commerce[]): number {
  return commerces.filter((commerce) => commerce.recent).length;
}

export function trouverCommerceParId(
  commerces: Commerce[],
  id: string,
): Commerce | undefined {
  return commerces.find((commerce) => commerce.id === id);
}
