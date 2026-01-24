import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export interface Project {
  title: string;
  description: string;
  githubUrl: string;
  websiteUrl?: string;
  stars?: number;
  language?: string;
  featured?: boolean;
}

export default function ProjectCard({
  title,
  description,
  githubUrl,
  websiteUrl,
  stars,
  language,
  featured,
}: Project): ReactNode {
  return (
    <div className={clsx('card', styles.projectCard, featured && styles.featured)}>
      <div className="card__header">
        <Heading as="h3">{title}</Heading>
        <div className={styles.metadata}>
          {stars !== undefined && (
            <span className={styles.badge}>
              ⭐ {stars}
            </span>
          )}
          {language && (
            <span className={styles.badge}>
              {language}
            </span>
          )}
        </div>
      </div>
      <div className="card__body">
        <p>{description}</p>
      </div>
      <div className="card__footer">
        <div className={styles.links}>
          <a
            href={githubUrl}
            className="button button--secondary button--sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          {websiteUrl && (
            <a
              href={websiteUrl}
              className="button button--primary button--sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
