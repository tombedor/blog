import React from 'react';
import styles from './SourceExcerpt.module.css';

type Props = {
  label: string;
  href?: string;
  children: string;
};

export default function SourceExcerpt({label, href, children}: Props): React.JSX.Element {
  return (
    <figure className={styles.excerpt}>
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
      <pre className={styles.code}>
        <code>{children.trim()}</code>
      </pre>
    </figure>
  );
}
