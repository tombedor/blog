import React from 'react';
import Head from '@docusaurus/Head';
import OriginalBlogPostPageMetadata from '@theme-original/BlogPostPage/Metadata';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';

// The theme's default metadata sets og:title/og:description (and
// og:image/twitter:image) but never twitter:title/twitter:description —
// Twitter/X is supposed to fall back to the og: tags when its own are
// missing, but that fallback isn't reliable across every unfurl path, so
// set them explicitly to the post's own title/description rather than
// leaving it to chance (and to a generic site-wide title).
export default function BlogPostPageMetadataWrapper(): React.JSX.Element {
  const {metadata, frontMatter} = useBlogPost();
  const title = frontMatter.title_meta ?? metadata.title;

  return (
    <>
      <OriginalBlogPostPageMetadata />
      <Head>
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={metadata.description} />
      </Head>
    </>
  );
}
