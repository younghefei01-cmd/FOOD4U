# FOOD4U · AI 商超临期食品数字化减损与 B2B 商业清仓撮合平台

<div align="center">

[![English](https://img.shields.io/badge/Language-English%20(Default)-blue.svg?style=for-the-badge)](./README_EN.md)
[![简体中文](https://img.shields.io/badge/说明-简体中文版-emerald.svg?style=for-the-badge)](./README.md)
![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.0-blue.svg?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg?style=for-the-badge)

<p align="center">
  🌐 <strong>Language / 语言切换:</strong> 
  <a href="./README_EN.md"><strong>🇺🇸 Readme in English (Default / 默认英文版)</strong></a>
  &nbsp;|&nbsp;
  <strong>🇨🇳 简体中文版说明 (当前)</strong>
</p>

**以轻资产、零库存风险模式连接大中型商超后仓与 B2B 商业买家（餐饮、烘焙、团餐），结合 AI Agent 智能预测与码头核销自提，实现食品损耗归零与绿色价值闭环。**

[在线功能体验](#-核心功能模块) • [快速开始](#-快速开始-quick-start) • [技术架构](#-技术架构与数据模型) • [商业模型](#-财务模型与单店经济) • [全球合规体系](#-全球合规体系与风控智库)

</div>

---

## 📖 项目愿景与背景 (Global Vision & Background)

在全球食品浪费严峻挑战与联合国可持续发展目标 **UN SDG 12.3（2030 年前全球人均食品浪费减半）** 的宏观驱动下，全球大型连锁大卖场与商超（北美、欧洲、亚太等主要市场）后仓常态化面临**临期（剩余保质期 30–60 天 Best-Before Cutoffs）预包装商品大量积压**的痛点：
- **高昂处理成本与损耗风险**：传统商超清仓流程缓慢，倒逼零售商不得不降价买断或支付垃圾倾倒填埋费（Landfill Fees），造成数千亿美元的毛利侵蚀；
- **重资产二手折扣店瓶颈**：实体折扣连锁走重资产自建大仓与二次物流转运模式，履约周转链条长、固定租金占比高；
- **盲盒模式的局限**：剩菜盲盒面向个人散客，客单价小，对商超后仓成箱成托盘（Cartons / Pallets）的批量积压杯水车薪；
- **FOOD4U 的全球破局点**：聚焦**大宗整箱临期标品**，通过超市早巡手持扫码，由 **FOOD4U AI Agent** 结合下游餐饮、烘焙商户消耗周期算法主动定向撮合，买家直接前往商超**后门货运装卸码头核销自提（Loading Dock Handoff）**。不碰货、不租仓、零库存风险，打造全球适用的轻资产商超数字化减损与 ESG 闭环。

---

## ✨ 核心功能模块

### 1. 🏬 门店早巡扫码工作台 (Store Operations)
- **晨间标准 SOP（07:00 - 08:30）**：专为超市理货员设计的极速手持端，扫 GTIN 条形码自动带出商品档案、保质期倒计时；
- **智能动态阶梯折价**：根据剩余保质期（45天/30天/15天）自动生成建议清仓价；
- **专属 Rescue 贴标**：生成批次防串货标签，避免混入普通收银台通道。

### 2. 🛒 B2B / B2C 双轨提货集市 (Buyer Marketplace)
- **B2B 商业大宗通道**：设置起订门槛（5–50 箱），对接西餐厅、中央厨房、团餐企业，走后门货运月台快速交接；
- **B2C 社区散单通道**：总服务台凭数字提货码自提；
- **10分钟锁仓计时器（Redis Hold 机制）**：防止多买家超卖冲突，到期未付款自动回滚库存。

### 3. 🤖 FOOD4U AI 智能匹配 Agent (Stage 3 Technology)
- **买家消耗周期画像**：基于商户历史采购频次与食材消耗周期（如意式餐厅对番茄膏的 7 天消耗速度、烘焙坊对黄油/糖浆的消耗周期）；
- **24-48小时断料预警雷达**：当商超晨间扫码录入新批次后，AI Agent 毫秒级计算需求匹配度，主动发起采购建议；
- **一键锁仓意向单**：买家在手机端收到通知后，1 键即可触发 10 分钟锁仓，实现“货未上架已被采购”。

### 4. 📈 财务单店模型与 ESG 碳资产账本 (Unit Economics & ESG)
- **单店经济学实时测算**：单店月均流转 840 件，GMV 约 1,512 美元，超市挽回净收入 1,285 美元，平台收取 15% 佣金，扣除支付通道费后平台单店净贡献 181.44 美元/月；
- **50店集群规模化**：月度 GMV 达 75,600 美元，月净利 6,572 美元（年净利超 56 万元人民币）；
- **绿色 ESG 计量**：实时统计挽救食物重量（kg）、规避二氧化碳当量（CO₂e kg）以及节约水资源（L）。

### 5. ⚖️ 全球合规体系与风控智库 (Global Compliance Playbook)
- **国际银行级托管与自动分账**：采用 **Stripe Connect / Adyen for Platforms** 与全球一级商业银行托管监管账户，100% 资金由受监管第三方托管，杜绝平台资金池挪用风险，T+1/T+2 自动结算至商超对公账户；
- **食品安全与责任豁免 (Good Samaritan Acts)**：基于国际通行的《比尔·埃默森好撒玛利亚人食品捐赠法》(Bill Emerson Good Samaritan Act) 及全球“最佳赏味期 (Best-Before)”与“安全食用期 (Use-By)”法律区分原则；严格限定常温密封预包装食品，设立绝对排除清单（剔除生鲜肉禽、散装熟食、破损胀气罐头）；
- **商业综合与产品责任险 (Commercial Product Liability)**：与 Allianz、Chubb、AXA 等全球知名财险承保商对接，单次事故提供 100 万至 200 万美元责任保障；
- **全球合规资质矩阵**：企业商业注册 (LLC / Inc. / Ltd.)、商用食品经营设施许可 (Commercial Food Facility Registration)、平台撮合服务条款 (Terms of Service)；
- **标准化合作协议**：内置《商超试点合作协议 (Global Pilot Term Sheet / MOU)》草案。

---

## 🛠️ 技术架构与数据模型

### 技术栈 (Tech Stack)
- **前端框架**：React 19 + TypeScript + Vite 6
- **样式与设计系统**：Tailwind CSS v4 + Lucide Icons + Motion
- **状态管理**：React Context API + LocalStorage 实时持久化

### 核心数据库表结构设计 (Database Schema)

```sql
-- 1. 合作商超门店表
CREATE TABLE stores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    retailer_chain_id UUID,
    address TEXT NOT NULL,
    geo_coordinates POINT,
    contact_phone VARCHAR(50),
    operating_hours JSONB,
    pickup_window_hours JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 标品库 (GTIN/条码库)
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gtin_barcode VARCHAR(64) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    brand VARCHAR(100),
    category VARCHAR(100),
    original_msrp DECIMAL(10,2) NOT NULL,
    standard_pack_size VARCHAR(100),
    image_url TEXT,
    storage_condition VARCHAR(50) DEFAULT 'Ambient' -- Ambient, Chilled, Frozen
);

-- 3. 临期批次表
CREATE TABLE inventory_batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id UUID REFERENCES stores(id),
    product_id UUID REFERENCES products(id),
    batch_number VARCHAR(100),
    expiry_date DATE NOT NULL,
    original_price DECIMAL(10,2) NOT NULL,
    discounted_price DECIMAL(10,2) NOT NULL,
    initial_quantity INTEGER NOT NULL,
    available_quantity INTEGER NOT NULL,
    target_audience VARCHAR(30) DEFAULT 'ALL', -- B2B_BULK, B2C_RETAIL, ALL
    minimum_order_quantity INTEGER DEFAULT 1,
    condition_rating VARCHAR(50) DEFAULT 'Mint', -- Mint, Shelf_Wear, Damaged_Carton
    status VARCHAR(30) DEFAULT 'Active', -- Active, Reserved, Sold, Expired_Removed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 订单表
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(64) UNIQUE NOT NULL,
    buyer_id UUID NOT NULL,
    store_id UUID REFERENCES stores(id),
    buyer_type VARCHAR(20) NOT NULL, -- B2B, B2C
    total_amount DECIMAL(10,2) NOT NULL,
    platform_fee DECIMAL(10,2) NOT NULL,
    store_payout_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(30) DEFAULT 'Pending_Payment', -- Pending_Payment, Ready_For_Pickup, Completed, Cancelled, Disputed
    pickup_code_hash VARCHAR(128) NOT NULL,
    pickup_window_start TIMESTAMP WITH TIME ZONE,
    pickup_window_end TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. ESG 减碳与节水核算表
CREATE TABLE esg_impact_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id UUID REFERENCES stores(id),
    order_id UUID REFERENCES orders(id),
    diverted_weight_kg DECIMAL(10,2) NOT NULL,
    avoided_co2e_kg DECIMAL(10,2) NOT NULL,
    water_saved_liters DECIMAL(10,2) NOT NULL,
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 🚀 快速开始 (Quick Start)

### 1. 克隆代码仓库
```bash
git clone https://github.com/<your-username>/FOOD4U.git
cd FOOD4U
```

### 2. 安装依赖项
```bash
npm install
```

### 3. 启动本地开发服务
```bash
npm run dev
```
打开浏览器访问：`http://localhost:3000`

### 4. 编译生产构建
```bash
npm run build
```

---

## 🌐 在线网页预览与一键托管部署 (Live Web Preview & Hosting)

本项目为基于 React 19 + Vite 6 构建的高性能纯前端 SPA，已在 `vite.config.ts` 中配置相对基准路径（`base: './'`），可**零成本 100% 免费**托管在任一主流平台：

### 方案 1：GitHub Pages 自动化托管（推荐）
本项目已在 `.github/workflows/deploy.yml` 内置官方 GitHub Actions 自动化部署流水线：
1. 将项目代码 Push 到 GitHub 仓库（或使用 AI Studio 右侧的 **Sync to GitHub**）；
2. 打开 GitHub 仓库页面，点击顶部 **Settings** ➔ **Pages**；
3. 在 **Build and deployment** 下方的 **Source** 下拉菜单中，选择 **`GitHub Actions`**；
4. 随后每次代码提交推送至 `main` 分支，GitHub Actions 将全自动编译并部署，几秒钟后即可在 `https://<你的GitHub用户名>.github.io/<仓库名>/` 在线打开完整网页！

### 方案 2：Vercel / Cloudflare Pages / Netlify 极速托管
- **Vercel**：登录 [vercel.com](https://vercel.com)，点击 **Add New Project**，直接选择该 GitHub 仓库，框架预设选择 **Vite**，点击 **Deploy** 即可获得全球高速 CDN 访问链接；
- **Cloudflare Pages**：在 Cloudflare 控制台选择 Pages ➔ 连接 GitHub 仓库 ➔ 构建命令填 `npm run build`，输出目录填 `dist` 即可。

---

## 🗺️ 发展路线图 (Roadmap)

- [x] **第一阶段：B2B 冷启动与商超试点闭环**
  - [x] 07:00-08:30 商超早巡扫码端交互
  - [x] 货运装卸月台（Dock）与服务台双轨核销
  - [x] 全球支付托管（Stripe Connect / Escrow）合规分账方案与试点 Term Sheet
- [x] **第二阶段：B2C 社区散单与自动化核销**
  - [x] 动态防超卖 Redis 10分钟锁仓计时器
  - [x] 移动端自适应提货二维码与现场验货 1 键退款机制
- [x] **第三阶段：FOOD4U AI Agent 智能匹配系统**
  - [x] 基于商户历史采购频次的食材消耗周期建模
  - [x] 24-48小时断料预警算法与实时供给匹配雷达
  - [x] 中英文交互式开源项目文档内嵌阅读器与双向切换
- [ ] **未来规划**
  - [ ] 接入主流商超 ERP / WMS 系统的每日自动盘点 Delta 同步 API
  - [ ] 权威第三方碳减排计量认证标准（如 CCER / Verra 碳积分挂钩）

---

## 🤝 贡献指南 (Contributing)

欢迎任何形式的贡献与建议！请参阅 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解如何提交 Issue 或 Pull Request。

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的修改 (`git commit -m 'feat: add some amazing feature'`)
4. 推送到远端分支 (`git push origin feature/amazing-feature`)
5. 新建 Pull Request

---

## 📄 开源许可证 (License)

本项目采用 [MIT 许可证](./LICENSE) 开源。欢迎自由使用、修改与商业部署。
