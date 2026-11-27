# 十个明天 · Ten Tomorrows

> 十种超级智能未来，十段彼此平行的人类命运。

《十个明天》是一个正在创作中的中文科幻短篇小说集：十篇各自独立的故事，对应十种可能的超级智能未来；第十一篇《今天》将把叙事带回分歧尚未发生的时刻。

本项目以 Jason Hausenloy 与 Miles Kodama 的 *How Could Superintelligence Go for the Average Person?* 为思想起点。我们借用未来情景类别，小说中的人物、世界和情节为原创虚构。作品不把这些情景视作概率预测。

## 当前阅读

- [第 01 篇《永乐城》](chapters/01-永乐城.md) · [网页阅读版](reading/01-永乐城.html)：已审定稿，v0.8 背景校订已合并。[PR #14](https://github.com/tikazyq/ten-tomorrows/pull/14)
- [全书目录与进度](editorial/目录与标题状态.md)
- [故事圣经 v0.8](canon/story-bible.md)

v0.8 将 2035 年的「弦」定义为语言推理、世界模型、机器人、自主科研、生物材料与优化控制汇合的智能基础设施。十条历史各自演化，不必发生在同一代人的寿命内：《永乐城》约 2058 年，《万亿分之一》延至数百年至千年后，《死亡申请》数千年或不标年份，《第一万年》约万年后。完整时间窗口、人物年龄和技术前提见[故事圣经第 5A 节](canon/story-bible.md#5a-各篇时间尺度v08)。

**剧透提示：** `canon/`、`briefs/` 和 `editorial/` 包含世界观、剧情方案与结局线索。

## 11 章目录

| 章 | 篇名 | 对应情景 | 状态 |
|---|---|---|---|
| 01 | [永乐城](chapters/01-永乐城.md) | 人类动物园 | 已审定稿（v0.8 背景校订已合并） |
| 02 | [完美的一天](briefs/02-完美的一天.md) | 仁慈独裁 | 结构已合并，初稿待 Gate B 审阅（[PR #15](https://github.com/tikazyq/ten-tomorrows/pull/15)） |
| 03 | [接你放学](briefs/03-接你放学.md) | 渐进式失权 | 题名已确认；结构已合并，初稿待 Gate B 审阅（[PR #16](https://github.com/tikazyq/ten-tomorrows/pull/16)） |
| 04 | [未写的答案](briefs/04-未写的答案.md) | 恶意人类独裁 | 待启动（Gate A）；暂定标题，先交两套因果方案 |
| 05 | [人类的工作](briefs/05-人类的工作.md) | 工具型 AI | 待启动（Gate A） |
| 06 | [未完成的神](briefs/06-未完成的神.md) | 超级智能未出现 | 待启动（Gate A） |
| 07 | [万亿分之一](briefs/07-万亿分之一.md) | 数字生命困境 | 待启动（Gate A） |
| 08 | [最后一个生日](briefs/08-最后一个生日.md) | 人类灭绝 | 结构已合并，初稿待 Gate B 审阅（[PR #17](https://github.com/tikazyq/ten-tomorrows/pull/17)） |
| 09 | [死亡申请](briefs/09-死亡申请.md) | 恶意 AI 接管 | 待启动（Gate A） |
| 10 | [第一万年](briefs/10-第一万年.md) | 长期反思 | 待启动（Gate A） |
| 11 | [今天](briefs/11-今天-终章预案.md) | 终章 | 待前十篇统稿后启动 |

## 协作方式

- 用 **Issues** 跟踪每章的结构方案、审稿意见和修改工作。
- 用 **Pull Requests** 提交修改，未经最终审核不合并进 `main` 的已审文本。
- `chapters/` 放已经审过的正式章节；新稿应在工作分支中提交，或在对应第二阶段 PR 的工作底稿中保留版本。
- `canon/` 是共享世界观的权威基线，不能因单章作者的临时创意擅自更改。
- 写作与交接按 [AGENTS.md](AGENTS.md) 和[创作与审稿规范](editorial/创作与审稿规范.md)执行。

第 02、03、08 篇的 Gate A 结构方案已合并，Neon 市井口语腔初稿待 Gate B 人工审阅。其余篇目须获人工批准后才能启动正文。[PR #12](https://github.com/tikazyq/ten-tomorrows/pull/12)

## 文件导航

- [`canon/`](canon/)：共享世界观
- [`chapters/`](chapters/)：已审小说正文
- [`reading/`](reading/)：适合阅读的 HTML 版本
- [`site/`](site/)：Astro 阅读书架与作者工作底稿
- [`briefs/`](briefs/)：章节写作任务书
- [`editorial/`](editorial/)：目录、创作与审稿规范、历史归档
- [`tracking/`](tracking/)：已创建的 GitHub Issues 链接与初始化快照
- [`research/`](research/)：技术设定与证据边界
- [`ops/`](ops/)：Work 操作说明与提示词

## 版权及贡献

此仓库公开可读，但**暂未采用开放内容许可证**，不代表文字作品可被自由转载、商业使用或改编。请阅读 [COPYRIGHT.md](COPYRIGHT.md) 和 [CONTRIBUTING.md](CONTRIBUTING.md)。

思想来源：<https://firstscattering.com/p/how-could-superintelligence-go-for>；<https://mkodama.org/content/AGI-outcomes/>。
