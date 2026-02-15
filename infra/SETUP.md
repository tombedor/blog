# Self-Hosted Analytics & Email List Setup

Self-hosted [Umami](https://umami.is/) (analytics) and [Listmonk](https://listmonk.app/) (email list) on DigitalOcean App Platform, sharing a single managed PostgreSQL database.

## Architecture

```
tombedor.dev (GitHub Pages)
  ├── Umami tracking script (async, non-blocking)
  └── Listmonk subscription form (API calls)

DigitalOcean App Platform
  ├── Umami container    -> analytics.tombedor.dev
  ├── Listmonk container -> mail.tombedor.dev
  └── Shared PostgreSQL dev database ($0/month)
```

## Estimated Cost

| Service | Size | Cost |
|---------|------|------|
| PostgreSQL dev database | Shared CPU, 256MB | $0/month |
| Umami container | 1 vCPU, 0.5GB | ~$5/month |
| Listmonk container | 1 vCPU, 0.5GB | ~$5/month |
| **Total** | | **~$10/month** |

## Prerequisites

1. [DigitalOcean account](https://cloud.digitalocean.com/)
2. [`doctl` CLI](https://docs.digitalocean.com/reference/doctl/how-to/install/) installed and authenticated
3. DNS access for `tombedor.dev` (to add CNAME records)
4. An SMTP provider for sending emails (Mailgun, SES, Resend, Postmark, etc.)

## Deployment

### 1. Run the setup script

```bash
./infra/setup.sh
```

This creates the App Platform app with both services and the shared database. Save the Listmonk admin credentials printed at the end.

### 2. Wait for deployment

```bash
# Check status
doctl apps list
doctl apps get <app-id>
```

The first deployment takes a few minutes while the database provisions and containers start.

### 3. Configure custom domains

In the [DigitalOcean console](https://cloud.digitalocean.com/apps):

1. Open your app > Settings
2. For the **umami** service, add domain: `analytics.tombedor.dev`
3. For the **listmonk** service, add domain: `mail.tombedor.dev`

Then add DNS CNAME records at your DNS provider:

```
analytics.tombedor.dev  CNAME  <umami-app-url>.ondigitalocean.app.
mail.tombedor.dev       CNAME  <listmonk-app-url>.ondigitalocean.app.
```

DigitalOcean will auto-provision Let's Encrypt TLS certificates.

### 4. Set up Umami

1. Open `https://analytics.tombedor.dev`
2. Log in with default credentials: `admin` / `umami`
3. **Change the default password immediately** (Settings > Profile)
4. Go to Settings > Websites > Add website
5. Enter `tombedor.dev` as the domain
6. Copy the **Website ID** (a UUID like `a1b2c3d4-...`)

### 5. Connect Umami to the blog

Set environment variables in your build/deploy process, or hardcode them in `docusaurus.config.ts`:

```ts
// In docusaurus.config.ts, update the umami-analytics plugin:
plugins: [
  [
    './src/plugins/umami-analytics',
    {
      websiteId: 'YOUR-WEBSITE-UUID-HERE',
      src: 'https://analytics.tombedor.dev/script.js',
    },
  ],
],
```

Then rebuild and deploy the blog.

### 6. Set up Listmonk

1. Open `https://mail.tombedor.dev`
2. Log in with the credentials from the setup script
3. Configure SMTP (Settings > SMTP):
   - See [SMTP provider options](#smtp-providers) below
4. Create a mailing list:
   - Lists > New list
   - Name: "Blog Updates"
   - Type: Public
   - Optin: Double opt-in (recommended)
   - Copy the **List UUID**
5. Customize email templates (Campaigns > Templates)

### 7. Connect Listmonk to the blog

Update the EmailSignup component constants in `src/components/EmailSignup/index.tsx`:

```ts
const LISTMONK_URL = "https://mail.tombedor.dev";
const LISTMONK_LIST_UUID = "YOUR-LIST-UUID-HERE";
```

Then rebuild and deploy the blog.

### 8. Configure CORS on Listmonk

Since the blog (tombedor.dev) makes API calls to Listmonk (mail.tombedor.dev), you need to allow cross-origin requests.

In Listmonk admin, go to Settings > General and ensure the API origin allowlist includes `https://tombedor.dev`.

## SMTP Providers

Pick one for sending emails from Listmonk:

| Provider | Free Tier | Notes |
|----------|-----------|-------|
| [Mailgun](https://www.mailgun.com/) | 100 emails/day (flex) | Good deliverability, easy domain setup |
| [Amazon SES](https://aws.amazon.com/ses/) | 62K/month (from EC2) | Cheapest at scale, more setup |
| [Resend](https://resend.com/) | 100 emails/day | Modern API, easy setup |
| [Postmark](https://postmarkapp.com/) | 100 emails/month | Best deliverability |

SMTP settings in Listmonk (Settings > SMTP):
- Host: `smtp.provider.com`
- Port: `587` (TLS) or `465` (SSL)
- Auth: Login
- Username/Password: from your provider
- TLS: STARTTLS

## Updating Services

To update Umami or Listmonk to newer versions:

```bash
# Edit infra/app-spec.yaml to change the image tag, then:
doctl apps update <app-id> --spec infra/app-spec.yaml
```

## Tearing Down

```bash
# List apps to find the ID
doctl apps list

# Delete the app (this also deletes the dev database)
doctl apps delete <app-id>
```

## Troubleshooting

**Listmonk can't connect to database**: Check that the `db` component environment variable references are correct. The dev database may take a minute to provision.

**Umami not recording visits**: Check browser console for blocked script requests. The script is named `script.js` (not `umami.js`) to reduce adblocker interference.

**CORS errors on email signup**: Ensure Listmonk's allowed origins include `https://tombedor.dev`.

**Custom domain not working**: Verify CNAME records are set and propagated (`dig analytics.tombedor.dev`). DO auto-provisions TLS but it can take a few minutes.
