import React from 'react';
import BlogLayout from '@theme-original/BlogLayout';
import type BlogLayoutType from '@theme/BlogLayout';
import type {Props as BlogLayoutProps} from '@theme/BlogLayout';
import type {WrapperProps} from '@docusaurus/types';
import {BlogSidebarContext} from '@site/src/BlogSidebarContext';

type Props = WrapperProps<typeof BlogLayoutType>;

export default function BlogLayoutWrapper(props: Props): React.JSX.Element {
  const {sidebar} = props as BlogLayoutProps;
  const sidebarValue = sidebar ?? {items: [], title: ''};
  return (
    <BlogSidebarContext.Provider value={sidebarValue}>
      <BlogLayout {...props} />
    </BlogSidebarContext.Provider>
  );
}
