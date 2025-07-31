# Phoenix Website

This static site contains HTML, CSS, and JavaScript assets for the OPS online support pages.

## Deployment Notes

For production deployments ensure the following HTTP security headers are enabled at the server or CDN level:

Content-Security-Policy: default-src 'self'; script-src 'self' https://cdnjs.cloudflare.com https://ajax.cloudflare.com https://www.google-analytics.com 'nonce-<nonce>'; style-src 'self' https://fonts.googleapis.com https://cdnjs.cloudflare.com 'nonce-<nonce>'; font-src https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data:; connect-src 'self' https://api.example.com https://www.google-analytics.com; media-src 'self'; frame-ancestors 'self'; manifest-src 'self'; worker-src 'self'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;

- Strict-Transport-Security: max-age=63072000; includeSubDomains; preload

- Referrer-Policy: no-referrer

- X-Content-Type-Options: nosniff

- X-Frame-Options: SAMEORIGIN

- Cross-Origin-Opener-Policy: same-origin

- Cross-Origin-Embedder-Policy: require-corp


Many hosting providers (e.g. Netlify, Cloudflare, GitHub Pages) allow these headers to be configured via dashboard or configuration file. Apply them according to your platform.

## Form Handling

The Contact and Join Us forms include client-side input sanitization. Fields containing HTML tags or the word `script` are rejected before submission.

When integrating a backend, always validate and sanitize input again on the server.
