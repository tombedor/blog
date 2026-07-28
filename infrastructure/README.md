# Blog Analytics & Newsletter Infrastructure

Self-hosted analytics (Umami) and newsletter (Listmonk) deployment on DigitalOcean using Terraform.

## 📦 What's Included

- **Umami Analytics** - Privacy-focused web analytics
- **Listmonk** - High-performance newsletter platform
- **PostgreSQL** - Shared database for both services
- **Caddy** - Automatic HTTPS reverse proxy
- **Terraform** - Infrastructure as code for DigitalOcean

**Cost**: ~$12/month (single droplet running all services)

## 🚀 Quick Start

### Prerequisites

1. **DigitalOcean Account** with API token
   - Create token: https://cloud.digitalocean.com/account/api/tokens
   - Needs read/write permissions

2. **SSH Key** uploaded to DigitalOcean
   - View keys: https://cloud.digitalocean.com/account/security
   - Note the key name (you'll need it)

3. **Terraform** installed locally
   ```bash
   brew install terraform  # macOS
   # or download from https://terraform.io
   ```

4. **Domain names** (optional but recommended)
   - For automatic HTTPS
   - Can use any DNS provider (doesn't have to be DigitalOcean)

### Step 1: Configure Environment Variables

```bash
cd infrastructure/docker
cp .env.example .env
```

Edit `.env` and set:
- `POSTGRES_PASSWORD` - Strong random password
- `UMAMI_APP_SECRET` - Generate with: `openssl rand -hex 32`
- `ANALYTICS_DOMAIN` - Your analytics subdomain (e.g., analytics.yourdomain.com)
- `LISTMONK_DOMAIN` - Your newsletter subdomain (e.g., newsletter.yourdomain.com)

### Step 2: Configure Terraform

```bash
cd infrastructure/terraform
cp terraform.tfvars.example terraform.tfvars
```

Edit `terraform.tfvars` and set:
- `do_token` - Your DigitalOcean API token
- `ssh_key_name` - Name of your SSH key in DigitalOcean
- `ssh_allowed_ips` - Your current public IP as a `/32` CIDR; do not expose SSH globally
- `domain` - Your root domain (if using DigitalOcean DNS)
- `analytics_subdomain` - Subdomain for analytics
- `listmonk_subdomain` - Subdomain for newsletter

### Step 3: Deploy

```bash
cd infrastructure/terraform

# Initialize Terraform
terraform init

# Preview changes
terraform plan

# Create the host and networking
terraform apply

# Wait for cloud-init and SSH to become available (usually 2-3 minutes)

# Upload docker/.env outside Terraform state and start the services
cd ..
just bootstrap
```

Allow another minute for the containers to become healthy, then run `just status`.

### Step 4: DNS Configuration

If **NOT** using DigitalOcean DNS, manually create A records:
- `analytics.yourdomain.com` → Reserved IP (shown in Terraform output)
- `newsletter.yourdomain.com` → Reserved IP

### Step 5: Initial Setup

**Umami Analytics:**
1. Visit `https://analytics.yourdomain.com`
2. Login with: `admin` / `umami`
3. ⚠️ **Change password immediately!**
4. Add your website

**Listmonk Newsletter:**
1. Visit `https://newsletter.yourdomain.com`
2. Complete the setup wizard
3. Configure SMTP settings (see SMTP Setup below)
4. Confirm the list's subscription policy. This blog intentionally uses a public single-opt-in list, so monitor submissions and list quality for automated abuse.

## 📧 SMTP Setup for Listmonk

Listmonk needs SMTP to send emails. This setup uses Resend (3,000 emails/month free).

### Resend Setup

1. Create an account at https://resend.com
2. Add and verify your domain under **Domains**
3. Create an API key under **API Keys** with "Sending access"
4. Set `LISTMONK_app__smtp_password=re_your_key` in `docker/.env`
5. Use `LISTMONK_app__smtp_port=2587` for Resend on DigitalOcean, since `587` timed out from the production droplet

## 🔧 Management

### Check Service Status

```bash
ssh root@<droplet-ip>
cd /opt/analytics
docker-compose ps
```

### View Logs

```bash
ssh root@<droplet-ip>
cd /opt/analytics

# All services
docker-compose logs -f

# Specific service
docker-compose logs -f umami
docker-compose logs -f listmonk
```

### Restart Services

```bash
ssh root@<droplet-ip>
cd /opt/analytics
docker-compose restart
```

### Update Services

```bash
ssh root@<droplet-ip>
cd /opt/analytics
docker-compose pull
docker-compose up -d
```

### Backup Database

```bash
ssh root@<droplet-ip>
docker exec postgres pg_dumpall -U postgres > backup_$(date +%Y%m%d).sql
```

### Migrate PostgreSQL to Block Storage

After creating, attaching, and mounting a DigitalOcean Block Storage volume,
run the migration preflight from `infrastructure/`:

```bash
just migrate-postgres-volume --preflight
```

When the preflight succeeds, run the interactive migration:

```bash
just migrate-postgres-volume
```

The script creates a logical backup, stops PostgreSQL and its dependent
services, copies the data, installs a Compose override for the new bind mount,
and restarts and verifies the services. It pauses for confirmation after the
backup is verified, after the data copy is verified, and after PostgreSQL is
healthy on the new mount. Cancelling after services have stopped triggers the
rollback path. The original Docker volume remains in place for rollback. The
script does not create, format, attach, or mount the DigitalOcean volume.

## 🌐 Integrating with Your Blog

### Umami Analytics

Add to your Docusaurus config (`docusaurus.config.ts`):

```typescript
export default {
  scripts: [
    {
      src: 'https://analytics.yourdomain.com/script.js',
      'data-website-id': 'your-website-id',  // Get from Umami dashboard
      defer: true,
    },
  ],
  // ... rest of config
};
```

### Listmonk Newsletter Signup

Create a React component in `src/components/NewsletterSignup.tsx`:

```tsx
import React, { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://newsletter.yourdomain.com/subscription/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: email.split('@')[0],
          list_uuids: ['your-list-uuid'],  // Get from Listmonk
        }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />
      <button type="submit">Subscribe</button>
      {status === 'success' && <p>Thanks! Check your email to confirm.</p>}
      {status === 'error' && <p>Something went wrong. Please try again.</p>}
    </form>
  );
}
```

## 💰 Cost Breakdown

| Service | Cost |
|---------|------|
| Droplet (2GB RAM) | $12/mo |
| **Total** | **$12/mo** |

Additional costs (if using):
- SMTP service: $0-10/mo depending on volume
- Domain name: ~$10-15/year
- Droplet backups (optional): +20% = $2.40/mo

## 🗑️ Teardown

To destroy all infrastructure:

```bash
cd infrastructure/terraform
terraform destroy
```

## 📚 Resources

- [Umami Documentation](https://umami.is/docs)
- [Listmonk Documentation](https://listmonk.app/docs)
- [Caddy Documentation](https://caddyserver.com/docs)
- [DigitalOcean Terraform Provider](https://registry.terraform.io/providers/digitalocean/digitalocean/latest/docs)

## 🔒 Security Notes

- The `.env` and `terraform.tfvars` files contain secrets and are gitignored
- SSH has no allowed source by default; set `ssh_allowed_ips` to an explicit `/32` CIDR before deployment
- Change default Umami password immediately after deployment
- Consider enabling DigitalOcean backups for production
- Caddy automatically handles SSL certificate renewal

## 🐛 Troubleshooting

### Services won't start

Check logs:
```bash
ssh root@<droplet-ip>
cd /opt/analytics
docker-compose logs
```

### Can't access via domain

1. Verify DNS records are propagated: `dig analytics.yourdomain.com`
2. Check Caddy logs: `docker-compose logs caddy`
3. Ensure ports 80/443 are open in firewall

### Database connection errors

1. Check if PostgreSQL is running: `docker-compose ps postgres`
2. Verify database was created: `docker-compose exec postgres psql -U postgres -l`
3. Check credentials in `.env` file

### Out of memory

Upgrade to larger droplet:
```bash
# Edit terraform.tfvars
droplet_size = "s-2vcpu-4gb"  # $24/mo

# Apply changes
terraform apply
```

## 📝 License

This infrastructure setup is provided as-is for personal use.
