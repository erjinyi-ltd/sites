export type Locale = "zh-CN" | "zh-Hant" | "en";
export type Theme = "dark" | "light";

export type LocaleOption = {
  id: Locale;
  name: string;
  code: string;
};

export type SiteChromeCopy = {
  brand: string;
  navHome: string;
  navDownload: string;
  navCoverage: string;
  navSecurity: string;
  downloadActive: string;
  footerCopyright: string;
  footerContact: string;
  privacyPolicy: string;
  termsOfUse: string;
  support: string;
  skipToContent: string;
  pageNavLabel: string;
  switchToLight: string;
  switchToDark: string;
  switchLanguage: string;
  openMenu: string;
  closeMenu: string;
  mobileNavLabel: string;
};

export const localeOptions: LocaleOption[] = [
  { id: "zh-CN", name: "简体中文", code: "CN" },
  { id: "zh-Hant", name: "繁體中文", code: "HK" },
  { id: "en", name: "English", code: "EN" }
];

export const siteChromeCopy: Record<Locale, SiteChromeCopy> = {
  "zh-CN": {
    brand: "PassRecover",
    navHome: "首页",
    navDownload: "下载",
    navCoverage: "能力",
    navSecurity: "边界",
    downloadActive: "下载",
    footerCopyright: "© Global Cybersecurity Alliance. 保留所有权利。",
    footerContact: "contact@gcsa.org",
    privacyPolicy: "隐私政策",
    termsOfUse: "使用条款",
    support: "技术支持",
    skipToContent: "跳至主要内容",
    pageNavLabel: "页面导航",
    switchToLight: "切换至浅色主题",
    switchToDark: "切换至深色主题",
    switchLanguage: "切换语言",
    openMenu: "打开导航菜单",
    closeMenu: "关闭导航菜单",
    mobileNavLabel: "移动端页面导航"
  },
  "zh-Hant": {
    brand: "PassRecover",
    navHome: "首頁",
    navDownload: "下載",
    navCoverage: "能力",
    navSecurity: "邊界",
    downloadActive: "下載",
    footerCopyright: "© Global Cybersecurity Alliance. 保留所有權利。",
    footerContact: "contact@gcsa.org",
    privacyPolicy: "隱私政策",
    termsOfUse: "使用條款",
    support: "技術支援",
    skipToContent: "跳至主要內容",
    pageNavLabel: "頁面導覽",
    switchToLight: "切換至淺色主題",
    switchToDark: "切換至深色主題",
    switchLanguage: "切換語言",
    openMenu: "開啟導覽選單",
    closeMenu: "關閉導覽選單",
    mobileNavLabel: "行動版頁面導覽"
  },
  en: {
    brand: "PassRecover",
    navHome: "Home",
    navDownload: "Download",
    navCoverage: "Coverage",
    navSecurity: "Boundary",
    downloadActive: "Download",
    footerCopyright: "© Global Cybersecurity Alliance. All rights reserved.",
    footerContact: "contact@gcsa.org",
    privacyPolicy: "Privacy Policy",
    termsOfUse: "Terms of Use",
    support: "Support",
    skipToContent: "Skip to main content",
    pageNavLabel: "Page navigation",
    switchToLight: "Switch to light theme",
    switchToDark: "Switch to dark theme",
    switchLanguage: "Switch language",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    mobileNavLabel: "Mobile page navigation"
  }
};
