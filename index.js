import { Router } from 'itty-router'
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: API_KEY
});
const esOwner = "endless-sky"
const esRepo = esOwner

// Create a new router
const router = Router()

router.get("/", () => {
  return new Response(`
  https://github.com/EndlessSkyCommunity/artifact-unblocker

  GET /artifact/1337 to get a download link for the artifact with ID 1337. Only works for the ES repo.
  `)
})

router.get("/artifact/:id", async ({ params }) => {
  let response = await octokit.rest.actions.getArtifact({
    "owner": esOwner,
    "repo": esRepo,
    "artifact_id": params.id
  })
  return new Response(JSON.stringify(response.data), {
    headers: response.headers,
    status: response.status,
  })
})

// Catch-all 404
router.all("*", () => new Response("404, not found!", { status: 404 }))

addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request))
})
