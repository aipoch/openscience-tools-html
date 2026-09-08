# AIPOCH Open-Science

Source code for the AIPOCH Open-Science website.

- Production domain: <https://open-science.app>
- Product overview: <https://aipoch.com/open-science/overview?lang=en>

## Local development

Node.js `>=22.13.0` is required.

```bash
npm ci
npm run dev
```

Open <http://localhost:3000> in a browser.

## Validation

```bash
npm ci
npm run lint
npm test
```

The test command creates a standard Next.js production build, starts the
standalone server on an isolated port, and verifies the rendered pages,
metadata, robots policy, sitemap, and download page over HTTP.

## Docker

Build and run the production image directly:

```bash
docker build -t aipoch-open-science .
docker run --rm -p 3000:3000 aipoch-open-science
```

The application listens on port `3000`. To authenticate GitHub API requests
for release data, pass an optional `GITHUB_TOKEN` at runtime:

```bash
docker run --rm -p 3000:3000 \
  -e GITHUB_TOKEN \
  aipoch-open-science
```

The token is not required because the download page includes built-in fallback
release data. It is never copied into the image.

### GitHub Container Registry

The [Publish container image](.github/workflows/publish-container.yml) workflow
follows the [Open-Science wiki publishing workflow](https://github.com/aipoch/openscience-wiki/blob/main/.github/workflows/publish-container.yml).
Every push to `main` builds the existing Dockerfile for `linux/amd64` and
publishes to `ghcr.io/<owner>/openscience-tools-html` with these tags:

- `sha-<full-commit-sha>` identifies the image built from a specific commit.
- `latest` is promoted from the current `main` image after a successful build.
  Promotions run serially and check the current branch head so an older build
  cannot overwrite `latest` with an outdated image. If the current head image
  is not available yet, promotion is skipped until a later successful run.

The workflow can also be run manually on `main` from the Actions tab. Manual
runs on other branches are skipped. It uses the built-in `GITHUB_TOKEN` with
`contents: read` and `packages: write`; no additional registry secret is required.

Pull and run the published image, replacing `<owner>` with the repository
owner (`aipoch` for the upstream repository, or your username for a fork):

```bash
docker pull ghcr.io/<owner>/openscience-tools-html:latest
docker run --rm -p 3000:3000 ghcr.io/<owner>/openscience-tools-html:latest
```

For reproducible deployments, use `sha-<full-commit-sha>` instead of `latest`.
To allow unauthenticated pulls, set the GHCR package visibility to public
after its first publication. Private packages require an authenticated
`docker login ghcr.io` before pulling.

## Docker Compose

Start the production service, inspect it, and stop it with:

```bash
docker compose up --build -d
docker compose ps
docker compose logs -f web
docker compose down
```

Set `HOST_PORT` to change the published host port. The optional GitHub token
can be supplied without storing it in the Compose file:

```bash
GITHUB_TOKEN=github_pat_example HOST_PORT=8080 docker compose up --build -d
```

In production, place an external Nginx, Caddy, or Traefik reverse proxy in
front of the container when TLS termination or domain routing is required.

## Project structure

- `app/` — page source, styles, metadata, sitemap, and robots configuration
- `public/` — images, logos, fonts, and social preview assets
- `tests/` — rendered-page checks
- `Dockerfile` and `compose.yaml` — self-hosted production packaging

The public site supports English and Chinese content, responsive layouts, and
interactive Open-Science workflow sections.
