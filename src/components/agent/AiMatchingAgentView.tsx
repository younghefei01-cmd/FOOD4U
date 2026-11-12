import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { InventoryBatch, Product } from '../../types';
import {
  Sparkles,
  Bot,
  Brain,
  History,
  TrendingDown,
  CheckCircle2,
  Package,
  ArrowRight,
  RefreshCw,
  Sliders,
  Calendar,
  Send,
  Building2,
  UserCheck
} from 'lucide-react';

interface BuyerProfile {
  id: string;
  name: string;
  type: 'B2B' | 'B2C';
  category: string;
  historySummary: string;
  consumptionCycleDays: number;
  lastPurchasedDaysAgo: number;
  targetedCategories: string[];
  monthlyBudget: number;
}

const PRESET_PROFILES: BuyerProfile[] = [
  {
    id: 'prof-01',
    name: '某意式简餐工坊 (B2B商户·试点A)',
    type: 'B2B',
    category: '西餐意面与披萨后厨',
    historySummary: '每周二固定消耗意面 20kg、番茄酱 30 罐、特级初榨橄榄油 10L；平均单次采购 ¥800–1,500',
    consumptionCycleDays: 7,
    lastPurchasedDaysAgo: 6, // 预计明天断货！
    targetedCategories: ['Pasta & Grains / 面食粮油', 'Canned & Pulses / 罐头蔬果', 'Cooking Oils / 食用油品'],
    monthlyBudget: 5000
  },
  {
    id: 'prof-02',
    name: '某连锁外卖中央厨房 (B2B商户·试点B)',
    type: 'B2B',
    category: '外卖便当与快餐大排档',
    historySummary: '日均出餐 400 份，高频消耗生抽酱油 4 桶/周、调和食用油 6 桶/周、散装大米；重视每升极致低价',
    consumptionCycleDays: 5,
    lastPurchasedDaysAgo: 4, // 预计后天断货！
    targetedCategories: ['Cooking Oils / 食用油品', 'Sauces & Condiments / 调味佐料', 'Pasta & Grains / 面食粮油'],
    monthlyBudget: 8000
  },
  {
    id: 'prof-03',
    name: '某精品社区烘焙工坊 (B2B商户·试点C)',
    type: 'B2B',
    category: '精品烘焙与咖啡甜品',
    historySummary: '每周五集中备货植物燕麦奶 15 箱、草莓果酱 20 瓶、优质面粉；关注原厂包装完整性',
    consumptionCycleDays: 7,
    lastPurchasedDaysAgo: 6,
    targetedCategories: ['Plant Beverages / 植物饮品', 'Spreads & Breakfast / 果酱早点'],
    monthlyBudget: 4200
  },
  {
    id: 'prof-04',
    name: '社区常态采购家庭 (B2C散单代表)',
    type: 'B2C',
    category: '三口之家日常囤货',
    historySummary: '每月采购 2 次燕麦奶、优质果酱与意面；注重食品健康与 40 天以上安全保质期',
    consumptionCycleDays: 14,
    lastPurchasedDaysAgo: 12,
    targetedCategories: ['Plant Beverages / 植物饮品', 'Spreads & Breakfast / 果酱早点', 'Pasta & Grains / 面食粮油'],
    monthlyBudget: 800
  }
];

