<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import ProductIcon from './ProductIcon.vue'

type Locale = 'zh-CN' | 'zh-Hant' | 'en'

interface Product {
  id: string
  label: string
}

interface MenuCopy {
  products: string
  viewAll: string
  groupLabels: string[]
  productsList: Product[]
}

const props = withDefaults(defineProps<{
  locale: Locale
  mobile?: boolean
}>(), {
  mobile: false,
})

const menuCopy: Record<Locale, MenuCopy> = {
  'zh-CN': {
    products: 'GCSA 生态产品',
    viewAll: '查看全部生态产品',
    groupLabels: ['资产安全', '边缘防护', '基础设施', 'AI 审计', '威胁情报', '运维安全'],
    productsList: [
      { id: 'verityWallet', label: '安全加密钱包' },
      { id: 'trendGuard', label: '安卓安全卫士' },
      { id: 'wifiSecApp', label: '全场景 WiFi 安全助手' },
      { id: 'aiGateway', label: 'AI 网关防火墙' },
      { id: 'cdnDnsSdk', label: '边缘加速安全防护' },
      { id: 'deviceFingerprint', label: '风险设备指纹识别' },
      { id: 'encryptedVpn', label: '加密零日志 VPN' },
      { id: 'hwFirewallIds', label: '下一代硬件防火墙' },
      { id: 'containerSec', label: '云原生容器安全平台' },
      { id: 'honeypot', label: '高仿真威胁诱捕系统' },
      { id: 'web3Audit', label: 'Web3 智能合约审计智能体' },
      { id: 'web2Audit', label: 'WEB 应用代码审计智能体' },
      { id: 'aiPentest', label: 'AI 自动化渗透检测' },
      { id: 'llmScan', label: 'LLM 模型安全检测' },
      { id: 'sentimentMonitor', label: '全网安全情报监测' },
      { id: 'gcsaSentry', label: '网站安全云态势感知' },
      { id: 'stealerDb', label: '全网窃取器密码库' },
      { id: 'assetMapping', label: '全网资产测绘' },
      { id: 'onChainTrace', label: '链上资金溯源风险评估' },
      { id: 'idcOps', label: '数据中心安全运营平台' },
      { id: 'serverPanel', label: '服务器安全管理面板' },
    ],
  },
  'zh-Hant': {
    products: 'GCSA 生態產品',
    viewAll: '查看全部生態產品',
    groupLabels: ['資產安全', '邊緣防護', '基礎設施', 'AI 審計', '威脅情報', '運維安全'],
    productsList: [
      { id: 'verityWallet', label: '安全錢包' },
      { id: 'trendGuard', label: '趨勢安全衛士' },
      { id: 'wifiSecApp', label: 'WiFi 安全檢測 App' },
      { id: 'aiGateway', label: 'AI 網關防火牆' },
      { id: 'cdnDnsSdk', label: 'GsafeCDN · 邊緣安全加速' },
      { id: 'deviceFingerprint', label: '風險設備指紋識別' },
      { id: 'encryptedVpn', label: 'GsafeVPN · 加密零日誌' },
      { id: 'hwFirewallIds', label: '硬件服務器防火牆 IDS' },
      { id: 'containerSec', label: '雲原生容器安全平台' },
      { id: 'honeypot', label: '蜜罐系統' },
      { id: 'web3Audit', label: 'Web3 智能合約審計智能體' },
      { id: 'web2Audit', label: 'WEB 代碼審計智能體' },
      { id: 'aiPentest', label: 'AI 自動化滲透檢測' },
      { id: 'llmScan', label: 'LLM 模型安全檢測' },
      { id: 'sentimentMonitor', label: '全網安全情報監測' },
      { id: 'gcsaSentry', label: '網站安全雲態勢感知' },
      { id: 'stealerDb', label: '全網竊取器密碼庫' },
      { id: 'assetMapping', label: '全網資產測繪' },
      { id: 'onChainTrace', label: '鏈上資金溯源風險評估' },
      { id: 'idcOps', label: '數據中心安全運營平台' },
      { id: 'serverPanel', label: '伺服器安全管理面板' },
    ],
  },
  en: {
    products: 'GCSA Ecosystem Products',
    viewAll: 'View all ecosystem products',
    groupLabels: ['Asset Security', 'Edge Protection', 'Infrastructure', 'AI Audit', 'Threat Intel', 'Operations Security'],
    productsList: [
      { id: 'verityWallet', label: 'Secure Wallet' },
      { id: 'trendGuard', label: 'Android Security Guard' },
      { id: 'wifiSecApp', label: 'All-Scenario WiFi Security Assistant' },
      { id: 'aiGateway', label: 'AI Gateway Firewall' },
      { id: 'cdnDnsSdk', label: 'GsafeCDN · Secure Edge Acceleration' },
      { id: 'deviceFingerprint', label: 'Risk Device Fingerprinting' },
      { id: 'encryptedVpn', label: 'GsafeVPN · Encrypted Zero-Log' },
      { id: 'hwFirewallIds', label: 'Next-gen Hardware Firewall' },
      { id: 'containerSec', label: 'Cloud-native Container Security' },
      { id: 'honeypot', label: 'High-Fidelity Threat Deception System' },
      { id: 'web3Audit', label: 'Web3 Smart Contract Audit AI' },
      { id: 'web2Audit', label: 'Web Application Code Audit AI' },
      { id: 'aiPentest', label: 'AI Automated Penetration Testing' },
      { id: 'llmScan', label: 'LLM Vulnerability Scanning' },
      { id: 'sentimentMonitor', label: 'Global Security Intel Monitoring' },
      { id: 'gcsaSentry', label: 'Website Security Cloud Monitoring' },
      { id: 'stealerDb', label: 'Global Stealer Credential Database' },
      { id: 'assetMapping', label: 'Network-wide Asset Mapping' },
      { id: 'onChainTrace', label: 'On-chain Fund Tracing & Risk Assessment' },
      { id: 'idcOps', label: 'Data Center Security Operations' },
      { id: 'serverPanel', label: 'Server Security Management Panel' },
    ],
  },
}

