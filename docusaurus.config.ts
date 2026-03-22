import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  scripts: [
    {
      src: 'https://analytics.tombedor.dev/script.js',
      'data-website-id': '8694de38-6514-4d57-a9bd-7c62b89c008d',
      defer: true,
    },
  ],
  title: 'Tom Bedor\'s Blog',
  tagline: 'Thoughts on software, AI, and building things',
  favicon: 'img/logo.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://tombedor.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // Explicitly set trailing slash behavior for GitHub Pages
  trailingSlash: true,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'tombedor', // Usually your GitHub org/user name.
  projectName: 'blog', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: false, // Disable docs
        blog: {
          routeBasePath: '/', // Serve the blog at the site's root
          showReadingTime: true,
          postsPerPage: 10, // Show all blog posts on the main page
          blogSidebarCount: 10, // Show 10 recent posts in sidebar
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
            title: 'Tom Bedor\'s Blog',
            copyright: `Copyright © ${new Date().getFullYear()} Tom Bedor`,
            description: 'Thoughts on software, AI, and building things',
            language: 'en',
          },
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/icon-1024.png',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Tom Bedor\'s Blog',
      logo: {
        alt: 'Tom Bedor\'s Blog Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/about',
          label: 'About',
          position: 'right',
        },
        {
          href: 'https://github.com/tombedor',
          label: 'GitHub',
          position: 'right',
        },
        {
          to: '/subscribe',
          label: 'Subscribe',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Tom Bedor. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
