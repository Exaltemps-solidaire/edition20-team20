"use client";

import { useState } from "react";
import styles from "./page.module.css";
import {
  Commerce,
  commerces,
  estDemandeAncienne,
  trouverCommerceParId,
} from "./commerces-data";

type Filtre = "tous" | "oui" | "non";

export default function ListeEtDetailCommerces() {
  const [selectionId, setSelectionId] = useState(commerces[0].id);
  const [filtre, setFiltre] = useState<Filtre>("tous");
  const selection = trouverCommerceParId(commerces, selectionId) ?? commerces[0];

  const commercesAffiches = commerces.filter((commerce) => {
    if (filtre === "oui") return commerce.besoinFormation;
    if (filtre === "non") return !commerce.besoinFormation;
    return true;
  });

  return (
    <section className={styles.listeEtDetail}>
      <div className={styles.liste}>
        <div className={styles.listeEntete}>
          <h2>Commerces</h2>
          <div className={styles.filtre} role="group" aria-label="Filtrer par formation">
            <button
              type="button"
              onClick={() => setFiltre("tous")}
              className={filtre === "tous" ? styles.filtreActif : undefined}
            >
              Tous
            </button>
            <button
              type="button"
              onClick={() => setFiltre("oui")}
              className={filtre === "oui" ? styles.filtreActif : undefined}
            >
              Formation : Oui
            </button>
            <button
              type="button"
              onClick={() => setFiltre("non")}
              className={filtre === "non" ? styles.filtreActif : undefined}
            >
              Formation : Non
            </button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Commerce</th>
              <th>Formation</th>
              <th>Raison du besoin</th>
              <th>Depuis</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {commercesAffiches.map((commerce: Commerce) => {
              const ancienne = estDemandeAncienne(commerce);
              return (
                <tr
                  key={commerce.id}
                  onClick={() => setSelectionId(commerce.id)}
                  className={[
                    commerce.id === selectionId ? styles.ligneSelectionnee : "",
                    ancienne ? styles.ligneAncienne : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <td>
                    <p className={styles.commerceNom}>
                      {ancienne && (
                        <span aria-label="Demande ancienne" title="Demande de plus de 3 semaines">
                          ⚠️{" "}
                        </span>
                      )}
                      {commerce.nom}
                    </p>
                    <p className={styles.commerceQuartier}>{commerce.quartier}</p>
                  </td>
                  <td>{commerce.besoinFormation ? "Oui" : "Non"}</td>
                  <td>{commerce.raison ?? "—"}</td>
                  <td>{commerce.depuis ?? "—"}</td>
                  <td>{commerce.statut ?? "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <aside className={styles.detail}>
        <p className={styles.surtitre}>{selection.quartier}</p>
        <h2>{selection.nom}</h2>
        <p className={styles.detailLigne}>
          <strong>Adresse :</strong> {selection.adresse}
        </p>
        <p className={styles.detailLigne}>
          <strong>Contact :</strong> {selection.contact}
        </p>
        {selection.besoinFormation ? (
          <>
            <p className={styles.detailLigne}>
              <strong>Raison :</strong> {selection.raison}
            </p>
            <p className={styles.detailLigne}>
              <strong>Depuis :</strong> {selection.depuis}
            </p>
            <p className={styles.detailLigne}>
              <strong>Statut :</strong> {selection.statut}
            </p>
            <p className={styles.detailLigne}>
              <strong>Personnes à former :</strong> {selection.personnesAFormer}
            </p>
            <p className={styles.detailLigne}>
              <strong>Formations demandées :</strong>{" "}
              {selection.formationsDemandees?.join(", ")}
            </p>
            <p className={styles.detailLigne}>
              <strong>Assignée à :</strong> {selection.personneAssignee}
            </p>
            <p className={styles.detailCommentaire}>{selection.commentaire}</p>
          </>
        ) : (
          <p className={styles.detailLigne}>Pas de besoin de formation actuellement.</p>
        )}
      </aside>
    </section>
  );
}