const root = ref<HTMLElement | null>(null)
const open = ref(false)
let closeTimer: ReturnType<typeof setTimeout> | undefined

const copy = computed(() => menuCopy[props.locale])
const productsHref = computed(() => {
  const base = props.locale === 'zh-CN'
    ? 'https://gcsa.org'
    : props.locale === 'zh-Hant'
      ? 'https://gcsa.org/zh-TW'
      : 'https://gcsa.org/en-US'
  return `${base}/products`
})
const groups = computed(() => {
  const groupSizes = [1, 5, 4, 4, 5, 2]
  let offset = 0

  return copy.value.groupLabels.map((label, index) => {
    const size = groupSizes[index] ?? 0
    const products = copy.value.productsList.slice(offset, offset + size).map((product) => ({
      ...product,
      href: `${productsHref.value}#${product.id}`,
    }))
    offset += size
    return { label, products }
  })
})
const menuId = computed(() => `gcsa-products-${props.mobile ? 'mobile' : 'desktop'}-menu`)

function clearCloseTimer() {
  if (!closeTimer) return
  clearTimeout(closeTimer)
  closeTimer = undefined
}

function closeMenu() {
  clearCloseTimer()
  open.value = false
}

function toggleMenu() {
  clearCloseTimer()
  open.value = !open.value
}

function openFromHover() {
  if (props.mobile || !window.matchMedia('(hover: hover)').matches) return
  clearCloseTimer()
  open.value = true
}

function scheduleClose() {
  if (props.mobile || !window.matchMedia('(hover: hover)').matches) return
  clearCloseTimer()
  closeTimer = setTimeout(() => {
    open.value = false
  }, 140)
}

function onDocumentPointerDown(event: PointerEvent) {
  if (!root.value?.contains(event.target as Node)) closeMenu()
}

function onDocumentKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeMenu()
}

watch(() => props.locale, closeMenu)

onMounted(() => {
  document.addEventListener('pointerdown', onDocumentPointerDown)
  document.addEventListener('keydown', onDocumentKeyDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onDocumentPointerDown)
  document.removeEventListener('keydown', onDocumentKeyDown)
  clearCloseTimer()
})
</script>

<template>
  <div
    ref="root"
    class="gcsa-products"
    :class="{ open, mobile }"
    @mouseenter="openFromHover"
    @mouseleave="scheduleClose"
  >
    <button
      class="gcsa-products-trigger"
      type="button"
      :aria-expanded="open"
      :aria-controls="menuId"
      @click="toggleMenu"
    >
      <span v-if="mobile" class="gcsa-products-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M2.97 12.92 12 17.94l9.03-5.02M12 22v-4.06M7 4.89l5 2.78 5-2.78M7 10.56V4.89L12 2l5 2.89v5.67M2.97 12.92 7 10.67l5 2.78 5-2.78 4.03 2.25v5.15L17 20.33l-5-2.78-5 2.78-4.03-2.26Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
      <span>{{ copy.products }}</span>
      <svg class="gcsa-products-chevron" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M2.5 4.25 6 7.75l3.5-3.5" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <div v-if="open" :id="menuId" class="gcsa-products-panel">
      <div class="gcsa-products-grid">
        <section v-for="group in groups" :key="group.label" class="gcsa-products-group">
          <h2>{{ group.label }}</h2>
          <div class="gcsa-products-links">
            <a v-for="product in group.products" :key="product.id" :href="product.href" @click="closeMenu">
              <ProductIcon :id="product.id" class="gcsa-product-icon" />
              <span>{{ product.label }}</span>
            </a>
          </div>
        </section>
      </div>
      <a class="gcsa-products-all" :href="productsHref" @click="closeMenu">
        <span>{{ copy.viewAll }}</span>
        <svg class="gcsa-products-all-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </a>
    </div>
  </div>
</template>

<style scoped>
.gcsa-products {
  position: relative;
}

