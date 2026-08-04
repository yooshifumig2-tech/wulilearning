# FUMI老师·轨迹物理：Netlify + 千问部署说明

## 安全第一

- 不要把阿里云百炼 API Key 写进 HTML、Git 仓库、聊天或截图。
- 如果 Key 曾经出现在聊天、邮件或截图中，应立即在百炼控制台撤销，并重新创建。
- 新 Key 只放在 Netlify 的环境变量 `DASHSCOPE_API_KEY` 中。

## 文件说明

- `FUMI_teacher_physics.html`：学生使用的单文件网站。测验、解析、动画和本地报告可离线运行。
- `netlify/functions/ai-tutor.mjs`：联网 AI 后台。负责安全读取 API Key、调用千问和执行“提交前不泄露答案”规则。
- `netlify.toml`：Netlify 发布和函数配置。

完整的 AI 功能需要部署整个文件夹；只下载 HTML 时，除 AI 外的功能仍可离线使用。

## 新建独立 Netlify 网站

1. 将本文件夹放进一个新的 Git 仓库，并连接到新的 Netlify 项目；或者用 Netlify CLI 在本文件夹执行部署。
2. 构建设置使用本仓库中的 `netlify.toml`，不需要额外的构建命令。
3. 在 Netlify 项目中打开 **Site configuration → Environment variables**，添加：

   - `DASHSCOPE_API_KEY`：新创建的百炼 API Key（必填）。
   - `QWEN_MODEL`：`qwen3.7-plus`（建议保留；可选）。
   - `ALLOW_FILE_ORIGIN`：`true`（只有需要下载 HTML 后仍连接 AI 时才添加）。
   - `ALLOWED_ORIGINS`：允许访问函数的额外网页来源，多个域名用英文逗号分隔。例如 `https://physics.example.com`（可选）。

4. 重新部署网站。
5. 打开 `https://你的站点.netlify.app/.netlify/functions/ai-tutor`。若显示 `"status":"ok"` 且 `"configured":true`，说明后台已正确读取 Key。
6. 回到网站点击右下角“问FUMI AI”进行测试。测试题尚未提交时，确认 AI 不会直接说出答案。

## 下载 HTML 后使用 AI

本地双击 HTML 时，浏览器地址以 `file://` 开头，无法自动推断 Netlify 域名：

1. 在 Netlify 中把 `ALLOW_FILE_ORIGIN` 设为 `true` 并重新部署。
2. 打开本地 HTML，点击“问FUMI AI”。
3. 在面板底部填写完整函数地址：

   `https://你的站点.netlify.app/.netlify/functions/ai-tutor`

这里填的是函数网址，不是 API Key。

## 费用与额度控制

- 百炼免费额度有模型、地域和有效期限制，请在百炼控制台核对剩余额度并设置费用提醒。
- Netlify 免费计划也有月度用量限制。若希望绝不自动产生超额费用，应保持自动充值关闭。
- 后台把单次学生输入限制为 600 字、只保留最近 8 轮上下文、限制单个来源的短时请求频率，并关闭千问思考模式，以减少延迟和 Token 消耗。函数内限流属于基础防护；公开给多人使用前还应在 Netlify 侧配置更可靠的速率限制。

## 隐私与评分口径

- AI 请求不需要姓名、手机号或其他身份信息。
- 分数、章节掌握度、能力图和预测区间由 HTML 中的固定公式计算；AI 只解读这些结果，不参与改分。
- 未提交题目不会把正确答案和原解析发送给 AI。后台系统提示和输出检查会再次阻止直接报答案，但任何生成式 AI 都不能承诺零错误，FUMI老师仍应抽查实际对话记录与建议质量。
