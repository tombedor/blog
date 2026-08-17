import React from 'react';
import styles from './EditDiff.module.css';

type Props = {
  label: string;
  href: string;
  before: React.ReactNode;
  after: React.ReactNode;
};

export default function EditDiff({label, href, before, after}: Props): React.JSX.Element {
  return (
    <figure className={styles.diff}>
      <figcaption className={styles.caption}>
        <a href={href} target="_blank" rel="noreferrer">
          <code>{label}</code>
          <span className={styles.external} aria-hidden="true">
            ↗
          </span>
        </a>
      </figcaption>
      <div className={`${styles.line} ${styles.removed}`}>
        <span className={styles.marker} aria-hidden="true">
          −
        </span>
        <span>{before}</span>
      </div>
      <div className={`${styles.line} ${styles.added}`}>
        <span className={styles.marker} aria-hidden="true">
          +
        </span>
        <span>{after}</span>
      </div>
    </figure>
  );
}
