import { describe, expect, it } from "vitest";
import {
  commerces,
  compterCommercesAFormer,
  compterDemandesRecentes,
  estDemandeAncienne,
  trouverCommerceParId,
  type Commerce,
} from "./commerces-data";

describe("compterCommercesAFormer", () => {
  it("ne compte que les commerces ayant besoin de formation", () => {
    const attendu = commerces.filter((commerce) => commerce.besoinFormation).length;
    expect(compterCommercesAFormer(commerces)).toBe(attendu);
  });

  it("renvoie 0 pour une liste vide", () => {
    expect(compterCommercesAFormer([])).toBe(0);
  });
});

describe("compterDemandesRecentes", () => {
  it("ne compte que les commerces marqués comme récents", () => {
    const liste: Commerce[] = [
      { ...commerces[0], recent: true },
      { ...commerces[0], recent: false },
      { ...commerces[0], recent: true },
    ];
    expect(compterDemandesRecentes(liste)).toBe(2);
  });
});

describe("trouverCommerceParId", () => {
  it("retrouve le commerce correspondant à l'identifiant", () => {
    const cible = commerces[1];
    expect(trouverCommerceParId(commerces, cible.id)).toEqual(cible);
  });

  it("renvoie undefined si l'identifiant n'existe pas", () => {
    expect(trouverCommerceParId(commerces, "inconnu")).toBeUndefined();
  });
});

describe("estDemandeAncienne", () => {
  it("est vraie pour une demande de plus de 3 semaines", () => {
    const commerce: Commerce = { ...commerces[0], besoinFormation: true, depuisJours: 30 };
    expect(estDemandeAncienne(commerce)).toBe(true);
  });

  it("est fausse pour une demande de 3 semaines ou moins", () => {
    const commerce: Commerce = { ...commerces[0], besoinFormation: true, depuisJours: 21 };
    expect(estDemandeAncienne(commerce)).toBe(false);
  });

  it("est fausse pour un commerce qui n'a pas besoin de formation", () => {
    const commerce: Commerce = { ...commerces[4], besoinFormation: false, depuisJours: 60 };
    expect(estDemandeAncienne(commerce)).toBe(false);
  });
});
