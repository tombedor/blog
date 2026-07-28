import React from 'react';
import Layout from '@theme/Layout';
import NewsletterSignup from '@site/src/components/NewsletterSignup';

export default function Subscribe(): React.JSX.Element {
  return (
    <Layout title="Subscribe" description="Subscribe to Tom Bedor's blog">
      <main style={{maxWidth: '640px', margin: '3rem auto', padding: '0 1rem'}}>
        <h1>Subscribe</h1>

        <section style={{marginBottom: '2.5rem'}}>
          <h2 style={{fontSize: '1.2rem'}}>Email</h2>
          <p style={{color: 'var(--ifm-color-emphasis-700)', marginBottom: '1rem'}}>
            New posts to your inbox. 2-3 posts per month.
          </p>
          <NewsletterSignup placement="subscribe-page" />
        </section>

        <section style={{marginBottom: '2.5rem'}}>
          <h2 style={{fontSize: '1.2rem'}}>RSS / Atom</h2>
          <p style={{color: 'var(--ifm-color-emphasis-700)', marginBottom: '0.75rem'}}>
            Subscribe in your feed reader of choice.
          </p>
          <ul style={{paddingLeft: '1.25rem'}}>
            <li>
              <a href="/rss.xml" data-umami-event="rss-subscribe">RSS feed</a>
            </li>
            <li>
              <a href="/atom.xml" data-umami-event="rss-subscribe">Atom feed</a>
            </li>
          </ul>
        </section>

        <section>
          <h2 style={{fontSize: '1.2rem'}}>Twitter</h2>
          <p style={{color: 'var(--ifm-color-emphasis-700)'}}>
            You can also{' '}
            <a
              href="https://x.com/middleagedc0der"
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="twitter-follow">
              follow me on Twitter
            </a>
            .
          </p>
        </section>
      </main>
    </Layout>
  );
}
