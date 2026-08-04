import { access, readFile } from 'node:fs/promises'

const siteOrigin = 'https://watermarkinspector.gcsa.org'
const routes = ['privacy', 'terms', 'support']

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

const indexHtml = await readFile('dist/index.html', 'utf8')
assert(!indexHtml.includes('__SITE_ORIGIN__'), 'dist/index.html contains an unresolved site-origin placeholder')
assert(!indexHtml.includes('user-scalable=no'), 'dist/index.html disables user zoom')
assert(
  indexHtml.includes(`<meta property="og:image" content="${siteOrigin}/og.png"`),
  'dist/index.html does not expose the absolute Open Graph image URL',
)
assert(
  indexHtml.includes(`<link rel="canonical" href="${siteOrigin}/"`),
  'dist/index.html does not expose the canonical home URL',
)

for (const route of routes) {
  const routeHtml = await readFile(`dist/${route}.html`, 'utf8')
  assert(
    routeHtml.includes(`<link rel="canonical" href="${siteOrigin}/${route}"`),
    `dist/${route}.html has the wrong canonical URL`,
  )
  assert(
    routeHtml.includes(`<meta property="og:url" content="${siteOrigin}/${route}"`),
    `dist/${route}.html has the wrong Open Graph URL`,
  )
}

const robots = await readFile('dist/robots.txt', 'utf8')
assert(robots.includes(`Sitemap: ${siteOrigin}/sitemap.xml`), 'robots.txt does not reference sitemap.xml')

const sitemap = await readFile('dist/sitemap.xml', 'utf8')
for (const route of ['', ...routes]) {
  const suffix = route ? route : ''
  assert(sitemap.includes(`<loc>${siteOrigin}/${suffix}</loc>`), `sitemap.xml is missing /${suffix}`)
}

const legalCopy = await readFile('src/content/legalCopy.ts', 'utf8')
assert(
  (legalCopy.match(/Global Cybersecurity Alliance Limited/g) ?? []).length >= 6,
  'privacy and terms copy must identify the legal entity in every locale',
)
assert(
  (legalCopy.match(/Google Analytics for Firebase/g) ?? []).length === 3,
  'privacy copy must disclose Firebase Analytics on iOS and Android in every locale',
)
assert(
  (legalCopy.match(/android\/play-data-disclosure/g) ?? []).length === 3,
  'privacy copy must link the Android Firebase data-disclosure guidance in every locale',
)
assert(!legalCopy.includes('iOS 配置已关闭 Analytics'), 'privacy copy must not understate iOS Analytics')
assert(!legalCopy.includes('iOS 設定已關閉 Analytics'), 'privacy copy must not understate iOS Analytics')
assert(!legalCopy.includes('Analytics is disabled in the current iOS configuration'), 'privacy copy must not understate iOS Analytics')
assert(
  legalCopy.includes('删除本地记录不会删除 Firebase 已接收的数据')
    && legalCopy.includes('刪除本地記錄不會刪除 Firebase 已接收的資料')
    && legalCopy.includes('Deleting a local record does not delete data already received by Firebase'),
  'privacy copy must distinguish local deletion from Firebase retention',
)
assert(legalCopy.includes('contact@gcsa.org'), 'legal and support copy must expose the support email')

const siteCopy = await readFile('src/content/siteCopy.ts', 'utf8')
assert(
  siteCopy.includes('原文件、缩略图、元数据、检测中间结果、OCR 原文与编辑区域不会被上传到云端处理。')
    && siteCopy.includes('原檔、縮圖、中繼資料、檢測中間結果、OCR 原文與編輯區域不會上傳到雲端處理。')
    && siteCopy.includes('Original files, thumbnails, metadata, detector intermediates, OCR text, and edit regions are not sent to the cloud for processing.'),
  'homepage privacy copy must state the mobile media no-upload boundary in every locale',
)

await access('dist/og.png')

process.stdout.write('Validated WATERMARK site metadata, routes, legal disclosures, support, robots.txt, and sitemap.xml.\n')
