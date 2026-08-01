const updatedDate = {
  "zh-CN": "2026 年 7 月 30 日",
  "zh-Hant": "2026 年 7 月 30 日",
  en: "July 30, 2026",
};

export const privacyCopy = {
  "zh-CN": {
    pageTitle: "隐私政策 | GCSA Home Guard",
    eyebrow: "隐私与数据边界",
    title: "Home Guard\n隐私政策",
    lead:
      "Home Guard 采用“本地处理优先、最小必要联网”的设计原则。本政策说明本地网络、附近设备、公网 IP、DNS、数字货币钱包地址、Firebase 与基础设施日志的处理边界。",
    updatedLabel: "最后更新",
    updatedDate: updatedDate["zh-CN"],
    summaryTitle: "核心隐私边界",
    summaryText:
      "原始局域网、Wi-Fi、蓝牙与用户确认的地点数据默认留在设备本机；联网功能仅处理完成请求、保障服务安全和定位故障所需的数据。",
    highlights: [
      "原始局域网与 BLE 扫描结果默认不上传",
      "钱包地址仅在用户主动检查时发送",
      "Tracking 为 No，不用于广告或跨 App 追踪",
      "证据不足时相关数据保守按 Linked = Yes 处理",
    ],
    sections: [
      {
        title: "1. 产品定位与服务边界",
        paragraphs: [
          "Home Guard 是个人数字安全检测和风险提示工具，帮助用户了解当前网络、家庭局域网设备线索、附近 BLE 广播线索、网络出口与 DNS 安全信息、数字货币钱包地址风险和部分设备安全环境信息。",
          "Home Guard 不是 VPN、网络代理、流量转发、MDM、防病毒或后台监控工具。它不会路由或转发用户流量，不会查看网站内容、截获通信，也不会作为系统级网络过滤器运行。",
        ],
      },
      {
        title: "2. 本地处理优先",
        paragraphs: [
          "除本政策明确说明的联网功能外，大多数检测在设备本地完成。应用可在本机处理网络状态、VPN/Proxy 线索、SSID/BSSID 可用性、网络备注、Bonjour/mDNS 和局域网设备线索、BLE 广播摘要、用户确认的地点信息、有限 URL Scheme 检测结果及本地历史。",
          "应用默认不上传原始 SSID/BSSID、局域网扫描结果、局域网 IP 完整列表、家庭网络拓扑、BLE 原始标识、完整已安装 App 列表、URL Scheme 完整命中名单、私钥、助记词、交易签名、钱包密码或敏感剪贴板内容。Beta/正式版远程诊断最多发送脱敏后的模块、状态、数量或稳定错误代码。",
          "用户确认的坐标如需用于地点恢复或合并，仅在本机加密保存，默认不上传。用户清理 App 数据或重置地点数据后，相应本地记录会被删除。",
        ],
      },
      {
        title: "3. 家庭设备、BLE 与位置",
        paragraphs: [
          "用户主动运行家庭设备检测时，应用可能读取 Bonjour/mDNS 服务、局域网响应、服务类型和设备分类线索；用户主动运行附近设备检测时，应用可能读取 BLE 广播名称、信号强度、厂商信息和广播摘要。这些数据用于本地展示和安全提示。",
          "应用不会建立位置轨迹或持续后台扫描局域网/BLE。用户主动发起的一次扫描在离开页面或短暂切入后台时可能尽量继续或恢复，但不会转变为持续后台监控。",
          "定位权限用于读取 Wi-Fi 名称/BSSID、辅助地点管理、用户主动地图选点或地址反查。用户确认的位置默认留在设备本地，不用于广告定位或持续位置跟踪。",
        ],
      },
      {
        title: "4. 公网 IP 与 DNS Analysis",
        paragraphs: [
          "公网出口 IP 与网络出口位置估算默认可用，当前版本没有单独启停开关。App 每次冷启动自动查询一次；用户也可手动刷新、运行网络信息检测或一键检查。仅回到前台或重开 Dashboard 不会再触发一次冷启动查询。",
          "ip.gcsa.org 可能处理当前公网 IP、DNS 解析器公网 IP、来源标记、ASN、网络服务商、国家/地区、城市级粗略位置，以及连接自然产生的时间、路径、方法、状态、User-Agent 和安全标记。请求不会附加 SSID、BSSID、局域网设备或 BLE 数据。网络出口位置是估算值，不是设备精确位置。",
          "当前出口结果在内存中缓存最多约 3 分钟；已查询 IP 的返回元数据可使用散列键在本机脱敏缓存最多约 24 小时，不持久化明文 IP。",
          "仅当用户主动运行 DNS Analysis 时，App 才会通过 IP-API 和 Surfshark DNS 探针使用随机一次性查询标签。相关服务可能观察公网 IP、查询标签、解析器/EDNS 出口、时间和请求元数据。App 随后最多向 ip.gcsa.org 发送 8 个“解析器公网 IP + 来源标记”用于内存分析；请求体不附加账号、SSID、BSSID、局域网或 BLE 数据，也不写入 GCSA 应用数据库。",
          "Home Guard 不通过 DNS Analysis 收集浏览历史、完整 DNS 查询历史或网站内容。IP-API 公布其匿名 API 客户端 IP 在内存中最多保留约 1 分钟且不记录请求；Surfshark 公布其公共 DNS 不记录浏览活动。实际处理以各服务最新官方政策为准。",
        ],
      },
      {
        title: "5. 数字货币钱包地址风险分析",
        paragraphs: [
          "该功能仅在用户主动提交公开的钱包地址时运行。App 向 chainscan.gcsa.org 提交原始 address 和可选 chain；结果查询只包含分析任务 ID 和语言。Home Guard 不发送私钥、助记词、钱包密码、交易签名、余额、联系人地址簿、Cookie、API Key、Access Token、Home Guard 账号或钱包 App 内部数据。",
          "钱包地址用于风险检测、公开链上活动分析、生成结果和短期复用。钱包地址不等同实名身份，但可能通过公开链上活动、IP、User-Agent、时间或其他数据与个人或设备形成关联。",
          "ChainScan 记录可能包括原始地址、链、服务端分析选项、任务/结果状态、提交时间和来源，并可能关联请求 IP、IP 粗略位置、User-Agent，以及其他 ChainScan 客户端已登录时的用户标识。Home Guard 当前匿名调用，但仍保守按 Linked = Yes 处理；钱包地址不用于广告、数据经纪或跨 App 追踪。",
          "ChainScan 当前持久化 Home Guard 来源的钱包分析记录。App 内“删除历史”只删除或隐藏本地历史，不等于服务端物理删除。在自动 TTL 或有证据的人工清理上线前，GCSA 不声明已实现固定 30 天删除上限。用户可以按第 11 节申请访问或删除；30 天内物理删除或不可逆去标识化仍需后台完成并验证。",
        ],
      },
      {
        title: "6. Firebase Analytics 与 Crashlytics",
        paragraphs: [
          "Beta 和正式版本使用 Firebase Analytics 与 Crashlytics。Analytics 可能处理 Firebase 安装标识、App/系统/设备信息、时间、App 启动、Product Interaction，以及白名单内的模块、事件、级别、数量、状态和稳定错误代码，用于了解功能使用、识别流程失败和改进体验。",
          "Crashlytics 可能处理 Firebase/Crashlytics 安装标识、崩溃和非致命异常、堆栈、App/系统版本、设备型号与状态、时间、性能和脱敏诊断属性，用于定位稳定性问题。",
          "Firebase 自定义字段不包含原始钱包地址、原始局域网设备列表、SSID/BSSID、BLE 原始标识、私钥、助记词或敏感剪贴板内容。Firebase 标识与事件可能关联同一 App 安装。Home Guard 不使用 IDFA，不为广告追踪请求 ATT，也不将 Firebase 数据用于广告或跨 App 追踪。",
          "仅获授权的 GCSA Firebase 项目成员和受 Google/Firebase 权限控制的人员可按职责访问。Analytics 用户级/事件级数据配置不超过 14 个月；Crashlytics 数据通常在约 90 天后开始删除；适用删除指令可能最多需要约 180 天完成在线和备份清理。",
        ],
      },
      {
        title: "7. Cloudflare、源站日志与访问权限",
        paragraphs: [
          "homeguard.gcsa.org、ip.gcsa.org 和 chainscan.gcsa.org 使用 Cloudflare 提供 CDN、TLS 和网络安全保护，并由 GCSA 管理的源站提供服务。",
          "Cloudflare 可能处理源 IP、时间、主机名、路径和查询字符串、请求方法、TLS/安全信号、状态、响应大小、User-Agent 和 Ray ID。Cloudflare edge 留存取决于实际启用的产品与配置；当前没有证据证明所有 edge 日志存在统一固定上限。",
          "GCSA 源站日志通常记录远端或代理 IP、时间、方法、路径和查询字符串、状态、响应大小、来源页面和 User-Agent；标准访问日志不记录 POST 请求体。Nginx 访问和错误日志按日轮转，保留当前文件和最多 14 个历史轮转，通常约 15 天。",
          "应用数据和日志仅限有职责需要的 GCSA 运维、安全和支持人员、获授权 ChainScan 管理/审核角色，以及受合同、服务条款和自身访问控制约束的 Cloudflare、Google/Firebase、IP-API 与 Surfshark 人员访问。",
        ],
      },
      {
        title: "8. 广告、出售、Tracking 与 Linked",
        paragraphs: [
          "GCSA 不出售或出租用户数据，不向数据经纪商提供数据，不使用用户数据进行定向广告，也不把钱包地址、IP、位置或 Firebase 数据用于跨 App 追踪。因此 App Privacy 中 Tracking 保持 No。",
          "公网 IP、粗略位置、钱包地址、Firebase 安装标识、Product Interaction 和诊断数据可能通过设备、安装标识、请求元数据或其他信息形成关联。在缺少充分去标识化和禁止关联证据时，相关数据保守按 Linked = Yes 处理。",
        ],
      },
      {
        title: "9. 权限用途",
        paragraphs: [
          "本地网络权限用于用户主动的家庭设备可见性和局域网安全检查；Bluetooth 权限用于用户主动的附近 BLE 检测；定位权限用于 Wi-Fi 名称/BSSID、地点管理、地图选点和地址反查；网络访问用于公网 IP/DNS 分析、网络诊断/测速、Firebase 诊断、钱包地址和金融入口风险查询。",
          "用户可在 iOS“设置”中撤回本地网络、Bluetooth 或定位权限。撤回后，依赖相应权限的功能可能不可用，但其他功能仍可使用。",
        ],
      },
      {
        title: "10. 留存边界",
        paragraphs: [
          "本地历史、网络备注和地点数据保存在设备本地并可由用户清理；公网出口结果内存缓存最多约 3 分钟；已查询 IP 返回元数据本机脱敏缓存最多约 24 小时；DNS Analysis 请求体只做内存分析，不写入 GCSA 应用数据库。",
          "GCSA 源站日志通常约 15 天；Cloudflare edge 取决于实际产品和配置且当前没有统一已证上限；ChainScan 当前持久化钱包分析记录且 30 天删除/去标识化仍待后台证据；Firebase Analytics 最多约 14 个月，Crashlytics 通常约 90 天后开始删除，适用 Firebase 删除最长可能约 180 天；已关闭支持请求通常不超过 24 个月。",
          "因适用法律、安全事件或故障调查需要，部分记录可能被限制删除或延长必要留存。",
        ],
      },
      {
        title: "11. 删除、撤回与用户权利",
        paragraphs: [
          "用户可在 App 内清理本地数据，在 iOS 设置撤回权限，不主动运行钱包或 DNS Analysis 以阻止未来提交，或停止使用/卸载 App 以阻止未来自动公网 IP 与 Firebase 请求。当前版本的公网 IP 冷启动查询没有独立 App 内开关。",
          "已完成的网络请求不能撤回，但仍在留存的数据可以申请访问、更正、删除、限制或反对处理。请发送邮件至 contact@gcsa.org，主题注明“Privacy Request”，并提供大致 UTC 时间、使用功能和 App 版本。请勿通过普通邮件发送私钥、助记词、钱包密码或 Access Token；如定位记录需要完整地址，GCSA 会先提供更安全的核验方式。",
          "GCSA 可能进行合理身份或记录核验，并在适用法律要求的期限内处理请求。",
        ],
      },
      {
        title: "12. 国际处理、儿童、更新与联系",
        paragraphs: [
          "根据用户、基础设施和第三方服务位置，数据可能在用户所在国家或地区以外处理。GCSA 通过适用法律、合同、服务商安全措施和访问控制保护相关数据。App Store 地区可能随发布计划变化，因此商店地区列表不作为本政策的数据处理边界。",
          "Home Guard 不以儿童为主要用户群体，也不面向低于适用法律最低年龄的儿童提供专门服务。GCSA 不会在明知情况下违反适用法律处理儿童个人数据；父母或监护人可通过 contact@gcsa.org 请求采取删除、限制或其他适当措施。",
          "如功能、处理方、数据字段、用途、留存或删除方式发生实质变化，GCSA 将更新本政策和日期，并在适用法律要求时通过 App、官网或其他适当方式通知用户。",
          "本服务由 Global Cybersecurity Alliance（GCSA）提供。",
          "官方网站：https://homeguard.gcsa.org/\n隐私、安全或数据请求：contact@gcsa.org。",
        ],
      },
    ],
  },
  "zh-Hant": {
    pageTitle: "私隱政策 | GCSA Home Guard",
    eyebrow: "私隱與資料邊界",
    title: "Home Guard\n私隱政策",
    lead:
      "Home Guard 採用「本機處理優先、最少必要連線」的設計原則。本政策說明本地網絡、附近裝置、公網 IP、DNS、數碼貨幣錢包地址、Firebase 與基礎設施日誌的處理邊界。",
    updatedLabel: "最後更新",
    updatedDate: updatedDate["zh-Hant"],
    summaryTitle: "核心私隱邊界",
    summaryText:
      "原始區域網絡、Wi-Fi、藍牙與用戶確認的地點資料預設留在裝置本機；連網功能只處理完成請求、保障服務安全和排查故障所需的資料。",
    highlights: [
      "原始區域網絡與 BLE 掃描結果預設不上傳",
      "錢包地址只在用戶主動檢查時傳送",
      "Tracking 為 No，不用於廣告或跨 App 追蹤",
      "證據不足時相關資料保守按 Linked = Yes 處理",
    ],
    sections: [
      {
        title: "1. 產品定位與服務邊界",
        paragraphs: [
          "Home Guard 是個人數碼安全檢測和風險提示工具，協助用戶了解目前網絡、家庭區域網絡裝置線索、附近 BLE 廣播線索、網絡出口與 DNS 安全資料、數碼貨幣錢包地址風險和部分裝置安全環境資料。",
          "Home Guard 不是 VPN、網絡代理、流量轉發、MDM、防毒或背景監控工具。它不會路由或轉發用戶流量，不會查看網站內容、截取通訊，也不會作為系統級網絡過濾器運作。",
        ],
      },
      {
        title: "2. 本機處理優先",
        paragraphs: [
          "除本政策明確說明的連網功能外，大部分檢測在裝置本機完成。App 可在本機處理網絡狀態、VPN/Proxy 線索、SSID/BSSID 可用性、網絡備註、Bonjour/mDNS 和區域網絡裝置線索、BLE 廣播摘要、用戶確認的地點資料、有限 URL Scheme 檢測結果及本機歷史。",
          "App 預設不上傳原始 SSID/BSSID、區域網絡掃描結果、區域網絡 IP 完整清單、家庭網絡拓撲、BLE 原始標識、完整已安裝 App 清單、URL Scheme 完整命中清單、私鑰、助記詞、交易簽署、錢包密碼或敏感剪貼簿內容。Beta/正式版遙距診斷最多傳送經遮蔽的模組、狀態、數量或穩定錯誤代碼。",
          "用戶確認的座標如需用於地點恢復或合併，只會在本機加密保存，預設不上傳。用戶清除 App 資料或重設地點資料後，相關本機記錄會被刪除。",
        ],
      },
      {
        title: "3. 家庭裝置、BLE 與位置",
        paragraphs: [
          "用戶主動執行家庭裝置檢測時，App 可能讀取 Bonjour/mDNS 服務、區域網絡回應、服務類型和裝置分類線索；主動執行附近裝置檢測時，App 可能讀取 BLE 廣播名稱、訊號強度、製造商資料和廣播摘要。這些資料用於本機顯示和安全提示。",
          "App 不會建立位置軌跡或持續在背景掃描區域網絡/BLE。用戶主動發起的一次掃描在離開頁面或短暫切入背景時可能盡量繼續或恢復，但不會變成持續背景監控。",
          "定位權限用於讀取 Wi-Fi 名稱/BSSID、輔助地點管理、用戶主動地圖選點或地址反查。用戶確認的位置預設留在裝置本機，不用於廣告定位或持續位置追蹤。",
        ],
      },
      {
        title: "4. 公網 IP 與 DNS Analysis",
        paragraphs: [
          "公網出口 IP 與網絡出口位置估算預設可用，目前版本沒有獨立開關。App 每次冷啟動自動查詢一次；用戶亦可手動重新整理、執行網絡資料檢測或一鍵檢查。只回到前景或重開 Dashboard 不會再觸發一次冷啟動查詢。",
          "ip.gcsa.org 可能處理目前公網 IP、DNS 解析器公網 IP、來源標記、ASN、網絡服務商、國家/地區、城市級概略位置，以及連線自然產生的時間、路徑、方法、狀態、User-Agent 和安全標記。請求不附加 SSID、BSSID、區域網絡裝置或 BLE 資料。網絡出口位置是估算值，不是裝置精確位置。",
          "目前出口結果在記憶體快取最多約 3 分鐘；已查詢 IP 的返回中繼資料可使用雜湊鍵在本機遮蔽快取最多約 24 小時，不持久保存明文 IP。",
          "只有用戶主動執行 DNS Analysis 時，App 才會透過 IP-API 和 Surfshark DNS 探針使用隨機一次性查詢標籤。相關服務可能觀察公網 IP、查詢標籤、解析器/EDNS 出口、時間和請求中繼資料。App 隨後最多向 ip.gcsa.org 傳送 8 個「解析器公網 IP + 來源標記」作記憶體分析；請求內容不附加帳戶、SSID、BSSID、區域網絡或 BLE 資料，也不寫入 GCSA 應用資料庫。",
          "Home Guard 不透過 DNS Analysis 收集瀏覽紀錄、完整 DNS 查詢紀錄或網站內容。IP-API 公布其匿名 API 客戶端 IP 在記憶體最多保留約 1 分鐘且不記錄請求；Surfshark 公布其公共 DNS 不記錄瀏覽活動。實際處理以各服務最新官方政策為準。",
        ],
      },
      {
        title: "5. 數碼貨幣錢包地址風險分析",
        paragraphs: [
          "此功能只在用戶主動提交公開錢包地址時執行。App 向 chainscan.gcsa.org 提交原始 address 和可選 chain；結果查詢只包含分析工作 ID 和語言。Home Guard 不傳送私鑰、助記詞、錢包密碼、交易簽署、結餘、聯絡人地址簿、Cookie、API Key、Access Token、Home Guard 帳戶或錢包 App 內部資料。",
          "錢包地址用於風險檢測、公開鏈上活動分析、產生結果和短期重用。錢包地址不等同實名身分，但可能透過公開鏈上活動、IP、User-Agent、時間或其他資料與個人或裝置建立關聯。",
          "ChainScan 記錄可能包括原始地址、鏈、伺服器端分析選項、工作/結果狀態、提交時間和來源，並可能關聯請求 IP、IP 概略位置、User-Agent，以及其他 ChainScan 客戶端已登入時的用戶標識。Home Guard 目前匿名呼叫，但仍保守按 Linked = Yes 處理；錢包地址不用於廣告、資料經紀或跨 App 追蹤。",
          "ChainScan 目前持久保存 Home Guard 來源的錢包分析記錄。App 內「刪除歷史」只刪除或隱藏本機歷史，不等於伺服器物理刪除。在自動 TTL 或有證據的人工清理上線前，GCSA 不聲稱已實現固定 30 天刪除上限。用戶可按第 11 節申請存取或刪除；30 天內物理刪除或不可逆去識別化仍需後台完成並驗證。",
        ],
      },
      {
        title: "6. Firebase Analytics 與 Crashlytics",
        paragraphs: [
          "Beta 和正式版本使用 Firebase Analytics 與 Crashlytics。Analytics 可能處理 Firebase 安裝標識、App/系統/裝置資料、時間、App 啟動、Product Interaction，以及白名單內的模組、事件、級別、數量、狀態和穩定錯誤代碼，用於了解功能使用、識別流程失敗和改善體驗。",
          "Crashlytics 可能處理 Firebase/Crashlytics 安裝標識、崩潰和非致命例外、堆疊、App/系統版本、裝置型號與狀態、時間、效能和經遮蔽診斷屬性，用於定位穩定性問題。",
          "Firebase 自訂欄位不包括原始錢包地址、原始區域網絡裝置清單、SSID/BSSID、BLE 原始標識、私鑰、助記詞或敏感剪貼簿內容。Firebase 標識與事件可能關聯同一 App 安裝。Home Guard 不使用 IDFA，不為廣告追蹤請求 ATT，也不將 Firebase 資料用於廣告或跨 App 追蹤。",
          "只有獲授權的 GCSA Firebase 專案成員和受 Google/Firebase 權限控制的人員可按職責存取。Analytics 用戶級/事件級資料設定不超過 14 個月；Crashlytics 資料通常在約 90 天後開始刪除；適用刪除指令可能最多需要約 180 天完成在線和備份清理。",
        ],
      },
      {
        title: "7. Cloudflare、源站日誌與存取權限",
        paragraphs: [
          "homeguard.gcsa.org、ip.gcsa.org 和 chainscan.gcsa.org 使用 Cloudflare 提供 CDN、TLS 和網絡安全保護，並由 GCSA 管理的源站提供服務。",
          "Cloudflare 可能處理來源 IP、時間、主機名稱、路徑和查詢字串、請求方法、TLS/安全訊號、狀態、回應大小、User-Agent 和 Ray ID。Cloudflare edge 保存期取決於實際啟用的產品與設定；目前沒有證據證明所有 edge 日誌存在統一固定上限。",
          "GCSA 源站日誌通常記錄遠端或代理 IP、時間、方法、路徑和查詢字串、狀態、回應大小、來源頁面和 User-Agent；標準存取日誌不記錄 POST 請求內容。Nginx 存取和錯誤日誌每日輪替，保留目前檔案和最多 14 個歷史輪替，通常約 15 天。",
          "應用資料和日誌只限有職責需要的 GCSA 營運、安全和支援人員、獲授權 ChainScan 管理/審核角色，以及受合約、服務條款和自身存取控制約束的 Cloudflare、Google/Firebase、IP-API 與 Surfshark 人員存取。",
        ],
      },
      {
        title: "8. 廣告、出售、Tracking 與 Linked",
        paragraphs: [
          "GCSA 不出售或出租用戶資料，不向資料經紀商提供資料，不使用用戶資料作定向廣告，也不把錢包地址、IP、位置或 Firebase 資料用於跨 App 追蹤。因此 App Privacy 中 Tracking 保持 No。",
          "公網 IP、概略位置、錢包地址、Firebase 安裝標識、Product Interaction 和診斷資料可能透過裝置、安裝標識、請求中繼資料或其他資料建立關聯。在缺少充分去識別化和禁止關聯證據時，相關資料保守按 Linked = Yes 處理。",
        ],
      },
      {
        title: "9. 權限用途",
        paragraphs: [
          "本地網絡權限用於用戶主動的家庭裝置可見性和區域網絡安全檢查；Bluetooth 權限用於用戶主動的附近 BLE 檢測；定位權限用於 Wi-Fi 名稱/BSSID、地點管理、地圖選點和地址反查；網絡存取用於公網 IP/DNS 分析、網絡診斷/測速、Firebase 診斷、錢包地址和金融入口風險查詢。",
          "用戶可在 iOS「設定」撤回本地網絡、Bluetooth 或定位權限。撤回後，依賴相關權限的功能可能不可用，但其他功能仍可使用。",
        ],
      },
      {
        title: "10. 保存期限",
        paragraphs: [
          "本機歷史、網絡備註和地點資料保存在裝置本機並可由用戶清除；公網出口結果記憶體快取最多約 3 分鐘；已查詢 IP 返回中繼資料本機遮蔽快取最多約 24 小時；DNS Analysis 請求內容只作記憶體分析，不寫入 GCSA 應用資料庫。",
          "GCSA 源站日誌通常約 15 天；Cloudflare edge 取決於實際產品和設定且目前沒有統一已證上限；ChainScan 目前持久保存錢包分析記錄且 30 天刪除/去識別化仍待後台證據；Firebase Analytics 最多約 14 個月，Crashlytics 通常約 90 天後開始刪除，適用 Firebase 刪除最長可能約 180 天；已關閉支援請求通常不超過 24 個月。",
          "因適用法律、安全事件或故障調查需要，部分記錄可能被限制刪除或延長必要保存期。",
        ],
      },
      {
        title: "11. 刪除、撤回與用戶權利",
        paragraphs: [
          "用戶可在 App 內清除本機資料，在 iOS 設定撤回權限，不主動執行錢包或 DNS Analysis 以阻止未來提交，或停止使用/解除安裝 App 以阻止未來自動公網 IP 與 Firebase 請求。目前版本的公網 IP 冷啟動查詢沒有獨立 App 內開關。",
          "已完成的網絡請求不能撤回，但仍在保存的資料可以申請存取、更正、刪除、限制或反對處理。請電郵 contact@gcsa.org，主旨註明「Privacy Request」，並提供大約 UTC 時間、所用功能和 App 版本。請勿透過普通電郵傳送私鑰、助記詞、錢包密碼或 Access Token；如定位記錄需要完整地址，GCSA 會先提供更安全的核驗方式。",
          "GCSA 可能進行合理身分或記錄核驗，並在適用法律要求的期限內處理請求。",
        ],
      },
      {
        title: "12. 國際處理、兒童、更新與聯絡",
        paragraphs: [
          "根據用戶、基礎設施和第三方服務位置，資料可能在用戶所在國家或地區以外處理。GCSA 透過適用法律、合約、服務商安全措施和存取控制保護相關資料。App Store 地區可能隨發佈計劃改變，因此商店地區清單不作為本政策的資料處理邊界。",
          "Home Guard 不以兒童為主要用戶群，也不面向低於適用法律最低年齡的兒童提供專門服務。GCSA 不會在明知情況下違反適用法律處理兒童個人資料；父母或監護人可透過 contact@gcsa.org 請求採取刪除、限制或其他適當措施。",
          "如功能、處理方、資料欄位、用途、保存期或刪除方式有重大變更，GCSA 將更新本政策和日期，並在適用法律要求時透過 App、官網或其他適當方式通知用戶。",
          "本服務由 Global Cybersecurity Alliance（GCSA）提供。",
          "官方網站：https://homeguard.gcsa.org/\n私隱、安全或資料請求：contact@gcsa.org。",
        ],
      },
    ],
  },
  en: {
    pageTitle: "Privacy Policy | GCSA Home Guard",
    eyebrow: "PRIVACY & DATA BOUNDARIES",
    title: "Home Guard\nPrivacy Policy",
    lead:
      "Home Guard follows a “local processing first, minimum necessary connectivity” design principle. This policy explains the boundaries for local networks, nearby devices, public IP, DNS, cryptocurrency wallet addresses, Firebase, and infrastructure logs.",
    updatedLabel: "Last updated",
    updatedDate: updatedDate.en,
    summaryTitle: "Core privacy boundaries",
    summaryText:
      "Raw local-network, Wi-Fi, Bluetooth, and user-confirmed Place data stays on the device by default. Connected features process only the data needed to complete requests, secure services, and diagnose faults.",
    highlights: [
      "Raw local-network and BLE scan results are not uploaded by default",
      "Wallet addresses are sent only for a user-initiated check",
      "Tracking is No; data is not used for ads or cross-app tracking",
      "Where evidence is incomplete, relevant data is conservatively Linked = Yes",
    ],
    sections: [
      {
        title: "1. Product Positioning and Service Boundaries",
        paragraphs: [
          "Home Guard is a personal digital-safety check and risk-hint tool. It helps users understand their current network, home-LAN device clues, nearby BLE advertisements, public-egress and DNS safety information, cryptocurrency wallet-address risk, and selected device-security environment information.",
          "Home Guard is not a VPN, network proxy, traffic relay, MDM, antivirus, or background-monitoring tool. It does not route or relay user traffic, inspect website content, intercept communications, or operate as a system-level network filter.",
        ],
      },
      {
        title: "2. Local Processing First",
        paragraphs: [
          "Except for the connected features expressly described in this policy, most checks run on the device. The app may locally process network status, VPN/proxy clues, SSID/BSSID availability, network notes, Bonjour/mDNS and LAN-device clues, BLE advertisement summaries, user-confirmed Place information, limited URL-scheme results, and local history.",
          "By default, the app does not upload raw SSIDs/BSSIDs, raw LAN scans, complete LAN-IP lists, home-network topology, raw BLE identifiers, the complete installed-app list, the complete URL-scheme hit list, private keys, seed phrases, transaction signatures, wallet passwords, or sensitive clipboard content. Beta/production remote diagnostics send at most redacted module names, status, counts, or stable error codes.",
          "User-confirmed coordinates, when needed for Place recovery or merging, are encrypted and stored only on the device and are not uploaded by default. Clearing app data or resetting Place data deletes the corresponding local records.",
        ],
      },
      {
        title: "3. Home Devices, BLE, and Location",
        paragraphs: [
          "During a user-initiated home-device check, the app may read Bonjour/mDNS services, LAN responses, service types, and device-classification clues. During a user-initiated nearby-device check, it may read BLE names, signal strength, manufacturer information, and advertisement summaries. This data supports local display and safety hints.",
          "The app does not build location trails or continuously scan LAN/BLE in the background. A user-initiated scan may try to continue or resume briefly after the user leaves the page or backgrounds the app, but it does not become continuous monitoring.",
          "Location permission supports Wi-Fi name/BSSID access, Place management, user-initiated map selection, and address reverse lookup. User-confirmed Place data stays on the device by default and is not used for advertising location or continuous tracking.",
        ],
      },
      {
        title: "4. Public IP and DNS Analysis",
        paragraphs: [
          "Public-egress IP and estimated network-egress location lookup is available by default and has no separate switch in the current version. The app automatically performs one lookup per cold start; a user can also refresh manually or start Network Information or a one-tap check. Merely returning to the foreground or reopening Dashboard does not trigger another cold-start lookup.",
          "ip.gcsa.org may process the current public IP, public DNS-resolver IP, source marker, ASN, network provider, country/region, city-level approximate location, and connection metadata such as time, path, method, status, User-Agent, and security markers. Requests do not attach SSID, BSSID, LAN-device, or BLE data. Network-egress location is an estimate, not precise device location.",
          "Current-egress results stay in memory for up to approximately three minutes. Returned metadata for a queried IP may use a hashed, redacted on-device cache for up to approximately 24 hours; plaintext IP is not persisted.",
          "Only when a user actively runs DNS Analysis does the app use random one-time query labels through IP-API and Surfshark DNS probes. These services may observe public IP, query label, resolver/EDNS egress, time, and request metadata. The app then sends at most eight “resolver public IP + source marker” rows to ip.gcsa.org for in-memory analysis. The body does not attach an account, SSID, BSSID, LAN, or BLE data and is not written to a GCSA application database.",
          "Home Guard does not use DNS Analysis to collect browsing history, complete DNS history, or website content. IP-API states that its anonymous API keeps the client IP in memory for up to approximately one minute and does not log requests; Surfshark states that its public DNS does not log browsing activity. Each provider’s latest official policy controls.",
        ],
      },
      {
        title: "5. Cryptocurrency Wallet-Address Risk Analysis",
        paragraphs: [
          "This feature runs only after a user actively submits a public wallet address. The app submits raw address and optional chain to chainscan.gcsa.org; a result query contains only the analysis job ID and language. Home Guard does not send private keys, seed phrases, wallet passwords, signatures, balances, contact address books, cookies, API keys, access tokens, a Home Guard account, or wallet-app internal data.",
          "The wallet address is used for risk checks, public blockchain analysis, result generation, and brief result reuse. It is not the same as a real-name identity, but public blockchain activity, IP, User-Agent, time, or other data may associate it with a person or device.",
          "ChainScan records may include the raw address, chain, server-side options, job/result status, submission time and source, and may associate them with request IP, IP-derived approximate location, User-Agent, and an identifier when another ChainScan client is logged in. Home Guard calls anonymously but conservatively treats the data as Linked = Yes. Wallet addresses are not used for ads, data brokering, or cross-app tracking.",
          "ChainScan currently persists Home Guard wallet-analysis records. “Delete history” in the app deletes or hides local history and is not physical server deletion. Until an automatic TTL or evidenced manual purge exists, GCSA does not claim an implemented fixed 30-day limit. A user may request access or deletion under Section 11; physical deletion or irreversible de-identification within 30 days remains a backend control that must be completed and verified.",
        ],
      },
      {
        title: "6. Firebase Analytics and Crashlytics",
        paragraphs: [
          "Beta and production versions use Firebase Analytics and Crashlytics. Analytics may process Firebase installation identifiers, app/system/device information, time, app starts, Product Interaction, and allowlisted module, event, level, count, status, and stable error codes to understand feature use, identify flow failures, and improve experience.",
          "Crashlytics may process Firebase/Crashlytics installation identifiers, crashes and non-fatal errors, stacks, app/system versions, device model and state, time, performance, and redacted diagnostic attributes to diagnose stability problems.",
          "Firebase custom fields do not include raw wallet addresses, raw LAN-device lists, SSIDs/BSSIDs, raw BLE identifiers, private keys, seed phrases, or sensitive clipboard content. Firebase identifiers and events may link to the same app installation. Home Guard does not use IDFA, request ATT for advertising tracking, or use Firebase data for ads or cross-app tracking.",
          "Access is limited to authorized GCSA Firebase-project members and personnel governed by Google/Firebase controls. Analytics user/event data is configured for no more than 14 months; Crashlytics deletion generally begins after approximately 90 days; applicable live and backup deletion may take up to approximately 180 days.",
        ],
      },
      {
        title: "7. Cloudflare, Origin Logs, and Access",
        paragraphs: [
          "homeguard.gcsa.org, ip.gcsa.org, and chainscan.gcsa.org use Cloudflare for CDN, TLS, and network-security protection and use origins managed by GCSA.",
          "Cloudflare may process source IP, time, hostname, path and query string, method, TLS/security signals, status, response size, User-Agent, and Ray ID. Edge retention depends on the products and configuration actually enabled; current evidence does not establish one fixed limit for all edge logs.",
          "GCSA origin logs typically record remote/proxy IP, time, method, path and query string, status, response size, referrer, and User-Agent; standard access logs do not record POST bodies. Nginx access and error logs rotate daily and keep the active file plus at most 14 historical rotations, usually approximately 15 days.",
          "Application data and logs are accessible only to GCSA operations, security, and support personnel with a role-based need, authorized ChainScan administration/review roles, and Cloudflare, Google/Firebase, IP-API, and Surfshark personnel governed by applicable contracts, service terms, and provider controls.",
        ],
      },
      {
        title: "8. Advertising, Sale, Tracking, and Linked Data",
        paragraphs: [
          "GCSA does not sell or rent user data, provide it to data brokers, use it for targeted advertising, or use wallet addresses, IP, location, or Firebase data for cross-app tracking. Tracking therefore remains No in App Privacy.",
          "Public IP, approximate location, wallet address, Firebase installation identifiers, Product Interaction, and diagnostic data may still be linked through the device, installation identifiers, request metadata, or other details. Where sufficient de-identification and no-join evidence is absent, the data is conservatively treated as Linked = Yes.",
        ],
      },
      {
        title: "9. Permission Purposes",
        paragraphs: [
          "Local Network permission supports user-initiated home-device and LAN-safety checks; Bluetooth supports user-initiated nearby-BLE checks; Location supports Wi-Fi name/BSSID, Place management, map selection, and address lookup; network access supports public-IP/DNS analysis, diagnostics/speed tests, Firebase diagnostics, and wallet-address or financial-entry risk queries.",
          "A user can revoke Local Network, Bluetooth, or Location permission in iOS Settings. Features that depend on a revoked permission may become unavailable, while unrelated features remain available.",
        ],
      },
      {
        title: "10. Retention Boundaries",
        paragraphs: [
          "Local history, network notes, and Place data remain on the device and can be cleared by the user; public-egress results remain in memory for up to approximately three minutes; queried-IP metadata may use a redacted on-device cache for up to approximately 24 hours; DNS Analysis bodies are processed in memory and not written to a GCSA application database.",
          "GCSA origin logs are usually retained for approximately 15 days; Cloudflare edge retention depends on actual products/configuration and has no single evidenced limit; ChainScan currently persists wallet records and still requires evidence of 30-day deletion/de-identification; Firebase Analytics is retained for up to approximately 14 months, Crashlytics deletion generally begins after approximately 90 days, applicable Firebase deletion may take up to approximately 180 days, and closed support requests are usually retained no more than 24 months.",
          "Deletion may be restricted or necessary retention extended where required by applicable law, a security incident, or a fault investigation.",
        ],
      },
      {
        title: "11. Deletion, Withdrawal, and User Rights",
        paragraphs: [
          "A user may clear local data in the app, revoke permissions in iOS Settings, avoid wallet or DNS Analysis to prevent future submissions, or stop using/uninstall the app to prevent future automatic public-IP and Firebase requests. The current cold-start public-IP lookup has no separate in-app switch.",
          "A completed network request cannot be withdrawn, but retained data may be subject to access, correction, deletion, restriction, or objection. Email contact@gcsa.org with subject “Privacy Request” and include approximate UTC time, feature used, and app version. Do not send private keys, seed phrases, wallet passwords, or access tokens in ordinary email; if a complete address is required to locate a record, GCSA will first provide a safer verification method.",
          "GCSA may perform reasonable identity or record verification and will handle requests within the period required by applicable law.",
        ],
      },
      {
        title: "12. International Processing, Children, Updates, and Contact",
        paragraphs: [
          "Depending on user, infrastructure, and provider locations, data may be processed outside the user’s country or region. GCSA protects relevant data through applicable law, contracts, provider security measures, and access controls. App Store availability may change with the release plan, so a storefront list is not a data-processing boundary in this policy.",
          "Home Guard is not primarily directed to children and does not provide a service specifically directed below the minimum age set by applicable law. GCSA does not knowingly process children’s personal data in violation of applicable law; a parent or guardian may contact contact@gcsa.org to request deletion, restriction, or other appropriate measures.",
          "If features, processors, data fields, purposes, retention, or deletion methods change materially, GCSA will update this policy and date and provide notice through the app, website, or another appropriate method where required.",
          "This service is provided by Global Cybersecurity Alliance (GCSA).",
          "Official website: https://homeguard.gcsa.org/\nPrivacy, security, or data requests: contact@gcsa.org.",
        ],
      },
    ],
  },
};

export type PrivacyLocale = keyof typeof privacyCopy;
export type LegalPage = "home" | "privacy" | "terms" | "support";
export type LegalPageKind = Exclude<LegalPage, "home">;

export function selectLegalCopy<PrivacyCopy, FallbackCopy>(
  page: LegalPage,
  locale: PrivacyLocale,
  privacyByLocale: Record<PrivacyLocale, PrivacyCopy>,
  fallbackByLocale: Record<
    PrivacyLocale,
    Record<Exclude<LegalPageKind, "privacy">, FallbackCopy>
  >,
) {
  if (page === "home") return null;
  if (page === "privacy") return privacyByLocale[locale];
  return fallbackByLocale[locale][page];
}
