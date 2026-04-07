# Elroy Docs Migration TODO

Goal: keep Elroy docs authored and built in `../elroy`, but host `elroy.bot` from the DigitalOcean infrastructure in this repo so blog URLs can return real `302` redirects to `tombedor.dev`.

## Current State

- Elroy docs source lives in `../elroy/docs/`
- Elroy docs build output is `../elroy/site/`
- `just deploy-elroy-docs` in this repo builds and uploads the site to the DigitalOcean host
- `just preview-elroy-docs` previews the deployed site over the droplet IP using `Host: elroy.bot`
- Caddy config for `elroy.bot` lives in [infrastructure/docker/caddy/Caddyfile](/Users/tombedor/development/blog/infrastructure/docker/caddy/Caddyfile)

## Before Cutover

- [ ] Confirm the DigitalOcean droplet is running
- [ ] Confirm Caddy is healthy: `cd infrastructure && just status`
- [ ] Deploy the latest Elroy docs: `just deploy-elroy-docs`
- [ ] Preview the docs homepage: `just preview-elroy-docs`
- [ ] Preview a representative docs page: `just preview-elroy-docs PATH=/installation.html`
- [ ] Preview a representative redirect with headers: `just preview-elroy-docs PATH=/blog/2025/07/29/ai-is-a-floor-raiser-not-a-ceiling-raiser.html SHOW_HEADERS=true`
- [ ] Verify the redirect response is a real `302`
- [ ] Verify static assets load correctly from the deployed docs site

## Redirect Audit

- [ ] Review legacy Elroy blog URLs under `../elroy/docs/blog/posts/`
- [ ] Compare them against the explicit redirect rules in [infrastructure/docker/caddy/Caddyfile](/Users/tombedor/development/blog/infrastructure/docker/caddy/Caddyfile)
- [ ] Add any missing one-to-one redirects for important historical URLs
- [ ] Decide whether the `/blog/* -> https://tombedor.dev/` catch-all is sufficient for any unmapped posts
- [ ] Test at least one URL for each redirect pattern

## DNS Cutover

- [ ] Confirm the correct target IP
  Use `HOST_IP` from `.env` or `terraform -chdir=infrastructure/terraform output -raw reserved_ip`
- [ ] Update `elroy.bot` DNS A record to the DigitalOcean host
- [ ] Remove any GitHub Pages DNS records that would conflict
- [ ] Wait for DNS propagation
- [ ] Verify `http://elroy.bot` responds from the droplet
- [ ] Verify `https://elroy.bot` gets a valid certificate from Caddy

## After Cutover

- [ ] Test docs pages on the live domain
- [ ] Test several live blog redirects on the live domain
- [ ] Confirm no important docs paths return 404 unexpectedly
- [ ] Confirm analytics/newsletter setup still behaves as expected on the droplet
- [ ] Remove or disable GitHub Pages deployment for Elroy docs in `../elroy` if no longer needed
- [ ] Remove `docs/CNAME` in `../elroy` if it is no longer part of the deployment path

## Ongoing Workflow

- Publish updated Elroy docs with:

```bash
just deploy-elroy-docs
```

- Preview before DNS or content-sensitive changes with:

```bash
just preview-elroy-docs
just preview-elroy-docs PATH=/installation.html
just preview-elroy-docs PATH=/blog/2025/07/29/ai-is-a-floor-raiser-not-a-ceiling-raiser.html SHOW_HEADERS=true
```
