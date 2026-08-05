# FUMI 学习轨迹

统一入口下包含：

- 初中数学40分钟水平测验与八领域报告
- 高中物理必修第三册第九章互动学习站
- 第九章对应分层刷题站
- 基于真实作答的九维学习情况报告与教师式鼓励总结
- 自动同步的思维导图、证据记录与可编辑ORID
- 千问驱动的FUMI AI助教

## Netlify 环境变量

- `DASHSCOPE_API_KEY`：阿里云百炼API Key，只能填写在Netlify环境变量，禁止写入仓库。
- `QWEN_MODEL`：默认 `qwen3.7-plus`。
- `ALLOW_FILE_ORIGIN`：需要下载HTML后连接在线AI时才设为 `true`。
- `ALLOWED_ORIGINS`：可选，额外允许的来源以英文逗号分隔。

站点无需构建命令，Netlify会读取 `netlify.toml`。答题、ORID与AI聊天记录只存储在学生浏览器；AI提问会临时发送到Netlify Function和百炼完成响应。

## 数据口径

掌握度、正确率、六维能力和思维导图状态由浏览器根据真实学习与作答事件计算。AI只解释这些结构化结果，不参与评分。未提交题目不会把正确答案或解析发送给AI。
