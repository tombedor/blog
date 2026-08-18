import React from 'react';
import styles from './EditDiff.module.css';

type Props = {
  label: string;
  href?: string;
  beforeLabel?: string;
  afterLabel?: string;
  before: React.ReactNode;
  after: React.ReactNode;
};

export default function EditDiff({
  label,
  href,
  beforeLabel,
  afterLabel,
  before,
  after,
}: Props): React.JSX.Element {
  return (
    <figure className={styles.diff}>
      <figcaption className={styles.caption}>
        {href ? (
          <a href={href} target="_blank" rel="noreferrer">
            <code>{label}</code>
            <span className={styles.external} aria-hidden="true">
              ↗
            </span>
          </a>
        ) : (
          <code>{label}</code>
        )}
      </figcaption>
      <div className={`${styles.line} ${styles.removed}`}>
        <span className={styles.marker} aria-hidden="true">
          −
        </span>
        <span className={styles.content}>
          {beforeLabel && <span className={styles.lineLabel}>{beforeLabel}</span>}
          <span>{before}</span>
        </span>
      </div>
      <div className={`${styles.line} ${styles.added}`}>
        <span className={styles.marker} aria-hidden="true">
          +
        </span>
        <span className={styles.content}>
          {afterLabel && <span className={styles.lineLabel}>{afterLabel}</span>}
          <span>{after}</span>
        </span>
      </div>
    </figure>
  );
}
