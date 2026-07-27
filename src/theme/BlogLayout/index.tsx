import React from 'react';
import BlogLayout from '@theme-original/BlogLayout';
import type BlogLayoutType from '@theme/BlogLayout';
import type {Props as BlogLayoutProps} from '@theme/BlogLayout';
import type {WrapperProps} from '@docusaurus/types';
import {BlogSidebarContext} from '@site/src/BlogSidebarContext';

type Props = WrapperProps<typeof BlogLayoutType>;

export default function BlogLayoutWrapper(props: Props): React.JSX.Element {
  const {sidebar, toc} = props as BlogLayoutProps;
  const sidebarData = sidebar ?? {items: [], title: ''};
  // Hide the sidebar on post pages (identified by presence of a TOC).
  // MorePosts at the bottom handles cross-post discovery there.
  // Always pass full data to context so MorePosts can still pick from all posts.
  const displaySidebar = toc ? {items: [], title: ''} : sidebarData;
  return (
    <BlogSidebarContext.Provider value={sidebarData}>
      <BlogLayout {...props} sidebar={displaySidebar} />
    </BlogSidebarContext.Provider>
  );
}
