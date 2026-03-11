import React, { useEffect } from 'react';

export default function Tweet({ html }: { html: string }) {
  useEffect(() => {
    if ((window as any).twttr?.widgets) {
      (window as any).twttr.widgets.load();
    } else {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.charset = 'utf-8';
      document.body.appendChild(script);
    }
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
