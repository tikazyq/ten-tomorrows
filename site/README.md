# 《十个明天》阅读站

使用 Node.js 24。在仓库根目录下运行 `cd site && npm ci && npm run dev`，本地开发默认显示作者书架。设置 `AUTHOR_SITE_MODE=false` 可关闭本地工作区。`npm run build` 默认仅生成已审章节，`npm run build:preview` 加入可用草稿，`npm run preview` 浏览当前构建产物，`npm run check` 运行 Astro 类型检查。

## Vercel 作者入口

1. 导入 `tikazyq/ten-tomorrows`，将 Root Directory 设为 `site`，保留自动检测的 Astro 框架和默认构建命令。启用 **Include source files outside of the Root Directory in the Build Step**，让构建读取仓库根目录的稿件。
2. 在项目的 **Deployment Protection → Vercel Authentication** 中选择 **All Deployments**。先确认退出 Vercel 登录后，访问 `https://ten-tomorrows.vercel.app` 会要求登录，并将访问权限限定为作者。
3. 为 **Production** 设置 `AUTHOR_SITE_MODE=true` 后重新部署。作者从同一个地址访问 11 章和工作区。需要验证 GitHub 身份时，在对应的构建环境设置仅有该仓库读取权限的 `GITHUB_TOKEN`。
4. 如需转为公开阅读，删除 Production 的 `AUTHOR_SITE_MODE` 并重新部署。继续保持 Vercel Authentication，直到确认公开构建只含已审正文。解除访问限制前，删除所有含私稿且可能随保护设置变更而公开的历史部署。

Vercel Production 默认只含已审章节。`AUTHOR_SITE_MODE=true` 会生成任务书、草稿和工作区的静态页面，访问控制由 Vercel Authentication 提供。Vercel Preview 未开启作者模式时默认加载可用草稿，仍可用 `INCLUDE_DRAFTS=false` 关闭。普通本地构建可用 `INCLUDE_DRAFTS=true` 加入草稿。

草稿位置记录在 `src/data/draft-sources.json`。草稿和第二阶段审读笔记依次从当前检出、本地 Git 引用和 GitHub 读取。作者书架所需的稿件缺失时构建会失败。普通预览若缺少草稿，会记到构建日志，并在目录显示为创作中。
