import { IttyRouter } from 'itty-router';
import { Octokit } from "@octokit/rest";
import { env } from "cloudflare:workers";

const octokit = new Octokit({
  auth: env.API_KEY
});
const esOwner = "endless-sky"
const esRepo = esOwner

// Create a new router
const router = IttyRouter()

router.get("/", () => {
  return new Response(`
  https://github.com/EndlessSkyCommunity/artifact-unblocker

  GET /artifact/1337 to get a download link for the artifact with ID 1337. Only works for the ES repo.
  `)
})

router.get("/artifact/:id", async ({ params }) => {
  try {
    let response = await octokit.rest.actions.downloadArtifact({
      request: {
        redirect: 'manual' // Lest octokit follows the redirect
      },
      "owner": esOwner,
      "repo": esRepo,
      "artifact_id": params.id,
      "archive_format": "zip"
    })
    return new Response(JSON.stringify(response.data), {
      headers: response.headers,
      status: response.status
    })
  } catch (e) {
    if (e.response) {
      return new Response(JSON.stringify(e.response.data), {
        headers: e.response.headers,
        status: e.response.status
      })
    }
    else {
      return new Response('{"error": "Unknown Error"}', {
        headers: { "Content-Type": "application/json" },
        status: e.status
      })
    }
  }
})

// Catch-all 404
router.all("*", () => new Response("404, not found!", { status: 404 }))

export default router;