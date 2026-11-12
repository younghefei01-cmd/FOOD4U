import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FINANCIAL_BENCHMARKS } from '../../data/initialData';
import {
  TrendingUp,
  Leaf,
  Droplet,
  CloudSun,
  Download,
  Building,
  Store,
  Sliders,
  DollarSign,
  CheckCircle2,
  FileCheck
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { esgRecords, orders, currency, formatPrice } = useApp();

  // Interactive Model Simulation State
  const [simStoreCount, setSimStoreCount] = useState<number>(50);
  const [simClearanceUnits, setSimClearanceUnits] = useState<number>(1200);
  const [simSellThrough, setSimSellThrough] = useState<number>(70);
  const [simDiscountPrice, setSimDiscountPrice] = useState<number>(1.80);
  const [simTakeRate, setSimTakeRate] = useState<number>(15);

  // Computed simulation figures
  const simUnitsSold = Math.round(simClearanceUnits * (simSellThrough / 100));
  const simSingleStoreGMV = simUnitsSold * simDiscountPrice;
  const simSingleStoreRecovery = simSingleStoreGMV * (1 - simTakeRate / 100);
  const simSingleStoreTake = simSingleStoreGMV * (simTakeRate / 100);
  const simSingleStoreNetCont = simSingleStoreTake - (simSingleStoreGMV * 0.03); // minus 3% payment processing

  const simTotalGMV = simSingleStoreGMV * simStoreCount;
  const simTotalPlatformGross = simSingleStoreTake * simStoreCount;
  const simTotalOverhead = 2500 + Math.max(0, (simStoreCount - 50) * 35);
  const simTotalNetProfit = (simSingleStoreNetCont * simStoreCount) - simTotalOverhead;

  // Real-time calculated ESG Totals from live records
  const totalDivertedKg = esgRecords.reduce((acc, r) => acc + r.diverted_weight_kg, 0);
  const totalAvoidedCo2eKg = esgRecords.reduce((acc, r) => acc + r.avoided_co2e_kg, 0);
  const totalWaterSavedLiters = esgRecords.reduce((acc, r) => acc + r.water_saved_liters, 0);

  // CSV Export Handler
  const handleExportCsv = () => {
    const headers = ['Record ID', 'Store ID', 'Order ID', 'Diverted Weight (kg)', 'Avoided CO2e (kg)', 'Water Saved (Liters)', 'Logged Timestamp'];
    const rows = esgRecords.map((r) => [
      r.id,
      r.store_id,
      r.order_id,
      r.diverted_weight_kg,
      r.avoided_co2e_kg,
      r.water_saved_liters,
      r.logged_at
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `rescueshelf_esg_audit_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* 1. Header & ESG Highlights */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              {currency === 'RMB' ? '环境与可持续发展数据审计' : 'Certified Sustainability Audit'}
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
              {currency === 'RMB' ? 'ESG 减损与碳足迹综合总览' : 'ESG Environmental Impact & Avoided Waste'}
            </h2>
          </div>
          <button
            onClick={handleExportCsv}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors shadow-xs shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{currency === 'RMB' ? '导出 ESG 审计报表 (CSV)' : 'Export Audit CSV'}</span>
          </button>
        </div>

        {/* 3 Dominant ESG KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Diverted Weight */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {currency === 'RMB' ? '累计减少填埋食物' : 'Landfill Food Diverted'}
              </span>
              <Leaf className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {totalDivertedKg.toFixed(1)}{' '}
              <span className="text-sm font-normal text-slate-400">kg</span>
            </div>
            <div className="text-[11px] text-slate-400">
              {currency === 'RMB' ? '约合 1,500+ 餐份常温干货' : 'Equal to ~1,500+ pantry meals'}
            </div>
          </div>

          {/* Card 2: Avoided CO2e */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {currency === 'RMB' ? '减少温室气体排放' : 'Avoided Carbon Footprint'}
              </span>
              <CloudSun className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {(totalAvoidedCo2eKg / 1000).toFixed(2)}{' '}
              <span className="text-sm font-normal text-slate-400">t CO2e</span>
            </div>
            <div className="text-[11px] text-slate-400">
              {totalAvoidedCo2eKg.toFixed(1)} kg CO2e 避免排入大气
            </div>
          </div>

          {/* Card 3: Water Saved */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {currency === 'RMB' ? '节约农业灌溉水' : 'Agricultural Water Saved'}
              </span>
              <Droplet className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
              {(totalWaterSavedLiters / 1000).toFixed(1)}{' '}
              <span className="text-sm font-normal text-slate-400">kL</span>
            </div>
            <div className="text-[11px] text-slate-400">
              {totalWaterSavedLiters.toLocaleString()} 升洁净水足迹回收
            </div>
          </div>
        </div>
      </div>

      {/* 2. Pilot Store Unit Economics vs Cluster Scale */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Single Pilot Store Model */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {currency === 'RMB' ? '单店试点单月经济模型 (Pilot Store)' : 'Single Pilot Store Monthly Economics'}
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-600">
              15% Take Rate
            </span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300">
              <span className="font-sans">{currency === 'RMB' ? '月度巡检临期总量:' : 'Monthly Clearance Units:'}</span>
              <span>1,200 件</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300">
              <span className="font-sans">{currency === 'RMB' ? '原平均售价 (MSRP):' : 'Avg Retail Price (MSRP):'}</span>
              <span>{formatPrice(4.50, 31.50)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300">
              <span className="font-sans">{currency === 'RMB' ? '救食折后售价 (4折):' : 'Discounted Listing Price:'}</span>
              <span>{formatPrice(1.80, 12.60)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300">
              <span className="font-sans">{currency === 'RMB' ? '目标动销售出率:' : 'Target Sell-Through Rate:'}</span>
              <span className="text-emerald-600 font-bold">70% (840 件)</span>
            </div>

            <div className="pt-2 space-y-1.5">
              <div className="flex justify-between text-slate-800 dark:text-slate-100 font-bold">
                <span className="font-sans">{currency === 'RMB' ? '月度总交易额 (GMV):' : 'Monthly Gross GMV:'}</span>
                <span>{formatPrice(1512.00, 10584.00)}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-bold">
                <span className="font-sans">{currency === 'RMB' ? '商超单店净挽回资金 (85%):' : 'Supermarket Net Recovery:'}</span>
                <span>{formatPrice(1285.20, 8996.40)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span className="font-sans">{currency === 'RMB' ? '平台毛服务费 (15%):' : 'Platform Gross Revenue (15%):'}</span>
                <span>{formatPrice(226.80, 1587.60)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span className="font-sans">{currency === 'RMB' ? '微信/银行支付通道费 (3%):' : 'Payment Processing (3%):'}</span>
                <span>-{formatPrice(45.36, 317.52)}</span>
              </div>
              <div className="flex justify-between text-slate-900 dark:text-white font-bold pt-1.5 border-t border-slate-200 dark:border-slate-700">
                <span className="font-sans">{currency === 'RMB' ? '平台单店单月净贡献:' : 'Platform Net Contribution/Store:'}</span>
                <span className="text-emerald-600 text-sm font-black">{formatPrice(181.44, 1270.08)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 50-Store Regional Cluster Model */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {currency === 'RMB' ? '50 家连锁门店区域集群模型 (Cluster Scale)' : '50-Store Regional Scale Monthly Model'}
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-slate-500">
              50 Stores
            </span>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1.5">
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span className="font-sans">{currency === 'RMB' ? '月度集群总流水 (GMV):' : 'Cluster Monthly GMV:'}</span>
                <span className="font-bold text-slate-900 dark:text-white">{formatPrice(75600.00, 529200.00)}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-bold">
                <span className="font-sans">{currency === 'RMB' ? '商超系统总挽回资金 (85%):' : 'Supermarkets Total Net Recovery:'}</span>
                <span>{formatPrice(64260.00, 449820.00)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span className="font-sans">{currency === 'RMB' ? '平台净贡献佣金总额:' : 'Platform Net Contribution:'}</span>
                <span>{formatPrice(9072.00, 63504.00)}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1.5">
              <div className="flex justify-between text-slate-500">
                <span className="font-sans">{currency === 'RMB' ? '月度运营杂费 (云服务器/客服):' : 'Overhead (Hosting & Support):'}</span>
                <span>-{formatPrice(2500.00, 17500.00)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-emerald-600 pt-1 border-t border-slate-200 dark:border-slate-700">
                <span className="font-sans">{currency === 'RMB' ? '平台月度净营业利润 (EBITDA):' : 'Monthly Net Operating Profit:'}</span>
                <span>{formatPrice(6572.00, 46004.00)}</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 font-sans leading-relaxed">
              {currency === 'RMB'
                ? '注：此模型尚未计入 B2B 商业买家 ¥299/月 的优先抢购订阅费，以及连锁商超企业端 ¥800/店/月 的 ESG 数据合规报表费。'
                : 'Note: Excludes secondary revenue streams (B2B Priority subscriptions at $49/mo and Enterprise ESG Analytics at $150/store/mo).'}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Interactive Scenario Simulation Sliders */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <Sliders className="w-5 h-5 text-emerald-600" />
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {currency === 'RMB' ? '实时商业规模与收益模拟器' : 'Interactive Scale & Revenue Scenario Simulator'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {currency === 'RMB'
                ? '拖动滑块自定义合作门店数、临期动销率及平台抽成，实时测算商超增收与平台利润'
                : 'Adjust store counts, sell-through rates, and take-rates to project pilot expansion'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          {/* Slider 1: Store Count */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300">
              <span>{currency === 'RMB' ? '合作门店数量' : 'Partner Stores'}:</span>
              <span className="font-mono text-emerald-600 font-bold">{simStoreCount} {currency === 'RMB' ? '家' : 'stores'}</span>
            </div>
            <input
              type="range"
              min="5"
              max="200"
              step="5"
              value={simStoreCount}
              onChange={(e) => setSimStoreCount(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-600"
            />
          </div>

          {/* Slider 2: Clearance Units */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300">
              <span>{currency === 'RMB' ? '单店单月临期件数' : 'Clearance Units/Mo'}:</span>
              <span className="font-mono text-emerald-600 font-bold">{simClearanceUnits} 件</span>
            </div>
            <input
              type="range"
              min="500"
              max="3000"
              step="100"
              value={simClearanceUnits}
              onChange={(e) => setSimClearanceUnits(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-600"
            />
          </div>

          {/* Slider 3: Sell-Through */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300">
              <span>{currency === 'RMB' ? '目标动销转化率' : 'Sell-Through Rate'}:</span>
              <span className="font-mono text-emerald-600 font-bold">{simSellThrough}%</span>
            </div>
            <input
              type="range"
              min="40"
              max="95"
              step="5"
              value={simSellThrough}
              onChange={(e) => setSimSellThrough(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-600"
            />
          </div>

          {/* Slider 4: Take Rate */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300">
              <span>{currency === 'RMB' ? '平台抽成比例 (Take-Rate)' : 'Take Rate %'}:</span>
              <span className="font-mono text-emerald-600 font-bold">{simTakeRate}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="25"
              step="1"
              value={simTakeRate}
              onChange={(e) => setSimTakeRate(parseInt(e.target.value, 10))}
              className="w-full accent-emerald-600"
            />
          </div>
        </div>

        {/* Dynamic Simulation Output KPI Row */}
        <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800/60 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <div className="text-[11px] text-slate-500 font-sans">{currency === 'RMB' ? '月度总交易额 (GMV)' : 'Projected GMV'}</div>
            <div className="text-base font-black text-slate-900 dark:text-white mt-0.5">
              {formatPrice(simTotalGMV)}
            </div>
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-sans">{currency === 'RMB' ? '商超总挽回资金' : 'Retailer Net Recovery'}</div>
            <div className="text-base font-black text-emerald-700 dark:text-emerald-400 mt-0.5">
              {formatPrice(simSingleStoreRecovery * simStoreCount)}
            </div>
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-sans">{currency === 'RMB' ? '平台月度净利润' : 'Platform Net Profit'}</div>
            <div className="text-base font-black text-emerald-600 mt-0.5">
              {formatPrice(Math.max(0, simTotalNetProfit))}
            </div>
          </div>
          <div>
            <div className="text-[11px] text-slate-500 font-sans">{currency === 'RMB' ? '单店年化增收' : 'Annual Store Recovery'}</div>
            <div className="text-base font-black text-slate-900 dark:text-white mt-0.5">
              {formatPrice(simSingleStoreRecovery * 12)}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Live Recent ESG Audit Records Log */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              {currency === 'RMB' ? '最近已完成自提核销的 ESG 减损日志' : 'Verified Food Diversion Log'}
            </h4>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {esgRecords.length} Verified Records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-medium">
                <th className="py-2.5 px-3">Order / Store</th>
                <th className="py-2.5 px-3 text-right">Diverted Weight</th>
                <th className="py-2.5 px-3 text-right">Avoided CO2e</th>
                <th className="py-2.5 px-3 text-right">Water Conserved</th>
                <th className="py-2.5 px-3 text-right">Logged Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
              {esgRecords.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-2.5 px-3 font-sans">
                    <span className="font-bold text-slate-900 dark:text-white">{r.order_id}</span>
                    <span className="text-slate-400 ml-2 text-[11px]">{r.store_id}</span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-emerald-600">
                    +{r.diverted_weight_kg} kg
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-700 dark:text-slate-300">
                    +{r.avoided_co2e_kg} kg
                  </td>
                  <td className="py-2.5 px-3 text-right text-blue-600">
                    +{r.water_saved_liters.toLocaleString()} L
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-400 text-[11px]">
                    {new Date(r.logged_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
