## Why Dev Works But Docker Fails
- Dev environment has `tslib` and possibly `rxjs` available via hoisting/transitive installs from other workspace packages or prior installs in your local `node_modules` store.
- The app imports `rxjs` directly (`apps/demo/app/core/services/api.service.ts:3`), but `rxjs` is not declared in root `package.json`. In a clean container, `pnpm install --frozen-lockfile` installs only declared deps → `TS2307`.
- `apps/demo/tsconfig.app.json` sets `importHelpers: true`, which requires `tslib`. Locally you likely have `tslib` present (e.g., via `libs/ui/package.json`), but the demo app uses source path aliases and doesn’t pull the library’s package deps → in Docker it’s missing → `TS2354`.

## Fix
1. Declare required deps in the workspace `package.json`:
   - `tslib`: `^2.6.2`
   - `rxjs`: `^7.8.1`
2. Refresh lockfile and install:
   - `pnpm add rxjs tslib`
3. Verify locally:
   - `pnpm nx build demo`
4. Rebuild Docker:
   - `docker compose up -d --build`

## Optional Deployment Hardening
- Switch final container to Nginx static serving (SPA fallback `try_files $uri $uri/ /index.html;`, caching and gzip). You already have `nginx/nginx-docker.conf` and `nginx/nginx-vps.conf` to adapt.
- Add TLS on VPS with Let’s Encrypt and security headers.

## Deliverables On Approval
- Dependency updates with successful local and container builds.
- Verified SPA routing behind Nginx and HTTPS enabled on VPS.
- Short checklist of validation steps and commands used.