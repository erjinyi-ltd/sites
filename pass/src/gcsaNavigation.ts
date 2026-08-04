import type { Locale } from "./i18n/chrome";

type ProductDefinition = {
  id: string;
  label: string;
};

type NavigationCopy = {
  home: string;
  products: string;
  media: string;
  updates: string;
  about: string;
  join: string;
  login: string;
  logout: string;
  account: string;
  userCenter: string;
  viewAllProducts: string;
  contactUs: string;
  email: string;
  twitter: string;
  telegram: string;
  privacy: string;
  terms: string;
  support: string;
  productGroupLabels: string[];
  productsList: ProductDefinition[];
};

const navigationCopy: Record<Locale, NavigationCopy> = {
  "zh-CN": {
    home: "首页",
    products: "GCSA 生态产品",
    media: "GCSA 媒体",
    updates: "GCSA 动态",
    about: "关于联盟",
    join: "加入联盟",
    login: "登录",
    logout: "退出登录",
    account: "当前用户",
    userCenter: "用户中心",
    viewAllProducts: "查看全部生态产品",
    contactUs: "联系我们",
    email: "联系邮箱",
    twitter: "推特",
    telegram: "Telegram",
    privacy: "隐私政策",
    terms: "使用条款",
    support: "技术支持",
    productGroupLabels: ["资产安全", "边缘防护", "基础设施", "AI 审计", "威胁情报", "运维安全"],
    productsList: [
      { id: "verityWallet", label: "安全加密钱包" },
      { id: "trendGuard", label: "安卓安全卫士" },
      { id: "wifiSecApp", label: "全场景WiFi安全助手" },
      { id: "aiGateway", label: "AI 网关防火墙" },
      { id: "cdnDnsSdk", label: "边缘加速安全防护" },
      { id: "deviceFingerprint", label: "风险设备指纹识别" },
      { id: "encryptedVpn", label: "加密零日志VPN" },
      { id: "hwFirewallIds", label: "下一代硬件防火墙" },
      { id: "containerSec", label: "云原生容器安全平台" },
      { id: "honeypot", label: "高仿真威胁诱捕系统" },
      { id: "web3Audit", label: "Web3 智能合约审计智能体" },
      { id: "web2Audit", label: "WEB 应用代码审计智能体" },
      { id: "aiPentest", label: "AI 自动化渗透检测" },
      { id: "llmScan", label: "LLM模型安全检测" },
      { id: "sentimentMonitor", label: "全网安全情报监测" },
      { id: "gcsaSentry", label: "网站安全云态势感知" },
      { id: "stealerDb", label: "全网窃取器密码库" },
      { id: "assetMapping", label: "全网资产测绘" },
      { id: "onChainTrace", label: "链上资金溯源风险评估" },
      { id: "idcOps", label: "数据中心安全运营平台" },
      { id: "serverPanel", label: "服务器安全管理面板" }
    ]
  },
  "zh-Hant": {
    home: "首頁",
    products: "GCSA 生態產品",
    media: "GCSA 媒體",
    updates: "GCSA 動態",
    about: "關於聯盟",
    join: "加入聯盟",
    login: "登入",
    logout: "退出登入",
    account: "當前用戶",
    userCenter: "用戶中心",
    viewAllProducts: "查看全部生態產品",
    contactUs: "聯繫我們",
    email: "聯繫郵箱",
    twitter: "推特",
    telegram: "Telegram",
    privacy: "隱私政策",
    terms: "使用條款",
    support: "技術支持",
    productGroupLabels: ["資產安全", "邊緣防護", "基礎設施", "AI 審計", "威脅情報", "運維安全"],
    productsList: [
      { id: "verityWallet", label: "安全錢包" },
      { id: "trendGuard", label: "趨勢安全衛士" },
      { id: "wifiSecApp", label: "WiFi 安全檢測 App" },
      { id: "aiGateway", label: "AI 網關防火牆" },
      { id: "cdnDnsSdk", label: "GsafeCDN · 邊緣安全加速" },
      { id: "deviceFingerprint", label: "風險設備指紋識別" },
      { id: "encryptedVpn", label: "GsafeVPN · 加密零日誌" },
      { id: "hwFirewallIds", label: "硬件服務器防火牆 IDS" },
      { id: "containerSec", label: "雲原生容器安全平台" },
      { id: "honeypot", label: "蜜罐系統" },
      { id: "web3Audit", label: "Web3 智能合約審計智能體" },
      { id: "web2Audit", label: "WEB 代碼審計智能體" },
      { id: "aiPentest", label: "AI 自動化滲透檢測" },
      { id: "llmScan", label: "LLM模型安全檢測" },
      { id: "sentimentMonitor", label: "全網安全情報監測" },
      { id: "gcsaSentry", label: "網站安全雲態勢感知" },
      { id: "stealerDb", label: "全網竊取器密碼庫" },
      { id: "assetMapping", label: "全網資產測繪" },
      { id: "onChainTrace", label: "鏈上資金溯源風險評估" },
      { id: "idcOps", label: "數據中心安全運營平台" },
      { id: "serverPanel", label: "伺服器安全管理面板" }
    ]
  },
  en: {
    home: "Home",
    products: "GCSA Ecosystem Products",
    media: "GCSA Media",
    updates: "GCSA Updates",
    about: "About Alliance",
    join: "Join the Alliance",
    login: "Sign in",
    logout: "Sign out",
    account: "Signed in as",
    userCenter: "Account center",
    viewAllProducts: "View all ecosystem products",
    contactUs: "Contact Us",
    email: "Email",
    twitter: "Twitter",
    telegram: "Telegram",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    support: "Technical Support",
    productGroupLabels: ["Asset Security", "Edge Protection", "Infrastructure", "AI Audit", "Threat Intel", "Operations Security"],
    productsList: [
      { id: "verityWallet", label: "Secure Wallet" },
      { id: "trendGuard", label: "Android Security Guard" },
      { id: "wifiSecApp", label: "All-Scenario WiFi Security Assistant" },
      { id: "aiGateway", label: "AI Gateway Firewall" },
      { id: "cdnDnsSdk", label: "GsafeCDN · Secure Edge Acceleration" },
      { id: "deviceFingerprint", label: "Risk Device Fingerprinting" },
      { id: "encryptedVpn", label: "GsafeVPN · Encrypted Zero-Log" },
      { id: "hwFirewallIds", label: "Next-gen Hardware Firewall" },
      { id: "containerSec", label: "Cloud-native Container Security" },
      { id: "honeypot", label: "High-Fidelity Threat Deception System" },
      { id: "web3Audit", label: "Web3 Smart Contract Audit AI" },
      { id: "web2Audit", label: "Web Application Code Audit AI" },
      { id: "aiPentest", label: "AI Automated Penetration Testing" },
      { id: "llmScan", label: "LLM Vulnerability Scanning" },
      { id: "sentimentMonitor", label: "Global Security Intel Monitoring" },
      { id: "gcsaSentry", label: "Website Security Cloud Monitoring" },
      { id: "stealerDb", label: "Global Stealer Credential Database" },
      { id: "assetMapping", label: "Network-wide Asset Mapping" },
      { id: "onChainTrace", label: "On-chain Fund Tracing & Risk Assessment" },
      { id: "idcOps", label: "Data Center Security Operations" },
      { id: "serverPanel", label: "Server Security Management Panel" }
    ]
  }
};

