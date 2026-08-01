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
```

## 代码结构

- `src/router`：首页、隐私政策、使用条款与技术支持路由
- `src/views`：首页和政策支持页面视图
- `src/content`：简体中文、繁体中文与英文站点及法律支持文案
- `src/composables`：主题和语言偏好
- `src/components`：品牌外壳、首屏、能力、流程、智能打码、隐私、FAQ 与页脚
- `src/styles`：设计 token 与全局基础样式
- `docs`：产品功能与上架说明源文档
