import React, {useState} from 'react';

// After setting up Listmonk, get the list UUID from:
// Settings → Lists → your list → copy the UUID
const LISTMONK_URL = 'https://newsletter.tombedor.dev';
const LIST_UUID = 'REPLACE_WITH_YOUR_LIST_UUID';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function NewsletterSignup(): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

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
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div style={styles.container}>
        <p style={styles.heading}>Check your email to confirm your subscription.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <p style={styles.heading}>Get new posts by email</p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          disabled={status === 'loading'}
          style={styles.input}
        />
        <button type="submit" disabled={status === 'loading'} style={styles.button}>
          {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>
      {status === 'error' && (
        <p style={styles.error}>Something went wrong — please try again.</p>
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
