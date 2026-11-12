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
  Scale,
  BookOpen,
  Globe,
  Terminal,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react';

export const ChinaPlaybookView: React.FC = () => {
  const { currency, formatPrice } = useApp();

  const [activeTab, setActiveTab] = useState<'risk' | 'settlement' | 'licenses' | 'growth' | 'b2b_strategy' | 'term_sheet' | 'readme_view'>('b2b_strategy');
  const [readmeLang, setReadmeLang] = useState<'en' | 'cn'>('en'); // Defaults to English
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  // Term Sheet copy / download
  const termSheetText = `====================================================================
【FOOD4U 全球商超试点合作协议 (Global Pilot Term Sheet / MOU)】
====================================================================
甲方（商超试点方）：__________________________________
乙方（平台运营方）：FOOD4U 智能商超清仓平台 (FOOD4U Technologies Inc.)

第一条 合作模式与范畴 (Scope of Cooperation)
1. 甲方授权乙方在其指定试点门店建立“FOOD4U 临期预包装商品数字化清仓专区”。
2. 本次试点仅限于常温密封预包装食品（包括米面粮油、调味品、罐头、常温饮料等），严格排除散装熟食、冷鲜肉禽及破损罐头。
3. 临期界定：严格按照国际通行标准，处于最佳赏味期（Best-Before / Best-By）剩余 30 至 60 天之内。

第二条 资金托管机制与佣金抽成 (Payment Escrow & Split)
1. 结算采用国际一级持牌机构（Stripe Connect / 跨国商业银行二级监管专户）进行资金托管，平台不触碰沉淀资金。
2. 交易佣金：乙方按实际核销成交金额的 15% 计提技术服务费；甲方实得 85%。
3. T+1 / T+2 日自动清算至甲方商业银行对公账户，系统每晚自动输出 ERP 报损对账单 (Reconciliation File)。

第三条 履约动线与自提时间 (Dock Pickup & Counter SOP)
1. B2B 商业大宗订单（整箱）：由买家于每日早间 07:30 - 09:30 前往甲方后门货运装卸码头（Loading Dock）核销自提，不占用前台收银通道。
2. B2C 个人散单订单：由买家于甲方总服务台凭数字提货码自提。

第四条 食品安全与全球风控兜底 (Food Safety & Good Samaritan Shield)
1. 适用国际通行的《好撒玛利亚人法》(Bill Emerson Good Samaritan Act) 法律责任豁免机制。
2. 乙方负责为试点项目统一部署商业“全球食品产品责任险 (Commercial Product Liability Insurance)”。
3. 现场交接实行当面验货，发现严重外箱破损或胀气，门店手持端实行 1 键无理由原路退款。

甲方盖章代表：_________________    乙方盖章代表：_________________
签署日期：2026年___月___日        签署日期：2026年___月___日
====================================================================`;

  const handleDownloadTermSheet = () => {
    const element = document.createElement('a');
    const file = new Blob([termSheetText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'FOOD4U_Global_Supermarket_Pilot_MOU.txt';
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
                Global Market Strategy & Regulatory Playbook
              </span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span className="text-xs text-slate-500 font-medium">
                联合国 UN SDG 12.3 全球食品减损战略与实操指引
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {currency === 'RMB'
                ? '全球商超落地智库：经济模型、法务豁免、银行托管、国际收单与商业获客'
                : 'Global Operational Playbook: Economics, Licensing, Risk & Multi-Currency Settlement'}
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('readme_view')}
            className="flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 self-start sm:self-center"
          >
            <BookOpen className="w-4 h-4" />
            <span>📖 项目 Readme 文档 (默认 EN / 点击切 CN)</span>
          </button>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl">
          针对全球大型连锁商超合作准入、欧美《好撒玛利亚人法案》(Good Samaritan Acts) 责任豁免、Stripe Connect / Adyen 银行级资金分账托管、跨国食品责任险，以及第一阶段为什么必须以 B2B 餐饮大宗为突破口提供完整实施指南。
        </p>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 overflow-x-auto">
          {[
            { id: 'b2b_strategy', label: '1. 为什么 B2B 破局第一阶段', icon: <Users className="w-3.5 h-3.5" /> },
            { id: 'risk', label: '2. 食品安全与好撒玛利亚人法案', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
            { id: 'settlement', label: '3. 全球大卖场银行托管分账', icon: <CreditCard className="w-3.5 h-3.5" /> },
            { id: 'licenses', label: '4. 国际展业合规资质四件套', icon: <Scale className="w-3.5 h-3.5" /> },
            { id: 'growth', label: '5. 低成本宣传与全球获客打法', icon: <Compass className="w-3.5 h-3.5" /> },
            { id: 'term_sheet', label: '6. 全球商超试点协议 (Global MOU)', icon: <FileText className="w-3.5 h-3.5" /> },
            { id: 'readme_view', label: '7. 📖 开源 Readme (EN/CN 切换)', icon: <BookOpen className="w-3.5 h-3.5 text-emerald-500" /> }
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
                  <span>投保“全球商业综合与产品责任险 (Commercial Product Liability)”：商保兜底</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  平台与 Allianz (安联)、Chubb (丘博) 或 AXA 等国际顶尖商业财险机构对接，为平台流转所有常温标品统一部署产品责任与污染保险。若偶发非故意食安争议，由保险机构快速勘验理赔（单次事故保障额度 100 万至 200 万美元）。
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-mono">3</span>
                  <span>遵循国际法典标准与《好撒玛利亚人法》(Good Samaritan Acts)</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  严格区分“最佳赏味期 (Best-Before)”与“安全保质期 (Use-By)”。美国《比尔·埃默森好撒玛利亚人法案》及欧盟《食品再分发指引》明确对非故意的余量食品转让提供全面民事侵权责任豁免。系统设置绝对防错逻辑：<strong>一旦超过官方保质期 0 秒，系统立刻自动物理下架并锁定，杜绝任何超期销售可能</strong>。
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
              <span>全球大型连锁商超与跨国大卖场的资金托管分账架构</span>
            </h3>

            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-3">
              <div className="font-bold text-slate-900 dark:text-white">
                国际商业银行托管与自动分账（Stripe Connect / Adyen for Platforms 架构）:
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-[11px] space-y-2">
                <div className="text-emerald-600 font-bold">
                  【买家付款】 ── 100% 资金直接进入 Stripe Connect / 国际持牌信托托管专户 (平台零资金沉淀)
                </div>
                <div className="text-slate-600 dark:text-slate-400 pl-4">
                  │  （买家前往商超后门卸货码头 / 服务台，店员扫码验证完成核销指令）
                </div>
                <div className="text-slate-800 dark:text-slate-200 pl-4">
                  ├── 85% 货款 ──&gt; 自动清算至【商超企业商业银行账户】 (T+1/T+2 自动划拨)
                </div>
                <div className="text-slate-800 dark:text-slate-200 pl-4">
                  ├── 15% 佣金 ──&gt; 自动清算至【FOOD4U 平台运营主体账户】 (出具正规技术服务发票与 Invoice)
                </div>
                <div className="text-slate-800 dark:text-slate-200 pl-4">
                  └── 2.9% 手续费 ──&gt; 扣除国际卡组织 / 银行支付网关标准手续费
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="font-bold text-slate-900 dark:text-white">与超市财务 POS / ERP 的配合:</span>
                <p className="text-slate-500 leading-relaxed">
                  <strong>不改动商超前台现有收银系统</strong>：货品张贴专属救食标签，通过后仓手机端核销，不在普通收银台过机，彻底杜绝串码与串货风险。
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="font-bold text-slate-900 dark:text-white">每日自动对账冲抵报损:</span>
                <p className="text-slate-500 leading-relaxed">
                  平台每晚 21:00 自动生成商超内部通用格式的对账单 (Reconciliation CSV)，包含商超内部 SKU、批号与核销流水号，财务可直接导入 SAP、Oracle NetSuite、Microsoft Dynamics 抵扣盘亏报损。
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
              <span>全球开展本业务标准合规资质“四件套”</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">1. 企业法人商业注册 (Corporate Entity)</span>
                  <span className="text-emerald-600 font-semibold text-[11px]">基础资质</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  <strong>经营范畴必须包含</strong>：电子商务运营、供应链管理技术服务、食品批发流通居间、企业管理咨询与软件服务 (LLC / C-Corp / Ltd.)。
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">2. 预包装食品设施经营备案 (Food Facility Registration)</span>
                  <span className="text-emerald-600 font-semibold text-[11px]">线上合规备案</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  按照当地食品安全监管标准（如美国 FDA Food Facility Registration、欧洲 EFSA、英国 FSA），仅经营密封常温标品无须实体仓储审核，通常在线提交 1–3 个工作日即可取得注册编号。
                </p>
              </div>

              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-900 dark:text-emerald-300 text-sm">
                    3. 平台型撮合电商服务条款 (Marketplace Platform Terms)
                  </span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold text-[11px]">权责清晰</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  平台明确作为信息技术居间撮合方（Marketplace Facilitator），买卖合同直接存在于商超与买家之间，资金通过受监管的 Stripe / Adyen 独立清算通道流转，杜绝法律连带责任。
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">4. 全球商业综合责任与产品险 (General Liability Policy)</span>
                  <span className="text-slate-500 text-[11px]">风险兜底</span>
                </div>
                <p className="text-slate-500 leading-relaxed">
                  保单包含第三方产品意外责任与污染保险，为合作商超提供免责担保凭证 (Certificate of Insurance)，让大卖场法务与风险管理部门能够 100% 放心准入。
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

      {/* Tab 7: In-App Interactive Readme with Default English and 1-Click CN/EN Switch */}
      {activeTab === 'readme_view' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
            
            {/* Header with CN / EN Switcher Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                    {readmeLang === 'en'
                      ? 'FOOD4U · Open Source Documentation (README)'
                      : 'FOOD4U · 开源全景项目说明文档 (README)'}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold">
                    v1.0.0
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {readmeLang === 'en'
                    ? '100% in-app interactive reader. Default: English (README_EN.md). Click below to toggle Chinese (README.md).'
                    : '应用内全功能交互式文档。默认英文版，点击可随时中英双向无缝切换，无需跳转 GitHub 仓库。'}
                </p>
              </div>

              {/* Direct CN / EN Switch Buttons */}
              <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => setReadmeLang('en')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    readmeLang === 'en'
                      ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="English Readme (Default)"
                >
                  <span>🇺🇸 English (Default)</span>
                  <span className="text-[10px] opacity-75 font-mono">EN</span>
                </button>
                <button
                  type="button"
                  onClick={() => setReadmeLang('cn')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    readmeLang === 'cn'
                      ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="切换至中文说明"
                >
                  <span>🇨🇳 中文说明</span>
                  <span className="text-[10px] opacity-75 font-mono">CN</span>
                </button>
              </div>
            </div>

            {/* Quick Command Bar */}
            <div className="p-3.5 bg-slate-950 text-slate-100 rounded-xl border border-slate-800 text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-400">git clone:</span>
                <span className="text-emerald-300 font-semibold truncate">git clone https://github.com/your-org/FOOD4U.git</span>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard('git clone https://github.com/your-org/FOOD4U.git && cd FOOD4U && npm install && npm run dev', 'clone_cmd')}
                className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded transition-colors shrink-0"
              >
                {copiedSnippet === 'clone_cmd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSnippet === 'clone_cmd' ? '已复制 Copied' : '复制命令 Copy'}</span>
              </button>
            </div>

            {/* ========================================================= */}
            {/* ENGLISH VERSION (README_EN.md - DEFAULT) */}
            {/* ========================================================= */}
            {readmeLang === 'en' ? (
              <div className="space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {/* Language Switch Callout */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                  <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 text-xs">
                    <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Viewing <strong>English Documentation (README_EN.md - Default)</strong>. Need Chinese?</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setReadmeLang('cn')}
                    className="px-3 py-1.5 text-xs font-bold bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 rounded-lg hover:bg-emerald-100 dark:hover:bg-slate-700 transition-colors shadow-xs flex items-center gap-1.5 shrink-0"
                  >
                    <span>🇨🇳 切换至中文说明 (Switch to Chinese)</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                {/* Badges Bar */}
                <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
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

                {/* Section 1 */}
                <div className="space-y-3">
                  <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-emerald-600" />
                    <span>1. Global Vision & Background (UN SDG 12.3)</span>
                  </h4>
                  <p>
                    Food waste is an escalating global crisis. Under the macro-mandate of <strong>UN Sustainable Development Goal 12.3</strong> (halving global per capita food waste by 2030), supermarkets across North America, Europe, and Asia-Pacific face chronic inventory bottlenecks: <strong>shelf-stable goods reaching 30–60 day Best-Before cutoffs</strong>.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                    <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="font-bold text-slate-900 dark:text-white text-xs mb-1">Erosion of Gross Margin</div>
                      <p className="text-slate-500 text-xs">Sluggish markdown workflows force grocers to take massive write-offs and pay landfill dumping fees, eroding billions in operating margins.</p>
                    </div>
                    <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="font-bold text-slate-900 dark:text-white text-xs mb-1">Heavy-Asset Limitations</div>
                      <p className="text-slate-500 text-xs">Brick-and-mortar closeout discount chains rely on centralized distribution centers, long transit times, and heavy real-estate leases.</p>
                    </div>
                    <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="font-bold text-slate-900 dark:text-white text-xs mb-1">FOOD4U Asset-Light Solution</div>
                      <p className="text-slate-500 text-xs">Morning handheld barcode audit + AI Agent matching + direct loading-dock handoff. Zero warehouse overhead, zero inventory risk.</p>
                    </div>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="space-y-3">
                  <h4 className="text-base font-black text-slate-900 dark:text-white">
                    2. Core Functional Modules
                  </h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="font-bold text-xs text-slate-900 dark:text-white">🏬 Store Operations & Morning Sweep (07:00–08:30)</div>
                      <p className="text-xs text-slate-500 mt-0.5">High-speed handheld scanning of GTIN barcodes, automated countdown decay curves, and batch anti-cashier Rescue Stickers.</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="font-bold text-xs text-slate-900 dark:text-white">🛒 B2B / B2C Dual-Track Marketplace</div>
                      <p className="text-xs text-slate-500 mt-0.5">Wholesale cases (5–50 units) for commercial buyers via loading-dock pickup; consumer packs for walk-in shoppers at the customer counter.</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="font-bold text-xs text-slate-900 dark:text-white">🤖 FOOD4U Proactive AI Matching Agent</div>
                      <p className="text-xs text-slate-500 mt-0.5">Models downstream kitchen ingredient depletion cycles, forecasts stockouts 24–48h in advance, and pre-locks inventory via 10-minute hold carts.</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="font-bold text-xs text-slate-900 dark:text-white">📈 Financial Analytics & ESG Verification</div>
                      <p className="text-xs text-slate-500 mt-0.5">Real-time GMV, 15% platform commission accounting, retailer gross margin salvage, and certified CO₂e/water savings metrics.</p>
                    </div>
                  </div>
                </div>

                {/* Section 3 */}
                <div className="space-y-3">
                  <h4 className="text-base font-black text-slate-900 dark:text-white">
                    3. Production Database Architecture (PostgreSQL Schema)
                  </h4>
                  <p className="text-xs text-slate-500">
                    The platform is modeled around 5 core relational tables supporting full ACID transactions, multi-currency settlement, and verifiable inventory audit trails:
                  </p>
                  <pre className="p-3.5 bg-slate-950 text-slate-200 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
{`-- 1. Pilot Stores
CREATE TABLE stores (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(500) NOT NULL,
  city VARCHAR(100) NOT NULL,
  dock_operating_hours VARCHAR(100) DEFAULT '07:30 - 09:30'
);

-- 2. Surplus Inventory Batches
CREATE TABLE surplus_batches (
  id VARCHAR(64) PRIMARY KEY,
  store_id VARCHAR(64) REFERENCES stores(id),
  product_name VARCHAR(255) NOT NULL,
  category VARCHAR(64) NOT NULL,
  original_price DECIMAL(10, 2) NOT NULL,
  rescue_price DECIMAL(10, 2) NOT NULL,
  stock_quantity INT NOT NULL,
  expiry_date DATE NOT NULL,
  min_order_qty INT DEFAULT 1,
  dock_pickup_eligible BOOLEAN DEFAULT true
);

-- 3. Commercial Orders & Escrow Tokens
CREATE TABLE orders (
  id VARCHAR(64) PRIMARY KEY,
  buyer_name VARCHAR(255) NOT NULL,
  buyer_type VARCHAR(32) NOT NULL, -- 'b2b' | 'b2c'
  total_amount DECIMAL(10, 2) NOT NULL,
  pickup_token VARCHAR(32) UNIQUE NOT NULL,
  status VARCHAR(32) DEFAULT 'pending_pickup',
  payment_escrow_status VARCHAR(32) DEFAULT 'held_in_escrow'
);`}
                  </pre>
                </div>

                {/* Section 4 */}
                <div className="space-y-3">
                  <h4 className="text-base font-black text-slate-900 dark:text-white">
                    4. Quick Start Developer Guide
                  </h4>
                  <div className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs space-y-2 border border-slate-800">
                    <div className="text-slate-500"># 1. Clone repository and install dependencies</div>
                    <div className="text-emerald-400">git clone https://github.com/your-org/FOOD4U.git</div>
                    <div>cd FOOD4U && npm install</div>
                    <div className="text-slate-500 pt-2"># 2. Launch Vite development server on port 3000</div>
                    <div className="text-emerald-400">npm run dev</div>
                    <div className="text-slate-500 pt-2"># 3. Compile production build</div>
                    <div className="text-emerald-400">npm run build</div>
                  </div>
                </div>
              </div>
            ) : (
              /* ========================================================= */
              /* CHINESE VERSION (README.md) */
              /* ========================================================= */
              <div className="space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {/* Language Switch Callout */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl">
                  <div className="flex items-center gap-2 text-blue-900 dark:text-blue-200 text-xs">
                    <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>当前正浏览 <strong>中文版说明 (README.md)</strong>。系统页面默认展示英文版。</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setReadmeLang('en')}
                    className="px-3 py-1.5 text-xs font-bold bg-white dark:bg-slate-800 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-700 rounded-lg hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors shadow-xs flex items-center gap-1.5 shrink-0"
                  >
                    <span>🇺🇸 Switch to English Readme (Default)</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                {/* Badges Bar */}
                <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded font-mono text-xs font-bold">
                    开源协议: MIT License
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
                    AI Agent 算法主动撮合
                  </span>
                </div>

                {/* Section 1 */}
                <div className="space-y-3">
                  <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-emerald-600" />
                    <span>1. 项目愿景与全球背景 (Global Vision & Background)</span>
                  </h4>
                  <p>
                    在全球食品浪费严峻挑战与联合国可持续发展目标 <strong>UN SDG 12.3（2030 年前全球人均食品浪费减半）</strong> 的宏观驱动下，全球大型连锁大卖场与商超（北美、欧洲、亚太主要零售市场）后仓常态化面临<strong>临期（剩余保质期 30–60 天 Best-Before Cutoffs）预包装商品大量积压</strong>的痛点：
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
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
                </div>

                {/* Section 2 */}
                <div className="space-y-3">
                  <h4 className="text-base font-black text-slate-900 dark:text-white">
                    2. 核心功能模块 (Core Modules)
                  </h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="font-bold text-xs text-slate-900 dark:text-white">🏬 门店早巡扫码工作台 (Store Operations)</div>
                      <p className="text-xs text-slate-500 mt-0.5">晨间 07:00–08:30 标准 SOP，手持端极速录入 GTIN 条形码，动态阶梯折价与批次防串货贴标。</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="font-bold text-xs text-slate-900 dark:text-white">🛒 B2B / B2C 双轨提货集市 (Buyer Marketplace)</div>
                      <p className="text-xs text-slate-500 mt-0.5">面向餐饮中央厨房的 5–50 箱大宗码头提货通道；面向散客的总服务台自提通道。</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="font-bold text-xs text-slate-900 dark:text-white">🤖 FOOD4U AI 智能预测撮合 (AI Match Agent)</div>
                      <p className="text-xs text-slate-500 mt-0.5">基于下游商户消耗速度建模，提前 24–48 小时预测缺货，10 分钟锁库存定向推送与自动化撮合。</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="font-bold text-xs text-slate-900 dark:text-white">📈 财务结算与碳资产看板 (Economics & ESG)</div>
                      <p className="text-xs text-slate-500 mt-0.5">实时 GMV、15% 平台抽佣、商超挽回毛利与权威碳减排（CO₂e / 节水升数）实时量化。</p>
                    </div>
                  </div>
                </div>

                {/* Section 3 */}
                <div className="space-y-3">
                  <h4 className="text-base font-black text-slate-900 dark:text-white">
                    3. 生产级技术架构与数据库模型 (PostgreSQL SQL)
                  </h4>
                  <p className="text-xs text-slate-500">
                    采用 5 大核心业务表驱动，完全兼容 PostgreSQL / Supabase，具备完整的事务一致性与资金分账隔离：
                  </p>
                  <pre className="p-3.5 bg-slate-950 text-slate-200 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
{`-- 1. 试点商超门店表
CREATE TABLE stores (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(500) NOT NULL,
  dock_operating_hours VARCHAR(100) DEFAULT '07:30 - 09:30'
);

-- 2. 临期批次库存表
CREATE TABLE surplus_batches (
  id VARCHAR(64) PRIMARY KEY,
  store_id VARCHAR(64) REFERENCES stores(id),
  product_name VARCHAR(255) NOT NULL,
  original_price DECIMAL(10, 2) NOT NULL,
  rescue_price DECIMAL(10, 2) NOT NULL,
  stock_quantity INT NOT NULL,
  expiry_date DATE NOT NULL,
  dock_pickup_eligible BOOLEAN DEFAULT true
);

-- 3. 商业订单与提货码表
CREATE TABLE orders (
  id VARCHAR(64) PRIMARY KEY,
  buyer_name VARCHAR(255) NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  pickup_token VARCHAR(32) UNIQUE NOT NULL,
  payment_escrow_status VARCHAR(32) DEFAULT 'held_in_escrow'
);`}
                  </pre>
                </div>

                {/* Section 4 */}
                <div className="space-y-3">
                  <h4 className="text-base font-black text-slate-900 dark:text-white">
                    4. 快速开始 (Quick Start)
                  </h4>
                  <div className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs space-y-2 border border-slate-800">
                    <div className="text-slate-500"># 1. 克隆代码仓库并安装依赖</div>
                    <div className="text-emerald-400">git clone https://github.com/your-org/FOOD4U.git</div>
                    <div>cd FOOD4U && npm install</div>
                    <div className="text-slate-500 pt-2"># 2. 启动开发服务 (访问 http://localhost:3000)</div>
                    <div className="text-emerald-400">npm run dev</div>
                    <div className="text-slate-500 pt-2"># 3. 编译生产构建 (Production Build)</div>
                    <div className="text-emerald-400">npm run build</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
