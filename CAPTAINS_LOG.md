# Captain's Log

## 2026-04-03

- Updated the infrastructure source of truth to use Resend SMTP on port `2587` instead of `587`. From the production droplet (`159.89.254.128`), `587` and `465` timed out, while `2587` and `2465` connected.
- Verified that Docker env on the droplet was correct, but Listmonk was still using placeholder SMTP settings from its Postgres `settings` table.
- Manually updated production Listmonk DB settings:
  - `settings.key = 'smtp'` to use `smtp.resend.com`, username `resend`, API key auth, `STARTTLS`, and port `2587`
  - `settings.key = 'app.from_email'` to `newsletter <newsletter@tombedor.dev>`
- Restarted the production `listmonk` container after the DB update.
- Result: test SMTP sends from the Listmonk UI succeeded.
