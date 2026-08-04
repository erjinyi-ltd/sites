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

普通构建仅输出静态站点文件到 `dist/`。发布到 OpenAI Sites 时使用 `yarn build:sites`，额外生成 SPA 路由回退所需的 Sites worker 与托管元数据。

## 独立发布

仓库 `ops/` 目录提供 Home Guard 独立发布入口：

```powershell
.\ops\deploy-homeguard.ps1
```

```bash
./ops/deploy-homeguard.sh
```
