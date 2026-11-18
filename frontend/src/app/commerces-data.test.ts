import { describe, expect, it } from "vitest";
import {
  commerces,
  compterCommercesAFormer,
  compterDemandesRecentes,
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
