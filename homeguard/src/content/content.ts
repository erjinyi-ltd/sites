export type Locale = "zh-CN" | "zh-Hant" | "en";
export type LegalPageKind = "privacy" | "terms" | "support";

export type NavItem = {
  label: string;
  href: string;
};

export type FeatureItem = {
  code: string;
  title: string;
  text: string;
  signal?: string;
};

export type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalCopy = {
  pageTitle: string;
  eyebrow: string;
  title: string;
  lead: string;
  updatedLabel: string;
  updatedDate: string;
  summaryTitle: string;
  summaryText: string;
  highlights: string[];
  sections: LegalSection[];
};

export const localeOptions: Array<{
  id: Locale;
  name: string;
  code: string;
}> = [
  { id: "zh-CN", name: "简体中文", code: "CN" },
  { id: "zh-Hant", name: "繁體中文", code: "HK" },
  { id: "en", name: "English", code: "EN" },
];

export const siteCopy = {
  "zh-CN": {
    lang: "zh-CN",
    skip: "跳至主要内容",
    navLabel: "页面导航",
    home: "首页",
    nav: [
      { label: "核心场景", href: "/#scenarios" },
      { label: "检测能力", href: "/#coverage" },
      { label: "隐私边界", href: "/#privacy-first" },
      { label: "常见问题", href: "/#faq" },
    ] satisfies NavItem[],
    privacy: "隐私政策",
    terms: "使用条款",
    support: "技术支持",
    themeLight: "切换至浅色主题",
    themeDark: "切换至深色主题",
    language: "切换语言",
    menuOpen: "打开导航菜单",
    menuClose: "关闭导航菜单",
    heroEyebrow: "GCSA 生态产品 · iOS",
    heroTitle: "让家的每一次连接，\n都更安心。",
    heroLead:
      "Home Guard 把家庭网络体检、移动隐私检测与金融环境风险提醒放进一个清晰的 iOS 安全入口，帮助你在风险变成损失之前，看懂正在发生什么。",
    heroPrimary: "查看守护能力",
    heroSecondary: "了解隐私边界",
    iosBadge: "为 iOS 设计",
    localBadge: "本地优先",
    noTrackBadge: "无广告追踪",
    phoneTitle: "家庭安全概览",
    phoneStatus: "当前环境良好",
    phoneScore: "92",
    phoneScoreLabel: "安全评分",
    phoneNetwork: "家庭 Wi-Fi",
    phonePrivacy: "隐私与泄露",
    phoneFinance: "金融环境",
    phoneSafe: "未发现高危项",
    phoneWatch: "1 项建议",
    phoneCheck: "重新检测",
    metrics: [
      { value: "3", label: "类核心安全场景" },
      { value: "9+", label: "项风险信号检查" },
      { value: "1", label: "个清晰行动建议" },
    ],
    scenarioEyebrow: "THREE LAYERS OF PROTECTION",
    scenarioTitle: "从路由器到手机，再到每一次敏感操作",
    scenarioLead:
      "不堆砌专业术语，只把当前风险、可能影响和下一步处理方式说明白。",
    scenarios: [
      {
        code: "01",
        title: "家庭网络安全体检",
        text: "识别陌生设备、摄像头与 IoT 风险信号，检查路由器弱密码、默认配置、开放端口和已知漏洞风险。",
        signal: "Wi-Fi · Router · IoT",
      },
      {
        code: "02",
        title: "移动隐私与泄露检测",
        text: "检查当前网络中的 VPN、代理、DNS 与公网 IP 暴露情况，并提示越狱、远控、屏幕共享等可见风险信号。",
        signal: "DNS · IP · Privacy",
      },
      {
        code: "03",
        title: "金融环境风险提醒",
        text: "在使用银行、交易所或数字钱包前，聚合网络、设备与链接风险，提醒钓鱼域名、假钱包和地址劫持迹象。",
        signal: "Banking · Wallet · Web3",
      },
    ] satisfies FeatureItem[],
    mapEyebrow: "HOME NETWORK MAP",
    mapTitle: "看见家庭网络里的每一个关键节点",
    mapLead:
      "Home Guard 将设备发现、网络配置与风险情报汇总成可读的家庭网络地图，帮助你快速区分“已知设备”“需要确认”和“建议立即处理”。",
    mapLegendSafe: "可信设备",
    mapLegendReview: "需要确认",
    mapLegendRisk: "风险提醒",
    mapRouter: "家庭路由器",
    mapPhone: "你的 iPhone",
    mapCamera: "客厅摄像头",
    mapSpeaker: "智能音箱",
    mapUnknown: "未知设备",
    mapNote:
      "本地网络扫描会在你授权后进行；可见范围取决于 iOS 权限、网络设备响应和当前连接环境。",
    coverageEyebrow: "WHAT HOME GUARD CHECKS",
    coverageTitle: "一次体检，覆盖日常最容易忽略的风险",
    coverageLead: "每项结论都附带依据、风险等级与可执行建议。",
    coverage: [
      {
        code: "WF",
        title: "Wi-Fi 安全",
        text: "加密方式、异常热点与网络环境风险。",
      },
      {
        code: "IP",
        title: "IP / DNS 泄露",
        text: "公网 IP、DNS 路径、代理与 VPN 一致性。",
      },
      {
        code: "DV",
        title: "陌生设备",
        text: "识别局域网内需要确认的新设备。",
      },
      {
        code: "RT",
        title: "路由器风险",
        text: "默认配置、弱口令提示、开放端口与漏洞线索。",
      },
      {
        code: "OS",
        title: "系统完整性",
        text: "越狱等系统可见的完整性风险信号。",
      },
      {
        code: "RC",
        title: "远控与共享",
        text: "基于系统可见状态与用户自检的高风险行为提醒。",
      },
      {
        code: "URL",
        title: "链接与域名",
        text: "钓鱼链接、恶意域名与仿冒页面风险。",
      },
      {
        code: "TX",
        title: "金融操作环境",
        text: "银行、交易所和钱包使用前的综合提醒。",
      },
    ] satisfies FeatureItem[],
    financeEyebrow: "BEFORE MONEY MOVES",
    financeTitle: "在转账、登录和签名前，多一次环境确认",
    financeLead:
      "风险提醒不会读取你的账户余额、密码、助记词或私钥，也不会代替银行、交易所或钱包完成授权。它只在关键时刻，把设备、网络和目标链接的异常聚合给你。",
    financeSignals: [
      "当前 Wi-Fi 是否可信",
      "DNS / 代理路径是否异常",
      "目标域名是否命中风险情报",
      "设备是否出现高危安全信号",
    ],
    financeAlert: "建议暂停操作",
    financeAlertText: "当前 DNS 路径与常用环境不一致，请切换可信网络后重试。",
    boundaryEyebrow: "PRIVACY BY DESIGN",
    boundaryTitle: "安全工具，不该成为新的隐私风险",
    boundaryLead:
      "Home Guard 采用本地优先、最少权限和目的限定原则。只有在你主动使用需要联网的检测时，必要的网络标识才会被用于完成查询。",
    boundaries: [
      {
        title: "不读取金融凭据",
        text: "不要求银行卡密码、交易所口令、私钥、助记词或交易授权。",
      },
      {
        title: "不建立广告画像",
        text: "不出售个人信息，不用于定向广告或跨应用追踪。",
      },
      {
        title: "权限随用随取",
        text: "本地网络等权限只在相关功能需要时申请，并可在 iOS 设置中撤回。",
      },
    ],
    privacyAction: "阅读完整隐私政策",
    faqEyebrow: "QUESTIONS, ANSWERED",
    faqTitle: "常见问题",
    faqs: [
      {
        q: "Home Guard 能看到 iPhone 上安装的所有 App 吗？",
        a: "不能。iOS 不允许普通 App 获取完整的已安装应用列表。Home Guard 只会基于系统允许访问的安全状态、你授权的检测和明确的自检信息给出提醒，并在结果中标明依据。",
      },
      {
        q: "为什么本地网络检测需要权限？",
        a: "发现家庭网络内的路由器、摄像头和 IoT 设备，需要 iOS 的“本地网络”权限。拒绝后仍可使用不依赖该权限的功能，你也可以随时在系统设置中关闭权限。",
      },
      {
        q: "检测结果是否等同于安全认证？",
        a: "不是。检测结果是基于当时可见信号的风险提示，不能保证设备、网络或交易绝对安全，也不能替代运营商、银行、交易所或专业应急服务。",
      },
      {
        q: "发现高风险后应该怎么做？",
        a: "先暂停敏感操作，切换可信网络并按照应用给出的步骤复核。涉及资金、账户或持续入侵迹象时，请同时联系相关平台和具备资质的安全人员。",
      },
    ],
    ctaEyebrow: "A SAFER DIGITAL HOME",
    ctaTitle: "把复杂的安全信号，变成全家都能理解的行动建议。",
    ctaPrimary: "查看技术支持",
    ctaSecondary: "联系 GCSA",
    footerCopyright: "© Global Cybersecurity Alliance. 保留所有权利。",
  },
  "zh-Hant": {
    lang: "zh-Hant",
    skip: "跳至主要內容",
    navLabel: "頁面導覽",
    home: "首頁",
    nav: [
      { label: "核心場景", href: "/#scenarios" },
      { label: "檢測能力", href: "/#coverage" },
      { label: "私隱邊界", href: "/#privacy-first" },
      { label: "常見問題", href: "/#faq" },
    ] satisfies NavItem[],
    privacy: "私隱政策",
    terms: "使用條款",
    support: "技術支援",
    themeLight: "切換至淺色主題",
    themeDark: "切換至深色主題",
    language: "切換語言",
    menuOpen: "開啟導覽選單",
    menuClose: "關閉導覽選單",
    heroEyebrow: "GCSA 生態產品 · iOS",
    heroTitle: "讓家的每一次連線，\n都更安心。",
    heroLead:
      "Home Guard 把家庭網絡體檢、流動私隱檢測與金融環境風險提醒放進一個清晰的 iOS 安全入口，協助你在風險變成損失之前，看懂正在發生甚麼。",
    heroPrimary: "查看守護能力",
    heroSecondary: "了解私隱邊界",
    iosBadge: "為 iOS 設計",
    localBadge: "本機優先",
    noTrackBadge: "無廣告追蹤",
    phoneTitle: "家庭安全概覽",
    phoneStatus: "目前環境良好",
    phoneScore: "92",
    phoneScoreLabel: "安全評分",
    phoneNetwork: "家庭 Wi-Fi",
    phonePrivacy: "私隱與洩露",
    phoneFinance: "金融環境",
    phoneSafe: "未發現高危項",
    phoneWatch: "1 項建議",
    phoneCheck: "重新檢測",
    metrics: [
      { value: "3", label: "類核心安全場景" },
      { value: "9+", label: "項風險訊號檢查" },
      { value: "1", label: "個清晰行動建議" },
    ],
    scenarioEyebrow: "THREE LAYERS OF PROTECTION",
    scenarioTitle: "從路由器到手機，再到每一次敏感操作",
    scenarioLead: "不堆砌專業術語，只把目前風險、可能影響和下一步處理方式說明白。",
    scenarios: [
      {
        code: "01",
        title: "家庭網絡安全體檢",
        text: "識別陌生裝置、攝影機與 IoT 風險訊號，檢查路由器弱密碼、預設設定、開放連接埠和已知漏洞風險。",
        signal: "Wi-Fi · Router · IoT",
      },
      {
        code: "02",
        title: "流動私隱與洩露檢測",
        text: "檢查目前網絡中的 VPN、代理、DNS 與公網 IP 暴露情況，並提示越獄、遙距控制、螢幕分享等可見風險訊號。",
        signal: "DNS · IP · Privacy",
      },
      {
        code: "03",
        title: "金融環境風險提醒",
        text: "在使用銀行、交易所或數碼錢包前，聚合網絡、裝置與連結風險，提醒釣魚網域、假錢包和地址劫持跡象。",
        signal: "Banking · Wallet · Web3",
      },
    ] satisfies FeatureItem[],
    mapEyebrow: "HOME NETWORK MAP",
    mapTitle: "看見家庭網絡裡的每一個關鍵節點",
    mapLead:
      "Home Guard 將裝置發現、網絡設定與風險情報匯總成可讀的家庭網絡地圖，協助你快速區分「已知裝置」「需要確認」和「建議立即處理」。",
    mapLegendSafe: "可信裝置",
    mapLegendReview: "需要確認",
    mapLegendRisk: "風險提醒",
    mapRouter: "家庭路由器",
    mapPhone: "你的 iPhone",
    mapCamera: "客廳攝影機",
    mapSpeaker: "智能音箱",
    mapUnknown: "未知裝置",
    mapNote:
      "本地網絡掃描會在你授權後進行；可見範圍取決於 iOS 權限、網絡裝置回應和目前連線環境。",
    coverageEyebrow: "WHAT HOME GUARD CHECKS",
    coverageTitle: "一次體檢，覆蓋日常最容易忽略的風險",
    coverageLead: "每項結論都附帶依據、風險等級與可執行建議。",
    coverage: [
      { code: "WF", title: "Wi-Fi 安全", text: "加密方式、異常熱點與網絡環境風險。" },
      { code: "IP", title: "IP / DNS 洩露", text: "公網 IP、DNS 路徑、代理與 VPN 一致性。" },
      { code: "DV", title: "陌生裝置", text: "識別區域網絡內需要確認的新裝置。" },
      { code: "RT", title: "路由器風險", text: "預設設定、弱口令提示、開放連接埠與漏洞線索。" },
      { code: "OS", title: "系統完整性", text: "越獄等系統可見的完整性風險訊號。" },
      { code: "RC", title: "遙控與分享", text: "基於系統可見狀態與用戶自檢的高風險行為提醒。" },
      { code: "URL", title: "連結與網域", text: "釣魚連結、惡意網域與仿冒頁面風險。" },
      { code: "TX", title: "金融操作環境", text: "銀行、交易所和錢包使用前的綜合提醒。" },
    ] satisfies FeatureItem[],
    financeEyebrow: "BEFORE MONEY MOVES",
    financeTitle: "在轉帳、登入和簽名前，多一次環境確認",
    financeLead:
      "風險提醒不會讀取你的帳戶結餘、密碼、助記詞或私鑰，也不會代替銀行、交易所或錢包完成授權。它只在關鍵時刻，把裝置、網絡和目標連結的異常聚合給你。",
    financeSignals: [
      "目前 Wi-Fi 是否可信",
      "DNS / 代理路徑是否異常",
      "目標網域是否命中風險情報",
      "裝置是否出現高危安全訊號",
    ],
    financeAlert: "建議暫停操作",
    financeAlertText: "目前 DNS 路徑與常用環境不一致，請切換可信網絡後重試。",
    boundaryEyebrow: "PRIVACY BY DESIGN",
    boundaryTitle: "安全工具，不應成為新的私隱風險",
    boundaryLead:
      "Home Guard 採用本機優先、最少權限和目的限定原則。只有在你主動使用需要連網的檢測時，必要的網絡識別資料才會用於完成查詢。",
    boundaries: [
      { title: "不讀取金融憑證", text: "不要求銀行卡密碼、交易所口令、私鑰、助記詞或交易授權。" },
      { title: "不建立廣告畫像", text: "不出售個人資料，不用於定向廣告或跨 App 追蹤。" },
      { title: "權限隨用隨取", text: "本地網絡等權限只在相關功能需要時申請，並可在 iOS 設定中撤回。" },
    ],
    privacyAction: "閱讀完整私隱政策",
    faqEyebrow: "QUESTIONS, ANSWERED",
    faqTitle: "常見問題",
    faqs: [
      {
        q: "Home Guard 能看到 iPhone 上安裝的所有 App 嗎？",
        a: "不能。iOS 不允許普通 App 取得完整的已安裝應用程式清單。Home Guard 只會基於系統允許存取的安全狀態、你授權的檢測和明確的自檢資料提供提醒。",
      },
      {
        q: "為甚麼本地網絡檢測需要權限？",
        a: "發現家庭網絡內的路由器、攝影機和 IoT 裝置，需要 iOS 的「本地網絡」權限。拒絕後仍可使用不依賴該權限的功能。",
      },
      {
        q: "檢測結果是否等同安全認證？",
        a: "不是。檢測結果是基於當時可見訊號的風險提示，不能保證裝置、網絡或交易絕對安全。",
      },
      {
        q: "發現高風險後應該怎樣做？",
        a: "先暫停敏感操作，切換可信網絡並按應用程式指示覆核。涉及資金、帳戶或持續入侵跡象時，請同時聯絡相關平台和合資格安全人員。",
      },
    ],
    ctaEyebrow: "A SAFER DIGITAL HOME",
    ctaTitle: "把複雜的安全訊號，變成全家都能理解的行動建議。",
    ctaPrimary: "查看技術支援",
    ctaSecondary: "聯絡 GCSA",
    footerCopyright: "© Global Cybersecurity Alliance. 保留所有權利。",
  },
  en: {
    lang: "en",
    skip: "Skip to main content",
    navLabel: "Page navigation",
    home: "Home",
    nav: [
      { label: "Scenarios", href: "/#scenarios" },
      { label: "Coverage", href: "/#coverage" },
      { label: "Privacy", href: "/#privacy-first" },
      { label: "FAQ", href: "/#faq" },
    ] satisfies NavItem[],
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    support: "Support",
    themeLight: "Switch to light theme",
    themeDark: "Switch to dark theme",
    language: "Switch language",
    menuOpen: "Open navigation menu",
    menuClose: "Close navigation menu",
    heroEyebrow: "A GCSA ECOSYSTEM PRODUCT · iOS",
    heroTitle: "More confidence in\nevery connection at home.",
    heroLead:
      "Home Guard brings home-network checks, mobile privacy diagnostics, and financial-environment alerts into one clear iOS experience—so you can understand risk before it becomes loss.",
    heroPrimary: "Explore protection",
    heroSecondary: "See our privacy boundary",
    iosBadge: "Designed for iOS",
    localBadge: "Local-first",
    noTrackBadge: "No ad tracking",
    phoneTitle: "Home security overview",
    phoneStatus: "Environment looks good",
    phoneScore: "92",
    phoneScoreLabel: "Security score",
    phoneNetwork: "Home Wi-Fi",
    phonePrivacy: "Privacy & leaks",
    phoneFinance: "Financial environment",
    phoneSafe: "No critical issues",
    phoneWatch: "1 recommendation",
    phoneCheck: "Scan again",
    metrics: [
      { value: "3", label: "core security scenarios" },
      { value: "9+", label: "risk signals checked" },
      { value: "1", label: "clear next action" },
    ],
    scenarioEyebrow: "THREE LAYERS OF PROTECTION",
    scenarioTitle: "From your router to your phone—and every sensitive action",
    scenarioLead:
      "No wall of jargon. Just the current risk, what it may affect, and what to do next.",
    scenarios: [
      {
        code: "01",
        title: "Home network health",
        text: "Surface unfamiliar devices, camera and IoT signals, then check router password posture, defaults, open ports, and known vulnerability indicators.",
        signal: "Wi-Fi · Router · IoT",
      },
      {
        code: "02",
        title: "Mobile privacy & leak checks",
        text: "Review visible VPN, proxy, DNS, and public-IP exposure signals, plus jailbreak, remote-control, and screen-sharing risk indicators available to iOS.",
        signal: "DNS · IP · Privacy",
      },
      {
        code: "03",
        title: "Financial environment alerts",
        text: "Before banking, exchange, or wallet activity, combine network, device, and link signals to flag phishing, fake-wallet, and address-hijack indicators.",
        signal: "Banking · Wallet · Web3",
      },
    ] satisfies FeatureItem[],
    mapEyebrow: "HOME NETWORK MAP",
    mapTitle: "See every important node on your home network",
    mapLead:
      "Home Guard turns device discovery, network configuration, and threat intelligence into a readable map—separating known devices, items to review, and urgent alerts.",
    mapLegendSafe: "Trusted",
    mapLegendReview: "Review",
    mapLegendRisk: "Risk alert",
    mapRouter: "Home router",
    mapPhone: "Your iPhone",
    mapCamera: "Living-room camera",
    mapSpeaker: "Smart speaker",
    mapUnknown: "Unknown device",
    mapNote:
      "Local-network discovery runs only after permission. Visibility depends on iOS permissions, device responses, and the network you are connected to.",
    coverageEyebrow: "WHAT HOME GUARD CHECKS",
    coverageTitle: "One check for the risks people most often miss",
    coverageLead: "Every finding includes its basis, severity, and an actionable next step.",
    coverage: [
      { code: "WF", title: "Wi-Fi security", text: "Encryption, suspicious hotspots, and network-context risk." },
      { code: "IP", title: "IP / DNS leaks", text: "Public IP, DNS path, proxy, and VPN consistency." },
      { code: "DV", title: "Unknown devices", text: "New local-network devices that need confirmation." },
      { code: "RT", title: "Router posture", text: "Defaults, weak-password guidance, open ports, and vulnerability clues." },
      { code: "OS", title: "System integrity", text: "Visible integrity signals, including jailbreak indicators." },
      { code: "RC", title: "Remote control", text: "High-risk behavior prompts based on visible state and guided self-checks." },
      { code: "URL", title: "Links & domains", text: "Phishing links, malicious domains, and impersonation risk." },
      { code: "TX", title: "Financial context", text: "Combined alerts before banking, exchange, or wallet activity." },
    ] satisfies FeatureItem[],
    financeEyebrow: "BEFORE MONEY MOVES",
    financeTitle: "One more environment check before you log in, sign, or send",
    financeLead:
      "Home Guard does not read balances, passwords, seed phrases, private keys, or authorize transactions. It simply brings device, network, and destination-link anomalies together at the moment they matter.",
    financeSignals: [
      "Is the current Wi-Fi trusted?",
      "Is the DNS or proxy path unusual?",
      "Does the destination match threat intelligence?",
      "Are high-risk device signals present?",
    ],
    financeAlert: "Pause recommended",
    financeAlertText: "Your current DNS path differs from your usual environment. Switch to a trusted network and try again.",
    boundaryEyebrow: "PRIVACY BY DESIGN",
    boundaryTitle: "A security tool should not become a new privacy risk",
    boundaryLead:
      "Home Guard follows local-first, least-permission, and purpose-limited design. Necessary network identifiers are used only when you actively start an online check.",
    boundaries: [
      { title: "No financial credentials", text: "We do not ask for card PINs, exchange passwords, private keys, seed phrases, or transaction approval." },
      { title: "No advertising profile", text: "We do not sell personal data or use it for targeted ads or cross-app tracking." },
      { title: "Permission when needed", text: "Permissions such as Local Network are requested for relevant features and can be withdrawn in iOS Settings." },
    ],
    privacyAction: "Read the full Privacy Policy",
    faqEyebrow: "QUESTIONS, ANSWERED",
    faqTitle: "Frequently asked questions",
    faqs: [
      {
        q: "Can Home Guard see every app installed on my iPhone?",
        a: "No. iOS does not let ordinary apps retrieve a complete installed-app list. Home Guard uses only security state exposed by the system, checks you authorize, and guided self-check information, and explains the basis of each result.",
      },
      {
        q: "Why does local-network discovery need permission?",
        a: "Finding routers, cameras, and IoT devices on your home network requires iOS Local Network permission. You can deny or revoke it and continue using features that do not depend on local discovery.",
      },
      {
        q: "Is a scan result a security certification?",
        a: "No. Results are risk indicators based on signals visible at that time. They cannot guarantee that a device, network, or transaction is completely safe.",
      },
      {
        q: "What should I do after a high-risk alert?",
        a: "Pause sensitive activity, move to a trusted network, and follow the verification steps in the app. For funds, accounts, or signs of an ongoing intrusion, also contact the relevant provider and a qualified security professional.",
      },
    ],
    ctaEyebrow: "A SAFER DIGITAL HOME",
    ctaTitle: "Turn complex security signals into next steps the whole family can understand.",
    ctaPrimary: "Visit support",
    ctaSecondary: "Contact GCSA",
    footerCopyright: "© Global Cybersecurity Alliance. All rights reserved.",
  },
} as const;

