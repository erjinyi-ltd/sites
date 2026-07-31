import { readFile } from 'node:fs/promises'

const localeCodes = ['zh-CN', 'zh-Hant', 'en']

function collectShape(value, path = 'root', paths = new Set()) {
  if (Array.isArray(value)) {
    paths.add(`${path}:array`)
    value.forEach((item, index) => collectShape(item, `${path}[]${index === 0 ? '' : `#${index}`}`, paths))
    return paths
  }

  if (value && typeof value === 'object') {
    paths.add(`${path}:object`)
    Object.keys(value).sort().forEach((key) => collectShape(value[key], `${path}.${key}`, paths))
    return paths
  }

  paths.add(`${path}:${typeof value}`)
  return paths
}

const resources = Object.fromEntries(await Promise.all(localeCodes.map(async (locale) => {
  const contents = await readFile(new URL(`../src/locales/${locale}.json`, import.meta.url), 'utf8')
  return [locale, JSON.parse(contents)]
})))

const baseline = [...collectShape(resources['zh-CN'])].sort()

for (const locale of localeCodes.slice(1)) {
  const candidate = [...collectShape(resources[locale])].sort()
  const missing = baseline.filter((path) => !candidate.includes(path))
  const extra = candidate.filter((path) => !baseline.includes(path))

  if (missing.length || extra.length) {
    throw new Error(`${locale} locale structure mismatch. Missing: ${missing.join(', ') || 'none'}. Extra: ${extra.join(', ') || 'none'}.`)
  }
}

console.log(`Validated ${localeCodes.length} locale resources with matching structures.`)
