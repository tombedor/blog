import React, { useEffect, useRef } from 'react';

export default function Tweet({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = () => (window as any).twttr?.widgets?.load(ref.current);

    if ((window as any).twttr?.widgets) {
      load();
    } else {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.charset = 'utf-8';
      script.onload = load;
      document.body.appendChild(script);
    }
  }, []);

  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
}
