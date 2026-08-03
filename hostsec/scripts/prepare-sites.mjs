import { copyFile, mkdir, writeFile } from 'node:fs/promises'

await mkdir('dist/server', { recursive: true })
await mkdir('dist/.openai', { recursive: true })

const workerSource = `export default {
  async fetch(request, env) {
    let response = await env.ASSETS.fetch(request)
    const requestUrl = new URL(request.url)
    const acceptsHtml = request.headers.get('accept')?.includes('text/html')

    if (response.status === 404 && request.method === 'GET' && acceptsHtml) {
      response = await env.ASSETS.fetch(new Request(new URL('/', requestUrl).toString(), request))
    }

    const contentType = response.headers.get('content-type') || ''
    if (!contentType.includes('text/html')) return response

    const origin = requestUrl.origin
    const html = (await response.text()).replaceAll('__SITE_ORIGIN__', origin)
    return new Response(html, { status: 200, headers: response.headers })
  },
}
`

await writeFile('dist/server/index.js', workerSource)
await copyFile('.openai/hosting.json', 'dist/.openai/hosting.json')
