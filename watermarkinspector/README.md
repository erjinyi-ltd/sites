# WATERMARK 官网

GCSA WATERMARK 的产品展示站，基于 Vite、Vue 3 和 TypeScript 构建。

## 本地开发

```powershell
yarn install
yarn dev
```

## 校验与构建

```powershell
yarn typecheck
yarn build
yarn validate:site
```

普通构建会生成首页、隐私政策、使用条款与技术支持的纯静态产物，并校验 canonical、Open Graph、robots、sitemap、法律主体、Firebase 披露和支持邮箱。发布到 OpenAI Sites 时使用 `yarn build:sites`，额外生成 Sites worker 与托管元数据。

## 发布

- `.openai/hosting.json` 记录 Sites 项目绑定，Sites 发布使用生产 `dist` 产物。
- 自定义域名 `watermarkinspector.gcsa.org` 仍通过 `ops/deploy-watermark.sh` 发布静态文件。
- `ops/watermark.conf` 的路由与安全响应头需要由服务器运维单独安装并重载 Nginx；静态文件发布不会自动替换 Nginx 配置。

## 代码结构

- `src/router`：首页、隐私政策、使用条款与技术支持路由
- `src/views`：首页和政策支持页面视图
- `src/content`：简体中文、繁体中文与英文站点及法律支持文案
- `src/composables`：主题和语言偏好
- `src/components`：品牌外壳、首屏、能力、流程、智能打码、隐私、FAQ 与页脚
- `src/styles`：设计 token 与全局基础样式
- `docs`：产品功能与上架说明源文档
