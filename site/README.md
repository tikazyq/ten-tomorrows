# 《十个明天》阅读站

使用 Node.js 24。在仓库根目录下运行 `cd site && npm ci && npm run dev`，本地开发预览已审章节和可用草稿。`npm run build` 生成仅含已审章节的 `dist/`。`npm run build:preview` 也加载可用草稿。`npm run preview` 浏览当前构建产物，`npm run check` 运行 Astro 类型检查。

## Vercel 设置

1. 导入 `tikazyq/ten-tomorrows`，将 Root Directory 设为 `site`，保留自动检测的 Astro 框架和默认构建命令。启用 **Include source files outside of the Root Directory in the Build Step**，让构建能读取仓库根目录的 `chapters/`。
2. 首次部署设置两种环境的 `INCLUDE_DRAFTS=false`。在项目设置中为 **Preview Deployments** 启用 **Deployment Protection → Vercel Authentication**，确认预览只有授权审阅者可访问后，删除 Preview 环境的 `INCLUDE_DRAFTS=false` 并重新部署。所有可访问草稿的人都必须受项目访问权限约束。
3. Vercel Production 始终只包含已审章节。Vercel Preview 和本地开发默认加入可用草稿，普通本地构建默认只含已审章节。Production 以外的环境可用 `INCLUDE_DRAFTS=true` 或 `false` 覆盖默认值。远端需要身份验证时，仅给 Preview 环境配置对该仓库有只读权限的 `GITHUB_TOKEN`。

草稿位置记录在 `src/data/draft-sources.json`。构建先读当前检出，再查本地 Git 引用，最后读取 GitHub。缺失的草稿会记到构建日志，并在目录显示为创作中。已审章节以 `chapters/` 中的文件为准。
