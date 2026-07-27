import React, {createContext, useContext} from 'react';
import type {BlogSidebar} from '@docusaurus/plugin-content-blog';

const BlogSidebarContext = createContext<BlogSidebar>({items: [], title: ''});

export {BlogSidebarContext};
export const useBlogSidebarItems = () => useContext(BlogSidebarContext).items;
