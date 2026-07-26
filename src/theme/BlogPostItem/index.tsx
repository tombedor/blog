import React, {useEffect} from 'react';
import OriginalBlogPostItem from '@theme-original/BlogPostItem';
import type BlogPostItemType from '@theme/BlogPostItem';
import type {WrapperProps} from '@docusaurus/types';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import {initFootnotePopovers} from './footnotePopovers';
import {track} from '@site/src/analytics';

type Props = WrapperProps<typeof BlogPostItemType>;

// How far through the article (by scroll position, not viewport-visible
// fraction) the reader has gone. Fired once per threshold per page view.
const READ_THRESHOLDS = [25, 50, 75, 100];

function useReadDepthTracking(enabled: boolean, slug: string | undefined) {
  useEffect(() => {
    if (!enabled || !slug) {
      return;
    }

    const article = document.querySelector<HTMLElement>('.markdown');
    if (!article) {
      return;
    }

    const fired = new Set<number>();
    let ticking = false;

    const measure = () => {
      ticking = false;
      const articleTop = article.getBoundingClientRect().top + window.scrollY;
      const articleHeight = article.offsetHeight;
      if (articleHeight === 0) {
        return;
      }
      const viewportBottom = window.scrollY + window.innerHeight;
      const percent = ((viewportBottom - articleTop) / articleHeight) * 100;

      for (const threshold of READ_THRESHOLDS) {
        if (percent >= threshold && !fired.has(threshold)) {
          fired.add(threshold);
          track('post-read', {percent: threshold, slug});
        }
      }

      if (fired.size === READ_THRESHOLDS.length) {
        window.removeEventListener('scroll', onScroll);
      }
    };

    const onScroll = () => {
      if (ticking) {
        return;
      }
      ticking = true;
      requestAnimationFrame(measure);
    };

    window.addEventListener('scroll', onScroll, {passive: true});
    // Catch short articles that are already fully visible (or scroll
    // position restored) without waiting for a scroll event.
    measure();

    return () => window.removeEventListener('scroll', onScroll);
  }, [enabled, slug]);
}

function useFootnotePopovers(enabled: boolean, slug: string | undefined) {
  useEffect(() => {
    if (!enabled) {
      return;
    }
    const article = document.querySelector<HTMLElement>('.markdown');
    if (!article) {
      return;
    }
    return initFootnotePopovers(article, slug);
  }, [enabled, slug]);
}

export default function BlogPostItemWrapper(props: Props): React.JSX.Element {
  const {isBlogPostPage, metadata} = useBlogPost();
  useReadDepthTracking(isBlogPostPage, metadata.permalink);
  useFootnotePopovers(isBlogPostPage, metadata.permalink);
  return <OriginalBlogPostItem {...props} />;
}
