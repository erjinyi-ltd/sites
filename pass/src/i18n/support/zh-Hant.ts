import type { LegalPageCopy } from "../legal";

export default {
  pageTitle: "技術支援｜GCSA PassRecover",
  eyebrow: "GCSA PassRecover 支援",
  title: "技術支援",
  lead: "取得安裝、檔案匯入、恢復任務、字典及 Mac App Store 版本的使用協助。",
  updatedLabel: "支援範圍",
  updatedDate: "桌面版與 Mac App Store 版",
  summaryTitle: "聯絡我們之前",
  summaryText: "請先準備 App 版本、macOS 版本、問題發生步驟及不含敏感內容的錯誤資訊。",
  highlights: [
    "恢復任務和結果只在本機處理",
    "請勿傳送密碼、私鑰、助記詞或目標檔案",
    "通常會在兩個工作天內回覆"
  ],
  sections: [
    {
      title: "1. 取得協助",
      paragraphs: [
        "寄送郵件時請註明 GCSA PassRecover 版本、裝置與系統版本、預期結果、實際結果，以及可安全分享的任務日誌片段。",
        "請先確認問題是否能在重新選擇檔案、重新匯入字典或重新啟動 App 後重現。"
      ]
    },
    {
      title: "2. Mac App Store 版說明",
      paragraphs: [
        "Mac App Store 版受 App Sandbox 保護，不提供實體磁碟直接讀取。請使用你有權處理的磁碟映像、容器、文件、壓縮檔、錢包檔案或雜湊檔案。",
        "本機字典在匯入時會複製到 App 容器。若舊字典無法使用，請在字典工具中重新匯入。"
      ]
    },
    {
      title: "3. 連線與私隱",
      paragraphs: [
        "連線字典預設關閉，只有在你主動啟用並設定來源後才會存取網絡。目標檔案、恢復結果和主密碼不會上傳給我們。",
        "支援郵件可能包含個人資料。請只提供解決問題所需的內容。"
      ]
    },
    {
      title: "4. 聯絡支援",
      paragraphs: [
        "如仍需協助，請寄送郵件至下方地址。安全漏洞請在主旨註明 Security，並避免在尚未建立安全傳輸方式前附加敏感樣本。"
      ]
    }
  ],
  contactAction: "contact@gcsa.org"
} satisfies LegalPageCopy;