.gcsa-products-trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 40px;
  border: 0;
  border-radius: 8px;
  padding: 9px 12px;
  color: var(--muted-foreground);
  background: transparent;
  font: inherit;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.2;
  cursor: pointer;
  transition: color 160ms ease, background 160ms ease;
}

.gcsa-products-trigger:hover,
.gcsa-products.open .gcsa-products-trigger {
  color: var(--foreground);
  background: color-mix(in srgb, var(--primary) 8%, transparent);
}

.gcsa-products-chevron {
  width: 12px;
  height: 12px;
  flex: 0 0 auto;
  opacity: 0.68;
  transition: transform 180ms ease;
}

.gcsa-products.open .gcsa-products-chevron {
  transform: rotate(180deg);
}

.gcsa-products-panel {
  position: fixed;
  top: calc(var(--header-height, 64px) + 10px);
  left: 50%;
  z-index: 220;
  width: min(1180px, calc(100vw - 32px));
  max-height: calc(100vh - var(--header-height, 64px) - 28px);
  overflow-y: auto;
  border: 1px solid color-mix(in srgb, var(--primary) 20%, var(--border));
  border-radius: 14px;
  padding: 22px 22px 14px;
  color: var(--foreground);
  background: var(--menu-surface);
  box-shadow: var(--shadow-card);
  transform: translateX(-50%);
}

.gcsa-products-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 24px 18px;
}

.gcsa-products-group h2 {
  margin: 0 0 10px;
  color: var(--primary);
  font-family: inherit;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1.35;
  text-transform: uppercase;
}

.gcsa-products-links {
  display: grid;
  gap: 3px;
}

.gcsa-products-links a {
  display: grid;
  grid-template-columns: 22px minmax(0, 1fr);
  align-items: center;
  gap: 8px;
  min-height: 39px;
  border-radius: 8px;
  padding: 6px 7px;
  color: var(--muted-foreground);
  font-size: 12px;
  font-weight: 500;
  line-height: 1.3;
  text-decoration: none;
}

.gcsa-products-links a:hover,
.gcsa-products-links a:focus-visible {
  color: var(--foreground);
  background: color-mix(in srgb, var(--primary) 9%, transparent);
}

.gcsa-product-icon {
  display: block;
  width: 20px;
  height: 20px;
  color: var(--primary);
}

.gcsa-products-all {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: calc(100% + 44px);
  min-height: 42px;
  margin: 15px -22px -14px;
  border-top: 1px solid var(--border);
  border-radius: 0 0 14px 14px;
  padding: 11px 18px;
  color: var(--primary);
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: color 160ms ease, background 160ms ease;
}

.gcsa-products-all:hover,
.gcsa-products-all:focus-visible {
  color: var(--primary);
  background: color-mix(in srgb, var(--primary) 8%, transparent);
}

.gcsa-products-all-arrow {
  width: 14px;
  height: 14px;
  flex: 0 0 auto;
  transition: transform 160ms ease;
}

.gcsa-products-all:hover .gcsa-products-all-arrow,
.gcsa-products-all:focus-visible .gcsa-products-all-arrow {
  transform: translateX(2px);
}

.gcsa-products.mobile {
  width: 100%;
}

.gcsa-products.mobile .gcsa-products-trigger {
  width: 100%;
  justify-content: flex-start;
  min-height: 54px;
  padding: 7px 10px;
  color: var(--foreground);
  font-family: var(--font-data, inherit);
  font-size: 16px;
}

.gcsa-products.mobile .gcsa-products-chevron {
  margin-left: auto;
}

.gcsa-products-icon {
  display: inline-grid;
  place-items: center;
  width: 40px;
  height: 40px;
  flex: 0 0 auto;
  color: var(--primary);
}

.gcsa-products-icon svg {
  width: 18px;
  height: 18px;
}

.gcsa-products.mobile .gcsa-products-panel {
  position: static;
  width: auto;
  max-height: none;
  margin: 3px 0 2px 25px;
  border: 0;
  border-left: 1px solid color-mix(in srgb, var(--primary) 28%, var(--border));
  border-radius: 0;
  padding: 10px 0 4px 16px;
  overflow: visible;
  background: transparent;
  box-shadow: none;
  transform: none;
}

.gcsa-products.mobile .gcsa-products-grid {
  grid-template-columns: minmax(0, 1fr);
  gap: 20px;
}

.gcsa-products.mobile .gcsa-products-links a {
  grid-template-columns: 22px minmax(0, 1fr);
  gap: 9px;
  min-height: 42px;
  padding: 7px 8px;
  font-size: 13px;
}

.gcsa-products.mobile .gcsa-products-all {
  width: auto;
  min-height: 42px;
  margin: 0;
  border-radius: 0 0 8px 8px;
  padding: 12px 10px 8px;
  font-size: 13px;
  font-weight: 700;
}

@media (max-width: 1100px) {
  .gcsa-products:not(.mobile) .gcsa-products-trigger {
    padding-inline: 8px;
  }

  .gcsa-products:not(.mobile) .gcsa-products-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
