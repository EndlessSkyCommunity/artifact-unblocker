# artifact-unblocker

Artifact unblocker for [ESLauncher2#140](https://github.com/EndlessSkyCommunity/ESLauncher2/issues/140).

# Development

- [create a cloudflare account, install wrangler, and login](https://developers.cloudflare.com/workers/get-started/guide/)
- [create a github api key with the `public_repo` scope](https://github.com/settings/tokens/new)

for local development:
- create `.dev.vars` with the contents `API_KEY=your_api_key`
- `wrangler dev`

deploy:
- `wrangler secret put API_KEY` -> enter your key
- `wrangler publish` to deploy (to your account)