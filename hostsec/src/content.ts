import type { Locale, SiteCopy } from './types'

const baseSiteCopy: Record<'zh-CN' | 'en', SiteCopy> = {
  'zh-CN': {
    lang: 'zh-CN',
    skip: '跳至主要内容',
    navLabel: '页面导航',
    nav: [
      { label: '首页', href: '/' },
      { label: '平台能力', href: '#capabilities' },
      { label: '平台架构', href: '#architecture' },
      { label: '运维闭环', href: '#workflow' },
      { label: '安全边界', href: '#security-boundaries' },
    ],
    menuOpen: '打开导航菜单',
    menuClose: '关闭导航菜单',
    themeLight: '切换至浅色主题',
    themeDark: '切换至深色主题',
    localeLabel: '切换语言',
    panelEntry: '进入面板',
    heroEyebrow: 'GCSA · HOST SECURITY PLATFORM',
    heroTitle: '让每一台主机，\n都在可见与可控之中。',
    heroLead:
      'HostSec 将 Linux 与 Windows 主机接入同一个多租户控制面，把资产状态、安全策略、WAF、防火墙、日志、告警与响应汇集成一条清晰的运维链路。',
    heroPrimary: '查看平台能力',
    heroSecondary: '了解平台架构',
    heroSignals: ['Linux + Windows', '多租户控制面', 'Go 控制面'],
    console: {
      title: '租户安全概览',
      live: '实时连接',
      overview: '概览',
      hosts: '主机',
      events: '事件',
      policies: '策略',
      totalHosts: '主机总数',
      online: '在线主机',
      openEvents: '待处理事件',
      activeTasks: '执行中任务',
      hostName: '主机',
      platform: '平台',
      status: '状态',
      protected: '已保护',
      updated: '刚刚更新',
    },
    facts: [
      { value: 'Linux / Windows', label: '跨平台 Agent' },
      { value: 'Nginx / IIS', label: '双栈 WAF' },
      { value: 'MySQL / SQLite', label: '生产与开发存储' },
      { value: '中文 / English', label: '双语管理界面' },
    ],
    featuresEyebrow: 'ONE CONTROL PLANE',
    featuresTitle: '从资产接入到事件响应，集中管理每一个关键环节',
    featuresLead:
      '控制面负责统一编排，Agent 在主机本地完成采集与执行；平台管理员与租户团队在各自授权范围内协作。',
    features: [
      {
        code: '01',
        title: '主机与 Agent',
        text: '接入 Linux 与 Windows 主机，持续汇报心跳、在线状态、真实 ping 与任务回执；支持主机组、接入模板和版本升级。',
        tags: ['资产', '心跳', '升级'],
      },
      {
        code: '02',
        title: '防火墙编排',
        text: '统一维护地址组、主机绑定、临时封禁与批量任务，并以真实规则刷新、回执校验和过期清理确保策略落地。',
        tags: ['地址组', '批量任务', '回滚'],
      },
      {
        code: '03',
        title: 'WAF 策略',
        text: '面向 Nginx 与 IIS 分发 WAF 策略，将 HostSec 规则与 OWASP CRS 分开管理、选择和发布。',
        tags: ['Nginx', 'IIS', 'OWASP CRS'],
      },
      {
        code: '04',
        title: '日志与安全事件',
        text: '汇聚时间线、原始日志、安全事件、文件监控与告警事件，让调查过程从信号一直追溯到主机。',
        tags: ['日志', '事件', '文件监控'],
      },
      {
        code: '05',
        title: '服务与系统优化',
        text: '按 Agent 配置和主机真实状态展示可操作服务，支持安全的服务操作、系统优化预览与执行。',
        tags: ['服务操作', '优化', '预览'],
      },
      {
        code: '06',
        title: '告警、响应与审计',
        text: '配置通知策略与响应流程，记录执行结果和高风险操作，让每一次变更都有来源、状态与审计轨迹。',
        tags: ['告警', '响应', '审计'],
      },
    ],
    architectureEyebrow: 'BUILT FOR CONTROL',
    architectureTitle: '一套结构清晰的主机安全控制链',
    architectureLead:
      '管理后台、租户后台、API、静态资源与内置模板由同一个 Go 可执行文件提供；Agent 负责把控制动作带到每一台主机。',
    architectureLayers: [
      {
        index: '01',
        title: '管理与租户门户',
        text: '平台管理员维护全局能力，租户团队管理授权范围内的主机、策略与事件。',
        tags: ['Admin Console', 'Tenant Console'],
      },
      {
        index: '02',
        title: 'Go 控制面',
        text: '统一承载页面、API、任务调度、回执处理、权限校验、审计与文件缓存。',
        tags: ['REST API', 'WebSocket', 'Task Dispatch'],
      },
      {
        index: '03',
        title: '数据与缓存',
        text: '生产环境使用 MySQL，开发与测试支持 SQLite；Redis 可作为外部缓存选项。',
        tags: ['MySQL', 'SQLite', 'Redis Optional'],
      },
      {
        index: '04',
        title: 'HostSec Agent',
        text: '在 Linux 与 Windows 上执行采集、服务检测、防火墙、WAF、日志上报、系统优化与自升级。',
        tags: ['Linux', 'Windows', 'amd64 / arm64'],
      },
    ],
    architectureNote: '浏览器 → Go 控制面 → 任务与回执 → Linux / Windows 主机',
    flowEyebrow: 'FROM SIGNAL TO ACTION',
    flowTitle: '运维与安全，不再是两条割裂的流程',
    flowLead: '同一份资产上下文贯穿接入、观察、执行和审计，让团队更快确认影响范围并完成处置。',
    flowSteps: [
      { index: '01', title: '接入', text: '通过模板和安装向导注册 Agent，建立主机身份与安全通信。' },
      { index: '02', title: '观察', text: '持续收集状态、日志、指标和安全信号，形成统一主机视图。' },
      { index: '03', title: '执行', text: '按授权下发防火墙、WAF、服务、优化与升级任务。' },
      { index: '04', title: '验证', text: '通过任务回执、实时状态和审计记录确认变更真正落地。' },
    ],
    controlEyebrow: 'SECURITY BOUNDARIES',
    controlTitle: '控制能力越强，边界越要清晰',
    controlLead:
      'HostSec 将平台与租户登录态分离，对写操作执行权限与 CSRF 校验，并把高风险操作写入审计记录。',
    controls: [
      { title: '多租户隔离', text: '资源读写必须匹配租户归属，平台能力与租户能力保持清晰边界。' },
      { title: '主机保护', text: '禁用主机停止接收新策略；防火墙写入继续校验地址、端口、时效与重复规则。' },
      { title: '操作可追溯', text: '关键策略、任务与账号操作保留操作者、结果和时间线，方便复核与审计。' },
    ],
    faqEyebrow: 'QUESTIONS, ANSWERED',
    faqTitle: '常见问题',
    faqs: [
      {
        question: 'HostSec 适合管理哪些主机？',
        answer: '当前 Agent 覆盖 Linux 与 Windows，并支持 amd64 / arm64 安装路径。不同平台会按实际能力展示可用的服务、系统优化、防火墙与 WAF 操作。',
      },
      {
        question: '平台管理员和租户管理员有什么区别？',
        answer: '平台管理员负责租户、平台用户、全局规则、Agent 版本和系统设置；租户管理员只管理本租户的成员、主机、策略、日志、告警与响应。',
      },
      {
        question: 'HostSec 的 WAF 支持哪些环境？',
        answer: '当前支持 Nginx 与 IIS。HostSec 规则和 OWASP CRS 分开维护与选择，策略通过控制面下发并由 Agent 返回执行结果。',
      },
      {
        question: '是否可以在自己的基础设施中部署？',
        answer: '可以。项目提供控制面与 Agent 的部署、构建和运维文档；生产环境使用 MySQL，Redis 可选，开发和测试也支持 SQLite。',
      },
    ],
    closingEyebrow: 'HOST SECURITY, UNDER CONTROL',
    closingTitle: '把每一台主机的状态、策略与响应，放进同一个控制面。',
    closingLead: '从平台能力与架构开始了解 HostSec，或联系 GCSA 获取更多信息。',
    closingPrimary: '查看平台能力',
    closingSecondary: '联系 GCSA',
    ecosystem: {
      eyebrow: 'GCSA 安全生态',
      title: '更多安全产品',
      description: '从链上资产、网络隐私到家庭与金融环境，将安全防护延伸到每一次数字操作。',
      officialWebsite: '前往官网',
      moreTitle: '更多安全产品',
      moreDescription: '探索完整的 GCSA 安全生态，查看更多面向个人、企业与基础设施的安全产品。',
      viewAll: '查看全部产品',
      products: [
        {
          type: '安全加密钱包',
          name: 'GCSA Wallet',
          description: 'GCSA Wallet 为个人与团队提供安全的数字资产管理与链上风险识别体验，帮助用户更安心地查看、接收与转移资产。',
          features: ['实时地址风险扫描', '智能资金来源追踪', 'AI 异常风险告警'],
          href: 'https://wallet.gcsa.org/',
          theme: 'wallet',
        },
        {
          type: '加密网络与隐私保护',
          name: 'GCSA VPN',
          description: 'GCSA VPN 通过加密连接保护日常上网与公共网络使用，降低数据泄露风险，为不同设备提供简单、稳定的安全连接。',
          features: ['加密网络连接', '上网隐私保护', '多设备安全访问'],
          href: 'https://gsafevpn.com/',
          theme: 'vpn',
        },
        {
          type: '家庭与金融移动安全',
          name: 'GCSA Home Guard',
          description: 'GCSA Home Guard 是面向家庭与金融场景的移动安全体检平台，结合安全评分、修复建议与云端威胁情报，及早识别设备漏洞、环境风险与 AI 诈骗威胁。',
          features: ['一键安全体检', '家庭设备与摄像头安全', 'AI 诈骗与钓鱼防护'],
          href: 'https://homeguard.gcsa.org/',
          theme: 'homeGuard',
        },
      ],
    },
    footer: {
      menuLabel: '底栏导航',
      contactUs: '联系我们',
      email: '联系邮箱',
      twitter: '推特',
      telegram: 'Telegram',
      home: '首页',
      products: 'GCSA 生态产品',
      media: 'GCSA 媒体',
      updates: 'GCSA 动态',
      join: '加入联盟',
      about: '关于联盟',
      privacy: '隐私政策',
      terms: '使用条款',
      support: '技术支持',
      copyright: '© Global Cybersecurity Alliance. 保留所有权利。',
    },
  },
  en: {
    lang: 'en',
    skip: 'Skip to main content',
    navLabel: 'Page navigation',
    nav: [
      { label: 'Home', href: '/' },
      { label: 'Capabilities', href: '#capabilities' },
      { label: 'Architecture', href: '#architecture' },
      { label: 'Workflow', href: '#workflow' },
      { label: 'Security boundaries', href: '#security-boundaries' },
    ],
    menuOpen: 'Open navigation menu',
    menuClose: 'Close navigation menu',
    themeLight: 'Switch to light theme',
    themeDark: 'Switch to dark theme',
    localeLabel: 'Switch language',
    panelEntry: 'Open console',
    heroEyebrow: 'GCSA · HOST SECURITY PLATFORM',
    heroTitle: 'Every host.\nVisible and under control.',
    heroLead:
      'HostSec connects Linux and Windows hosts to one multi-tenant control plane, bringing assets, security policies, WAF, firewall, logs, alerts, and response into a single operational loop.',
    heroPrimary: 'Explore capabilities',
    heroSecondary: 'Explore architecture',
    heroSignals: ['Linux + Windows', 'Multi-tenant control plane', 'Go control plane'],
    console: {
      title: 'Tenant security overview',
      live: 'Live connection',
      overview: 'Overview',
      hosts: 'Hosts',
      events: 'Events',
      policies: 'Policies',
      totalHosts: 'Total hosts',
      online: 'Online hosts',
      openEvents: 'Open events',
      activeTasks: 'Active tasks',
      hostName: 'Host',
      platform: 'Platform',
      status: 'Status',
      protected: 'Protected',
      updated: 'Updated now',
    },
    facts: [
      { value: 'Linux / Windows', label: 'Cross-platform agent' },
      { value: 'Nginx / IIS', label: 'Dual-stack WAF' },
      { value: 'MySQL / SQLite', label: 'Production and dev storage' },
      { value: '中文 / English', label: 'Bilingual consoles' },
    ],
    featuresEyebrow: 'ONE CONTROL PLANE',
    featuresTitle: 'Every critical step, from enrollment to incident response',
    featuresLead:
      'The control plane orchestrates centrally while agents collect and execute locally. Platform administrators and tenant teams work within separate authorization boundaries.',
    features: [
      { code: '01', title: 'Hosts and agents', text: 'Enroll Linux and Windows hosts with heartbeats, online state, real ping, task receipts, host groups, templates, and upgrades.', tags: ['Inventory', 'Heartbeat', 'Upgrade'] },
      { code: '02', title: 'Firewall orchestration', text: 'Manage address groups, host bindings, temporary blocks, and batch jobs with real-state refresh, receipts, rollback, and expiry cleanup.', tags: ['Address groups', 'Batch jobs', 'Rollback'] },
      { code: '03', title: 'WAF policy', text: 'Publish policy to Nginx and IIS while keeping HostSec rules and OWASP CRS independently managed and selectable.', tags: ['Nginx', 'IIS', 'OWASP CRS'] },
      { code: '04', title: 'Logs and security events', text: 'Bring timelines, raw logs, security events, file monitoring, and alerts together for host-level investigation.', tags: ['Logs', 'Events', 'File monitoring'] },
      { code: '05', title: 'Services and optimization', text: 'Surface real services by host and agent configuration, with controlled operations plus optimization preview and execution.', tags: ['Services', 'Optimization', 'Preview'] },
      { code: '06', title: 'Alerting, response, and audit', text: 'Configure notifications and response flows while retaining result and audit trails for sensitive operations.', tags: ['Alerts', 'Response', 'Audit'] },
    ],
    architectureEyebrow: 'BUILT FOR CONTROL',
    architectureTitle: 'A clear control chain for host security',
    architectureLead:
      'Admin console, tenant console, APIs, static assets, and embedded templates ship from one Go executable. Agents carry each control action to the host.',
    architectureLayers: [
      { index: '01', title: 'Admin and tenant portals', text: 'Platform administrators manage global capabilities while tenant teams operate only within their assigned scope.', tags: ['Admin Console', 'Tenant Console'] },
      { index: '02', title: 'Go control plane', text: 'Serves the UI and APIs while handling dispatch, receipts, permissions, audit, schema initialization, and file caching.', tags: ['REST API', 'WebSocket', 'Task Dispatch'] },
      { index: '03', title: 'Data and cache', text: 'MySQL serves production, SQLite supports development and testing, and Redis is available as an optional external cache.', tags: ['MySQL', 'SQLite', 'Redis Optional'] },
      { index: '04', title: 'HostSec Agent', text: 'Collects data and executes service, firewall, WAF, logging, optimization, and self-upgrade tasks on Linux and Windows.', tags: ['Linux', 'Windows', 'amd64 / arm64'] },
    ],
    architectureNote: 'Browser → Go control plane → Tasks and receipts → Linux / Windows hosts',
    flowEyebrow: 'FROM SIGNAL TO ACTION',
    flowTitle: 'Security and operations in one continuous loop',
    flowLead: 'The same asset context carries through enrollment, observation, execution, and audit, helping teams verify impact and close incidents faster.',
    flowSteps: [
      { index: '01', title: 'Enroll', text: 'Register agents with guided templates and establish host identity and secure communication.' },
      { index: '02', title: 'Observe', text: 'Continuously collect state, logs, metrics, and security signals into one host view.' },
      { index: '03', title: 'Act', text: 'Dispatch authorized firewall, WAF, service, optimization, and upgrade tasks.' },
      { index: '04', title: 'Verify', text: 'Confirm delivery through receipts, live state, and a complete audit timeline.' },
    ],
    controlEyebrow: 'SECURITY BOUNDARIES',
    controlTitle: 'Powerful controls need explicit boundaries',
    controlLead:
      'HostSec separates platform and tenant sessions, applies permission and CSRF checks to writes, and records sensitive operations in audit logs.',
    controls: [
      { title: 'Tenant isolation', text: 'Resource access must match tenant ownership, with platform and tenant capabilities kept clearly separate.' },
      { title: 'Host protection', text: 'Disabled hosts stop receiving new policy. Firewall writes validate ownership, address, port, lifetime, and duplication.' },
      { title: 'Traceable operations', text: 'Key policy, task, and account actions retain actor, result, and timeline for review.' },
    ],
    faqEyebrow: 'QUESTIONS, ANSWERED',
    faqTitle: 'Frequently asked questions',
    faqs: [
      { question: 'Which hosts can HostSec manage?', answer: 'The current agent covers Linux and Windows with amd64 and arm64 installation paths. Available services, optimization, firewall, and WAF actions are shown according to real platform capabilities.' },
      { question: 'How do platform and tenant administrators differ?', answer: 'Platform administrators manage tenants, global rules, agent versions, and system settings. Tenant administrators manage only their own members, hosts, policy, logs, alerts, and response.' },
      { question: 'Which environments does the WAF support?', answer: 'The current implementation supports Nginx and IIS. HostSec rules and OWASP CRS are managed separately, published through the control plane, and confirmed by agent receipts.' },
      { question: 'Can I deploy it on my own infrastructure?', answer: 'Yes. The project includes control-plane and agent deployment, build, and operations documentation. Production uses MySQL, Redis is optional, and development or test setups can use SQLite.' },
    ],
    closingEyebrow: 'HOST SECURITY, UNDER CONTROL',
    closingTitle: 'Bring every host, policy, and response into one control plane.',
    closingLead: 'Explore HostSec through its capabilities and architecture, or contact GCSA for more information.',
    closingPrimary: 'Explore capabilities',
    closingSecondary: 'Contact GCSA',
    ecosystem: {
      eyebrow: 'GCSA Security Ecosystem',
      title: 'More security products',
      description: 'Extend protection from on-chain assets and online privacy to every digital interaction at home and across financial environments.',
      officialWebsite: 'Official website',
      moreTitle: 'More security products',
      moreDescription: 'Explore the complete GCSA security ecosystem and discover more products for individuals, businesses, and infrastructure.',
      viewAll: 'View all products',
      products: [
        {
          type: 'Secure crypto wallet',
          name: 'GCSA Wallet',
          description: 'GCSA Wallet gives individuals and teams a secure digital-asset management and on-chain risk experience for viewing, receiving, and transferring assets with greater confidence.',
          features: ['Real-time address risk screening', 'Intelligent source-of-funds tracing', 'AI-powered anomaly alerts'],
          href: 'https://wallet.gcsa.org/',
          theme: 'wallet',
        },
        {
          type: 'Encrypted network & privacy',
          name: 'GCSA VPN',
          description: 'GCSA VPN protects everyday browsing and public-network use with encrypted connections, helping reduce data exposure across devices through simple, reliable secure access.',
          features: ['Encrypted connections', 'Online privacy protection', 'Secure multi-device access'],
          href: 'https://gsafevpn.com/',
          theme: 'vpn',
        },
        {
          type: 'Home & financial mobile security',
          name: 'GCSA Home Guard',
          description: 'GCSA Home Guard is a mobile security checkup platform for home and financial scenarios, combining security scores, remediation guidance, and cloud threat intelligence to surface device vulnerabilities, environmental risks, and AI-driven scams early.',
          features: ['One-tap security checkup', 'Home device & camera security', 'AI scam & phishing protection'],
          href: 'https://homeguard.gcsa.org/',
          theme: 'homeGuard',
        },
      ],
    },
    footer: {
      menuLabel: 'Footer navigation',
      contactUs: 'Contact Us',
      email: 'Email',
      twitter: 'Twitter',
      telegram: 'Telegram',
      home: 'Home',
      products: 'GCSA Ecosystem Products',
      media: 'GCSA Media',
      updates: 'GCSA Updates',
      join: 'Join the Alliance',
      about: 'About Alliance',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
      support: 'Technical Support',
      copyright: '© Global Cybersecurity Alliance. All rights reserved.',
    },
  },
}

