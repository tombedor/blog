import React from 'react';
import Footer from '@theme-original/BlogPostItem/Footer';
import type FooterType from '@theme/BlogPostItem/Footer';
import type {WrapperProps} from '@docusaurus/types';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';

type Props = WrapperProps<typeof FooterType>;

export default function FooterWrapper(props: Props): JSX.Element {
  const {metadata} = useBlogPost();
  const {frontMatter} = metadata;
  const canonicalUrl = frontMatter.canonical_url as string | undefined;

  return (
    <>
      <Footer {...props} />
      {canonicalUrl && (
        <div style={{
          marginTop: '2rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--ifm-color-emphasis-300)',
          fontSize: '0.9rem',
          fontStyle: 'italic',
          color: 'var(--ifm-color-emphasis-700)'
        }}>
          Also published at <a href={canonicalUrl} target="_blank" rel="noopener noreferrer">
            {canonicalUrl}
          </a>
        </div>
      )}
    </>
  );
}
