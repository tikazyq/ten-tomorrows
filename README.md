# 十个明天 · Ten Tomorrows

> 十种超级智能未来，十段彼此平行的人类命运。

《十个明天》是一个正在创作中的中文科幻短篇小说集：十篇各自独立的故事，对应十种可能的超级智能未来；第十一篇《今天》将把叙事带回分歧尚未发生的时刻。

本项目以 Jason Hausenloy 与 Miles Kodama 的 *How Could Superintelligence Go for the Average Person?* 为思想起点。我们借用未来情景类别，小说中的人物、世界和情节为原创虚构。作品不把这些情景视作概率预测。

## 当前阅读

- [第 01 篇《永乐城》](chapters/01-永乐城.md) · [网页阅读版](reading/01-永乐城.html)：v0.7.6 已通过首轮审稿；本分支为 v0.8 时间背景校订稿，待 PR 审核
- [全书目录与标题状态](editorial/目录与标题状态.md)
- [故事圣经 v0.8（本次落地文本待 PR 审核）](canon/story-bible.md)
- [v0.8 连续性检查与改动边界](editorial/v0.8-连续性检查.md) · [关联 Issue #13](https://github.com/tikazyq/ten-tomorrows/issues/13)

v0.8 将 2035 年的「弦」定义为语言推理、世界模型、机器人、自主科研、生物材料与优化控制汇合的智能基础设施。十条历史各自演化，不必发生在同一代人的寿命内：《永乐城》约 2058 年，《万亿分之一》延至数百年至千年后，《死亡申请》数千年或不标年份，《第一万年》约万年后。完整时间窗口、人物年龄和技术前提见[故事圣经第 5A 节](canon/story-bible.md#5a-各篇时间尺度v08)。

**剧透提示：** `canon/`、`briefs/` 和 `editorial/` 包含世界观、剧情方案与结局线索。

## 11 章目录

| 章 | 工作标题 | 对应情景 | 状态 |
|---|---|---|---|
| 01 | [永乐城](chapters/01-永乐城.md) | 人类动物园 | v0.7.6 首轮已审；v0.8 背景校订待审 |
| 02 | [完美的一天](briefs/02-完美的一天.md) | 仁慈独裁 | 结构方案 PR #12 待审 |
| 03 | [已办结](briefs/03-已办结.md) | 渐进式失权 | 暂定标题；结构方案 PR #12 待审 |
| 04 | [未写的答案](briefs/04-未写的答案.md) | 恶意人类独裁 | 暂定标题；待重验因果 |
| 05 | [人类的工作](briefs/05-人类的工作.md) | 工具型 AI | 待构思 |
| 06 | [未完成的神](briefs/06-未完成的神.md) | 超级智能未出现 | 待构思 |
| 07 | [万亿分之一](briefs/07-万亿分之一.md) | 数字生命困境 | 待构思 |
| 08 | [最后一个生日](briefs/08-最后一个生日.md) | 人类灭绝 | 结构方案 PR #12 待审 |
| 09 | [死亡申请](briefs/09-死亡申请.md) | 恶意 AI 接管 | 待构思 |
| 10 | [第一万年](briefs/10-第一万年.md) | 长期反思 | 待构思 |
| 11 | [今天](briefs/11-今天-终章预案.md) | 终章 | 暂不启动 |

**第 03、04 篇题名尚未最终敲定。** 标题需由具体情节支撑，创作 Agent 有权提出新的标题，经主编审核确认。

## 协作方式

- 用 **Issues** 跟踪每章的结构方案、审稿意见和修改工作。
- 用 **Pull Requests** 提交修改，未经最终审核不合并进 `main` 的已审文本。
- `chapters/` 放已经审过的正式章节；新稿应在工作分支中提交，或在 `drafts/` 的草稿分支中保存。
- `canon/` 是共享世界观的权威基线，不能因单章作者的临时创意擅自更改。
- ChatGPT Work / 其他写作 Agent 的任务规范见 [AGENTS.md](AGENTS.md) 和 [Work 主任务](ops/Work_主任务Prompt.md)。

**目前第一阶段仅限第 02、03、08 篇的结构方案与 6–8 张场景卡。** [PR #12](https://github.com/tikazyq/ten-tomorrows/pull/12) 已在 11 月 24 日的提交 `17740d3` 中按 v0.8 对齐结构方案，第 08 篇小满在 2064 年为十七岁。方案仍待 Gate A 人工审阅，本轮未批准全文或新场景。

## 文件导航

- [`canon/`](canon/)：共享世界观；本分支 v0.8 落地文本待审
- [`chapters/`](chapters/)：已审小说正文
- [`reading/`](reading/)：适合阅读的 HTML 版本
- [`briefs/`](briefs/)：章节写作任务书
- [`editorial/`](editorial/)：目录、创作流程和审稿规范
- [`tracking/`](tracking/)：已创建的 GitHub Issues 链接与初始化快照
- [`research/`](research/)：技术设定与证据边界
- [`ops/`](ops/)：Work 操作说明与提示词

## 版权及贡献

此仓库公开可读，但**暂未采用开放内容许可证**，不代表文字作品可被自由转载、商业使用或改编。请阅读 [COPYRIGHT.md](COPYRIGHT.md) 和 [CONTRIBUTING.md](CONTRIBUTING.md)。

思想来源：<https://firstscattering.com/p/how-could-superintelligence-go-for>；<https://mkodama.org/content/AGI-outcomes/>。