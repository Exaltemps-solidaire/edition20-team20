import { describe, expect, it } from "vitest";
import {
  commercesAFormer,
  compterCommercesAFormer,
  compterDemandesRecentes,
  type Commerce,
} from "./commerces-data";

describe("compterCommercesAFormer", () => {
  it("compte tous les commerces de la liste", () => {
    expect(compterCommercesAFormer(commercesAFormer)).toBe(
      commercesAFormer.length,
    );
  });

  it("renvoie 0 pour une liste vide", () => {
    expect(compterCommercesAFormer([])).toBe(0);
  });
});

describe("compterDemandesRecentes", () => {
  it("ne compte que les commerces marqués comme récents", () => {
    const commerces: Commerce[] = [
      { ...commercesAFormer[0], recent: true },
      { ...commercesAFormer[0], recent: false },
      { ...commercesAFormer[0], recent: true },
    ];
    expect(compterDemandesRecentes(commerces)).toBe(2);
  });
});
