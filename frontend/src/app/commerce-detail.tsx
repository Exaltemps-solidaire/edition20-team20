"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { Commerce, commercesAFormer, trouverCommerceParId } from "./commerces-data";

export default function ListeEtDetailCommerces() {
  const [selectionId, setSelectionId] = useState(commercesAFormer[0].id);
  const selection =
    trouverCommerceParId(commercesAFormer, selectionId) ?? commercesAFormer[0];

  return (
    <section className={styles.listeEtDetail}>
      <div className={styles.liste}>
        <h2>Commerces ayant un besoin de formation</h2>
        <table>
          <thead>
            <tr>
              <th>Commerce</th>
              <th>Raison du besoin</th>
              <th>Depuis</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {commercesAFormer.map((commerce: Commerce) => (
              <tr
                key={commerce.id}
                onClick={() => setSelectionId(commerce.id)}
                className={
                  commerce.id === selectionId ? styles.ligneSelectionnee : undefined
                }
              >
                <td>
                  <p className={styles.commerceNom}>{commerce.nom}</p>
                  <p className={styles.commerceQuartier}>{commerce.quartier}</p>
                </td>
                <td>{commerce.raison}</td>
                <td>{commerce.depuis}</td>
                <td>{commerce.statut}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <aside className={styles.detail}>
        <p className={styles.surtitre}>{selection.quartier}</p>
        <h2>{selection.nom}</h2>
        <p className={styles.detailLigne}>
          <strong>Raison :</strong> {selection.raison}
        </p>
        <p className={styles.detailLigne}>
          <strong>Depuis :</strong> {selection.depuis}
        </p>
        <p className={styles.detailLigne}>
          <strong>Statut :</strong> {selection.statut}
        </p>
        <p className={styles.detailCommentaire}>{selection.commentaire}</p>
      </aside>
    </section>
  );
}
