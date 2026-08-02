const updatedDate = {
  "zh-CN": "2026 年 8 月 2 日",
  "zh-Hant": "2026 年 8 月 2 日",
  en: "August 2, 2026",
};

export const privacyCopy = {
  "zh-CN": {
    pageTitle: "隐私政策 | GCSA Home Guard",
    eyebrow: "隐私与数据边界",
    title: "Home Guard\n隐私政策",
    lead:
      "大多数 Home Guard 检测都在您的设备上完成。App 只会为公网 IP 信息、您发起的网络或钱包检查、地点服务，以及必要的分析、崩溃诊断和功能配置联网。本政策用日常语言说明何时会发送什么数据，以及您可以如何管理这些处理。",
    updatedLabel: "最后更新",
    updatedDate: updatedDate["zh-CN"],
    summaryTitle: "一分钟了解",
    summaryText:
      "家庭网络、附近蓝牙、Wi-Fi 和您确认的地点数据默认留在设备上。公网 IP 与粗略位置查询在新安装时默认开启，但可以关闭；网络信息或一键检查会按需联网。Beta 和正式版本还会连接 Firebase 获取功能设置、统计使用情况和诊断崩溃。",
    highlights: [
      "不会上传完整家庭网络或附近设备清单",
      "不会要求您提供或上传私钥、助记词和钱包密码",
      "不出售数据，不用于广告或跨 App 追踪",
      "可关闭公网 IP 与粗略位置查询、撤回权限并按类别清理本地记录",
    ],
    sections: [
      {
        title: "1. Home Guard 如何处理数据",
        paragraphs: [
          "Home Guard 是个人数字安全检测和风险提示工具，可帮助您了解当前网络、家庭设备、附近蓝牙、网络出口、DNS、网络质量、公开钱包地址风险和部分设备安全环境。它不是 VPN、网络代理、防病毒软件或后台监控工具，不会转发您的网络流量、查看网站内容或截获通信内容。",
          "除下文明确说明的联网功能外，网络状态、Wi-Fi 名称和网络标识、家庭设备线索、附近蓝牙线索、网络备注、地点信息、少量受支持 App 入口的可用性以及检测历史都在设备本地处理。检查受支持 App 入口不等于读取完整的已安装 App 列表。",
          "Home Guard 默认不上传完整家庭网络拓扑、完整局域网 IP 清单、原始蓝牙标识、完整 App 清单、私钥、助记词、交易签名、钱包密码或敏感剪贴板内容。您确认的地点坐标如需保存，会在本机加密存储，默认不会由 Home Guard 上传给 GCSA。",
          "家庭设备和附近蓝牙检测由您主动开始。一次扫描在您离开页面或短暂进入后台时可能继续或恢复，但不会变成持续后台监控。",
          "“地点增强”默认关闭。若您开启它，App 在前台且无法仅靠网络标识判断地点时，可能间隔获取位置以匹配您保存的地点；不会在后台持续跟踪或建立位置轨迹。",
        ],
      },
      {
        title: "2. 什么时候会联网",
        paragraphs: [
          "公网 IP 与粗略位置查询在新安装时默认开启。开启后，App 会在每次重新启动时查询当前公网 IP、网络服务商和城市级粗略出口位置；网络出口稳定变化后或您手动刷新时也可能重新查询。",
          "您可以在 App 设置中关闭或重新开启这项查询，重新打开 App 后仍会保留您的选择。根据 IP 得到的位置只是网络出口估算，不是设备的精确位置。",
          "当您运行“网络信息”或“一键检查”时，App 会按检查流程运行 DNS、WebRTC 出口检查和轻量测速；您也可以单独测速。",
          "DNS 探测可能让 IP-API 或 Surfshark 看到发起请求的公网 IP、仅用于当次检查的随机查询信息、DNS 解析器的网络地址和请求时间。",
          "Google 的 STUN 服务可能看到您的公网 IP、连接端口、时间等常规网络信息。",
          "GCSA 服务或您选择的测速节点可能看到公网 IP、请求时间、传输量和随机测试数据，但不会收到您的文件。选择自动测速节点时，App 还可能短暂连接候选节点以确认可用性。",
          "公网 IP 与粗略位置查询开启时，检测到的公网出口或 DNS 解析器 IP 还可能发送给 GCSA，用于显示运营商和粗略出口位置。关闭该设置不会关闭由您发起的 DNS、WebRTC 或测速。Home Guard 不通过这些检查收集浏览历史、完整 DNS 历史或用户文件，也不会附加家庭设备或附近蓝牙清单。",
          "当您使用当前地点、地图选点或地址查询时，Apple 的定位、地图或地址服务可能处理坐标、搜索内容、网络地址和常规请求信息。Home Guard 只将返回结果用于您正在使用的地点功能。",
          "钱包地址检查只在您主动提交公开钱包地址时运行。Home Guard 会把该地址发送给 ChainScan；只有您手动选择区块链时才会同时发送链类型，自动模式由 ChainScan 根据地址判断。该功能不会发送私钥、助记词、钱包密码、交易签名、余额、联系人、登录凭据或钱包 App 内部数据。",
        ],
      },
      {
        title: "3. 使用情况、崩溃与功能设置",
        paragraphs: [
          "Beta 和正式版本使用 Firebase Analytics、Crashlytics 和 Remote Config。它们可能处理 App 安装标识、App 和系统版本、设备信息、启动时间、有限的功能交互、崩溃信息和脱敏诊断数据，用于了解功能是否正常、发现流程问题和修复崩溃。",
          "Remote Config 会在 App 启动或相关功能加载时联网，接收安全规则和功能设置。",
          "发送给 Firebase 的自定义字段不包含原始钱包地址、完整家庭设备清单、Wi-Fi 名称或网络标识、原始蓝牙标识、私钥、助记词或敏感剪贴板内容。Firebase 数据可能与同一 App 安装关联，但不会用于广告或跨 App 追踪。",
        ],
      },
      {
        title: "4. 谁可能处理联网数据",
        paragraphs: [
          "只有完成相关功能或保障服务安全所需的处理方，才可能接触相应数据。GCSA 只允许有职责需要的运维、安全和支持人员访问。与 GCSA 签约的服务商受合同和访问控制约束；公共服务和您选择的独立服务按各自的条款与隐私政策处理数据。",
          "Cloudflare 和 GCSA 基础设施可能记录公网 IP、访问时间、请求地址、响应状态和设备浏览器信息等常规网络日志，用于提供服务、阻止滥用和排查故障。",
        ],
        bullets: [
          "GCSA 网络信息服务：提供公网 IP、粗略出口位置和 DNS 结果分析",
          "ChainScan：提供公开钱包地址风险分析",
          "Google Firebase：提供使用情况分析、崩溃诊断和远程功能配置",
          "Google STUN：在网络信息和一键检查中帮助识别 WebRTC 公网出口",
          "Cloudflare：提供内容分发、连接安全和网络防护",
          "IP-API 与 Surfshark：在您运行包含 DNS 检查的网络信息或一键检查时提供探测服务",
          "GCSA 管理的测速服务，以及 App 中显示的第三方节点（包括 Consortium GARR；部分测试版本也可能提供 Cloudflare 节点）",
          "Apple 定位与地图服务：在您使用当前地点、地图选点或地址查询时提供结果",
        ],
      },
      {
        title: "5. 数据保存多久",
        paragraphs: [
          "不同数据的保存期限取决于数据所在位置和所用服务。我们不会把尚未验证的目标期限写成已经实现的承诺。因适用法律、安全事件或故障调查需要，部分记录可能需要延长保存或暂时限制删除。",
        ],
        bullets: [
          "本地数据：部分扫描和手动测速记录最多保留约 90 天；网络备注、地点等其他类别按各自规则保留。App 的清理入口分别处理临时缓存、部分扫描历史或地点数据；目前不会清除手动测速记录，后者会自动到期或在卸载 App 后删除",
          "公网出口结果：在内存中保留最多约 3 分钟；返回信息可在本机脱敏缓存最多约 24 小时，不保存明文 IP",
          "DNS 分析内容：仅用于当次内存分析，不写入 GCSA 应用数据库；常规基础设施日志仍可能产生",
          "GCSA 基础设施访问日志：通常约 15 天",
          "Firebase Analytics 用户和事件数据：配置为最多约 14 个月；汇总报告可能保留更久",
          "Crashlytics 数据：通常约 90 天后开始删除",
          "Remote Config 与 Firebase 安装标识：不适用 Analytics 的 14 个月期限；Firebase 会保留安装标识，直到 GCSA 发起删除，之后在线和备份系统最长可能需要约 180 天完成删除",
          "ChainScan 钱包分析记录：当前会持续保存，尚无可对外承诺的固定自动删除期限；App 内“删除历史”只清理本地记录",
          "Cloudflare、DNS 探测服务和独立测速服务：按实际配置及各自政策处理，目前没有统一且经过验证的保存上限",
        ],
      },
      {
        title: "6. 权限和您的选择",
        paragraphs: [
          "您可以在 App 设置中关闭公网 IP 与粗略位置查询，并通过对应入口分别清理临时缓存、扫描历史或地点数据。清理入口按类别生效，单个操作不一定删除所有本地记录。",
          "您也可以在 iOS“设置”中撤回本地网络、蓝牙或定位权限。依赖该权限的功能可能不可用，其他功能仍可继续使用。",
          "您可以不运行网络信息、一键检查、单独测速或钱包地址检查，也可以不使用地图和地址功能，以阻止这些功能今后的请求。Firebase 没有单独的 App 内关闭开关。",
          "停止使用或卸载 App 会阻止今后的 App 请求，但不会自动删除已经由 GCSA 或第三方保存的数据。已经完成的网络请求无法撤回。",
        ],
        bullets: [
          "本地网络：用于您主动运行家庭设备和局域网安全检查",
          "蓝牙：用于您主动运行附近设备检查",
          "定位：用于读取 Wi-Fi 名称或网络标识、管理和匹配地点、地图选点和地址查询；地点增强仅在前台按条件获取，不用于持续后台追踪",
          "网络访问：用于公网 IP、DNS、WebRTC 出口检查、测速、Firebase 分析与配置、钱包地址和金融入口风险检查",
        ],
      },
      {
        title: "7. 广告、出售与数据关联",
        paragraphs: [
          "GCSA 不出售或出租用户数据，不向数据经纪商提供数据，不进行定向广告，也不把钱包地址、公网 IP、位置或 Firebase 数据用于跨 App 追踪。Home Guard 不使用 Apple 广告标识，也不请求广告追踪权限。",
          "公网 IP、粗略位置、钱包地址、App 安装标识、功能交互和诊断数据仍可能通过设备、安装标识或请求信息与同一用户或设备形成关联。因此，App Store 隐私申报中将相关类别保守标为“可能与用户关联”，同时标为“不用于追踪”。",
        ],
      },
      {
        title: "8. 您的权利与联系我们",
        paragraphs: [
          "根据适用法律，您可能有权申请访问、更正或删除相关数据，限制或反对部分处理，撤回适用的同意，或就数据处理提出投诉。请发送邮件至 contact@gcsa.org，主题注明“Privacy Request”，并提供大致时间和时区、所用功能及 App 版本。",
          "请勿通过普通邮件发送私钥、助记词、钱包密码或访问令牌；如需完整钱包地址定位记录，GCSA 会先提供更安全的核验方式。",
          "相关数据可能因您、GCSA 或服务提供商所在位置而在您所在国家或地区以外处理。Home Guard 不以儿童为主要用户，也不面向低于适用法律最低年龄的儿童提供专门服务；父母或监护人可以联系我们申请采取适当措施。",
          "如数据处理方式发生实质变化，GCSA 将更新本政策和日期，并在需要时通过 App、官网或其他适当方式通知。GCSA 可能进行合理的身份或记录核验，并会在适用法律要求的期限内处理请求。",
          "数据控制者：Global Cybersecurity Alliance（GCSA）\n官方网站：https://homeguard.gcsa.org/\n隐私、安全或数据请求：contact@gcsa.org",
        ],
      },
    ],
  },
  "zh-Hant": {
    pageTitle: "私隱政策 | GCSA Home Guard",
    eyebrow: "私隱與資料邊界",
    title: "Home Guard\n私隱政策",
    lead:
      "大部分 Home Guard 檢查都在你的裝置上完成。App 只會為公網 IP 資料、你發起的網絡或錢包檢查、地點服務，以及必要的分析、崩潰診斷和功能設定連線。本政策以日常語言說明何時會傳送哪些資料，以及你可以如何管理這些處理。",
    updatedLabel: "最後更新",
    updatedDate: updatedDate["zh-Hant"],
    summaryTitle: "一分鐘了解",
    summaryText:
      "家庭網絡、附近藍牙、Wi-Fi 和你確認的地點資料預設留在裝置上。公網 IP 與概略位置查詢在新安裝時預設開啟，但可以關閉；網絡資料或一鍵檢查會按需連線。Beta 和正式版本亦會連接 Firebase 取得功能設定、統計使用情況和診斷崩潰。",
    highlights: [
      "不會上傳完整家庭網絡或附近裝置清單",
      "不會要求你提供或上傳私鑰、助記詞和錢包密碼",
      "不出售資料，不用於廣告或跨 App 追蹤",
      "可關閉公網 IP 與概略位置查詢、撤回權限並按類別清除本機記錄",
    ],
    sections: [
      {
        title: "1. Home Guard 如何處理資料",
        paragraphs: [
          "Home Guard 是個人數碼安全檢查和風險提示工具，可協助你了解目前網絡、家庭裝置、附近藍牙、網絡出口、DNS、網絡質素、公開錢包地址風險和部分裝置安全環境。它不是 VPN、網絡代理、防毒軟件或背景監控工具，不會轉發你的網絡流量、查看網站內容或截取通訊內容。",
          "除下文明確說明的連線功能外，網絡狀態、Wi-Fi 名稱和網絡標識、家庭裝置線索、附近藍牙線索、網絡備註、地點資料、少量受支援 App 入口的可用性以及檢查歷史都在裝置本機處理。檢查受支援 App 入口不等於讀取完整的已安裝 App 清單。",
          "Home Guard 預設不上傳完整家庭網絡拓撲、完整區域網絡 IP 清單、原始藍牙標識、完整 App 清單、私鑰、助記詞、交易簽署、錢包密碼或敏感剪貼簿內容。你確認的地點座標如需保存，會在本機加密儲存，預設不會由 Home Guard 上傳給 GCSA。",
          "家庭裝置和附近藍牙檢查由你主動開始。一次掃描在你離開頁面或短暫進入背景時可能繼續或恢復，但不會變成持續背景監控。",
          "「地點增強」預設關閉。若你開啟它，App 在前景且無法只靠網絡標識判斷地點時，可能間隔取得位置以配對你保存的地點；不會在背景持續追蹤或建立位置軌跡。",
        ],
      },
      {
        title: "2. 甚麼時候會連線",
        paragraphs: [
          "公網 IP 與概略位置查詢在新安裝時預設開啟。開啟後，App 會在每次重新啟動時查詢目前公網 IP、網絡服務商和城市級概略出口位置；網絡出口穩定變化後或你手動重新整理時亦可能再次查詢。",
          "你可在 App 設定中關閉或重新開啟這項查詢，重新打開 App 後仍會保留你的選擇。根據 IP 得到的位置只是網絡出口估算，不是裝置的精確位置。",
          "當你執行「網絡資料」或「一鍵檢查」時，App 會按檢查流程執行 DNS、WebRTC 出口檢查和輕量速度測試；你亦可單獨測速。",
          "DNS 探測可能讓 IP-API 或 Surfshark 看到發起請求的公網 IP、只用於當次檢查的隨機查詢資料、DNS 解析器的網絡地址和請求時間。",
          "Google 的 STUN 服務可能看到你的公網 IP、連線連接埠、時間等常規網絡資料。",
          "GCSA 服務或你選擇的測速節點可能看到公網 IP、請求時間、傳輸量和隨機測試資料，但不會收到你的檔案。選擇自動測速節點時，App 還可能短暫連接候選節點以確認可用性。",
          "公網 IP 與概略位置查詢開啟時，檢測到的公網出口或 DNS 解析器 IP 還可能傳送給 GCSA，用於顯示網絡服務商和概略出口位置。關閉該設定不會關閉由你發起的 DNS、WebRTC 或速度測試。Home Guard 不透過這些檢查收集瀏覽紀錄、完整 DNS 紀錄或用戶檔案，也不會附加家庭裝置或附近藍牙清單。",
          "當你使用目前位置、地圖選點或地址查詢時，Apple 的定位、地圖或地址服務可能處理座標、搜尋內容、網絡地址和常規請求資料。Home Guard 只會將返回結果用於你正在使用的地點功能。",
          "錢包地址檢查只在你主動提交公開錢包地址時執行。Home Guard 會把該地址傳送給 ChainScan；只有你手動選擇區塊鏈時才會同時傳送鏈類型，自動模式由 ChainScan 根據地址判斷。此功能不會傳送私鑰、助記詞、錢包密碼、交易簽署、結餘、聯絡人、登入憑證或錢包 App 內部資料。",
        ],
      },
      {
        title: "3. 使用情況、崩潰與功能設定",
        paragraphs: [
          "Beta 和正式版本使用 Firebase Analytics、Crashlytics 和 Remote Config。它們可能處理 App 安裝標識、App 和系統版本、裝置資料、啟動時間、有限的功能互動、崩潰資料和經遮蔽診斷資料，用於了解功能是否正常、發現流程問題和修正崩潰。",
          "Remote Config 會在 App 啟動或相關功能載入時連線，接收安全規則和功能設定。",
          "傳送給 Firebase 的自訂欄位不包括原始錢包地址、完整家庭裝置清單、Wi-Fi 名稱或網絡標識、原始藍牙標識、私鑰、助記詞或敏感剪貼簿內容。Firebase 資料可能與同一 App 安裝關聯，但不會用於廣告或跨 App 追蹤。",
        ],
      },
      {
        title: "4. 誰可能處理連線資料",
        paragraphs: [
          "只有完成相關功能或保障服務安全所需的處理方，才可能接觸相應資料。GCSA 只允許有職責需要的營運、安全和支援人員存取。與 GCSA 簽約的服務商受合約和存取控制約束；公共服務和你選擇的獨立服務按各自的條款與私隱政策處理資料。",
          "Cloudflare 和 GCSA 基礎設施可能記錄公網 IP、存取時間、請求地址、回應狀態和裝置瀏覽器資料等常規網絡日誌，用於提供服務、阻止濫用和排查故障。",
        ],
        bullets: [
          "GCSA 網絡資料服務：提供公網 IP、概略出口位置和 DNS 結果分析",
          "ChainScan：提供公開錢包地址風險分析",
          "Google Firebase：提供使用情況分析、崩潰診斷和遙距功能設定",
          "Google STUN：在網絡資料和一鍵檢查中協助識別 WebRTC 公網出口",
          "Cloudflare：提供內容分發、連線安全和網絡防護",
          "IP-API 與 Surfshark：在你執行包含 DNS 檢查的網絡資料或一鍵檢查時提供探測服務",
          "GCSA 管理的測速服務，以及 App 中顯示的第三方節點（包括 Consortium GARR；部分測試版本亦可能提供 Cloudflare 節點）",
          "Apple 定位與地圖服務：在你使用目前位置、地圖選點或地址查詢時提供結果",
        ],
      },
      {
        title: "5. 資料保存多久",
        paragraphs: [
          "不同資料的保存期限取決於資料所在位置和所用服務。我們不會把尚未驗證的目標期限寫成已經實現的承諾。因適用法律、安全事件或故障調查需要，部分記錄可能需要延長保存或暫時限制刪除。",
        ],
        bullets: [
          "本機資料：部分掃描和手動測速記錄最多保留約 90 天；網絡備註、地點等其他類別按各自規則保存。App 的清除入口分別處理暫存、部分掃描歷史或地點資料；目前不會清除手動測速記錄，後者會自動到期或在解除安裝 App 後刪除",
          "公網出口結果：在記憶體保留最多約 3 分鐘；返回資料可在本機遮蔽快取最多約 24 小時，不保存明文 IP",
          "DNS 分析內容：只用於當次記憶體分析，不寫入 GCSA 應用資料庫；常規基礎設施日誌仍可能產生",
          "GCSA 基礎設施存取日誌：通常約 15 天",
          "Firebase Analytics 用戶和事件資料：設定為最多約 14 個月；彙總報告可能保存更久",
          "Crashlytics 資料：通常約 90 天後開始刪除",
          "Remote Config 與 Firebase 安裝標識：不適用 Analytics 的 14 個月期限；Firebase 會保留安裝標識，直到 GCSA 發起刪除，之後線上和備份系統最長可能需要約 180 天完成刪除",
          "ChainScan 錢包分析記錄：目前會持續保存，尚無可對外承諾的固定自動刪除期限；App 內「刪除歷史」只清除本機記錄",
          "Cloudflare、DNS 探測服務和獨立速度測試服務：按實際設定及各自政策處理，目前沒有統一且經過驗證的保存上限",
        ],
      },
      {
        title: "6. 權限和你的選擇",
        paragraphs: [
          "你可以在 App 設定中關閉公網 IP 與概略位置查詢，並透過對應入口分別清除暫存、掃描歷史或地點資料。清除入口按類別生效，單一操作不一定刪除所有本機記錄。",
          "你亦可在 iOS「設定」中撤回本地網絡、藍牙或定位權限。依賴該權限的功能可能不可用，其他功能仍可繼續使用。",
          "你可以不執行網絡資料、一鍵檢查、單獨測速或錢包地址檢查，也可不使用地圖和地址功能，以阻止這些功能今後的請求。Firebase 沒有獨立的 App 內關閉開關。",
          "停止使用或解除安裝 App 會阻止今後的 App 請求，但不會自動刪除已由 GCSA 或第三方保存的資料。已完成的網絡請求無法撤回。",
        ],
        bullets: [
          "本地網絡：用於你主動執行家庭裝置和區域網絡安全檢查",
          "藍牙：用於你主動執行附近裝置檢查",
          "定位：用於讀取 Wi-Fi 名稱或網絡標識、管理和配對地點、地圖選點和地址查詢；地點增強只在前景按條件取得，不用於持續背景追蹤",
          "網絡存取：用於公網 IP、DNS、WebRTC 出口檢查、速度測試、Firebase 分析與設定、錢包地址和金融入口風險檢查",
        ],
      },
      {
        title: "7. 廣告、出售與資料關聯",
        paragraphs: [
          "GCSA 不出售或出租用戶資料，不向資料經紀商提供資料，不進行定向廣告，也不把錢包地址、公網 IP、位置或 Firebase 資料用於跨 App 追蹤。Home Guard 不使用 Apple 廣告標識，也不請求廣告追蹤權限。",
          "公網 IP、概略位置、錢包地址、App 安裝標識、功能互動和診斷資料仍可能透過裝置、安裝標識或請求資料與同一用戶或裝置建立關聯。因此，App Store 私隱申報中將相關類別保守標為「可能與用戶關聯」，同時標為「不用於追蹤」。",
        ],
      },
      {
        title: "8. 你的權利與聯絡我們",
        paragraphs: [
          "根據適用法律，你可能有權申請存取、更正或刪除相關資料，限制或反對部分處理，撤回適用的同意，或就資料處理提出投訴。請傳送電郵至 contact@gcsa.org，主旨註明「Privacy Request」，並提供大約時間和時區、所用功能及 App 版本。",
          "請勿透過普通電郵傳送私鑰、助記詞、錢包密碼或存取權杖；如需完整錢包地址定位記錄，GCSA 會先提供更安全的核驗方式。",
          "相關資料可能因你、GCSA 或服務供應商所在位置而在你所在國家或地區以外處理。Home Guard 不以兒童為主要用戶，也不面向低於適用法律最低年齡的兒童提供專門服務；父母或監護人可以聯絡我們申請採取適當措施。",
          "如資料處理方式有重大變更，GCSA 將更新本政策和日期，並在需要時透過 App、官網或其他適當方式通知。GCSA 可能進行合理的身分或記錄核驗，並會在適用法律要求的期限內處理請求。",
          "資料控制者：Global Cybersecurity Alliance（GCSA）\n官方網站：https://homeguard.gcsa.org/\n私隱、安全或資料請求：contact@gcsa.org",
        ],
      },
    ],
  },
  en: {
    pageTitle: "Privacy Policy | GCSA Home Guard",
    eyebrow: "PRIVACY & DATA BOUNDARIES",
    title: "Home Guard\nPrivacy Policy",
    lead:
      "Most Home Guard checks run on your device. The app connects only for public-IP information, network or wallet checks you start, Place services, and necessary analytics, crash diagnostics, and feature settings. This policy explains in plain language what is sent, when it is sent, and how you can manage that processing.",
    updatedLabel: "Last updated",
    updatedDate: updatedDate.en,
    summaryTitle: "The one-minute summary",
    summaryText:
      "Home-network, nearby-Bluetooth, Wi-Fi, and user-confirmed Place data stays on your device by default. Public-IP and approximate-location lookup starts enabled on a new install but can be turned off; Network Information and One-Tap Check connect as needed. Beta and production versions also connect to Firebase for feature settings, usage analytics, and crash diagnostics.",
    highlights: [
      "Complete home-network and nearby-device lists are not uploaded",
      "Private keys, seed phrases, and wallet passwords are never requested or uploaded",
      "Data is not sold or used for ads or cross-app tracking",
      "You can disable public-IP and approximate-location lookup, revoke permissions, and clear local records by category",
    ],
    sections: [
      {
        title: "1. How Home Guard handles data",
        paragraphs: [
          "Home Guard is a personal digital-safety check and risk-hint tool. It helps you understand your current network, home devices, nearby Bluetooth, network egress, DNS, network quality, public wallet-address risk, and selected device-security conditions. It is not a VPN, network proxy, antivirus product, or background-monitoring tool, and it does not relay your traffic, inspect website content, or intercept communications.",
          "Except for the connected features described below, network status, Wi-Fi name and network identifiers, home-device clues, nearby-Bluetooth clues, network notes, Place information, availability checks for a limited set of supported app entry points, and check history are processed on the device. Checking supported app entry points is not the same as reading a complete installed-app list.",
          "Home Guard does not upload complete home-network topology, complete LAN-IP lists, raw Bluetooth identifiers, a complete app list, private keys, seed phrases, transaction signatures, wallet passwords, or sensitive clipboard content by default. User-confirmed Place coordinates, when saved, are encrypted on the device and are not uploaded by Home Guard to GCSA by default.",
          "You start home-device and nearby-Bluetooth checks. A scan may continue or resume briefly after you leave the page or background the app, but it does not become continuous background monitoring.",
          "Place Enhancement is off by default. If you turn it on, the app may request location at intervals while it is in the foreground and cannot identify a Place from network identifiers alone. It uses this to match Places you saved, not to track location continuously in the background or build a location trail.",
        ],
      },
      {
        title: "2. When the app connects",
        paragraphs: [
          "Public-IP and approximate-location lookup starts enabled on a new install. While enabled, the app looks up the current public IP, network provider, and city-level estimated egress location after each fresh launch. It may look up the information again after a stable network-egress change or when you refresh manually.",
          "You can turn this lookup off or back on in App Settings, and your choice remains after you reopen the app. An IP-based location is an egress estimate, not the device’s precise location.",
          "When you run Network Information or One-Tap Check, the app follows the check flow by running DNS, WebRTC egress checks, and a light speed test; you can also run a separate speed test.",
          "DNS probes may let IP-API or Surfshark see the requesting network’s public IP, random query information used only for that check, the DNS resolver’s network address, and the request time.",
          "Google’s STUN service may see your public IP, connection port, time, and similar network information.",
          "GCSA services or the speed-test node you choose may see the public IP, request time, transfer amount, and random test data, but not your files. Automatic node selection may briefly connect to candidate nodes to confirm availability.",
          "When public-IP and approximate-location lookup is on, public egress or DNS-resolver IPs found by a check may also be sent to GCSA to show the network provider and approximate egress location. Turning that setting off does not disable DNS, WebRTC, or speed tests that you start. Home Guard does not use these checks to collect browsing history, complete DNS history, or user files, and it does not attach home-device or nearby-Bluetooth lists.",
          "When you use current location, map selection, or address lookup, Apple location, map, or geocoding services may process coordinates, search content, network address, and ordinary request information. Home Guard uses the returned result only for the Place feature you are using.",
          "A wallet-address check runs only when you submit a public wallet address. Home Guard sends the address to ChainScan. It also sends a blockchain type only when you choose one manually; in automatic mode, ChainScan determines the type from the address. The feature does not send private keys, seed phrases, wallet passwords, transaction signatures, balances, contacts, login credentials, or wallet-app internal data.",
        ],
      },
      {
        title: "3. Usage, crashes, and feature settings",
        paragraphs: [
          "Beta and production versions use Firebase Analytics, Crashlytics, and Remote Config. They may process an app-installation identifier, app and system versions, device information, launch time, limited feature interactions, crash information, and redacted diagnostics to understand whether features work, find flow problems, and fix crashes.",
          "Remote Config connects when the app starts or a relevant feature loads to receive security rules and feature settings.",
          "Firebase custom fields do not include raw wallet addresses, complete home-device lists, Wi-Fi names or network identifiers, raw Bluetooth identifiers, private keys, seed phrases, or sensitive clipboard content. Firebase data may be associated with the same app installation, but it is not used for advertising or cross-app tracking.",
        ],
      },
      {
        title: "4. Who may process connected data",
        paragraphs: [
          "Only providers needed to deliver a feature or protect the service may process the relevant data. GCSA limits access to operations, security, and support personnel with a role-based need. Providers under contract with GCSA are subject to contract and access controls; public services and independent services you select process data under their own terms and privacy policies.",
          "Cloudflare and GCSA infrastructure may record ordinary network logs such as public IP, access time, request address, response status, and device-browser information to provide the service, prevent abuse, and diagnose faults.",
        ],
        bullets: [
          "GCSA network-information services: public-IP, estimated egress location, and DNS-result analysis",
          "ChainScan: public wallet-address risk analysis",
          "Google Firebase: usage analytics, crash diagnostics, and remote feature settings",
          "Google STUN: identifying WebRTC public egress during Network Information and One-Tap Check",
          "Cloudflare: content delivery, connection security, and network protection",
          "IP-API and Surfshark: probes used when you run Network Information or One-Tap Check with DNS checks",
          "GCSA-managed speed-test services and third-party nodes shown in the app, including Consortium GARR; some test versions may also offer a Cloudflare node",
          "Apple location and map services: current location, map selection, and address lookup results",
        ],
      },
      {
        title: "5. How long data is kept",
        paragraphs: [
          "Retention depends on where the data is held and which service is used. We do not present an unverified target period as an implemented promise. Some records may need to be kept longer or temporarily restricted from deletion when required by law, a security incident, or a fault investigation.",
        ],
        bullets: [
          "Local data: some scan and manual speed-test records are kept for up to about 90 days; network notes, Place data, and other categories follow their own rules. In-app actions separately clear temporary cache, some scan history, or Place data. They do not currently clear manual speed-test records, which expire automatically or are removed when you uninstall the app",
          "Public-egress result: kept in memory for up to about 3 minutes; returned information may use a redacted on-device cache for up to about 24 hours without retaining the plaintext IP",
          "DNS-analysis content: used in memory for that analysis and not written to a GCSA application database; ordinary infrastructure logs may still be created",
          "GCSA infrastructure access logs: usually about 15 days",
          "Firebase Analytics user and event data: configured for up to about 14 months; aggregate reports may be kept longer",
          "Crashlytics data: deletion generally begins after about 90 days",
          "Remote Config and Firebase installation identifiers: the 14-month Analytics period does not apply. Firebase keeps the identifier until GCSA initiates deletion; removal from live and backup systems may then take up to about 180 days",
          "ChainScan wallet-analysis records: currently persist without a fixed automatic deletion period that GCSA can promise; Delete History in the app clears only local records",
          "Cloudflare, DNS-probe services, and independent speed-test services: handled under their actual configurations and policies, with no single verified retention limit",
        ],
      },
      {
        title: "6. Permissions and your choices",
        paragraphs: [
          "You can disable public-IP and approximate-location lookup in App Settings and use the matching actions to clear temporary cache, scan history, or Place data. Cleanup actions work by category; one action may not remove every local record.",
          "You can also revoke Local Network, Bluetooth, or Location access in iOS Settings. Features that rely on a revoked permission may stop working; unrelated features remain available.",
          "You can avoid Network Information, One-Tap Check, separate speed tests, wallet-address checks, maps, and address lookup to prevent future requests from those features. Firebase has no separate in-app off switch.",
          "Stopping use or uninstalling the app prevents future app requests, but it does not automatically delete data already retained by GCSA or a provider. A completed network request cannot be withdrawn.",
        ],
        bullets: [
          "Local Network: user-initiated home-device and LAN-safety checks",
          "Bluetooth: user-initiated nearby-device checks",
          "Location: Wi-Fi name or network-identifier access, Place management and matching, map selection, and address lookup; Place Enhancement requests it only under foreground conditions, not for continuous background tracking",
          "Network access: public IP, DNS, WebRTC egress checks, speed tests, Firebase analytics and settings, wallet-address, and financial-entry risk checks",
        ],
      },
      {
        title: "7. Advertising, sale, and data association",
        paragraphs: [
          "GCSA does not sell or rent user data, provide it to data brokers, use it for targeted advertising, or use wallet addresses, public IP, location, or Firebase data for cross-app tracking. Home Guard does not use Apple’s advertising identifier or request advertising-tracking permission.",
          "Public IP, approximate location, wallet address, app-installation identifiers, feature interactions, and diagnostics may still be associated with the same person or device through device, installation, or request information. The App Store privacy disclosure therefore conservatively marks relevant categories as potentially linked to the user while marking them as not used for tracking.",
        ],
      },
      {
        title: "8. Your rights and how to contact us",
        paragraphs: [
          "Depending on applicable law, you may have rights to access, correct, or delete relevant data; restrict or object to some processing; withdraw applicable consent; or complain about data handling. Email contact@gcsa.org with the subject “Privacy Request” and include the approximate time and time zone, feature used, and app version.",
          "Do not send private keys, seed phrases, wallet passwords, or access tokens in ordinary email. If a complete wallet address is needed to locate a record, GCSA will first provide a safer verification method.",
          "Relevant data may be processed outside your country or region depending on where you, GCSA, or a provider is located. Home Guard is not primarily directed to children and does not offer a service specifically for children below the minimum age set by applicable law; a parent or guardian may contact us to request appropriate action.",
          "If data practices change materially, GCSA will update this policy and date and provide notice through the app, website, or another appropriate method when required. GCSA may perform reasonable identity or record verification and will handle requests within the period required by applicable law.",
          "Data controller: Global Cybersecurity Alliance (GCSA)\nOfficial website: https://homeguard.gcsa.org/\nPrivacy, security, or data requests: contact@gcsa.org",
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
