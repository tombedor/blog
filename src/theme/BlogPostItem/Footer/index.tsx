import React from 'react';
import Footer from '@theme-original/BlogPostItem/Footer';
import type FooterType from '@theme/BlogPostItem/Footer';
import type {WrapperProps} from '@docusaurus/types';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';

type Props = WrapperProps<typeof FooterType>;

export default function FooterWrapper(props: Props): JSX.Element {
  const {metadata} = useBlogPost();
  const {permalink} = metadata;

  // Extract the slug from the permalink (e.g., /blog/ai-is-a-floor-raiser -> ai-is-a-floor-raiser)
  const slug = permalink.replace(/^\/blog\//, '');

  return (
    <>
      <Footer {...props} />
      <div style={{
        marginTop: '2rem',
        paddingTop: '1rem',
        borderTop: '1px solid var(--ifm-color-emphasis-300)',
        fontSize: '0.9rem',
        fontStyle: 'italic',
        color: 'var(--ifm-color-emphasis-700)'
      }}>
        Also published at <a href={`https://elroy.bot/blog/${slug}`} target="_blank" rel="noopener noreferrer">
          https://elroy.bot/blog/{slug}
        </a>
      </div>
    </>
  );
}
