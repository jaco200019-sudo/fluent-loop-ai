# FluentLoop PWA

FluentLoop 是一个英语自学 Web/PWA MVP。这个版本不依赖 npm 包，直接用 HTML、CSS、JavaScript、manifest 和 service worker 组成。

## 本地预览

在这个目录运行：

```powershell
node server.mjs 5173
```

然后打开：

```text
http://127.0.0.1:5173
```

也可以运行 `npm start`，它会执行同一个命令。

不要直接用 `file://` 测试 PWA 能力，因为 service worker 和安装提示需要在 `localhost` 或 HTTPS 下运行。

## 已实现

- 登录/游客体验
- 学习目标选择
- 每天学习时长选择
- 水平测试，包含正确/错误判断、正确答案提示和中文解释
- 离线自适应内容：每日任务、测试题、词库和对话回复会根据日期、目标、等级轮换
- Today 页支持“换一组”，方便立刻切换新的学习内容
- 顶部 AI 状态提示：静态版显示“离线自适应”，Netlify Function + `OPENAI_API_KEY` 生效后显示“AI 已连接”
- Today 今日计划
- AI 场景对话模拟
- 默认开启的中英对照/中文辅助开关
- 语音按钮真实状态和模拟识别
- 对话反馈
- 复习卡
- AI 高频词库，优先学习使用率最高、场景覆盖最广的词
- 进度页
- 可随时重新测试英语能力，并根据等级推荐学习方法
- 完课总结页
- `localStorage` 本地状态保存
- PWA manifest
- service worker 离线缓存
- 本地静态预览服务 `server.mjs`
- Netlify Function `netlify/functions/ai-coach.mjs`，用于接 OpenAI 让对话、测评和词库真正智能化
- AI 返回内容使用结构化 JSON，前端可以稳定读取回复、中文翻译、纠错、复习卡和词库

## 开启真正 AI

静态 Netlify Drop 只能跑前端，AI 会自动回退到模拟模式。这个模式适合快速给朋友看界面，不适合验证真正的智能学习效果。

如果要开启真正 AI：

1. 用 `fluent-loop-pwa.zip` 里的完整源码创建 Git 仓库。
2. 用 Netlify Git 部署或 Netlify CLI 部署这个项目。
3. 在 Netlify Site settings -> Environment variables 里添加：
   - `OPENAI_API_KEY`
   - 可选：`OPENAI_MODEL`，默认是 `gpt-4.1-mini`
4. 重新部署。

开启后，前端会请求 `/.netlify/functions/ai-coach`，由后端安全调用 OpenAI。不要把 `OPENAI_API_KEY` 写进 `app.js`、`index.html` 或任何前端文件。

AI 会动态生成：

- 场景对话回复
- 中文翻译
- 纠错反馈
- 复习卡
- 能力测试后的学习方法
- 个性化高频词库

## 部署包区别

- `fluent-loop-pwa-deploy.zip`：静态预览包，适合 Netlify Drop，上传最快，但没有真正 AI。
- `fluent-loop-pwa.zip`：完整源码包，包含 Netlify Function，适合后续 Git/CLI 部署真 AI。
- `fluent-loop-ai-netlify.zip`：只为 Netlify AI 部署整理的完整包，包含前端和 `netlify/functions`。真 AI 版建议用 Git 导入或 Netlify CLI 部署，不要用 Netlify Drop。

## 下一步

1. 部署成公网测试链接。这个目录已经带有 `vercel.json` 和 `netlify.toml`。
2. 找 10-30 个朋友测试。
3. 用 Netlify Functions 开启真实 AI。
4. 把本地状态替换成数据库。
5. 迁移到 Next.js + 完整后端服务。
