# artifact-unblocker

Artifact unblocker for [ESLauncher2#140](https://github.com/EndlessSkyCommunity/ESLauncher2/issues/140).

# Development

- [create a cloudflare account, install wrangler, and login](https://developers.cloudflare.com/workers/get-started/guide/)
- [create a github api key with no further permissions](https://github.com/settings/tokens/new)
- `wrangler secret put apikey` -> enter your key
- `wrangler dev` for local development
- `wrangler publish` to deploy (to your account)