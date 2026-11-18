# 第一次发布到 GitHub

此仓库目前为本地准备版本。该文档不表示远程仓库已创建。

1. 在 GitHub 创建空白 **Public** 仓库，名称 `ten-tomorrows`，推荐放在 `tikazyq` 账号下。不要自动添加 README 或许可证。
2. 如由 ChatGPT 已连接的 GitHub 工具推送，只需告诉助手仓库已经创建；助手可向仓库逐个写入文件并创建章节 Issues。
3. 如果自行从本地上传（需要安装 Git，已有此文件夹）：

   ```bash
   git remote add origin https://github.com/tikazyq/ten-tomorrows.git
   git push -u origin main
   ```

4. 上传后可运行 `python scripts/bootstrap_issues.py` 自动创建 11 个章节 Issues（需要安装并登录 `gh` CLI）。它会跳过已有同名 Issues。

当前不附带开放许可证；请参考 `COPYRIGHT.md`。