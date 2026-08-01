# GCSA Home Guard 官网

Home Guard 的 Vue 3 官网。站点保留原有首页、隐私政策、使用条款、技术支持、多语言与明暗主题，并统一迁移到当前仓库的 Vite + Vue 3 + TypeScript 技术栈。

## 本地开发

```bash
yarn
yarn dev
```

## 验证与构建

```bash
yarn typecheck
yarn build
```

生产构建输出到 `dist/`。构建脚本同时生成 SPA 路由回退所需的 Sites worker，并保留 `.openai/hosting.json`。

## 独立发布

仓库 `ops/` 目录提供 Home Guard 独立发布入口：

```powershell
.\ops\deploy-homeguard.ps1
```

```bash
./ops/deploy-homeguard.sh
```