export const AiMatchingAgentView: React.FC = () => {
  const { batches, products, addToCart, formatPrice, currency, currentStore } = useApp();

  const [selectedProfile, setSelectedProfile] = useState<BuyerProfile>(PRESET_PROFILES[0]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [matchedResults, setMatchedResults] = useState<{
    urgentShortage: string;
    aiReasoning: string;
    recommendedBatches: {
      batch: InventoryBatch;
      product: Product;
      matchScore: number;
      urgencyDays: number;
      suggestedQty: number;
      savingEstimate: number;
    }[];
  } | null>(null);

  const [lockedBatchId, setLockedBatchId] = useState<string | null>(null);

  // Trigger AI Matching Agent Analysis
  const runAiMatchingAnalysis = (profile: BuyerProfile) => {
    setIsAnalyzing(true);
    setMatchedResults(null);

    setTimeout(() => {
      // Find matching store batches
      const candidates = batches.filter((b) => {
        if (b.status !== 'Active' || b.available_quantity <= 0) return false;
        const prod = products.find((p) => p.id === b.product_id);
        if (!prod) return false;
        return profile.targetedCategories.includes(prod.category);
      });

      const recommended = candidates.slice(0, 3).map((batch, index) => {
        const product = products.find((p) => p.id === batch.product_id)!;
        const suggestedQty = profile.type === 'B2B'
          ? Math.min(batch.available_quantity, Math.max(batch.minimum_order_quantity, 4))
          : 1;
        const singleSaving = batch.original_price - batch.discounted_price;

        return {
          batch,
          product,
          matchScore: 98 - index * 4,
          urgencyDays: profile.consumptionCycleDays - profile.lastPurchasedDaysAgo,
          suggestedQty,
          savingEstimate: Math.round(singleSaving * suggestedQty * 100) / 100
        };
      });

      setMatchedResults({
        urgentShortage: `${profile.name} 根据历史周期模型，当前食材消耗进度达 ${Math.round(
          (profile.lastPurchasedDaysAgo / profile.consumptionCycleDays) * 100
        )}%，预计将在 24–48 小时内发生断货。`,
        aiReasoning: `90TA AI Agent 算法自动对齐【${currentStore.name}】今日 07:00 早巡录入的 30–60 天临期库存。识别到与该客户历史高频菜单品类（${profile.targetedCategories.join(
          '、'
        )}）匹配度高达 96% 以上。主动生成锁库清单，预计可为客户降低 60% 采购支出，同时为商超提前锁定动销。`,
        recommendedBatches: recommended
      });

      setIsAnalyzing(false);
    }, 600);
  };

  // Initial trigger
  React.useEffect(() => {
    runAiMatchingAnalysis(selectedProfile);
  }, [selectedProfile]);

  const handleAgentReserve = (batchId: string, qty: number) => {
    const ok = addToCart(batchId, qty);
    if (ok) {
      setLockedBatchId(batchId);
      setTimeout(() => setLockedBatchId(null), 1500);
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-xs font-bold tracking-wide border border-emerald-500/30">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>90TA 第三阶段技术核心 · AI Agent 主动食材匹配引擎</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              基于用户历史采购与消耗数据的主动匹配 Agent
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              告别传统“人找货”的被动浏览模式。90TA AI Agent 深度训练于餐饮客户与消费者的历史进货频次、菜单消耗速率与保质期容忍度，在商超早巡录入临期库存后，<strong>自动计算断货周期，主动将临期好物反向定向分发给最需要的买家</strong>。
            </p>
          </div>

          <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 w-full lg:w-72 shrink-0 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-200">
              <span className="font-semibold">AI 模型算力状态</span>
              <span className="font-mono text-emerald-400 font-bold">Active Online</span>
            </div>
            <div className="text-[11px] text-slate-300">
              当前检索试点：<strong className="text-white">{currentStore.name}</strong>
            </div>
            <div className="text-[11px] text-slate-300">
              算法特征：消耗速率回归 + 临期时效动态惩罚
            </div>
          </div>
        </div>
      </div>

      {/* 2. Select Buyer Persona to Test AI Training Prediction */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              切换客户画像（体验 AI Agent 基于不同历史采购模型的即时推理）
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">4 类预置真实训练档案</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESET_PROFILES.map((prof) => {
            const isSelected = selectedProfile.id === prof.id;
            return (
              <button
                key={prof.id}
                onClick={() => setSelectedProfile(prof)}
                className={`text-left p-3.5 rounded-xl border text-xs transition-all ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-600 font-semibold'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold truncate">{prof.name}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded font-mono bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold">
                    {prof.type}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">{prof.category}</div>
                <div className="text-[10px] text-slate-400 mt-2 font-mono">
                  采购周期: 每 {prof.consumptionCycleDays} 天 · 上次采购: {prof.lastPurchasedDaysAgo} 天前
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. AI Agent Analysis & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: AI Agent Reasoning Log */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Bot className="w-5 h-5 text-emerald-600" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              90TA AI Agent 深度决策报告
            </h4>
          </div>

          {isAnalyzing ? (
            <div className="py-12 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                正在载入客户采购历史序列，对齐商超实时在架批次...
              </div>
            </div>
          ) : matchedResults ? (
            <div className="space-y-4 text-xs">
              {/* Urgent Shortage Notice */}
              <div className="p-3.5 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-300 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-xs">
                  <TrendingDown className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>预测断货预警 (Stockout Forecast)</span>
                </div>
                <p className="leading-relaxed text-[11px]">{matchedResults.urgentShortage}</p>
              </div>

              {/* Reasoning Engine Output */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-slate-700 dark:text-slate-300">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>自主匹配推荐逻辑</span>
                </div>
                <p className="leading-relaxed text-[11px]">{matchedResults.aiReasoning}</p>
              </div>

              {/* Profile Consumption DNA */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 space-y-1.5 text-[11px]">
                <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                  客户食材消耗模型特征 (Historical DNA)
                </div>
                <div className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedProfile.historySummary}
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200 dark:border-slate-700 font-mono text-slate-500">
                  <span>月度平均食材预算:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {formatPrice(selectedProfile.monthlyBudget / 7, selectedProfile.monthlyBudget)}
                  </span>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Right Column: Matched Surplus Batches with 1-Click Lock */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                AI 主动预匹配商品清单（智能锁库通道）
              </h4>
              <div className="text-xs text-slate-400 mt-0.5">
                直接为买家精准匹配并生成专享锁库建议
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600">
              {matchedResults?.recommendedBatches.length || 0} 个精准匹配批次
            </span>
          </div>

          {matchedResults?.recommendedBatches.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              当前门店内暂无与该画像完全匹配的在架临期品，AI 将在明晨 07:00 早巡录入后持续主动监听。
            </div>
          ) : (
            <div className="space-y-4">
              {matchedResults?.recommendedBatches.map(({ batch, product, matchScore, suggestedQty, savingEstimate }) => {
                const isLocked = lockedBatchId === batch.id;
                return (
                  <div
                    key={batch.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40 hover:border-emerald-500/60 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={product.image_url}
                        alt={product.title}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-lg object-cover bg-slate-200 shrink-0"
                      />
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                            {matchScore}% AI 匹配度
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            {batch.expiry_date} 到期
                          </span>
                        </div>
                        <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {currency === 'RMB' && product.title_zh ? product.title_zh : product.title}
                        </h5>
                        <div className="text-[11px] text-slate-500">
                          建议补货数量：<strong className="text-slate-800 dark:text-slate-200 font-mono">{suggestedQty} 箱/件</strong> ·{' '}
                          单箱救食价：<span className="font-mono font-bold text-emerald-600">{formatPrice(batch.discounted_price, batch.discounted_price_rmb)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 shrink-0">
                      <div className="text-right font-mono">
                        <div className="text-[10px] text-slate-400 font-sans">预计节省采购成本</div>
                        <div className="text-xs font-black text-emerald-600">
                          省 {formatPrice(savingEstimate)}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAgentReserve(batch.id, suggestedQty)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                          isLocked
                            ? 'bg-emerald-700 text-white'
                            : 'bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white shadow-xs'
                        }`}
                      >
                        {isLocked ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>AI 专享已锁库！</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>采纳并 10 分钟锁库</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
