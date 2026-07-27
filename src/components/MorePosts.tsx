import React, {useEffect, useState} from 'react';
import {useBlogSidebarItems} from '@site/src/BlogSidebarContext';
import {track} from '@site/src/analytics';

type SidebarItem = {title: string; permalink: string};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function MorePosts({currentPermalink}: {currentPermalink: string}): React.JSX.Element | null {
  const items = useBlogSidebarItems();
  const [picks, setPicks] = useState<SidebarItem[]>([]);

  // Randomize client-side only to avoid SSR hydration mismatch
  useEffect(() => {
    const eligible = items.filter(p => p.permalink !== currentPermalink);
    setPicks(shuffle(eligible).slice(0, 3));
  }, [items, currentPermalink]);

  // Track impressions once picks are set
  useEffect(() => {
    if (picks.length === 0) return;
    picks.forEach((post, i) => {
      track('post-suggestion-shown', {
        source: currentPermalink,
        slug: post.permalink,
        position: i + 1,
      });
    });
  }, [picks, currentPermalink]);

  if (picks.length === 0) return null;

  return (
    <div style={{marginTop: '2rem'}}>
      <strong style={{display: 'block', marginBottom: '0.75rem'}}>More posts</strong>
      <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
        {picks.map((post, i) => (
          <li key={post.permalink}>
            <a
              href={post.permalink}
              onClick={() => {
                track('post-suggestion-click', {
                  source: currentPermalink,
                  slug: post.permalink,
                  position: i + 1,
                });
              }}
            >
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
