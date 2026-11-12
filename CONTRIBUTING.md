# 贡献指南 (Contributing to 90TA)

感谢您对 90TA 项目的关注与支持！我们欢迎所有开发者、商超运营专家与环保倡导者共同参与建设。

## 提交问题 (Issue Reporting)

- 提交 Bug 前，请先在已关闭的 Issues 中搜索是否已有相似问题；
- 提交 Bug 时，请尽可能提供详细的复现步骤、使用的 Node/浏览器版本以及控制台错误日志；
- 如果是新功能建议（Feature Request），请描述该功能解决的核心业务场景（如：商超 ERP 对接、新风控模型、算法优化等）。

## 参与代码开发 (Pull Request Workflow)

1. **Fork** 本代码仓库到您的个人 GitHub 账户；
2. 克隆您的 Fork 分支到本地：
   ```bash
   git clone https://github.com/<your-username>/90TA.git
   cd 90TA
   ```
3. 创建新的功能或修复分支：
   ```bash
   git checkout -b feature/your-feature-name
   # 或者
   git checkout -b fix/your-bugfix-name
   ```
4. 安装依赖并启动开发服务验证：
   ```bash
   npm install
   npm run dev
   ```
5. 编写代码并确保通过静态检查：
   ```bash
   npm run lint
   npm run build
   ```
6. 提交代码并遵循约定式提交规范 (Conventional Commits)：
   ```bash
   git commit -m "feat(agent): enhance stockout prediction horizon to 72 hours"
   git commit -m "fix(scanner): correct barcode checksum validation on manual entry"
   ```
7. 将分支推送到您的 GitHub 仓库并提交 Pull Request。

## 代码规范与技术栈

- **语言**：TypeScript 严格模式
- **前端框架**：React 19 (函数式组件 + Hooks)
- **样式**：Tailwind CSS v4
- **无无用依赖**：保持极简与高性能

再次感谢您的贡献！
