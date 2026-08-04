# GCSA CLEANER 官网

基于 Vite、Vue 3 与 TypeScript 的 GCSA CLEANER 产品展示站点。

产品文案来源：

- `docs/website-feature-overview.md`：macOS 产品能力与边界
- `C:\Users\Administrator\Desktop\github\windowsCleaner`：Windows 版当前开发事实与规划边界

Windows 版仍在开发中，站点不提供下载入口，也不把规划功能描述为已发布能力。

## 构建

```powershell
yarn build
```

普通构建仅输出静态站点文件。发布到 OpenAI Sites 时使用 `yarn build:sites`，额外生成 Sites worker 与托管元数据。
