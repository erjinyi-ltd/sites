# GCSA HostSec Site

HostSec 产品介绍站点，内容依据 `GCSA-HostSec` 当前产品实现与文档整理。

```powershell
yarn
yarn dev
```

生产构建：

```powershell
yarn build
```

普通构建仅输出静态站点文件。发布到 OpenAI Sites 时使用 `yarn build:sites`，额外生成 Sites worker 与托管元数据。
