import type { LegalPageCopy } from "../legal";

export default {
  pageTitle: "技术支持｜GCSA PassRecover",
  eyebrow: "GCSA PassRecover 支持",
  title: "技术支持",
  lead: "获取安装、文件导入、恢复任务、字典和 Mac App Store 版本的使用帮助。",
  updatedLabel: "支持范围",
  updatedDate: "桌面版与 Mac App Store 版",
  summaryTitle: "联系我们之前",
  summaryText: "请先准备应用版本、macOS 版本、问题发生步骤和不含敏感内容的错误信息。",
  highlights: [
    "恢复任务和结果只在本机处理",
    "请勿发送密码、私钥、助记词或目标文件",
    "通常会在两个工作日内回复"
  ],
  sections: [
    {
      title: "1. 获取帮助",
      paragraphs: [
        "发送邮件时请注明 GCSA PassRecover 版本、设备与系统版本、预期结果、实际结果，以及可以安全分享的任务日志片段。",
        "请先确认问题是否能在重新选择文件、重新导入字典或重启应用后复现。"
      ]
    },
    {
      title: "2. Mac App Store 版说明",
      paragraphs: [
        "Mac App Store 版受 App Sandbox 保护，不提供物理磁盘直接读取。请使用你有权处理的磁盘镜像、容器、文档、压缩包、钱包文件或哈希文件。",
        "本地字典在导入时会复制到应用容器。若旧字典不可用，请在字典工具中重新导入。"
      ]
    },
    {
      title: "3. 联网与隐私",
      paragraphs: [
        "联网字典默认关闭，只有在你主动启用并配置来源后才会访问网络。目标文件、恢复结果和主密码不会上传给我们。",
        "支持邮件可能包含个人信息。请仅提供解决问题所必需的内容。"
      ]
    },
    {
      title: "4. 联系支持",
      paragraphs: [
        "如仍需帮助，请发送邮件至下方地址。安全漏洞请在主题中注明 Security，并避免在未建立安全传输方式前附加敏感样本。"
      ]
    }
  ],
  contactAction: "contact@gcsa.org"
} satisfies LegalPageCopy;
