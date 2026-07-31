import { access, copyFile, mkdir, writeFile } from 'node:fs/promises'

await mkdir('dist/server', { recursive: true })
await mkdir('dist/.openai', { recursive: true })

const workerSource = `export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request)
    const contentType = response.headers.get('content-type') || ''

    if (!contentType.includes('text/html')) return response

    const origin = new URL(request.url).origin
    const html = (await response.text()).replaceAll('__SITE_ORIGIN__', origin)
    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    })
  },
}
`

await writeFile('dist/server/index.js', workerSource)

try {
  await access('.openai/hosting.json')
  await copyFile('.openai/hosting.json', 'dist/.openai/hosting.json')
} catch {
  // Hosting metadata is added when this product receives its own Sites project.
}
