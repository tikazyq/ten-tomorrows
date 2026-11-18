# 《十个明天》GitHub 仓库状态

**仓库已上线**：[tikazyq/ten-tomorrows](https://github.com/tikazyq/ten-tomorrows)

- 默认分支：`main`
- 可见性：Public
- 版权：当前不附开放许可证；参见 [COPYRIGHT.md](COPYRIGHT.md)
- 章节跟踪：[#1–#11](https://github.com/tikazyq/ten-tomorrows/issues)
- 已审文本：[《永乐城》](chapters/01-永乐城.md)
- Work 入口：[GitHub 协作版主任务](ops/Work_主任务Prompt.md)

## 后续使用

建议在 GitHub 上以 Issue 追踪章节、用分支/PR 提交结构与审稿意见。未经人工批准，不要覆盖已审的第一章或共享正典。

要推进第一轮创作，启动 ChatGPT Work，提供上述仓库链接与 `ops/Work_主任务Prompt.md`。第一轮只处理第 02、03、08 章的结构方案。

自定义标签与 GitHub Projects 看板暂未由连接器配置；[建议标签清单](tracking/labels.md) 可供后续配置。

无需重复执行初始化脚本；如果将来需要补建缺失的章节 Issue，可安装 GitHub CLI 并运行 `python scripts/bootstrap_issues.py`。