export const legalCopy: Record<
  Locale,
  Record<Exclude<LegalPageKind, "privacy">, LegalCopy>
> = {
  "zh-CN": {
    terms: {
      pageTitle: "使用条款 | GCSA Home Guard",
      eyebrow: "服务与责任边界",
      title: "Home Guard\n使用条款",
      lead:
        "本条款说明你可以如何使用 Home Guard、检测结果的性质，以及你与 GCSA 在产品使用中的权利和责任。",
      updatedLabel: "最后更新",
      updatedDate: "2026 年 7 月 25 日",
      summaryTitle: "使用前请了解",
      summaryText:
        "Home Guard 提供风险提示与安全建议，不是安全认证、金融建议或紧急响应服务。",
      highlights: [
        "仅用于合法、自有或获授权的网络与设备",
        "检测结论受 iOS 权限和可见信号限制",
        "敏感操作前仍需独立核验",
        "App Store 版本适用 Apple 标准 EULA",
      ],
      sections: [
        {
          title: "1. 接受条款",
          paragraphs: [
            "本条款是你与 Global Cybersecurity Alliance（“GCSA”“我们”）之间关于 Home Guard iOS 应用、在线服务、更新、文档和产品网站的协议。下载、安装、访问或使用产品，即表示你同意本条款；不同意时请停止使用。",
            "如果你代表家庭成员、企业或其他组织使用产品，你确认拥有相应授权并负责在授权范围内操作。",
          ],
        },
        {
          title: "2. 服务性质与有限许可",
          paragraphs: [
            "在你遵守本条款的前提下，我们授予你有限、非独占、不可转让且不可再许可的许可，在你拥有或控制的兼容 Apple 设备上使用 Home Guard。",
            "Home Guard 基于当时可见的网络、设备、系统与风险情报信号给出提示。检测可能受 iOS 沙箱、权限选择、网络拓扑、设备响应、情报时效和第三方服务影响，不构成对绝对安全、无漏洞或无欺诈的保证。",
          ],
        },
        {
          title: "3. 合法使用",
          paragraphs: [
            "你只能扫描自己拥有、管理或已获得明确授权的网络、路由器和设备，并应遵守适用的隐私、计算机滥用、通信保密、知识产权和数据保护法律。",
          ],
          bullets: [
            "不得扫描、测试、干扰或尝试访问未获授权的网络、设备或账户。",
            "不得利用产品实施监控、骚扰、欺诈、凭据窃取、恶意软件传播或规避合法访问控制。",
            "不得伪造结果、删除权利声明、规避技术限制或以产品从事违法活动。",
          ],
        },
        {
          title: "4. 金融与安全提醒",
          paragraphs: [
            "与银行、交易所、钱包、域名或地址相关的提示仅供一般安全参考，不构成金融、投资、法律、审计或保险建议，也不代表 GCSA 对任何第三方的认可。",
            "在登录、转账、签名或授权前，你仍应通过官方渠道核验目标、金额、域名、收款地址和平台状态。出现疑似诈骗、资金损失或持续入侵时，请立即停止操作并联系相关平台、金融机构、执法部门或合资格专业人员。",
          ],
        },
        {
          title: "5. 第三方服务与 Apple 条款",
          paragraphs: [
            "产品可能链接或调用 Apple、互联网服务商、威胁情报、地图、银行、交易所或钱包提供的第三方服务。第三方服务的可用性、内容和处理行为由其自行负责，并适用其条款和隐私政策。",
            "如果你通过 App Store 获取 Home Guard，Apple 的媒体服务条款和 Apple 标准最终用户许可协议同时适用。应用由 GCSA 而非 Apple 负责；如本条款与强制适用的 App Store 条款冲突，以后者为准。",
          ],
        },
        {
          title: "6. 更新、变更与终止",
          paragraphs: [
            "我们可能为安全、兼容、功能或法律原因更新、变更、暂停或停止部分功能。某些更新可能是继续安全使用所必需的。我们不承诺永久提供特定检测项、情报来源或系统版本支持。",
            "如你严重或持续违反本条款，我们可在法律允许范围内限制或终止在线服务访问。终止不影响按其性质应持续有效的知识产权、责任和争议条款。",
          ],
        },
        {
          title: "7. 知识产权",
          paragraphs: [
            "Home Guard 的品牌、界面、文档、图形和专有代码由 GCSA 或相关权利人拥有。除适用法律或开源许可明确允许外，你不得复制、出售、出租、再许可、反向工程或创建衍生作品。",
          ],
        },
        {
          title: "8. 免责声明与责任限制",
          paragraphs: [
            "在适用法律允许的最大范围内，产品及相关服务按“现状”和“可用”状态提供，不附带对不间断、无错误、完整、准确或适合特定目的的保证。某些司法管辖区不允许排除法定消费者权利，本条款不限制依法不得限制的权利。",
            "在适用法律允许的最大范围内，GCSA 不对因依赖检测结果、第三方服务、网络中断、未遵循建议或未经授权使用而产生的间接、附带、特殊或后果性损失负责。",
          ],
        },
        {
          title: "9. 条款变更与联系",
          paragraphs: [
            "我们可能因产品、运营或法律变化更新本条款，并更新页面顶部日期。对权利义务有重大影响的变更会通过合理方式提示。",
            "如对许可、合法使用或本条款有疑问，请联系 Global Cybersecurity Alliance。",
          ],
        },
      ],
    },
    support: {
      pageTitle: "技术支持 | GCSA Home Guard",
      eyebrow: "GCSA Home Guard 支持",
      title: "技术支持",
      lead:
        "获取权限、家庭网络扫描、隐私检测、金融环境提醒与结果解读方面的帮助。",
      updatedLabel: "服务对象",
      updatedDate: "Home Guard iOS 版",
      summaryTitle: "联系我们之前",
      summaryText:
        "请准备应用版本、iOS 版本、问题发生步骤和不含敏感内容的错误信息。",
      highlights: [
        "通常在两个工作日内回复",
        "请勿发送密码、私钥或助记词",
        "可提交隐私与数据删除请求",
        "安全漏洞请在主题注明 Security",
      ],
      sections: [
        {
          title: "1. 快速排查",
          paragraphs: [
            "请先将 Home Guard 与 iOS 更新至可用的最新版本，确认设备已连接目标 Wi-Fi，然后重新打开应用并再次运行相应检测。",
          ],
          bullets: [
            "本地网络无设备：在 iOS“设置 > 隐私与安全性 > 本地网络”中确认 Home Guard 已获授权。",
            "无法识别 Wi-Fi：确认相关系统权限已开启，并暂时关闭可能改变网络路径的 VPN 或代理后重试。",
            "检测结果变化：网络、DNS、VPN、设备在线状态与威胁情报都可能实时变化，可在同一环境下重新检测。",
            "金融环境告警：先暂停敏感操作，切换可信网络，并通过官方 App 或官网核验目标。",
          ],
        },
        {
          title: "2. 如何提交有效问题",
          paragraphs: [
            "邮件中请注明 Home Guard 版本、iPhone 型号、iOS 版本、所在国家或地区、使用的功能、预期结果、实际结果和可复现步骤。可附不含个人或网络敏感信息的截图。",
            "请不要发送 Wi-Fi 密码、银行卡信息、交易所口令、验证码、私钥、助记词、完整钱包地址簿或未经脱敏的家庭网络清单。",
          ],
        },
        {
          title: "3. 权限与隐私帮助",
          paragraphs: [
            "你可以在 iOS 设置中随时查看或撤回 Home Guard 的本地网络、蓝牙和定位权限。撤回权限不会影响与该权限无关的功能。",
            "如需访问、更正或删除我们持有的支持信息或联网查询记录，请在邮件主题中注明“Privacy Request”，并说明你的请求类型。仅存储在设备本地的数据需要由你在应用或 iOS 中删除。",
          ],
        },
        {
          title: "4. 安全漏洞报告",
          paragraphs: [
            "如果你发现可能影响 Home Guard 或 GCSA 服务的安全漏洞，请在邮件主题中注明“Security”。先提供影响范围、复现条件和联系方式，不要在未建立安全传输方式前发送利用代码、凭据或敏感样本。",
          ],
        },
        {
          title: "5. 联系支持",
          paragraphs: [
            "请发送邮件至 contact@gcsa.org。我们通常会在两个工作日内确认收到；复杂、安全或跨服务问题可能需要更长时间。Home Guard 支持不提供紧急响应、资金追回或执法服务。",
          ],
        },
      ],
    },
  },
  "zh-Hant": {
    terms: {
      pageTitle: "使用條款 | GCSA Home Guard",
      eyebrow: "服務與責任邊界",
      title: "Home Guard\n使用條款",
      lead: "本條款說明你可如何使用 Home Guard、檢測結果的性質，以及你與 GCSA 的權利和責任。",
      updatedLabel: "最後更新",
      updatedDate: "2026 年 7 月 25 日",
      summaryTitle: "使用前請了解",
      summaryText: "Home Guard 提供風險提示與安全建議，並非安全認證、金融建議或緊急應變服務。",
      highlights: [
        "只用於合法、自有或獲授權的網絡與裝置",
        "結論受 iOS 權限和可見訊號限制",
        "敏感操作前仍需獨立核實",
        "App Store 版本適用 Apple 標準 EULA",
      ],
      sections: [
        {
          title: "1. 接受條款與有限許可",
          paragraphs: [
            "本條款是你與 Global Cybersecurity Alliance（「GCSA」「我們」）之間關於 Home Guard iOS App、在線服務、更新、文件和網站的協議。下載、安裝或使用即表示你同意本條款。",
            "在你遵守本條款的前提下，我們授予你有限、非獨佔、不可轉讓且不可再授權的許可，在你擁有或控制的兼容 Apple 裝置上使用產品。",
          ],
        },
        {
          title: "2. 服務性質",
          paragraphs: [
            "Home Guard 按當時可見的網絡、裝置、系統與風險情報訊號提供提示。結果會受 iOS 沙盒、權限選擇、網絡拓撲、裝置回應和情報時效影響，並非絕對安全保證。",
          ],
        },
        {
          title: "3. 合法使用",
          paragraphs: [
            "你只可掃描自己擁有、管理或已獲明確授權的網絡、路由器和裝置，並須遵守適用法律。",
          ],
          bullets: [
            "不得掃描、干擾或嘗試存取未獲授權的網絡、裝置或帳戶。",
            "不得利用產品實施監控、騷擾、欺詐、憑證竊取或惡意軟件傳播。",
            "不得偽造結果、規避技術限制或以產品從事違法活動。",
          ],
        },
        {
          title: "4. 金融與安全提醒",
          paragraphs: [
            "銀行、交易所、錢包、網域或地址提示只供一般安全參考，不構成金融、投資、法律或審計建議。登入、轉帳、簽署或授權前，你仍須透過官方渠道獨立核實。",
          ],
        },
        {
          title: "5. 第三方與 Apple 條款",
          paragraphs: [
            "第三方服務由其供應商負責並適用其條款。透過 App Store 取得 Home Guard 時，Apple 媒體服務條款和 Apple 標準最終用戶許可協議同時適用；App 由 GCSA 而非 Apple 負責。",
          ],
        },
        {
          title: "6. 更新、知識產權與終止",
          paragraphs: [
            "我們可為安全、兼容、功能或法律原因更新、變更、暫停或停止部分功能。產品品牌、介面、文件、圖形和專有程式碼由 GCSA 或相關權利人擁有。",
            "嚴重或持續違反條款時，我們可在法律允許範圍內限制或終止在線服務。",
          ],
        },
        {
          title: "7. 免責與責任限制",
          paragraphs: [
            "在法律允許的最大範圍內，產品按「現狀」和「可用」狀態提供，不保證不間斷、無錯誤、完整或適合特定目的。本條款不限制依法不得限制的消費者權利。",
            "GCSA 不對因依賴檢測結果、第三方服務、網絡中斷、未遵循建議或未經授權使用而產生的間接或後果性損失負責。",
          ],
        },
        {
          title: "8. 變更與聯絡",
          paragraphs: [
            "我們可能更新本條款並更新頁面日期。若對許可、合法使用或本條款有疑問，請聯絡 Global Cybersecurity Alliance。",
          ],
        },
      ],
    },
    support: {
      pageTitle: "技術支援 | GCSA Home Guard",
      eyebrow: "GCSA Home Guard 支援",
      title: "技術支援",
      lead: "取得權限、家庭網絡掃描、私隱檢測、金融環境提醒與結果解讀方面的協助。",
      updatedLabel: "服務對象",
      updatedDate: "Home Guard iOS 版",
      summaryTitle: "聯絡我們之前",
      summaryText: "請準備 App 版本、iOS 版本、問題步驟和不含敏感內容的錯誤資料。",
      highlights: [
        "通常在兩個工作天內回覆",
        "請勿傳送密碼、私鑰或助記詞",
        "可提交私隱與資料刪除要求",
        "安全漏洞請在主旨註明 Security",
      ],
      sections: [
        {
          title: "1. 快速排查",
          paragraphs: ["請先更新 Home Guard 與 iOS，確認已連接目標 Wi-Fi，重新開啟 App 後再次執行檢測。"],
          bullets: [
            "看不到本地裝置：在 iOS 私隱設定確認已授權本地網絡。",
            "無法識別 Wi-Fi：確認相關權限並暫時關閉 VPN 或代理後重試。",
            "金融環境告警：先暫停敏感操作，切換可信網絡並經官方渠道核實。",
          ],
        },
        {
          title: "2. 提交問題",
          paragraphs: [
            "請註明 Home Guard 版本、iPhone 型號、iOS 版本、國家或地區、使用功能、預期與實際結果及重現步驟。",
            "請勿傳送 Wi-Fi 密碼、銀行卡資料、交易所口令、驗證碼、私鑰、助記詞或未經遮蔽的家庭網絡清單。",
          ],
        },
        {
          title: "3. 私隱與安全",
          paragraphs: [
            "你可在 iOS 設定查看或撤回 Home Guard 的本地網絡、藍牙和定位權限。資料要求請在主旨註明「Privacy Request」；安全漏洞請註明「Security」，並避免在建立安全傳輸方式前傳送敏感樣本。",
          ],
        },
        {
          title: "4. 聯絡支援",
          paragraphs: [
            "請電郵 contact@gcsa.org。我們通常會在兩個工作天內確認收到；Home Guard 支援不提供緊急應變、資金追回或執法服務。",
          ],
        },
      ],
    },
  },
  en: {
    terms: {
      pageTitle: "Terms of Use | GCSA Home Guard",
      eyebrow: "SERVICE & RESPONSIBILITY BOUNDARIES",
      title: "Home Guard\nTerms of Use",
      lead:
        "These terms explain how you may use Home Guard, the nature of its findings, and the rights and responsibilities between you and GCSA.",
      updatedLabel: "Last updated",
      updatedDate: "July 25, 2026",
      summaryTitle: "Before you use Home Guard",
      summaryText:
        "Home Guard provides risk indicators and security guidance—not certification, financial advice, or emergency response.",
      highlights: [
        "Use only on networks and devices you own or may assess",
        "Findings are limited by iOS permissions and visible signals",
        "Independently verify sensitive actions",
        "Apple’s Standard EULA applies to App Store copies",
      ],
      sections: [
        {
          title: "1. Acceptance and license",
          paragraphs: [
            "These terms are an agreement between you and Global Cybersecurity Alliance (“GCSA,” “we,” “us”) covering the Home Guard iOS app, online services, updates, documentation, and product website. By downloading, installing, accessing, or using them, you agree to these terms.",
            "Subject to compliance, we grant you a limited, non-exclusive, non-transferable, non-sublicensable license to use Home Guard on compatible Apple devices you own or control.",
          ],
        },
        {
          title: "2. Nature of the service",
          paragraphs: [
            "Home Guard provides indicators based on network, device, system, and threat-intelligence signals visible at the time. Results may be limited by iOS sandboxing, permissions, network topology, device responses, intelligence freshness, and third-party availability. They are not a guarantee of absolute safety or absence of vulnerabilities or fraud.",
          ],
        },
        {
          title: "3. Lawful use",
          paragraphs: [
            "You may scan only networks, routers, and devices you own, manage, or are expressly authorized to assess, and you must comply with applicable privacy, computer-misuse, communications, intellectual-property, and data-protection laws.",
          ],
          bullets: [
            "Do not scan, disrupt, or attempt to access an unauthorized network, device, or account.",
            "Do not use Home Guard for surveillance, harassment, fraud, credential theft, malware delivery, or bypassing lawful access controls.",
            "Do not falsify results, remove rights notices, bypass technical restrictions, or use the product for unlawful activity.",
          ],
        },
        {
          title: "4. Financial and security alerts",
          paragraphs: [
            "Alerts about banks, exchanges, wallets, domains, or addresses are general security information, not financial, investment, legal, audit, or insurance advice and not an endorsement of a third party.",
            "Before logging in, sending funds, signing, or authorizing, independently verify the destination, amount, domain, recipient address, and provider status through official channels. For suspected fraud, loss, or an ongoing intrusion, stop and contact the relevant provider, financial institution, law enforcement, or a qualified professional.",
          ],
        },
        {
          title: "5. Third parties and Apple terms",
          paragraphs: [
            "Third-party services are controlled by their providers and subject to their own terms and policies. If you obtain Home Guard through the App Store, Apple Media Services terms and Apple’s Standard End User License Agreement also apply. GCSA—not Apple—is responsible for the app; mandatory App Store terms prevail in case of conflict.",
          ],
        },
        {
          title: "6. Updates, intellectual property, and termination",
          paragraphs: [
            "We may update, change, suspend, or discontinue features for security, compatibility, functional, or legal reasons. Home Guard branding, interface, documentation, graphics, and proprietary code belong to GCSA or their respective owners.",
            "We may restrict or terminate online-service access for serious or repeated violations, where permitted by law.",
          ],
        },
        {
          title: "7. Disclaimers and liability",
          paragraphs: [
            "To the maximum extent allowed by law, the product is provided “as is” and “as available,” without warranties of uninterrupted operation, error-free performance, completeness, accuracy, or fitness for a particular purpose. These terms do not limit non-waivable consumer rights.",
            "To the maximum extent allowed by law, GCSA is not liable for indirect, incidental, special, or consequential losses arising from reliance on findings, third-party services, network interruption, failure to follow guidance, or unauthorized use.",
          ],
        },
        {
          title: "8. Changes and contact",
          paragraphs: [
            "We may update these terms and the date above when product, operational, or legal needs change. Contact Global Cybersecurity Alliance with questions about licensing, lawful use, or these terms.",
          ],
        },
      ],
    },
    support: {
      pageTitle: "Support | GCSA Home Guard",
      eyebrow: "GCSA HOME GUARD SUPPORT",
      title: "Technical Support",
      lead:
        "Get help with permissions, home-network discovery, privacy checks, financial-environment alerts, and understanding results.",
      updatedLabel: "Supported product",
      updatedDate: "Home Guard for iOS",
      summaryTitle: "Before contacting us",
      summaryText:
        "Have your app version, iOS version, reproduction steps, and non-sensitive error details ready.",
      highlights: [
        "Typical response within two business days",
        "Never send passwords, private keys, or seed phrases",
        "Privacy and deletion requests are supported",
        "Put Security in the subject for vulnerability reports",
      ],
      sections: [
        {
          title: "1. Quick troubleshooting",
          paragraphs: [
            "Update Home Guard and iOS, confirm that you are connected to the target Wi-Fi, reopen the app, and run the relevant check again.",
          ],
          bullets: [
            "No local devices: verify Home Guard has Local Network permission in iOS Settings.",
            "Wi-Fi not identified: review relevant permissions and temporarily disable VPN or proxy tools before trying again.",
            "Changing results: network, DNS, VPN, device availability, and threat intelligence can change in real time.",
            "Financial alert: pause the sensitive action, move to a trusted network, and verify through the provider’s official app or website.",
          ],
        },
        {
          title: "2. Send a useful support request",
          paragraphs: [
            "Include the Home Guard version, iPhone model, iOS version, country or region, feature used, expected and actual result, and reproduction steps. You may attach screenshots after removing personal and network-sensitive information.",
            "Do not send Wi-Fi passwords, card details, exchange passwords, verification codes, private keys, seed phrases, or an unredacted home-network inventory.",
          ],
        },
        {
          title: "3. Privacy and security help",
          paragraphs: [
            "You can review or withdraw Home Guard's Local Network, Bluetooth, and Location permissions in iOS Settings. Put “Privacy Request” in the subject for access, correction, or deletion requests. Put “Security” in the subject for a vulnerability report, and do not send exploit code, credentials, or sensitive samples until a safe transfer method is arranged.",
          ],
        },
        {
          title: "4. Contact support",
          paragraphs: [
            "Email contact@gcsa.org. We typically acknowledge requests within two business days; complex, security, or cross-service issues may take longer. Home Guard support does not provide emergency response, fund recovery, or law-enforcement services.",
          ],
        },
      ],
    },
  },
};
