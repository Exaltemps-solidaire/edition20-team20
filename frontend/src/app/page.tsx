import styles from "./page.module.css";
import {
  commercesAFormer,
  compterCommercesAFormer,
  compterDemandesRecentes,
} from "./commerces-data";
import ListeEtDetailCommerces from "./commerce-detail";

export default function TableauDeBord() {
  const aFormer = compterCommercesAFormer(commercesAFormer);
  const demandesRecentes = compterDemandesRecentes(commercesAFormer);

  return (
    <div className={styles.page}>
      <header className={styles.entete}>
        <p className={styles.surtitre}>Formations Carillon</p>
        <h1>Tableau de bord</h1>
        <p className={styles.soustitre}>
          Suivez les besoins, organisez les formations, gardez un historique
          clair.
        </p>
      </header>

      <section className={styles.tuiles} aria-label="Indicateurs clés">
        <article className={styles.tuile}>
          <p className={styles.tuileValeur}>{aFormer}</p>
          <p className={styles.tuileLibelle}>Commerces à former</p>
          <p className={styles.tuileDetail}>
            dont {demandesRecentes} avec une demande récente
          </p>
        </article>
        <article className={styles.tuile}>
          <p className={styles.tuileValeur}>4</p>
          <p className={styles.tuileLibelle}>Formations prévues d&apos;ici fin 2026</p>
        </article>
        <article className={styles.tuile}>
          <p className={styles.tuileValeur}>24</p>
          <p className={styles.tuileLibelle}>Formations réalisées en 2025</p>
        </article>
        <article className={styles.tuile}>
          <p className={styles.tuileValeur}>60</p>
          <p className={styles.tuileLibelle}>Commerces formés en 2025</p>
        </article>
      </section>

      <ListeEtDetailCommerces />
    </div>
  );
}