export function getGcsaNavigation(locale: Locale) {
  const copy = navigationCopy[locale];
  const siteBase = locale === "zh-CN"
    ? "https://gcsa.org"
    : locale === "zh-Hant"
      ? "https://gcsa.org/zh-TW"
      : "https://gcsa.org/en-US";
  const brandHref = locale === "zh-CN" ? `${siteBase}/` : siteBase;
  const productsHref = `${siteBase}/products`;
  const mediaHref = locale === "zh-CN"
    ? "https://media.gcsa.org/"
    : locale === "zh-Hant"
      ? "https://media.gcsa.org/zh-TW"
      : "https://media.gcsa.org/en-US";
  const groupSizes = [1, 5, 4, 4, 5, 2];
  let productOffset = 0;
  const productGroups = copy.productGroupLabels.map((label, index) => {
    const groupSize = groupSizes[index] ?? 0;
    const products = copy.productsList.slice(productOffset, productOffset + groupSize).map((product) => ({
      ...product,
      href: `${productsHref}#${product.id}`
    }));
    productOffset += groupSize;
    return { label, products };
  });

  return {
    ...copy,
    brandHref,
    homeHref: `${brandHref}#home`,
    productsHref,
    mediaHref,
    updatesHref: `${siteBase}/forums`,
    aboutHref: `${siteBase}/about`,
    joinHref: `${siteBase}/contact`,
    loginHref: "/api/auth/sign-in",
    productGroups,
    productsList: copy.productsList.map((product) => ({
      ...product,
      href: `${productsHref}#${product.id}`
    }))
  };
}
