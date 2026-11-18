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
  adresse: string;
  contact: string;
  besoinFormation: boolean;
  raison?: RaisonBesoin;
  depuis?: string;
  depuisJours?: number;
  recent?: boolean;
  statut?: StatutCommerce;
  commentaire?: string;
  personnesAFormer?: number;
  formationsDemandees?: string[];
  personneAssignee?: string;
};

export const commerces: Commerce[] = [
  {
    id: "cafe-des-arts",
    nom: "Café des Arts",
    quartier: "Paris 11e",
    adresse: "12 rue Jean-Pierre Timbaud, 75011 Paris",
    contact: "Nadia Ferrand",
    besoinFormation: true,
    raison: "Changement d'équipe",
    depuis: "il y a 2 semaines",
    depuisJours: 14,
    recent: true,
    statut: "À contacter",
    commentaire: "Une nouvelle équipe arrive, besoin d'une formation pour bien accueillir.",
    personnesAFormer: 3,
    formationsDemandees: ["Accueil des publics en précarité"],
    personneAssignee: "Sami Benali",
  },
  {
    id: "librairie-du-canal",
    nom: "Librairie du Canal",
    quartier: "Paris 19e",
    adresse: "47 quai de la Loire, 75019 Paris",
    contact: "Julien Roques",
    besoinFormation: true,
    raison: "Demande du commerce",
    depuis: "il y a 3 semaines",
    depuisJours: 21,
    recent: true,
    statut: "À contacter",
    commentaire: "Le commerce a demandé spontanément une formation à l'accueil.",
    personnesAFormer: 2,
    formationsDemandees: ["Accueil à l'accueil", "Gestes de premiers secours"],
    personneAssignee: "Non assignée",
  },
  {
    id: "le-comptoir-bio",
    nom: "Le Comptoir Bio",
    quartier: "Paris 20e",
    adresse: "3 rue des Pyrénées, 75020 Paris",
    contact: "Haoua Diallo",
    besoinFormation: true,
    raison: "Formulaire de suivi",
    depuis: "il y a 1 mois",
    depuisJours: 30,
    recent: false,
    statut: "À planifier",
    commentaire: "Besoin signalé via la case du formulaire de suivi semestriel.",
    personnesAFormer: 4,
    formationsDemandees: ["Accueil des publics en précarité"],
    personneAssignee: "Sami Benali",
  },
  {
    id: "bistrot-central",
    nom: "Bistrot Central",
    quartier: "Paris 10e",
    adresse: "58 rue du Faubourg Saint-Denis, 75010 Paris",
    contact: "Marco Ferreira",
    besoinFormation: true,
    raison: "Nouveau commerce",
    depuis: "il y a 1 mois",
    depuisJours: 30,
    recent: false,
    statut: "À planifier",
    commentaire: "Intégration récente au réseau Carillon, formation initiale à prévoir.",
    personnesAFormer: 5,
    formationsDemandees: ["Accueil à l'accueil"],
    personneAssignee: "Non assignée",
  },
  {
    id: "pharmacie-du-parc",
    nom: "Pharmacie du Parc",
    quartier: "Paris 11e",
    adresse: "22 avenue Parmentier, 75011 Paris",
    contact: "Claire Vidal",
    besoinFormation: false,
  },
  {
    id: "boulangerie-saint-martin",
    nom: "Boulangerie Saint-Martin",
    quartier: "Paris 10e",
    adresse: "9 rue du Château d'Eau, 75010 Paris",
    contact: "Mehdi Oussedik",
    besoinFormation: false,
  },
  {
    id: "epicerie-de-la-gare",
    nom: "Épicerie de la Gare",
    quartier: "Paris 19e",
    adresse: "5 rue de Crimée, 75019 Paris",
    contact: "Fatou Camara",
    besoinFormation: false,
  },
];

export function compterCommercesAFormer(commerces: Commerce[]): number {
  return commerces.filter((commerce) => commerce.besoinFormation).length;
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

export function estDemandeAncienne(commerce: Commerce): boolean {
  return commerce.besoinFormation && (commerce.depuisJours ?? 0) > 21;
}