const zhHantCopy: SiteCopy = {
  "lang": "zh-Hant",
  "skip": "跳至主要內容",
  "navLabel": "頁面導航",
  "nav": [
    {
      "label": "首頁",
      "href": "/"
    },
    {
      "label": "平台能力",
      "href": "#capabilities"
    },
    {
      "label": "平台架構",
      "href": "#architecture"
    },
    {
      "label": "運維閉環",
      "href": "#workflow"
    },
    {
      "label": "安全邊界",
      "href": "#security-boundaries"
    }
  ],
  "menuOpen": "打開導航菜單",
  "menuClose": "關閉導航菜單",
  "themeLight": "切換至淺色主題",
  "themeDark": "切換至深色主題",
  "localeLabel": "切換語言",
  "panelEntry": "進入面板",
  "heroEyebrow": "GCSA · HOST SECURITY PLATFORM",
  "heroTitle": "讓每一台主機，\n都在可見與可控之中。",
  "heroLead": "HostSec 將 Linux 與 Windows 主機接入同一個多租户控制面，把資產狀態、安全策略、WAF、防火牆、日誌、告警與響應彙集成一條清晰的運維鏈路。",
  "heroPrimary": "查看平台能力",
  "heroSecondary": "瞭解平台架構",
  "heroSignals": [
    "Linux + Windows",
    "多租户控制面",
    "Go 控制面"
  ],
  "console": {
    "title": "租户安全概覽",
    "live": "實時連接",
    "overview": "概覽",
    "hosts": "主機",
    "events": "事件",
    "policies": "策略",
    "totalHosts": "主機總數",
    "online": "在線主機",
    "openEvents": "待處理事件",
    "activeTasks": "執行中任務",
    "hostName": "主機",
    "platform": "平台",
    "status": "狀態",
    "protected": "已保護",
    "updated": "剛剛更新"
  },
  "facts": [
    {
      "value": "Linux / Windows",
      "label": "跨平台 Agent"
    },
    {
      "value": "Nginx / IIS",
      "label": "雙棧 WAF"
    },
    {
      "value": "MySQL / SQLite",
      "label": "生產與開發存儲"
    },
    {
      "value": "中文 / English",
      "label": "雙語管理界面"
    }
  ],
  "featuresEyebrow": "ONE CONTROL PLANE",
  "featuresTitle": "從資產接入到事件響應，集中管理每一個關鍵環節",
  "featuresLead": "控制面負責統一編排，Agent 在主機本地完成採集與執行；平台管理員與租户團隊在各自授權範圍內協作。",
  "features": [
    {
      "code": "01",
      "title": "主機與 Agent",
      "text": "接入 Linux 與 Windows 主機，持續彙報心跳、在線狀態、真實 ping 與任務回執；支持主機組、接入模板和版本升級。",
      "tags": [
        "資產",
        "心跳",
        "升級"
      ]
    },
    {
      "code": "02",
      "title": "防火牆編排",
      "text": "統一維護地址組、主機綁定、臨時封禁與批量任務，並以真實規則刷新、回執校驗和過期清理確保策略落地。",
      "tags": [
        "地址組",
        "批量任務",
        "回滾"
      ]
    },
    {
      "code": "03",
      "title": "WAF 策略",
      "text": "面向 Nginx 與 IIS 分發 WAF 策略，將 HostSec 規則與 OWASP CRS 分開管理、選擇和發佈。",
      "tags": [
        "Nginx",
        "IIS",
        "OWASP CRS"
      ]
    },
    {
      "code": "04",
      "title": "日誌與安全事件",
      "text": "匯聚時間線、原始日誌、安全事件、文件監控與告警事件，讓調查過程從信號一直追溯到主機。",
      "tags": [
        "日誌",
        "事件",
        "文件監控"
      ]
    },
    {
      "code": "05",
      "title": "服務與系統優化",
      "text": "按 Agent 配置和主機真實狀態展示可操作服務，支持安全的服務操作、系統優化預覽與執行。",
      "tags": [
        "服務操作",
        "優化",
        "預覽"
      ]
    },
    {
      "code": "06",
      "title": "告警、響應與審計",
      "text": "配置通知策略與響應流程，記錄執行結果和高風險操作，讓每一次變更都有來源、狀態與審計軌跡。",
      "tags": [
        "告警",
        "響應",
        "審計"
      ]
    }
  ],
  "architectureEyebrow": "BUILT FOR CONTROL",
  "architectureTitle": "一套結構清晰的主機安全控制鏈",
  "architectureLead": "管理後台、租户後台、API、靜態資源與內置模板由同一個 Go 可執行文件提供；Agent 負責把控制動作帶到每一台主機。",
  "architectureLayers": [
    {
      "index": "01",
      "title": "管理與租户門户",
      "text": "平台管理員維護全局能力，租户團隊管理授權範圍內的主機、策略與事件。",
      "tags": [
        "Admin Console",
        "Tenant Console"
      ]
    },
    {
      "index": "02",
      "title": "Go 控制面",
      "text": "統一承載頁面、API、任務調度、回執處理、權限校驗、審計與文件緩存。",
      "tags": [
        "REST API",
        "WebSocket",
        "Task Dispatch"
      ]
    },
    {
      "index": "03",
      "title": "數據與緩存",
      "text": "生產環境使用 MySQL，開發與測試支持 SQLite；Redis 可作為外部緩存選項。",
      "tags": [
        "MySQL",
        "SQLite",
        "Redis Optional"
      ]
    },
    {
      "index": "04",
      "title": "HostSec Agent",
      "text": "在 Linux 與 Windows 上執行採集、服務檢測、防火牆、WAF、日誌上報、系統優化與自升級。",
      "tags": [
        "Linux",
        "Windows",
        "amd64 / arm64"
      ]
    }
  ],
  "architectureNote": "瀏覽器 → Go 控制面 → 任務與回執 → Linux / Windows 主機",
  "flowEyebrow": "FROM SIGNAL TO ACTION",
  "flowTitle": "運維與安全，不再是兩條割裂的流程",
  "flowLead": "同一份資產上下文貫穿接入、觀察、執行和審計，讓團隊更快確認影響範圍並完成處置。",
  "flowSteps": [
    {
      "index": "01",
      "title": "接入",
      "text": "通過模板和安裝嚮導註冊 Agent，建立主機身份與安全通信。"
    },
    {
      "index": "02",
      "title": "觀察",
      "text": "持續收集狀態、日誌、指標和安全信號，形成統一主機視圖。"
    },
    {
      "index": "03",
      "title": "執行",
      "text": "按授權下發防火牆、WAF、服務、優化與升級任務。"
    },
    {
      "index": "04",
      "title": "驗證",
      "text": "通過任務回執、實時狀態和審計記錄確認變更真正落地。"
    }
  ],
  "controlEyebrow": "SECURITY BOUNDARIES",
  "controlTitle": "控制能力越強，邊界越要清晰",
  "controlLead": "HostSec 將平台與租户登錄態分離，對寫操作執行權限與 CSRF 校驗，並把高風險操作寫入審計記錄。",
  "controls": [
    {
      "title": "多租户隔離",
      "text": "資源讀寫必須匹配租户歸屬，平台能力與租户能力保持清晰邊界。"
    },
    {
      "title": "主機保護",
      "text": "禁用主機停止接收新策略；防火牆寫入繼續校驗地址、端口、時效與重複規則。"
    },
    {
      "title": "操作可追溯",
      "text": "關鍵策略、任務與賬號操作保留操作者、結果和時間線，方便複核與審計。"
    }
  ],
  "faqEyebrow": "QUESTIONS, ANSWERED",
  "faqTitle": "常見問題",
  "faqs": [
    {
      "question": "HostSec 適合管理哪些主機？",
      "answer": "當前 Agent 覆蓋 Linux 與 Windows，並支持 amd64 / arm64 安裝路徑。不同平台會按實際能力展示可用的服務、系統優化、防火牆與 WAF 操作。"
    },
    {
      "question": "平台管理員和租户管理員有什麼區別？",
      "answer": "平台管理員負責租户、平台用户、全局規則、Agent 版本和系統設置；租户管理員只管理本租户的成員、主機、策略、日誌、告警與響應。"
    },
    {
      "question": "HostSec 的 WAF 支持哪些環境？",
      "answer": "當前支持 Nginx 與 IIS。HostSec 規則和 OWASP CRS 分開維護與選擇，策略通過控制面下發並由 Agent 返回執行結果。"
    },
    {
      "question": "是否可以在自己的基礎設施中部署？",
      "answer": "可以。項目提供控制面與 Agent 的部署、構建和運維文檔；生產環境使用 MySQL，Redis 可選，開發和測試也支持 SQLite。"
    }
  ],
  "closingEyebrow": "HOST SECURITY, UNDER CONTROL",
  "closingTitle": "把每一台主機的狀態、策略與響應，放進同一個控制面。",
  "closingLead": "從平台能力與架構開始瞭解 HostSec，或聯繫 GCSA 獲取更多信息。",
  "closingPrimary": "查看平台能力",
  "closingSecondary": "聯繫 GCSA",
  "ecosystem": {
    "eyebrow": "GCSA 安全生態",
    "title": "更多安全產品",
    "description": "從鏈上資產、網絡隱私到家庭與金融環境，將安全防護延伸到每一次數字操作。",
    "officialWebsite": "前往官網",
    "moreTitle": "更多安全產品",
    "moreDescription": "探索完整的 GCSA 安全生態，查看更多面向個人、企業與基礎設施的安全產品。",
    "viewAll": "查看全部產品",
    "products": [
      {
        "type": "安全加密錢包",
        "name": "GCSA Wallet",
        "description": "GCSA Wallet 為個人與團隊提供安全的數字資產管理與鏈上風險識別體驗，幫助用户更安心地查看、接收與轉移資產。",
        "features": [
          "實時地址風險掃描",
          "智能資金來源追蹤",
          "AI 異常風險告警"
        ],
        "href": "https://wallet.gcsa.org/",
        "theme": "wallet"
      },
      {
        "type": "加密網絡與隱私保護",
        "name": "GCSA VPN",
        "description": "GCSA VPN 通過加密連接保護日常上網與公共網絡使用，降低數據泄露風險，為不同設備提供簡單、穩定的安全連接。",
        "features": [
          "加密網絡連接",
          "上網隱私保護",
          "多設備安全訪問"
        ],
        "href": "https://gsafevpn.com/",
        "theme": "vpn"
      },
      {
        "type": "家庭與金融移動安全",
        "name": "GCSA Home Guard",
        "description": "GCSA Home Guard 是面向家庭與金融場景的移動安全體檢平台，結合安全評分、修復建議與雲端威脅情報，及早識別設備漏洞、環境風險與 AI 詐騙威脅。",
        "features": [
          "一鍵安全體檢",
          "家庭設備與攝像頭安全",
          "AI 詐騙與釣魚防護"
        ],
        "href": "https://homeguard.gcsa.org/",
        "theme": "homeGuard"
      }
    ]
  },
  "footer": {
    "menuLabel": "底欄導航",
    "contactUs": "聯繫我們",
    "email": "聯繫郵箱",
    "twitter": "推特",
    "telegram": "Telegram",
    "home": "首頁",
    "products": "GCSA 生態產品",
    "media": "GCSA 媒體",
    "updates": "GCSA 動態",
    "join": "加入聯盟",
    "about": "關於聯盟",
    "privacy": "隱私政策",
    "terms": "使用條款",
    "support": "技術支持",
    "copyright": "© Global Cybersecurity Alliance. 保留所有權利。"
  }
}

export const siteCopy: Record<Locale, SiteCopy> = {
  ...baseSiteCopy,
  'zh-Hant': zhHantCopy,
}
