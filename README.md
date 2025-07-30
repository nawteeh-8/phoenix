# Phoenix Website

This static site contains HTML, CSS, and JavaScript assets for the OPS online support pages.

## Deployment Notes

For production deployments ensure the following HTTP security headers are enabled at the server or CDN level:

- `Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline' https://pro.fontawesome.com; script-src 'self' 'unsafe-inline' https://pro.fontawesome.com; font-src https://pro.fontawesome.com`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains`
- `Referrer-Policy: no-referrer`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`

Many hosting providers (e.g. Netlify, Cloudflare, GitHub Pages) allow these headers to be configured via dashboard or configuration file. Apply them according to your platform.

## Form Handling

The Contact and Join Us forms include client-side input sanitization. Fields containing HTML tags or the word `script` are rejected before submission.

When integrating a backend, always validate and sanitize input again on the server.
