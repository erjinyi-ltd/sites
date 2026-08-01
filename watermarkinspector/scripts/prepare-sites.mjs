import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'

const siteOrigin = 'https://watermarkinspector.gcsa.org'
const routeMetadata = {
  privacy: {
    title: '隐私政策 — GCSA',
    description: '了解 GCSA WATERMARK 移动应用、Firebase 诊断与使用分析及相关公开页面如何处理、保留和保护数据。',
  },
  terms: {
    title: '使用条款 — GCSA',
    description: '了解使用 GCSA WATERMARK 移动应用和相关公开页面时适用的权利、责任与产品边界。',
  },
  support: {
    title: '技术支持 — GCSA',
    description: '获取 GCSA WATERMARK iOS 与 Android 版本的使用说明、结果解释、隐私数据管理和故障排查帮助。',
  },
}

function setMetaContent(html, attribute, value, content) {
  const pattern = new RegExp(`(<meta\\s+${attribute}="${value}"\\s+content=")[^"]*("\\s*/>)`)
  if (!pattern.test(html)) throw new Error(`Missing metadata tag: ${attribute}=${value}`)
  return html.replace(pattern, `$1${content}$2`)
}

function makeRouteHtml(indexHtml, route, metadata) {
  const routeUrl = `${siteOrigin}/${route}`
  let html = indexHtml.replace(/<title>[^<]*<\/title>/, `<title>${metadata.title}</title>`)
  html = setMetaContent(html, 'name', 'description', metadata.description)
  html = setMetaContent(html, 'property', 'og:title', metadata.title)
  html = setMetaContent(html, 'property', 'og:description', metadata.description)
  html = setMetaContent(html, 'property', 'og:url', routeUrl)
  html = setMetaContent(html, 'name', 'twitter:title', metadata.title)
  html = setMetaContent(html, 'name', 'twitter:description', metadata.description)
  return html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/>/,
    `<link rel="canonical" href="${routeUrl}" />`,
  )
}

await mkdir('dist/server', { recursive: true })
await mkdir('dist/.openai', { recursive: true })

const indexHtml = await readFile('dist/index.html', 'utf8')
if (indexHtml.includes('__SITE_ORIGIN__')) {
  throw new Error('dist/index.html contains an unresolved __SITE_ORIGIN__ placeholder')
}

for (const [route, metadata] of Object.entries(routeMetadata)) {
  await writeFile(`dist/${route}.html`, makeRouteHtml(indexHtml, route, metadata))
}

const workerSource = `export default {
  async fetch(request, env) {
    let response = await env.ASSETS.fetch(request)
    const requestUrl = new URL(request.url)
    const acceptsHtml = request.headers.get('accept')?.includes('text/html')

    if (response.status === 404 && request.method === 'GET' && acceptsHtml) {
      const routeAsset = ${JSON.stringify(Object.keys(routeMetadata))}.includes(requestUrl.pathname.slice(1))
        ? requestUrl.pathname + '.html'
        : null
      if (routeAsset) {
        response = await env.ASSETS.fetch(new Request(new URL(routeAsset, requestUrl).toString(), request))
      }
    }

    if (response.status === 404 && request.method === 'GET' && acceptsHtml) {
      response = await env.ASSETS.fetch(new Request(new URL('/', requestUrl).toString(), request))
    }

    const contentType = response.headers.get('content-type') || ''

    if (!contentType.includes('text/html')) return response

    const html = await response.text()
    return new Response(html, {
      status: 200,
      headers: response.headers,
    })
  },
}
`

await writeFile('dist/server/index.js', workerSource)
await copyFile('.openai/hosting.json', 'dist/.openai/hosting.json')
