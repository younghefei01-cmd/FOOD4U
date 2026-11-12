import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  ShieldCheck,
  CreditCard,
  FileText,
  Building2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Download,
  Users,
  Compass,
  DollarSign,
  Scale
} from 'lucide-react';

export const ChinaPlaybookView: React.FC = () => {
  const { currency, formatPrice } = useApp();

  const [activeTab, setActiveTab] = useState<'risk' | 'settlement' | 'licenses' | 'growth' | 'b2b_strategy' | 'term_sheet'>('b2b_strategy');

  // Term Sheet copy / download
  const termSheetText = `====================================================================
【FOOD4U 超市试点合作协议 (Pilot Term Sheet / MOU)】
====================================================================
甲方（商超试点方）：__________________________________
乙方（平台运营方）：FOOD4U 智能商超清仓平台

第一条 合作模式与范畴
1. 甲方授权乙方在其指定试点门店建立“FOOD4U 临期预包装商品数字化清仓专区”。
2. 本次试点仅限于常温密封预包装食品（包括米面粮油、调味品、罐头、饮料等），严格排除散装熟食、冷鲜肉禽及破损罐头。
3. 临期定义：严格按照国家市场监管标准，剩余保质期介于 30 至 60 天之内。

第二条 结算机制与佣金抽成
1. 结算采用持牌第三方机构（微信支付“电商收付通” / 商业银行二级存管）进行资金托管。
2. 交易佣金：乙方按实际核销成交金额的 15% 计提技术服务费；甲方实得 85%。
3. T+1 日自动清算至甲方对公银行账户，乙方出具 6% 增值税专用发票（信息技术服务费）。

第三条 履约动线与自提时间
1. B2B 商业大宗订单（整箱）：由买家于每日早间 07:30 - 09:30 前往甲方后门货运装卸码头核销自提，不占用前台收银通道。
2. B2C 个人散单订单：由买家于甲方总服务台凭数字提货码自提。

第四条 食品安全与风控兜底
1. 乙方负责为试点项目统一部署商业“食品安全责任险（食责险）”。
2. 现场交接实行当面验货，发现严重外箱破损或胀气，门店手持端实行 1 键无理由原路退款。

甲方盖章代表：_________________    乙方盖章代表：_________________
签署日期：2026年___月___日        签署日期：2026年___月___日
====================================================================`;

  const handleDownloadTermSheet = () => {
    const element = document.createElement('a');
    const file = new Blob([termSheetText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'FOOD4U_Supermarket_Pilot_TermSheet_MOU.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-8">
      {/* 1. Header Hero */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold rounded-md">
                China Market Strategy & Playbook
              </span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span className="text-xs text-slate-500 font-medium">
                《中华人民共和国反食品浪费法》合规落地实操
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {currency === 'RMB'
                ? '中国商业落地智库：成本、牌照、风控、大卖场结算与获客'
                : 'China Operational Playbook: Economics, Licensing, Risk & Retailer Settlement'}
            </h2>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl">
          针对商超合作准入、食品安全责任规避、微信/支付宝资金合规分账、增值电信牌照办理，以及第一阶段为什么必须以 B2B 餐饮大宗为突破口提供完整实施指南。
        </p>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 overflow-x-auto">
          {[
            { id: 'b2b_strategy', label: '1. 为什么 B2B 破局第一阶段', icon: <Users className="w-3.5 h-3.5" /> },
            { id: 'risk', label: '2. 食品安全与中毒风控措施', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
            { id: 'settlement', label: '3. 合作大卖场银行结算分账', icon: <CreditCard className="w-3.5 h-3.5" /> },
            { id: 'licenses', label: '4. 必须取得的牌照四件套', icon: <Scale className="w-3.5 h-3.5" /> },
            { id: 'growth', label: '5. 低成本宣传与获客打法', icon: <Compass className="w-3.5 h-3.5" /> },
            { id: 'term_sheet', label: '6. 商超试点合作协议 (Term Sheet)', icon: <FileText className="w-3.5 h-3.5" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white dark:bg-emerald-600 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Tab Contents */}

      {/* Tab 1: Why B2B Strategy for Phase 1 */}
      {activeTab === 'b2b_strategy' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600" />
              <span>核心战略：第一阶段（冷启动期）为什么必须 80% 精力压在 B2B？</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50 rounded-xl space-y-2">
                <span className="font-bold text-emerald-900 dark:text-emerald-300 text-sm">
                  痛点精准：解决商超“整箱积压”
                </span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  商超店长最头疼的是后仓压了 30 箱 45 天到期的食用油、番茄酱或挂面。散卖给普通顾客一个月都卖不完，店员每天理货心力交瘁；而一个餐饮 B2B 客户一单就能提走 10–20 箱，<strong>商超店长配合意愿高出 10 倍</strong>。
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2">
                <span className="font-bold text-slate-900 dark:text-white text-sm">
                  客单价高，人效极高
                </span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  B2B 客单价通常在 300–1,500 元之间，只需维护好周边 <strong>15–20 家稳定合作的餐馆、快餐连锁或食堂</strong>，单店每月就能产生 2–4 万元稳定流水；若做 B2C，你需要拉动几千名散客，获客和客服成本极易拖垮初创团队。
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2">
                <span className="font-bold text-slate-900 dark:text-white text-sm">
                  动线独立，不扰乱超市日常营业
                </span>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  B2B 约定在早晨 07:30–09:30 前往超市后门的供货卸货码头，小货车或面包车 5 分钟装车即走，不占用前台收银通道与顾客停车位，<strong>大卖场防损与营运总监极易批准落地</strong>。
                </p>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-semibold border-b border-slate-200 dark:border-slate-700">
                    <th className="p-3">对比维度</th>
                    <th className="p-3 text-emerald-700 dark:text-emerald-400">B2B 商业大宗 (餐馆/食堂/烘焙)</th>
                    <th className="p-3">B2C 个人消费者 (周边居民/年轻人)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr>
                    <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">客单价 (AOV)</td>
                    <td className="p-3 font-mono font-bold text-emerald-600">300 – 2,000 元/单</td>
                    <td className="p-3 font-mono">15 – 45 元/单</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">采购频次</td>
                    <td className="p-3 font-semibold">每周 2–3 次，规律周期性复购</td>
                    <td className="p-3">随机偶发性，受促销驱动</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">关注核心</td>
                    <td className="p-3">每公斤/升极致底价、出厂质检凭证、开发票</td>
                    <td className="p-3">外包装颜值、口味新鲜感、捡漏心理</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">自提场景</td>
                    <td className="p-3">商超后门货运装卸码头 (专用通道)</td>
                    <td className="p-3">商超前台总服务台 / 救食专柜</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-700 dark:text-slate-300">售后纠纷率</td>
                    <td className="p-3 font-semibold text-emerald-700">极低（只要原包装在保、未破漏即收）</td>
                    <td className="p-3 text-amber-600">较高（对外箱微压痕、临期时间较敏感）</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Food Safety & Risk Mitigation */}
      {activeTab === 'risk' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>食品安全与食物中毒风险：五层风控防护墙</span>
            </h3>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-mono">1</span>
                  <span>严格限定品类：坚决执行“负面清单”制度（从源头杜绝生鲜熟食）</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg text-emerald-900 dark:text-emerald-300">
                    <span className="font-bold">✓ 仅允许准入品类：</span>
                    <ul className="list-disc list-inside mt-1 space-y-0.5 text-[11px]">
                      <li>工厂出厂密封完好、国家强制标准清晰的<strong>常温预包装食品</strong></li>
                      <li>米面粮油、调味酱料、挂面意面、封口罐头、常温盒装牛奶/植物奶、密封饼干膨化等</li>
                    </ul>
                  </div>
                  <div className="p-2.5 bg-red-50 dark:bg-red-950/30 rounded-lg text-red-900 dark:text-red-300">
                    <span className="font-bold">✕ 严禁准入品类 (一票否决)：</span>
                    <ul className="list-disc list-inside mt-1 space-y-0.5 text-[11px]">
                      <li>散装现制熟食、卤味凉菜</li>
                      <li>冷藏生鲜肉禽、生鲜水产、巴氏低温巴氏奶</li>
                      <li>出现轻微胀气、漏气、封口破损的罐头或软包装</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-mono">2</span>
                  <span>投保“食品安全责任险 (食责险)”：商保兜底，免除后顾之忧</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  平台与中国人保 (PICC) 或平安产险合作，为平台所有交易流转商品统一部署食责险（按年或按单保费极低，年费约 3,000–8,000 元）。若偶发非故意食安争议或消费者身体不适，由保险公司先行勘验理赔（单次事故保障额度 50–100 万元）。
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-mono">3</span>
                  <span>严格遵守《临期食品界定标准》：合法临期，系统严禁销售过期品</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  国家市场监管总局有明文规定临期界定范围（如 1 年以上保质期商品，剩余 30–60 天即进入临期区间）。系统设置绝对防错逻辑：<strong>一旦超过保质期 0 秒，系统立刻自动物理下架并锁定，杜绝任何超期销售可能</strong>。
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-mono">4</span>
                  <span>提货现场“当面验货 + 1 键售后退款机制”</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  买家在码头或服务台核销时当面验箱。若发现箱体受潮或内部严重凹罐，店员可在手机端 1 键发起原路全额退款，问题商品绝不出店，避免离店后的责任扯皮。
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Supermarket Escrow Settlement */}
      {activeTab === 'settlement' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-600" />
              <span>合作大型连锁商超与大卖场的资金结算机制与合规架构</span>
            </h3>

            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-3">
              <div className="font-bold text-slate-900 dark:text-white">
                银行级托管与自动分账（彻底规避“二清”金融合规风险）:
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-[11px] space-y-2">
                <div className="text-emerald-600 font-bold">
                  【买家付款】 ── 100% 资金直接进入 微信支付“电商收付通” / 招商银行监管专户 (平台不触碰资金)
                </div>
                <div className="text-slate-600 dark:text-slate-400 pl-4">
                  │  （买家前往超市卸货码头 / 服务台，店员扫码完成核销指令）
                </div>
                <div className="text-slate-800 dark:text-slate-200 pl-4">
                  ├── 85% 货款 ──&gt; 自动清算至【商超企业对公商户号】 (T+1 自动划拨至商超对公账户)
                </div>
                <div className="text-slate-800 dark:text-slate-200 pl-4">
                  ├── 15% 佣金 ──&gt; 自动清算至【FOOD4U 平台运营主体账户】 (平台出具 6% 技术服务费发票)
                </div>
                <div className="text-slate-800 dark:text-slate-200 pl-4">
                  └── 0.6% 手续费 ──&gt; 扣除微信/银行支付通道费
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="font-bold text-slate-900 dark:text-white">与超市财务 POS / ERP 的配合:</span>
                <p className="text-slate-500 leading-relaxed">
                  <strong>不改动商超前台收银机</strong>：货品张贴专属救食标签，通过后仓手机端核销，不在普通收银台过机，彻底杜绝串码风险。
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="font-bold text-slate-900 dark:text-white">每日自动对账冲抵报损:</span>
                <p className="text-slate-500 leading-relaxed">
                  平台每晚 21:00 自动生成商超内部格式的对账单 (Reconciliation CSV)，包含商超内部 SKU、批号与核销流水号，财务可直接导入金蝶/用友/SAP 抵扣盘亏报损。
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Licenses Required */}
      {activeTab === 'licenses' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-600" />
              <span>国内开展本业务必须取得的牌照“四件套”</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">1. 《营业执照》</span>
                  <span className="text-emerald-600 font-semibold text-[11px]">基础资质</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  <strong>经营范围必须包含</strong>：互联网销售、食品互联网销售、企业管理咨询、供应链管理服务、软件开发。
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">2. 《预包装食品销售备案》</span>
                  <span className="text-emerald-600 font-semibold text-[11px]">极简线上办理</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  自 2021 年起，国家对仅销售预包装食品由“许可制”调整为“备案制”。直接在所在地市场监督管理局官网提交，<strong>1–2 个工作日</strong>即可在线取得备案编号。
                </p>
              </div>

              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-900 dark:text-emerald-300 text-sm">
                    3. 《EDI 许可证》 (重中之重！)
                  </span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold text-[11px]">合规核心</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  即<strong>增值电信业务经营许可证（B21 在线数据处理与交易处理业务）</strong>。由于平台涉及超市与买家多方撮合交易，向各省通信管理局申请，微信小程序上线“电商平台”类目必须提供此证（代办周期约 20–40 工作日）。
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">4. 微信公众平台类目审核</span>
                  <span className="text-slate-500 text-[11px]">终端上线</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  小程序选择“电商平台”或“食品专营”类目，上传上述《营业执照》+《预包装食品备案》+《EDI 许可证》即可顺利过审发布。
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Growth & Customer Acquisition */}
      {activeTab === 'growth' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-600" />
              <span>低成本宣传与获客实操打法</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              {/* B2B Playbook */}
              <div className="space-y-3">
                <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  <span>B2B 商业大宗获客 (地推直销)</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="font-semibold text-slate-800 dark:text-slate-200">
                    1. 商超周边 3–5 公里餐饮网格扫街
                  </div>
                  <p className="text-slate-500">
                    业务员手持《价格对比单》（如：“品牌食用油比批发市场便宜 35 元，明天早晨去商超后门码头顺路提走”），直接拜访快餐店、麻辣烫、面馆、大排档后厨。
                  </p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="font-semibold text-slate-800 dark:text-slate-200">
                    2. 外卖厨房产业园与团餐食堂对接
                  </div>
                  <p className="text-slate-500">
                    集中对接美团/饿了么外卖云厨房园区，提供每周固定调味品与大米配送或集约化自提。
                  </p>
                </div>
              </div>

              {/* B2C Playbook */}
              <div className="space-y-3">
                <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>B2C 个人顾客引流 (社交裂变)</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="font-semibold text-slate-800 dark:text-slate-200">
                    1. 小红书/抖音“反向消费”博主种草
                  </div>
                  <p className="text-slate-500">
                    打造“挑战用 10 块钱在商超后仓抱走整包零食”、“年轻人的省钱特种兵攻略”等垂直生活博主内容，切中极致性价比心理。
                  </p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="font-semibold text-slate-800 dark:text-slate-200">
                    2. 商超传统临期货架立牌自然转化
                  </div>
                  <p className="text-slate-500">
                    在超市原本冷清的“临期特价区”摆放醒目立牌：“想整箱批发超低折？扫码直通后仓限时抢购”，直接将现成到店流量转化为线上用户。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Pilot Term Sheet */}
      {activeTab === 'term_sheet' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  <span>1 页纸商超试点合作协议 (Pilot Term Sheet / MOU)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  可直接导出打印，用于与首批独立商超或区域连锁店长洽谈签约
                </p>
              </div>
              <button
                type="button"
                onClick={handleDownloadTermSheet}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>下载协议文本 (.TXT)</span>
              </button>
            </div>

            <pre className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed overflow-x-auto">
              {termSheetText}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
