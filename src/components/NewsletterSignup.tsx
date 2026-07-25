import React, {useState} from 'react';

// After setting up Listmonk, get the list UUID from:
// Settings → Lists → your list → copy the UUID
const LISTMONK_URL = 'https://newsletter.tombedor.dev';
const LIST_UUID = '0e2a0310-73c6-4ad5-97e8-75611a164bc7';

type Status = 'idle' | 'loading' | 'success' | 'error';

type Props = {
  // Lighter-weight presentation for contexts where the form repeats often
  // (e.g. the bottom of every post) rather than being the point of the page
  // (e.g. /subscribe, /about).
  compact?: boolean;
};

export default function NewsletterSignup({compact = false}: Props): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const s = compact ? compactStyles : styles;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch(`${LISTMONK_URL}/api/public/subscription`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email,
          list_uuids: [LIST_UUID],
        }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
        window.umami?.track('email-subscribe');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div style={s.container}>
        <p style={s.heading}>You're subscribed!</p>
      </div>
    );
  }

  return (
    <div style={s.container}>
      <p style={s.heading}>Get new posts by email</p>
      <form onSubmit={handleSubmit} style={s.form}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          disabled={status === 'loading'}
          style={s.input}
        />
        <button type="submit" disabled={status === 'loading'} style={s.button}>
          {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>
      {status === 'error' && (
        <p style={s.error}>Something went wrong — please try again.</p>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '1.5rem',
    borderRadius: '8px',
    border: '1px solid var(--ifm-color-emphasis-300)',
    background: 'var(--ifm-background-surface-color)',
  },
  heading: {
    margin: '0 0 0.75rem',
    fontWeight: 600,
  },
  form: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  input: {
    flex: '1 1 200px',
    padding: '0.5rem 0.75rem',
    border: '1px solid var(--ifm-color-emphasis-400)',
    borderRadius: '4px',
    fontSize: '1rem',
    background: 'var(--ifm-background-color)',
    color: 'var(--ifm-font-color-base)',
  },
  button: {
    padding: '0.5rem 1.25rem',
    background: 'var(--ifm-color-primary)',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: 600,
  },
  error: {
    marginTop: '0.5rem',
    color: 'var(--ifm-color-danger)',
    fontSize: '0.9rem',
  },
};

const compactStyles: Record<string, React.CSSProperties> = {
  ...styles,
  container: {
    padding: '0',
    border: 'none',
    background: 'none',
  },
  heading: {
    margin: '0 0 0.5rem',
    fontWeight: 600,
    fontSize: '0.95rem',
    color: 'var(--ifm-color-emphasis-700)',
  },
};
