# AI Stars Platform

A minimal, portable foundation: an Express API with a health check, and a
React status page that reports whether the API is reachable. This is
intentionally small — it exists to prove the workspace, build, and preview
pipeline all work end-to-end before any product features are added.

## Structure

This is a pnpm workspace using Replit's artifacts system:

```
artifacts/
  api-server/   Express API (Node.js), exposes GET /api/health
  web/          React + Vite status page, calls the health endpoint
lib/
  api-spec/          OpenAPI contract (source of truth for the API shape)
  api-zod/           Generated Zod schemas from the OpenAPI spec
  api-client-react/  Generated React Query hooks from the OpenAPI spec
```

Changes to the API contract start in `lib/api-spec/openapi.yaml`, then run
`pnpm --filter @workspace/api-spec run codegen` to regenerate the Zod schemas
and React hooks used by the server and the frontend.

## Requirements

- Node.js 20+
- pnpm 10+

## Getting started

```bash
pnpm install
pnpm run check   # typecheck, lint, format check, tests, build
```

On Replit, `artifacts/api-server` and `artifacts/web` each run under their own
managed workflow, which supplies the `PORT` (and `BASE_PATH` for the frontend)
environment variables and wires them into the shared preview proxy. Use the
Replit preview pane, or restart the workflow named `artifacts/<name>: <service>`,
rather than running `pnpm run dev` from a bare shell — the workspace root has
no `dev` script by design, since the correct port/base-path wiring is workflow
managed, not something a single root command can reproduce outside of Replit.

Outside of Replit (e.g. running the API server standalone), you can start it
directly:

```bash
pnpm --filter @workspace/api-server run dev
```

## Scripts (run from the repo root)

- `pnpm run typecheck` — type-check all libraries and artifacts
- `pnpm run lint` — ESLint across the API server, web app, and libraries
- `pnpm run format:check` — Prettier formatting check (no files modified)
- `pnpm run test` — run all artifact test suites (Vitest)
- `pnpm run build` — typecheck, then build every workspace package
- `pnpm run check` — typecheck, lint, format check, test, and build, in order

## API environment variables

The API server (`artifacts/api-server`) resolves its host and port as follows:

| Variable   | Purpose                                 | Default   |
| ---------- | --------------------------------------- | --------- |
| `API_PORT` | Port to listen on (checked first)       | —         |
| `PORT`     | Fallback port (set by Replit workflows) | —         |
| `API_HOST` | Host/interface to bind to               | `0.0.0.0` |

If neither `API_PORT` nor `PORT` is set, the server defaults to port `3001`.
An invalid (non-numeric or non-positive) port value throws at startup instead
of silently binding to the wrong port.

See `.env.example` for a local reference. Real `.env*` files are gitignored;
only `.env.example` is committed.

## API health route

`GET /api/health` returns:

```json
{ "status": "ok", "service": "api", "timestamp": "2026-07-14T22:18:00.115Z" }
```

The response shape is defined in `lib/api-spec/openapi.yaml` and validated
through the generated `HealthCheckResponse` Zod schema.

## Replit preview behavior

Each artifact is routed by path through Replit's shared proxy:

- `artifacts/web` serves the status page at `/`
- `artifacts/api-server` serves the API under `/api`

The frontend calls `/api/health` through the generated `useHealthCheck` React
Query hook and shows Online/Offline/Checking based on the response.

## Moving to a new Replit account

1. Push all changes to GitHub.
2. Import the repository into the new Replit account.
3. Run `pnpm install`.
4. Run `pnpm run check`.
5. Use the Replit preview pane (or restart the `artifacts/api-server` and
   `artifacts/web` workflows) to start both services.
6. Confirm the frontend shows the API status as Online.
