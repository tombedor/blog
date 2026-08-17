import React, {useEffect, useRef, useState} from 'react';
import styles from './SourceExcerpt.module.css';

type Props = {
  label: string;
  href?: string;
  children: string;
};

export default function SourceExcerpt({label, href, children}: Props): React.JSX.Element {
  const code = children.trim();
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  async function copyCode(): Promise<void> {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), 2000);
  }

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
      <div className={styles.codeWrap}>
        <button
          type="button"
          className={styles.copyButton}
          onClick={copyCode}
          aria-label={copied ? 'Copied' : 'Copy code'}
          title={copied ? 'Copied' : 'Copy code'}>
          {copied ? (
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="m3 8.5 3 3 7-7" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <rect x="5.5" y="5.5" width="8" height="8" rx="1" />
              <path d="M3.5 10.5h-1v-8h8v1" />
            </svg>
          )}
        </button>
        <pre className={styles.code}>
          <code>{code}</code>
        </pre>
      </div>
    </figure>
  );
}
