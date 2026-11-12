import React, { useState } from 'react';
import {
  BookOpen,
  X,
  Copy,
  Check,
  ExternalLink,
  Layers,
  TrendingUp,
  ShieldCheck,
  Bot,
  Terminal,
  FileCode,
  Globe
} from 'lucide-react';

interface DocViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLang?: 'cn' | 'en';
}

export const DocViewerModal: React.FC<DocViewerModalProps> = ({
  isOpen,
  onClose,
  initialLang = 'en'
}) => {
  const [docLang, setDocLang] = useState<'cn' | 'en'>(initialLang);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Sticky Header with CN / EN Switcher */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {docLang === 'cn' ? 'FOOD4U · 开源全景项目文档' : 'FOOD4U · Open Source Documentation'}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold">
                  v1.0.0
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {docLang === 'cn'
                  ? '与 GitHub 仓库 README.md / README_EN.md 保持 100% 实时同步'
                  : '100% synced with repository README.md & README_EN.md'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* CN / EN Toggle Switch */}
            <div className="flex items-center p-1 bg-slate-200 dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700">
              <button
                onClick={() => setDocLang('cn')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  docLang === 'cn'
                    ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>🇨🇳 中文版</span>
                <span className="text-[10px] opacity-75 font-mono">CN</span>
              </button>
              <button
                onClick={() => setDocLang('en')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  docLang === 'en'
                    ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>🇺🇸 English</span>
                <span className="text-[10px] opacity-75 font-mono">EN</span>
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
          
          {/* ========================================================= */}
          {/* CHINESE VERSION (README.md) */}
          {/* ========================================================= */}
          {docLang === 'cn' ? (
            <div className="space-y-6">
              {/* Language Switch Callout */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl">
                <div className="flex items-center gap-2 text-blue-900 dark:text-blue-200 text-xs">
                  <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>当前正浏览 <strong>中文版说明 (README.md)</strong>。系统页面默认展示英文版。</span>
                </div>
                <button
                  onClick={() => setDocLang('en')}
                  className="px-3 py-1.5 text-xs font-bold bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-700 rounded-lg hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors shadow-xs flex items-center gap-1.5 shrink-0"
                >
                  <span>🇺🇸 Switch to English Readme (Default)</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* Badges Bar */}
              <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded font-mono text-xs font-bold">
                  License: MIT
                </span>
                <span className="px-2.5 py-1 bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 rounded font-mono text-xs font-bold">
                  React 19.0
                </span>
                <span className="px-2.5 py-1 bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 rounded font-mono text-xs font-bold">
                  Tailwind CSS v4
                </span>
                <span className="px-2.5 py-1 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 rounded font-mono text-xs font-bold">
                  TypeScript 5+
                </span>
                <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 rounded font-mono text-xs font-bold">
                  AI Agent · Active Matching
                </span>
              </div>

              {/* 1. Global Vision */}
              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-emerald-600" />
                  <span>1. 项目愿景与全球背景 (Global Vision & Background)</span>
                </h2>
                <p>
                  在全球食品浪费严峻挑战与联合国可持续发展目标 <strong>UN SDG 12.3（2030 年前全球人均食品浪费减半）</strong> 的宏观驱动下，全球大型连锁大卖场与商超（北美、欧洲、亚太主要零售市场）后仓常态化面临<strong>临期（剩余保质期 30–60 天 Best-Before Cutoffs）预包装商品大量积压</strong>的痛点：
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="font-bold text-slate-900 dark:text-white text-xs mb-1">高昂报损与填埋费</div>
                    <p className="text-slate-500 text-xs">传统商超清仓流程缓慢，倒逼零售商不得不低价买断或支付垃圾填埋倾倒费，侵蚀数十亿美元毛利。</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="font-bold text-slate-900 dark:text-white text-xs mb-1">重资产折扣店瓶颈</div>
                    <p className="text-slate-500 text-xs">线下硬折扣店走买断货权、自建大仓与二次物流转运模式，履约周转链条长、固定租金占比过重。</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="font-bold text-slate-900 dark:text-white text-xs mb-1">FOOD4U 轻资产破局</div>
                    <p className="text-slate-500 text-xs">聚焦大宗整箱标的，商超早巡扫码 + AI Agent 消耗周期预测，买家直接前往后门货运装卸码头自提，0 仓储 0 库存风险。</p>
                  </div>
                </div>
              </section>

              {/* 2. Core Modules */}
              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-emerald-600" />
                  <span>2. 核心功能模块 (Core Modules)</span>
                </h2>
                <div className="space-y-2.5">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-900 dark:text-white text-xs">🏬 门店早巡扫码工作台 (Store Operations 07:00–08:30)</span>
                    <p className="text-xs text-slate-500 mt-1">专为超市理货员设计的极速手持端，扫 GTIN 条形码自动带出商品档案、保质期倒计时；根据剩余保质期自动生成建议清仓价与专属防串码贴标。</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-900 dark:text-white text-xs">🛒 B2B / B2C 双轨提货集市 (Buyer Marketplace)</span>
                    <p className="text-xs text-slate-500 mt-1">B2B 商业大宗设置起订门槛（5–50 箱），对接西餐厅、中央厨房与烘焙坊，走后门货运月台快速交接；B2C 走前台服务台；支持 10 分钟 Redis Hold 防超卖锁仓。</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-900 dark:text-white text-xs">🤖 FOOD4U AI 智能匹配 Agent (Proactive Matching)</span>
                    <p className="text-xs text-slate-500 mt-1">基于买家消耗周期画像，主动进行 24–48 小时断料预警；当商超晨巡扫码录入新批次后，AI 算法毫秒级计算需求匹配度，主动发起采购建议与 1 键锁仓。</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-900 dark:text-white text-xs">📈 财务单店模型与 ESG 减碳账本 (Unit Economics & ESG)</span>
                    <p className="text-xs text-slate-500 mt-1">单店月均流转 840 件，GMV $1,512，超市净挽回 $1,285.20，平台抽佣 15%（单店净贡献 $181.44/月）；50 店集群月净利超 $6,572；实时核算食物重量 (kg)、CO₂e 规避量及节约水资源。</p>
                  </div>
                </div>
              </section>

              {/* 3. Global Compliance */}
              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>3. 全球合规体系与风控智库 (Global Compliance Playbook)</span>
                </h2>
                <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50 rounded-xl space-y-2 text-xs">
                  <p><strong>国际银行级分账托管</strong>：采用 Stripe Connect / Adyen for Platforms，100% 资金由受监管第三方托管，平台零沉淀资金，T+1/T+2 自动结算至商超商业账户。</p>
                  <p><strong>欧美法律责任豁免</strong>：适用《比尔·埃默森好撒玛利亚人法案》(Bill Emerson Good Samaritan Act)；严格限定常温密封预包装食品，设立绝对排除清单。</p>
                  <p><strong>商业产品责任险</strong>：对接 Allianz、Chubb、AXA 国际知名保险商，单次事故提供 100 万至 200 万美元责任保障。</p>
                </div>
              </section>

              {/* 4. Quick Start Commands */}
              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-emerald-600" />
                  <span>4. 快速开始与本地运行 (Quick Start)</span>
                </h2>
                <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs space-y-2 relative">
                  <button
                    onClick={() => handleCopy('git clone https://github.com/<your-username>/FOOD4U.git\ncd FOOD4U\nnpm install\nnpm run dev', 'code-cn')}
                    className="absolute top-3 right-3 p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors flex items-center gap-1 text-[11px]"
                  >
                    {copiedCode === 'code-cn' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === 'code-cn' ? '已复制' : '复制命令'}</span>
                  </button>
                  <div className="text-slate-500"># 1. 克隆代码并安装依赖</div>
                  <div>git clone https://github.com/&lt;your-username&gt;/FOOD4U.git</div>
                  <div>cd FOOD4U</div>
                  <div>npm install</div>
                  <div className="text-slate-500 pt-1"># 2. 启动开发服务 (访问 http://localhost:3000)</div>
                  <div>npm run dev</div>
                  <div className="text-slate-500 pt-1"># 3. 生成 8 页投资人演示文稿 PPTX</div>
                  <div>npx tsx scripts/generate_pitch_deck.ts</div>
                </div>
              </section>
            </div>
          ) : (
            /* ========================================================= */
            /* ENGLISH VERSION (README_EN.md) */
            /* ========================================================= */
            <div className="space-y-6">
              {/* Language Switch Callout */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 text-xs">
                  <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Viewing <strong>English Documentation (README_EN.md - Default)</strong>. Need Chinese?</span>
                </div>
                <button
                  onClick={() => setDocLang('cn')}
                  className="px-3 py-1.5 text-xs font-bold bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 rounded-lg hover:bg-emerald-100 dark:hover:bg-slate-700 transition-colors shadow-xs flex items-center gap-1.5 shrink-0"
                >
                  <span>🇨🇳 切换至中文说明 (Switch to Chinese)</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              {/* Badges Bar */}
              <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded font-mono text-xs font-bold">
                  License: MIT
                </span>
                <span className="px-2.5 py-1 bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 rounded font-mono text-xs font-bold">
                  React 19.0
                </span>
                <span className="px-2.5 py-1 bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 rounded font-mono text-xs font-bold">
                  Tailwind CSS v4
                </span>
                <span className="px-2.5 py-1 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 rounded font-mono text-xs font-bold">
                  TypeScript 5+
                </span>
                <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 rounded font-mono text-xs font-bold">
                  AI Agent · Active Matching
                </span>
              </div>

              {/* 1. Global Vision */}
              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-emerald-600" />
                  <span>1. Global Vision & Background (UN SDG 12.3)</span>
                </h2>
                <p>
                  Food waste is an escalating global crisis. Under the macro-mandate of <strong>UN Sustainable Development Goal 12.3</strong> (halving global per capita food waste by 2030), supermarkets across North America, Europe, and Asia-Pacific face chronic inventory bottlenecks: <strong>shelf-stable goods reaching 30–60 day Best-Before cutoffs</strong>:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="font-bold text-slate-900 dark:text-white text-xs mb-1">Erosion of Gross Margin</div>
                    <p className="text-slate-500 text-xs">Sluggish markdown workflows force grocers to take massive write-offs and pay landfill dumping fees, eroding billions in operating margins.</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="font-bold text-slate-900 dark:text-white text-xs mb-1">Heavy-Asset Limitations</div>
                    <p className="text-slate-500 text-xs">Brick-and-mortar closeout discount chains rely on centralized distribution centers, long transit times, and heavy real-estate leases.</p>
                  </div>
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="font-bold text-slate-900 dark:text-white text-xs mb-1">The FOOD4U Solution</div>
                    <p className="text-slate-500 text-xs">Zero warehouse, zero inventory risk. Connects backrooms directly to commercial B2B buyers for loading dock handoffs before morning customer rush.</p>
                  </div>
                </div>
              </section>

              {/* 2. Key Features */}
              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-emerald-600" />
                  <span>2. Key Operational Features</span>
                </h2>
                <div className="space-y-2.5">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-900 dark:text-white text-xs">🏬 Store Operations & Morning Sweeps (07:00–08:30)</span>
                    <p className="text-xs text-slate-500 mt-1">Designed for stock associates: scan manufacturer GTIN barcodes, apply algorithmic markdown decay curves, and tag goods with anti-cashier Rescue Labels.</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-900 dark:text-white text-xs">🛒 Dual-Track Buyer Marketplace</span>
                    <p className="text-xs text-slate-500 mt-1">B2B commercial lots enforce Minimum Order Quantities (5–50 cartons) for restaurants and bakeries with dockside pickups. Includes 10-minute Redis Hold anti-overselling lock.</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-900 dark:text-white text-xs">🤖 FOOD4U AI Matching Agent (Stage 3 Technology)</span>
                    <p className="text-xs text-slate-500 mt-1">Models buyer consumption velocity to forecast shortages 24–48h in advance. Pushes instant intent alerts with 1-click hold reservation before stock hits public shelves.</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-900 dark:text-white text-xs">📈 Unit Economics & Verified ESG Ledger</span>
                    <p className="text-xs text-slate-500 mt-1">Single pilot store: 840 units sold, $1,512 GMV, $1,285.20 net retailer recovery, 15% platform take-rate ($181.44 net contribution/store/mo). 50-store cluster yields $6,572/mo net profit.</p>
                  </div>
                </div>
              </section>

              {/* 3. Global Compliance */}
              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>3. Global Compliance & Legal Safeguards</span>
                </h2>
                <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50 rounded-xl space-y-2 text-xs">
                  <p><strong>Bank-Grade Multi-Currency Escrow</strong>: Powered by Stripe Connect & Adyen for Platforms. 100% of buyer payments land in regulated fiduciary accounts; T+1/T+2 automated payouts with zero commingling of funds.</p>
                  <p><strong>Good Samaritan Statutory Protection</strong>: Leverages the US Bill Emerson Good Samaritan Act & EU food redistribution guidelines. Enforces strict negative exclusions (zero fresh meats/poultry, unpasteurized items, or dented cans).</p>
                  <p><strong>Commercial Product Liability Insurance</strong>: Backed by Allianz, Chubb, and AXA, providing $1M–$2M per-occurrence product contamination coverage.</p>
                </div>
              </section>

              {/* 4. Quick Start Commands */}
              <section className="space-y-3">
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-emerald-600" />
                  <span>4. Quick Start Commands</span>
                </h2>
                <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs space-y-2 relative">
                  <button
                    onClick={() => handleCopy('git clone https://github.com/<your-username>/FOOD4U.git\ncd FOOD4U\nnpm install\nnpm run dev', 'code-en')}
                    className="absolute top-3 right-3 p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors flex items-center gap-1 text-[11px]"
                  >
                    {copiedCode === 'code-en' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === 'code-en' ? 'Copied' : 'Copy Commands'}</span>
                  </button>
                  <div className="text-slate-500"># 1. Clone repo & install packages</div>
                  <div>git clone https://github.com/&lt;your-username&gt;/FOOD4U.git</div>
                  <div>cd FOOD4U</div>
                  <div>npm install</div>
                  <div className="text-slate-500 pt-1"># 2. Start local dev server (visit http://localhost:3000)</div>
                  <div>npm run dev</div>
                  <div className="text-slate-500 pt-1"># 3. Generate 8-slide investor pitch deck</div>
                  <div>npx tsx scripts/generate_pitch_deck.ts</div>
                </div>
              </section>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <span>FOOD4U Open Source Initiative</span>
            <span>·</span>
            <span>MIT License</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg font-semibold transition-colors"
          >
            {docLang === 'cn' ? '关闭阅读' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
