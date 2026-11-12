import pptxgen from 'pptxgenjs';
import * as fs from 'fs';
import * as path from 'path';

async function generatePitchDeck() {
  const pptx = new pptxgen();

  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'FOOD4U Founding Team';
  pptx.company = 'FOOD4U Technologies';
  pptx.title = 'FOOD4U - 商业路演计划书 (Pitch Deck)';

  // Color Palette
  const C_DARK = '0B132B';
  const C_NAVY = '1C2541';
  const C_SLATE = '3A506B';
  const C_EMERALD = '059669';
  const C_LIGHT_EMERALD = '10B981';
  const C_BG_LIGHT = 'F8FAFC';
  const C_WHITE = 'FFFFFF';
  const C_AMBER = 'D97706';
  const C_MUTED = '64748B';

  // ==========================================
  // SLIDE 1: 封面页 (Cover Page)
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: C_DARK };

    // Brand Badge
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8,
      y: 1.2,
      w: 1.6,
      h: 0.5,
      rectRadius: 0.1,
      fill: { color: C_EMERALD }
    });
    slide.addText('FOOD4U · AI 驱动', {
      x: 0.8,
      y: 1.2,
      w: 1.8,
      h: 0.5,
      align: 'center',
      valign: 'middle',
      fontSize: 14,
      fontFace: 'Microsoft YaHei',
      color: C_WHITE,
      bold: true
    });

    // Main Title
    slide.addText('FOOD4U', {
      x: 0.8,
      y: 1.9,
      w: 8.5,
      h: 1.1,
      fontSize: 54,
      fontFace: 'Arial Black',
      color: C_WHITE,
      bold: true
    });

    // Subtitle
    slide.addText('去中心化商超余量清仓与智能食材主动匹配交易平台', {
      x: 0.8,
      y: 3.0,
      w: 10.5,
      h: 0.6,
      fontSize: 22,
      fontFace: 'Microsoft YaHei',
      color: C_LIGHT_EMERALD,
      bold: true
    });

    // Value Proposition Statement
    slide.addText('“将中国商超后仓 1,500 亿倾倒报损，转化为高确定性现金流与绿色减碳飞轮”', {
      x: 0.8,
      y: 3.8,
      w: 11.0,
      h: 0.8,
      fontSize: 16,
      fontFace: 'Microsoft YaHei',
      color: '94A3B8',
      italic: true
    });

    // Bottom Metadata Card
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8,
      y: 5.5,
      w: 11.7,
      h: 1.1,
      rectRadius: 0.1,
      fill: { color: C_NAVY },
      line: { color: '334155', width: 1 }
    });

    slide.addText([
      { text: '商业计划书 · 投资人路演专供 (Pitch Deck)\n', options: { bold: true, fontSize: 13, color: C_WHITE } },
      { text: '行业赛道：产业互联网 / 硬折扣零售 / 供应链与 AI Agent\n编制周期：2026年 · 天使轮/Pre-A轮 融资推介', options: { fontSize: 11, color: C_MUTED } }
    ], {
      x: 1.1,
      y: 5.65,
      w: 11.0,
      h: 0.8,
      fontFace: 'Microsoft YaHei'
    });
  }

  // ==========================================
  // SLIDE 2: 市场痛点与宏观机遇 (Problem & Policy Window)
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: C_BG_LIGHT };

    // Header Tag
    slide.addText('01 / 行业痛点与时代机遇 (MARKET OPPORTUNITY)', {
      x: 0.8,
      y: 0.5,
      w: 8.0,
      h: 0.3,
      fontSize: 11,
      fontFace: 'Microsoft YaHei',
      color: C_EMERALD,
      bold: true
    });

    slide.addText('万亿快消流通末端的三重绝境与国家级政策红利', {
      x: 0.8,
      y: 0.8,
      w: 11.0,
      h: 0.6,
      fontSize: 24,
      fontFace: 'Microsoft YaHei',
      color: C_DARK,
      bold: true
    });

    // 3 Cards Layout
    const cards = [
      {
        title: '商超端：被动报损',
        stat: '1,500 亿/年',
        desc: '• 实体商超净利率收窄至 1%–2.5%\n• 单店每月产生 1–3 万元临期报损\n• 前台“特价专区”散客周转极慢\n• 逆向退回原厂运费倒挂、供应商抵制',
        color: 'FEE2E2',
        border: 'FCA5A5',
        titleColor: '991B1B'
      },
      {
        title: '买家端：极致性价比',
        stat: '3–5 折刚需',
        desc: '• 周边快餐连锁、外卖厨房利润微薄\n• 极度渴望大牌调味品与米面粮油低价\n• 传统尾货批发跨省整车，起订门槛过高\n• 缺乏本地化就近采购的稳定渠道',
        color: 'FEF3C7',
        border: 'FCD34D',
        titleColor: '92400E'
      },
      {
        title: '政策端：法律硬约束',
        stat: '反食品浪费法',
        desc: '• 《反食品浪费法》在全国强力推行\n• 强制商超建立临期食品管理台账\n• 倾倒报损面临高额行政处罚风险\n• 上市零售集团迫切需要 ESG 减碳审计',
        color: 'DCFCE7',
        border: '86EFAC',
        titleColor: '166534'
      }
    ];

    cards.forEach((c, idx) => {
      const x = 0.8 + idx * 3.95;
      slide.addShape(pptx.ShapeType.roundRect, {
        x,
        y: 1.6,
        w: 3.75,
        h: 4.8,
        rectRadius: 0.15,
        fill: { color: c.color },
        line: { color: c.border, width: 1.5 }
      });

      slide.addText(c.title, {
        x: x + 0.3,
        y: 1.9,
        w: 3.15,
        h: 0.4,
        fontSize: 15,
        fontFace: 'Microsoft YaHei',
        color: c.titleColor,
        bold: true
      });

      slide.addText(c.stat, {
        x: x + 0.3,
        y: 2.3,
        w: 3.15,
        h: 0.6,
        fontSize: 26,
        fontFace: 'Arial Black',
        color: C_DARK,
        bold: true
      });

      slide.addText(c.desc, {
        x: x + 0.3,
        y: 3.0,
        w: 3.15,
        h: 3.1,
        fontSize: 12,
        fontFace: 'Microsoft YaHei',
        color: '334155',
        lineSpacing: 22
      });
    });
  }

  // ==========================================
  // SLIDE 3: 解决方案与运营模式 (Solution & Decentralized SOP)
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: C_DARK };

    slide.addText('02 / 核心模式 (DECENTRALIZED ARCHITECTURE)', {
      x: 0.8,
      y: 0.5,
      w: 8.0,
      h: 0.3,
      fontSize: 11,
      fontFace: 'Microsoft YaHei',
      color: C_LIGHT_EMERALD,
      bold: true
    });

    slide.addText('零中心仓、零压货：去中心化分布式履约闭环', {
      x: 0.8,
      y: 0.8,
      w: 11.0,
      h: 0.6,
      fontSize: 24,
      fontFace: 'Microsoft YaHei',
      color: C_WHITE,
      bold: true
    });

    // 4 Steps Horizontal Chain
    const steps = [
      {
        num: '01',
        title: '07:00 早巡扫码',
        desc: '店员手持 FOOD4U 软件扫描原厂 GTIN 条码，基于 30–60 天临期天数自动计算 4 折出库价与批次。'
      },
      {
        num: '02',
        title: '救食专用贴标',
        desc: '便携打印机吐出防撕贴纸，覆盖原条码，标注“严禁前台收银机扫码”，彻底杜绝串码风险。'
      },
      {
        num: '03',
        title: '卸货码头暂存',
        desc: 'B2B 整箱移入商超后门卸货区；B2C 散袋移入前台服务台，分别建立独立的履约通道。'
      },
      {
        num: '04',
        title: '07:30 装车自提',
        desc: '餐饮采购车辆在避开超市高峰的指定窗口停靠，出示动态 QR 提货码，店员核验后 5 分钟离场。'
      }
    ];

    steps.forEach((st, idx) => {
      const x = 0.8 + idx * 2.95;
      slide.addShape(pptx.ShapeType.roundRect, {
        x,
        y: 1.7,
        w: 2.8,
        h: 3.5,
        rectRadius: 0.1,
        fill: { color: C_NAVY },
        line: { color: '334155', width: 1 }
      });

      slide.addText(st.num, {
        x: x + 0.25,
        y: 1.9,
        w: 2.3,
        h: 0.5,
        fontSize: 24,
        fontFace: 'Arial Black',
        color: C_LIGHT_EMERALD
      });

      slide.addText(st.title, {
        x: x + 0.25,
        y: 2.5,
        w: 2.3,
        h: 0.4,
        fontSize: 14,
        fontFace: 'Microsoft YaHei',
        color: C_WHITE,
        bold: true
      });

      slide.addText(st.desc, {
        x: x + 0.25,
        y: 3.0,
        w: 2.3,
        h: 1.9,
        fontSize: 11,
        fontFace: 'Microsoft YaHei',
        color: '94A3B8',
        lineSpacing: 18
      });
    });

    // Bottom Highlight Callout
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8,
      y: 5.5,
      w: 11.6,
      h: 1.1,
      rectRadius: 0.1,
      fill: { color: '064E3B' },
      line: { color: C_LIGHT_EMERALD, width: 1.5 }
    });

    slide.addText('★ 核心商业价值突破：我们不买一辆货车、不建一平米中心仓库、不压自身一分钱资金！\n将商超原本需付费清运的垃圾，转化为全城微型集散仓，单店每年创造近 3 万元纯增量利润。', {
      x: 1.1,
      y: 5.65,
      w: 11.0,
      h: 0.8,
      fontSize: 13,
      fontFace: 'Microsoft YaHei',
      color: C_WHITE,
      bold: true,
      lineSpacing: 20
    });
  }

  // ==========================================
  // SLIDE 4: 竞争格局与蓝海壁垒 (Competitive Moat)
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: C_BG_LIGHT };

    slide.addText('03 / 差异化壁垒 (COMPETITIVE POSITIONING)', {
      x: 0.8,
      y: 0.5,
      w: 8.0,
      h: 0.3,
      fontSize: 11,
      fontFace: 'Microsoft YaHei',
      color: C_EMERALD,
      bold: true
    });

    slide.addText('竞品格局全景：为什么 FOOD4U 切入的是无人竞争的蓝海？', {
      x: 0.8,
      y: 0.8,
      w: 11.0,
      h: 0.6,
      fontSize: 24,
      fontFace: 'Microsoft YaHei',
      color: C_DARK,
      bold: true
    });

    // Comparison Table
    const headers = [
      { text: '对比维度', options: { bold: true, fill: { color: 'E2E8F0' }, color: C_DARK } },
      { text: '线下硬折扣店 (好特卖/嗨特购)', options: { bold: true, fill: { color: 'E2E8F0' }, color: C_DARK } },
      { text: '线上剩菜盲盒 (惜食魔法袋)', options: { bold: true, fill: { color: 'E2E8F0' }, color: C_DARK } },
      { text: 'FOOD4U 智能清仓平台', options: { bold: true, fill: { color: 'D1FAE5' }, color: '065F46' } }
    ];

    const rows = [
      [
        { text: '资产模式', options: { bold: true } },
        { text: '重资产 (买断货权、自建大仓、背负实体租金)' },
        { text: '轻资产 (小程序对接)' },
        { text: '去中心化轻资产 (以商超后仓为微型仓，0 仓租)', options: { bold: true, color: C_EMERALD } }
      ],
      [
        { text: '主打品类', options: { bold: true } },
        { text: '休闲零食、日化美妆、酒水' },
        { text: '现制烘焙、短保面包、沙拉轻食' },
        { text: '商超常温米面粮油、标准调味品、罐头干货', options: { bold: true, color: C_EMERALD } }
      ],
      [
        { text: '客单价 (AOV)', options: { bold: true } },
        { text: '15 – 35 元 / 单' },
        { text: '15 – 25 元 / 单' },
        { text: '300 – 1,500 元 / 单 (餐饮整箱集采，客单高50倍)', options: { bold: true, color: C_EMERALD } }
      ],
      [
        { text: '核心买家', options: { bold: true } },
        { text: '商场逛街 C 端年轻人群' },
        { text: '晚间薅羊毛 C 端尝鲜年轻人' },
        { text: '周边快餐小店、外卖厨房、社区食堂 (B2B 占 80%)', options: { bold: true, color: C_EMERALD } }
      ],
      [
        { text: '履约场景', options: { bold: true } },
        { text: '进店排队收银结算' },
        { text: '晚间进店前台自提' },
        { text: '早间 07:30 货运码头专用通道 5 分钟极速装车', options: { bold: true, color: C_EMERALD } }
      ]
    ];

    slide.addTable([headers, ...rows], {
      x: 0.8,
      y: 1.6,
      w: 11.6,
      colW: [2.0, 3.2, 3.2, 3.2],
      fontSize: 11,
      fontFace: 'Microsoft YaHei',
      border: { pt: 1, color: 'CBD5E1' },
      align: 'left',
      valign: 'middle',
      rowH: 0.8
    });
  }

  // ==========================================
  // SLIDE 5: 第三阶段核心技术壁垒：AI Agent (Tech & AI Moat)
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: C_DARK };

    slide.addText('04 / 技术壁垒 (AI AGENT PROACTIVE ENGINE)', {
      x: 0.8,
      y: 0.5,
      w: 8.0,
      h: 0.3,
      fontSize: 11,
      fontFace: 'Microsoft YaHei',
      color: C_LIGHT_EMERALD,
      bold: true
    });

    slide.addText('第三阶段技术跃迁：基于用户历史数据训练的 AI Agent 主动匹配中枢', {
      x: 0.8,
      y: 0.8,
      w: 11.0,
      h: 0.6,
      fontSize: 22,
      fontFace: 'Microsoft YaHei',
      color: C_WHITE,
      bold: true
    });

    // 3 Columns: Training -> Reasoning -> Output
    const aiBlocks = [
      {
        step: '1. 数据训练基础',
        subtitle: 'Buyer DNA Learning',
        items: [
          '• 深度训练于餐饮客户进货频次',
          '• 学习主力菜单原料消耗速率',
          '• 记录番茄酱、食用油、生抽周转天数',
          '• 建立家庭/厨房食材断货预测模型'
        ]
      },
      {
        step: '2. 智能预警与对齐',
        subtitle: 'Stockout Forecast',
        items: [
          '• 提前 24–48 小时预测后厨食材见底',
          '• 07:00 超市早巡录入后，毫秒级对齐',
          '• 评估临期天数、折价率与品相',
          '• 消除传统“人找货”的决策摩擦'
        ]
      },
      {
        step: '3. 反向专享锁库',
        subtitle: 'Proactive Dispatch',
        items: [
          '• 向厨师长手机定向推送补货通知',
          '• 1 键锁定码头提货批次 (独占10分钟)',
          '• 动销率由 70% 飞跃至 88%+',
          '• 形成不可替代的高粘性算法护城河'
        ]
      }
    ];

    aiBlocks.forEach((ab, idx) => {
      const x = 0.8 + idx * 3.95;
      slide.addShape(pptx.ShapeType.roundRect, {
        x,
        y: 1.7,
        w: 3.75,
        h: 4.8,
        rectRadius: 0.15,
        fill: { color: C_NAVY },
        line: { color: C_EMERALD, width: 1.5 }
      });

      slide.addText(ab.step, {
        x: x + 0.3,
        y: 2.0,
        w: 3.15,
        h: 0.4,
        fontSize: 16,
        fontFace: 'Microsoft YaHei',
        color: C_LIGHT_EMERALD,
        bold: true
      });

      slide.addText(ab.subtitle, {
        x: x + 0.3,
        y: 2.4,
        w: 3.15,
        h: 0.3,
        fontSize: 11,
        fontFace: 'Arial',
        color: C_MUTED
      });

      slide.addText(ab.items.join('\n'), {
        x: x + 0.3,
        y: 3.0,
        w: 3.15,
        h: 3.2,
        fontSize: 12,
        fontFace: 'Microsoft YaHei',
        color: 'E2E8F0',
        lineSpacing: 24
      });
    });
  }

  // ==========================================
  // SLIDE 6: 商业模式与单位经济学 (Business Model & Unit Economics)
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: C_BG_LIGHT };

    slide.addText('05 / 财务模型与单位经济学 (UNIT ECONOMICS)', {
      x: 0.8,
      y: 0.5,
      w: 8.0,
      h: 0.3,
      fontSize: 11,
      fontFace: 'Microsoft YaHei',
      color: C_EMERALD,
      bold: true
    });

    slide.addText('高确定性现金流：单店试点模型与 50 店集群规模效应', {
      x: 0.8,
      y: 0.8,
      w: 11.0,
      h: 0.6,
      fontSize: 24,
      fontFace: 'Microsoft YaHei',
      color: C_DARK,
      bold: true
    });

    // Left Box: Pilot Store UE
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8,
      y: 1.6,
      w: 5.6,
      h: 4.8,
      rectRadius: 0.15,
      fill: { color: C_WHITE },
      line: { color: 'CBD5E1', width: 1 }
    });

    slide.addText('单店月度单位经济模型 (Pilot UE)', {
      x: 1.1,
      y: 1.85,
      w: 5.0,
      h: 0.4,
      fontSize: 15,
      fontFace: 'Microsoft YaHei',
      color: C_DARK,
      bold: true
    });

    const ueItems = [
      ['月均巡检临期件数', '1,200 件 (常温干货)'],
      ['平均零售原价 (MSRP)', '¥31.50 /件'],
      ['救食折后出库均价 (4折)', '¥12.60 /件'],
      ['目标动销率 (售出件数)', '70% (840 件售出)'],
      ['单店月度总流水 (GMV)', '¥10,584.00'],
      ['商超净挽回资金 (85%)', '¥8,996.40 (商超实得)'],
      ['平台毛抽成 (15% Take-Rate)', '¥1,587.60'],
      ['扣除银行/微信分账通道费后', '¥1,270.08 /店/月']
    ];

    ueItems.forEach((row, i) => {
      const y = 2.4 + i * 0.45;
      const isBold = i >= 4;
      slide.addText(row[0], {
        x: 1.1,
        y,
        w: 3.2,
        h: 0.35,
        fontSize: 11,
        fontFace: 'Microsoft YaHei',
        color: isBold ? C_DARK : C_MUTED,
        bold: isBold
      });
      slide.addText(row[1], {
        x: 4.0,
        y,
        w: 2.2,
        h: 0.35,
        fontSize: 11,
        fontFace: 'Arial',
        color: isBold ? C_EMERALD : C_DARK,
        bold: isBold,
        align: 'right'
      });
    });

    // Right Box: Regional Cluster Model
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 6.8,
      y: 1.6,
      w: 5.6,
      h: 4.8,
      rectRadius: 0.15,
      fill: { color: C_WHITE },
      line: { color: 'CBD5E1', width: 1 }
    });

    slide.addText('50 家连锁门店集群月度产出', {
      x: 7.1,
      y: 1.85,
      w: 5.0,
      h: 0.4,
      fontSize: 15,
      fontFace: 'Microsoft YaHei',
      color: C_DARK,
      bold: true
    });

    const clusterStats = [
      { label: '月度集群总交易额 (GMV)', val: '¥529,200', color: C_DARK },
      { label: '商超系统总挽回资金', val: '¥449,820', color: C_EMERALD },
      { label: '平台净佣金贡献', val: '¥63,504', color: C_DARK },
      { label: '扣除云服务与运营杂费后月净利', val: '¥46,000 /月', color: C_EMERALD }
    ];

    clusterStats.forEach((st, idx) => {
      slide.addShape(pptx.ShapeType.roundRect, {
        x: 7.1,
        y: 2.4 + idx * 1.0,
        w: 5.0,
        h: 0.85,
        rectRadius: 0.1,
        fill: { color: 'F1F5F9' }
      });

      slide.addText(st.label, {
        x: 7.3,
        y: 2.5 + idx * 1.0,
        w: 3.5,
        h: 0.3,
        fontSize: 10,
        fontFace: 'Microsoft YaHei',
        color: C_MUTED
      });

      slide.addText(st.val, {
        x: 7.3,
        y: 2.8 + idx * 1.0,
        w: 4.6,
        h: 0.4,
        fontSize: 18,
        fontFace: 'Arial Black',
        color: st.color,
        bold: true
      });
    });
  }

  // ==========================================
  // SLIDE 7: 合规资质与食安风控 (Compliance & Safety)
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: C_BG_LIGHT };

    slide.addText('06 / 风控与合规体系 (RISK MITIGATION & COMPLIANCE)', {
      x: 0.8,
      y: 0.5,
      w: 8.0,
      h: 0.3,
      fontSize: 11,
      fontFace: 'Microsoft YaHei',
      color: C_EMERALD,
      bold: true
    });

    slide.addText('合规护航：持牌金融资金存管与五层食安防护墙', {
      x: 0.8,
      y: 0.8,
      w: 11.0,
      h: 0.6,
      fontSize: 24,
      fontFace: 'Microsoft YaHei',
      color: C_DARK,
      bold: true
    });

    // Left Column: Settlement & Licenses
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8,
      y: 1.6,
      w: 5.6,
      h: 4.8,
      rectRadius: 0.15,
      fill: { color: C_WHITE },
      line: { color: 'CBD5E1', width: 1 }
    });

    slide.addText('资金分账与资质牌照（规避“二清”）', {
      x: 1.1,
      y: 1.85,
      w: 5.0,
      h: 0.4,
      fontSize: 15,
      fontFace: 'Microsoft YaHei',
      color: C_DARK,
      bold: true
    });

    slide.addText([
      { text: '• 微信“电商收付通” / 商业银行二级监管账户\n', options: { bold: true, color: C_DARK } },
      { text: '买家付款 100% 直达存管专户，平台不触碰沉淀资金，彻底杜绝资金池二清风险。\n\n', options: { color: C_MUTED } },
      { text: '• 自动 T+1 分账指令划拨\n', options: { bold: true, color: C_DARK } },
      { text: '扫码核销后触发系统指令：85% 货款划拨商超对公账户，15% 技术服务费划拨平台，开具 6% 增值税专票。\n\n', options: { color: C_MUTED } },
      { text: '• 必备行政许可四件套齐全\n', options: { bold: true, color: C_DARK } },
      { text: '营业执照、预包装食品销售备案、EDI 增值电信许可证 (B21 类)、微信平台审核。', options: { color: C_MUTED } }
    ], {
      x: 1.1,
      y: 2.3,
      w: 5.0,
      h: 3.8,
      fontSize: 11,
      fontFace: 'Microsoft YaHei',
      lineSpacing: 18
    });

    // Right Column: Food Safety 5-Shields
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 6.8,
      y: 1.6,
      w: 5.6,
      h: 4.8,
      rectRadius: 0.15,
      fill: { color: C_WHITE },
      line: { color: 'CBD5E1', width: 1 }
    });

    slide.addText('食品安全与食物中毒责任兜底机制', {
      x: 7.1,
      y: 1.85,
      w: 5.0,
      h: 0.4,
      fontSize: 15,
      fontFace: 'Microsoft YaHei',
      color: C_DARK,
      bold: true
    });

    slide.addText([
      { text: '1. 坚决执行常温“负面清单”\n', options: { bold: true, color: C_DARK } },
      { text: '100% 仅限工厂密封常温标品，严禁散装熟食、冷鲜生肉生禽，从源头绝缘食物变质风险。\n\n', options: { color: C_MUTED } },
      { text: '2. 商业“食品安全责任险 (食责险)”兜底\n', options: { bold: true, color: C_DARK } },
      { text: '全平台每笔订单标配 PICC/平安食责险，单次事故最高赔付 50–100 万元，商超零连带赔偿担忧。\n\n', options: { color: C_MUTED } },
      { text: '3. 当面验货 + 1 键无理由退款\n', options: { bold: true, color: C_DARK } },
      { text: '码头交接时当面核验外箱，发现受潮破损手机端 1 键发起原路全额退款，问题商品不出店。', options: { color: C_MUTED } }
    ], {
      x: 7.1,
      y: 2.3,
      w: 5.0,
      h: 3.8,
      fontSize: 11,
      fontFace: 'Microsoft YaHei',
      lineSpacing: 18
    });
  }

  // ==========================================
  // SLIDE 8: 落地里程碑与融资规划 (Roadmap & The Ask)
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: C_DARK };

    slide.addText('07 / 执行规划与融资 (ROADMAP & FINANCING)', {
      x: 0.8,
      y: 0.5,
      w: 8.0,
      h: 0.3,
      fontSize: 11,
      fontFace: 'Microsoft YaHei',
      color: C_LIGHT_EMERALD,
      bold: true
    });

    slide.addText('落地节奏与本轮融资诉求：携手开启千亿级蓝海', {
      x: 0.8,
      y: 0.8,
      w: 11.0,
      h: 0.6,
      fontSize: 24,
      fontFace: 'Microsoft YaHei',
      color: C_WHITE,
      bold: true
    });

    // Roadmap 3 Stages
    const phases = [
      {
        time: '阶段一：单城验证 (0–6月)',
        title: '50 家试点超市网络',
        metrics: '• 签约 50 家独立超市/加盟大卖场\n• 沉淀 150 家稳定餐饮 B2B 客户\n• 月 GMV 突破 50 万元\n• 实现单城全面自负盈亏'
      },
      {
        time: '阶段二：省域扩张 (6–18月)',
        title: '300 家省域门店集群',
        metrics: '• 进驻华东、华北示范大型连锁商超门店\n• 上线 B2B 优先订阅会员 (¥299/月)\n• 月流水破 300 万，月净利超 30 万\n• 全面启用 AI Agent 主动食材分发'
      },
      {
        time: '阶段三：全国连锁 (18–36月)',
        title: '1,500 家全国标杆网络',
        metrics: '• 全国连锁全面接入\n• 推出集团级 ESG 减碳审计 SaaS\n• 年 GMV 突破 1.9 亿元\n• 平台年净利润突破 2,400 万元'
      }
    ];

    phases.forEach((p, idx) => {
      const x = 0.8 + idx * 3.95;
      slide.addShape(pptx.ShapeType.roundRect, {
        x,
        y: 1.6,
        w: 3.75,
        h: 3.2,
        rectRadius: 0.15,
        fill: { color: C_NAVY },
        line: { color: '334155', width: 1 }
      });

      slide.addText(p.time, {
        x: x + 0.25,
        y: 1.8,
        w: 3.25,
        h: 0.3,
        fontSize: 11,
        fontFace: 'Microsoft YaHei',
        color: C_LIGHT_EMERALD,
        bold: true
      });

      slide.addText(p.title, {
        x: x + 0.25,
        y: 2.1,
        w: 3.25,
        h: 0.4,
        fontSize: 15,
        fontFace: 'Microsoft YaHei',
        color: C_WHITE,
        bold: true
      });

      slide.addText(p.metrics, {
        x: x + 0.25,
        y: 2.6,
        w: 3.25,
        h: 2.0,
        fontSize: 11,
        fontFace: 'Microsoft YaHei',
        color: '94A3B8',
        lineSpacing: 20
      });
    });

    // The Ask Box (Bottom)
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8,
      y: 5.1,
      w: 11.6,
      h: 1.6,
      rectRadius: 0.15,
      fill: { color: '1E293B' },
      line: { color: C_LIGHT_EMERALD, width: 1.5 }
    });

    slide.addText('【本轮融资诉求】 天使轮 / Pre-A 轮 拟募集：300 万 – 500 万元 人民币', {
      x: 1.1,
      y: 5.3,
      w: 11.0,
      h: 0.4,
      fontSize: 15,
      fontFace: 'Microsoft YaHei',
      color: C_WHITE,
      bold: true
    });

    slide.addText('• 40% 线下商超驻场与地推（协助前 50 家商超跑通 07:00 早巡扫码与贴标 SOP）\n• 35% AI Agent 算法模型研发与 ERP 自动对接（完善餐饮客户历史消耗周期学习系统）\n• 15% 行政许可牌照、食品安全责任险底池与法务风控合规建设\n• 10% 预留日常营运流动资金', {
      x: 1.1,
      y: 5.75,
      w: 11.0,
      h: 0.8,
      fontSize: 11,
      fontFace: 'Microsoft YaHei',
      color: 'CBD5E1',
      lineSpacing: 18
    });
  }

  // Ensure output directory exists
  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outputPath = path.resolve(publicDir, 'FOOD4U_Investor_Pitch_Deck_8Pages.pptx');
  await pptx.writeFile({ fileName: outputPath });
  console.log(`Successfully generated pitch deck at: ${outputPath}`);
}

generatePitchDeck().catch((err) => {
  console.error('Error generating pitch deck:', err);
  process.exit(1);
});
