# Deployment

This project can be deployed as a single Node service plus PostgreSQL.
The API serves the built frontend in production, so the easiest setup is:

- one PostgreSQL database
- one Node process on port `3005`
- one reverse proxy (Nginx, Caddy, Cloudflare Tunnel, etc.) for HTTPS

## 1. Prepare the server

- Install Node.js 24
- Install pnpm (`corepack enable`)
- Install PostgreSQL or use a managed PostgreSQL service
- Clone this repository

## 2. Configure environment

Copy `.env.example` to `.env` and fill in real values:

```bash
cp .env.example .env
```

Required values:

- `DATABASE_URL`
- `SESSION_SECRET`
- `PORT`

## 3. Install and build

```bash
pnpm install --frozen-lockfile
pnpm run build:prod
```

## 4. Push schema

Run this once when setting up the database:

```bash
DATABASE_URL="postgresql://..." pnpm --filter @workspace/db run push
```

## 5. Seed demo content (optional)

```bash
DATABASE_URL="postgresql://..." pnpm --filter @workspace/scripts run seed
```

## 6. Start the app

```bash
set -a
. ./.env
set +a
pnpm run start:prod
```

The Node server will expose:

- frontend on `/`
- API on `/api/*`

## 7. Put Nginx in front

Example Nginx config:

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://127.0.0.1:3005;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

If you terminate HTTPS at Nginx, keep `NODE_ENV=production` so secure cookies are handled correctly.

## Docker

Build:

```bash
docker build -t school-web-manager .
```

Run:

```bash
docker run --env-file .env -p 3005:3005 school-web-manager
```

## Notes

- The admin panel depends on sessions, so `SESSION_SECRET` must be stable.
- The simplest production topology is same-origin traffic: site and API on the same domain.
- If you split frontend and backend across different domains, you will also need to configure `CORS_ORIGIN`.

## Render

This repo includes a ready-to-use `render.yaml` Blueprint.

### First deploy

1. Push this repository to GitHub.
2. In Render, choose **New +** -> **Blueprint**.
3. Select the GitHub repository.
4. Render will detect `render.yaml` and propose:
   - one web service
   - one PostgreSQL database
5. Click **Apply**.

### What the Blueprint does

- builds the whole monorepo with `pnpm run build:prod`
- runs `pnpm --filter @workspace/db run push` as part of startup on the free plan
- runs `pnpm --filter @workspace/scripts run seed` so the admin user and demo content exist after deploy
- injects `DATABASE_URL` from the Render Postgres database
- generates `SESSION_SECRET`

### Important free-tier note

The included Blueprint uses:

- `plan: free` for the web service
- `plan: free` for the database

This is good for trying the app, but not ideal for a real school website because:

- free web services sleep when idle
- free Render Postgres databases can expire

Before going fully live, change `render.yaml` to:

- web service: `starter`
- database: `basic-256mb`

Then re-apply the Blueprint or change the plans in the Render dashboard.
