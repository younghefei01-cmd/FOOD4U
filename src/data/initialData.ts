import { Store, Product, InventoryBatch, Order, EsgImpactRecord } from '../types';

export const INITIAL_STORES: Store[] = [
  {
    id: 'store-101',
    name: 'Apex Superstore #101 - Pilot Flagship',
    retailer_name: 'Apex Regional Retail Group',
    address: '840 Market Street, San Francisco, CA',
    city: 'San Francisco',
    geo_coordinates: { lat: 37.7845, lng: -122.4071 },
    contact_phone: '+1 (415) 890-2100',
    operating_hours: '07:00 - 22:00',
    pickup_window_hours: {
      b2b_dock: '07:30 - 09:30 & 14:00 - 16:00',
      b2c_counter: '09:00 - 21:00'
    },
    is_active: true,
    created_at: '2026-09-01T08:00:00Z'
  },
  {
    id: 'store-102',
    name: '某头部生鲜连锁大卖场 (Pilot Store A) - 浦东示范店',
    retailer_name: '国内头部连锁生鲜超商集团 (National Fresh Group)',
    address: '上海市浦东新区某重点商圈商业中心 B1 层',
    city: '上海 (Shanghai)',
    geo_coordinates: { lat: 31.2163, lng: 121.5518 },
    contact_phone: '+86 21 5888 1234',
    operating_hours: '08:00 - 22:00',
    pickup_window_hours: {
      b2b_dock: '07:30 - 09:30 (货运装卸码头 3 号门)',
      b2c_counter: '09:30 - 21:30 (总服务台救食专柜)'
    },
    is_active: true,
    created_at: '2026-09-15T08:00:00Z'
  },
  {
    id: 'store-103',
    name: '某大型综合连锁商超 (Pilot Store B) - 杭州中心店',
    retailer_name: '全国百强大型综合零售集团 (Retail Chain Corp)',
    address: '浙江省杭州市拱墅区某综合商业体物流区',
    city: '杭州 (Hangzhou)',
    geo_coordinates: { lat: 30.3125, lng: 120.1982 },
    contact_phone: '+86 571 8899 4321',
    operating_hours: '07:30 - 22:00',
    pickup_window_hours: {
      b2b_dock: '07:00 - 09:00 (西区收货码头)',
      b2c_counter: '09:00 - 21:00 (前台服务台)'
    },
    is_active: true,
    created_at: '2026-10-01T08:00:00Z'
  },
  {
    id: 'store-104',
    name: '某大型品质生鲜超市 (Pilot Store C) - 北京示范店',
    retailer_name: '北方骨干商超零售集团 (Northern Supermarket Alliance)',
    address: '北京市朝阳区某核心商圈地下装卸专区',
    city: '北京 (Beijing)',
    geo_coordinates: { lat: 40.0031, lng: 116.4712 },
    contact_phone: '+86 10 6478 9988',
    operating_hours: '07:30 - 21:30',
    pickup_window_hours: {
      b2b_dock: '07:30 - 09:00 (B2 装卸物流区)',
      b2c_counter: '09:00 - 20:30 (客服中心)'
    },
    is_active: true,
    created_at: '2026-10-10T08:00:00Z'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    gtin_barcode: '00080686001017',
    title: 'Artisan Penne Rigate No. 41 (Case of 12 x 500g)',
    title_zh: '意选工坊 (Artisan Pasta) 意大利直条通心粉 (整箱 12包 x 500g)',
    brand: '意选工坊 (Artisan Pasta Works)',
    category: 'Pasta & Grains / 面食粮油',
    original_msrp: 42.00,
    original_msrp_rmb: 288.00,
    standard_pack_size: 'Case of 12 x 500g (6.0 kg total)',
    unit_weight_kg: 6.0,
    image_url: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=600&q=80',
    storage_condition: 'Ambient',
    co2e_per_kg: 2.45,
    water_per_kg: 840
  },
  {
    id: 'prod-002',
    gtin_barcode: '00041790000405',
    title: 'Campania D.O.P. Whole Peeled Tomatoes (Case of 24 x 400g)',
    title_zh: '那不勒斯产区 纯番茄整粒罐头 (整箱 24罐 x 400g)',
    brand: '坎帕尼亚原产 (Campania Harvest)',
    category: 'Canned & Pulses / 罐头蔬果',
    original_msrp: 58.00,
    original_msrp_rmb: 398.00,
    standard_pack_size: 'Case of 24 x 400g (9.6 kg total)',
    unit_weight_kg: 9.6,
    image_url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    storage_condition: 'Ambient',
    co2e_per_kg: 1.80,
    water_per_kg: 610
  },
  {
    id: 'prod-003',
    gtin_barcode: '00030045012389',
    title: 'Golden Harvest Extra Virgin Olive Blend Cooking Oil (4 x 5L)',
    title_zh: '益粮金厨 特级初榨橄榄食用植物调和油 (整箱 4桶 x 5L)',
    brand: '益粮金厨 (Golden Chef Harvest)',
    category: 'Cooking Oils / 食用油品',
    original_msrp: 75.00,
    original_msrp_rmb: 520.00,
    standard_pack_size: 'Case of 4 x 5L (18.4 kg total)',
    unit_weight_kg: 18.4,
    image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
    storage_condition: 'Ambient',
    co2e_per_kg: 3.10,
    water_per_kg: 1420
  },
  {
    id: 'prod-004',
    gtin_barcode: '00069012345678',
    title: 'Heritage Brews First Press Premium Soy Sauce (Case of 6 x 1.9L)',
    title_zh: '古酿坊 特级一品鲜生抽酿造酱油 (整箱 6桶 x 1.9L)',
    brand: '古法酿造坊 (Heritage Brews)',
    category: 'Sauces & Condiments / 调味佐料',
    original_msrp: 32.00,
    original_msrp_rmb: 220.00,
    standard_pack_size: 'Case of 6 x 1.9L (12.0 kg total)',
    unit_weight_kg: 12.0,
    image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    storage_condition: 'Ambient',
    co2e_per_kg: 1.40,
    water_per_kg: 520
  },
  {
    id: 'prod-005',
    gtin_barcode: '00084100764812',
    title: 'Provence Kitchen Wild Strawberry Preserves (Pack of 6 x 370g)',
    title_zh: '普罗旺斯工坊 庄园野草莓果酱 (整组 6瓶 x 370g)',
    brand: '普罗旺斯工坊 (Provence Kitchen)',
    category: 'Spreads & Breakfast / 果酱早点',
    original_msrp: 29.50,
    original_msrp_rmb: 198.00,
    standard_pack_size: 'Pack of 6 x 370g (2.2 kg total)',
    unit_weight_kg: 2.2,
    image_url: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=600&q=80',
    storage_condition: 'Ambient',
    co2e_per_kg: 2.10,
    water_per_kg: 710
  },
  {
    id: 'prod-006',
    gtin_barcode: '00073500256841',
    title: 'Oat Craft Barista Edition Plant Drink (Case of 6 x 1000ml)',
    title_zh: '麦醇大师 (Oat Craft) 咖啡大师燕麦植物饮 (整箱 6盒 x 1L)',
    brand: '麦醇大师 (Oat Craft Master)',
    category: 'Plant Beverages / 植物饮品',
    original_msrp: 28.00,
    original_msrp_rmb: 186.00,
    standard_pack_size: 'Case of 6 x 1000ml (6.2 kg total)',
    unit_weight_kg: 6.2,
    image_url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    storage_condition: 'Ambient',
    co2e_per_kg: 0.95,
    water_per_kg: 340
  },
  {
    id: 'prod-007',
    gtin_barcode: '00012345678901',
    title: 'Organic Arborio Risotto Rice (Burlap Bag of 5 x 1kg)',
    title_zh: '阿波罗有机庄园 意式烩饭米 (原包 5袋 x 1kg)',
    brand: '阿波罗庄园 (Belvedere Organic)',
    category: 'Pasta & Grains / 面食粮油',
    original_msrp: 36.00,
    original_msrp_rmb: 245.00,
    standard_pack_size: 'Bag of 5 x 1kg (5.0 kg total)',
    unit_weight_kg: 5.0,
    image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
    storage_condition: 'Ambient',
    co2e_per_kg: 2.80,
    water_per_kg: 1900
  },
  {
    id: 'prod-008',
    gtin_barcode: '00098765432109',
    title: 'EuroHarvest Mediterranean Extra Virgin Olive Oil (2 x 3L Tin)',
    title_zh: '欧陆工坊 (EuroHarvest) 地中海特级初榨橄榄油 (双铁罐装 2 x 3L)',
    brand: '欧陆工坊 (EuroHarvest)',
    category: 'Cooking Oils / 食用油品',
    original_msrp: 54.00,
    original_msrp_rmb: 368.00,
    standard_pack_size: 'Case of 2 x 3L Tins (5.6 kg total)',
    unit_weight_kg: 5.6,
    image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
    storage_condition: 'Ambient',
    co2e_per_kg: 3.20,
    water_per_kg: 1510
  }
];

export const INITIAL_BATCHES: InventoryBatch[] = [
  {
    id: 'batch-001',
    store_id: 'store-101',
    product_id: 'prod-001',
    batch_number: 'LOT-26B41-098',
    expiry_date: '2026-12-28', // ~50 days remaining
    original_price: 42.00,
    discounted_price: 16.80, // 60% discount
    discounted_price_rmb: 115.00,
    initial_quantity: 45,
    available_quantity: 28,
    target_audience: 'B2B_BULK',
    minimum_order_quantity: 3,
    condition_rating: 'Mint',
    status: 'Active',
    staging_location: 'Loading_Dock_Bay_A',
    created_at: '2026-11-08T07:15:00Z'
  },
  {
    id: 'batch-002',
    store_id: 'store-101',
    product_id: 'prod-002',
    batch_number: 'LOT-26SM-114',
    expiry_date: '2026-12-22', // ~44 days remaining
    original_price: 58.00,
    discounted_price: 22.50,
    discounted_price_rmb: 155.00,
    initial_quantity: 30,
    available_quantity: 14,
    target_audience: 'B2B_BULK',
    minimum_order_quantity: 2,
    condition_rating: 'Shelf_Wear',
    status: 'Active',
    staging_location: 'Loading_Dock_Bay_B',
    created_at: '2026-11-08T07:30:00Z'
  },
  {
    id: 'batch-003',
    store_id: 'store-101',
    product_id: 'prod-005',
    batch_number: 'LOT-26BM-402',
    expiry_date: '2026-12-18', // ~40 days remaining
    original_price: 29.50,
    discounted_price: 9.80,
    discounted_price_rmb: 68.00,
    initial_quantity: 25,
    available_quantity: 9,
    target_audience: 'B2C_RETAIL',
    minimum_order_quantity: 1,
    condition_rating: 'Mint',
    status: 'Active',
    staging_location: 'Customer_Service_Rack_1',
    created_at: '2026-11-08T07:45:00Z'
  },
  {
    id: 'batch-004',
    store_id: 'store-102',
    product_id: 'prod-003',
    batch_number: 'LOT-HM26-5501',
    expiry_date: '2026-12-30', // ~52 days remaining
    original_price: 75.00,
    discounted_price: 32.00,
    discounted_price_rmb: 218.00,
    initial_quantity: 40,
    available_quantity: 26,
    target_audience: 'B2B_BULK',
    minimum_order_quantity: 2,
    condition_rating: 'Mint',
    status: 'Active',
    staging_location: 'Loading_Dock_Bay_A',
    created_at: '2026-11-08T08:00:00Z'
  },
  {
    id: 'batch-005',
    store_id: 'store-102',
    product_id: 'prod-004',
    batch_number: 'LOT-HM26-9932',
    expiry_date: '2026-12-25', // ~47 days remaining
    original_price: 32.00,
    discounted_price: 12.80,
    discounted_price_rmb: 88.00,
    initial_quantity: 60,
    available_quantity: 38,
    target_audience: 'B2B_BULK',
    minimum_order_quantity: 3,
    condition_rating: 'Shelf_Wear',
    status: 'Active',
    staging_location: 'Loading_Dock_Bay_B',
    created_at: '2026-11-08T08:10:00Z'
  },
  {
    id: 'batch-006',
    store_id: 'store-102',
    product_id: 'prod-006',
    batch_number: 'LOT-OAT-774',
    expiry_date: '2026-12-15', // ~37 days remaining
    original_price: 28.00,
    discounted_price: 9.90,
    discounted_price_rmb: 69.00,
    initial_quantity: 35,
    available_quantity: 18,
    target_audience: 'ALL',
    minimum_order_quantity: 1,
    condition_rating: 'Mint',
    status: 'Active',
    staging_location: 'Customer_Service_Rack_2',
    created_at: '2026-11-08T08:20:00Z'
  },
  {
    id: 'batch-007',
    store_id: 'store-103',
    product_id: 'prod-007',
    batch_number: 'LOT-RT-ARB82',
    expiry_date: '2027-01-05', // ~58 days remaining
    original_price: 36.00,
    discounted_price: 14.50,
    discounted_price_rmb: 98.00,
    initial_quantity: 50,
    available_quantity: 35,
    target_audience: 'B2B_BULK',
    minimum_order_quantity: 2,
    condition_rating: 'Mint',
    status: 'Active',
    staging_location: 'Loading_Dock_Bay_A',
    created_at: '2026-11-08T08:30:00Z'
  },
  {
    id: 'batch-008',
    store_id: 'store-104',
    product_id: 'prod-008',
    batch_number: 'LOT-YH-COL90',
    expiry_date: '2026-12-20', // ~42 days remaining
    original_price: 54.00,
    discounted_price: 21.60,
    discounted_price_rmb: 148.00,
    initial_quantity: 20,
    available_quantity: 12,
    target_audience: 'B2B_BULK',
    minimum_order_quantity: 2,
    condition_rating: 'Damaged_Carton',
    status: 'Active',
    staging_location: 'Loading_Dock_Bay_B',
    created_at: '2026-11-08T08:40:00Z'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-8801',
    order_number: 'RS-26-8801',
    buyer_id: 'buyer-b2b-01',
    buyer_name: '李主厨 (Head Chef)',
    buyer_org: '某意式连锁餐饮机构 (Downtown Kitchen Co.)',
    store_id: 'store-101',
    buyer_type: 'B2B',
    total_amount: 134.40,
    total_amount_rmb: 920.00,
    platform_fee: 20.16, // 15%
    store_payout_amount: 114.24,
    status: 'Ready_For_Pickup',
    pickup_code_hash: '9d8f3e2b1a',
    pickup_token: 'PASS-8801-DOCK',
    pickup_window_start: '2026-11-09T07:30:00Z',
    pickup_window_end: '2026-11-09T09:30:00Z',
    created_at: '2026-11-08T19:40:00Z',
    items: [
      {
        id: 'item-8801-1',
        order_id: 'ord-8801',
        inventory_batch_id: 'batch-001',
        quantity: 5,
        unit_price: 16.80,
        unit_price_rmb: 115.00,
        subtotal: 84.00,
        subtotal_rmb: 575.00,
        product_title: 'Artisan Penne Rigate No. 41 (Case of 12 x 500g)',
        standard_pack_size: 'Case of 12 x 500g',
        condition_rating: 'Mint'
      },
      {
        id: 'item-8801-2',
        order_id: 'ord-8801',
        inventory_batch_id: 'batch-002',
        quantity: 2,
        unit_price: 22.50,
        unit_price_rmb: 155.00,
        subtotal: 45.00,
        subtotal_rmb: 310.00,
        product_title: 'Campania D.O.P. Whole Peeled Tomatoes (Case of 24 x 400g)',
        standard_pack_size: 'Case of 24 x 400g',
        condition_rating: 'Shelf_Wear'
      }
    ]
  },
  {
    id: 'ord-8802',
    order_number: 'RS-26-8802',
    buyer_id: 'buyer-b2b-02',
    buyer_name: '王经理 (Supply Manager)',
    buyer_org: '某品牌连锁快餐中央厨房 (Central Cloud Kitchen)',
    store_id: 'store-102',
    buyer_type: 'B2B',
    total_amount: 192.00,
    total_amount_rmb: 1308.00,
    platform_fee: 28.80,
    store_payout_amount: 163.20,
    status: 'Ready_For_Pickup',
    pickup_code_hash: '3f7a1c4e99',
    pickup_token: 'PASS-8802-DOCK',
    pickup_window_start: '2026-11-09T08:00:00Z',
    pickup_window_end: '2026-11-09T10:00:00Z',
    created_at: '2026-11-08T20:15:00Z',
    items: [
      {
        id: 'item-8802-1',
        order_id: 'ord-8802',
        inventory_batch_id: 'batch-004',
        quantity: 6,
        unit_price: 32.00,
        unit_price_rmb: 218.00,
        subtotal: 192.00,
        subtotal_rmb: 1308.00,
        product_title: 'Golden Harvest Extra Virgin Olive Blend Cooking Oil (4 x 5L)',
        standard_pack_size: 'Case of 4 x 5L',
        condition_rating: 'Mint'
      }
    ]
  },
  {
    id: 'ord-8799',
    order_number: 'RS-26-8799',
    buyer_id: 'buyer-b2c-09',
    buyer_name: 'Sarah Jenkins',
    store_id: 'store-101',
    buyer_type: 'B2C',
    total_amount: 19.60,
    total_amount_rmb: 136.00,
    platform_fee: 2.94,
    store_payout_amount: 16.66,
    status: 'Completed',
    pickup_code_hash: '1e5c8a994b',
    pickup_token: 'PASS-8799-RET',
    pickup_window_start: '2026-11-08T10:00:00Z',
    pickup_window_end: '2026-11-08T18:00:00Z',
    completed_at: '2026-11-08T14:22:00Z',
    created_at: '2026-11-08T09:10:00Z',
    items: [
      {
        id: 'item-8799-1',
        order_id: 'ord-8799',
        inventory_batch_id: 'batch-003',
        quantity: 2,
        unit_price: 9.80,
        unit_price_rmb: 68.00,
        subtotal: 19.60,
        subtotal_rmb: 136.00,
        product_title: 'Provence Kitchen Wild Strawberry Preserves (Pack of 6 x 370g)',
        standard_pack_size: 'Pack of 6 x 370g',
        condition_rating: 'Mint'
      }
    ]
  }
];

export const INITIAL_ESG_RECORDS: EsgImpactRecord[] = [
  {
    id: 'esg-001',
    store_id: 'store-101',
    order_id: 'ord-8799',
    diverted_weight_kg: 4.4,
    avoided_co2e_kg: 9.24,
    water_saved_liters: 3124,
    logged_at: '2026-11-08T14:22:15Z'
  },
  {
    id: 'esg-prev-01',
    store_id: 'store-101',
    order_id: 'ord-8750',
    diverted_weight_kg: 185.0,
    avoided_co2e_kg: 453.25,
    water_saved_liters: 155400,
    logged_at: '2026-11-07T16:00:00Z'
  },
  {
    id: 'esg-prev-02',
    store_id: 'store-102',
    order_id: 'ord-8762',
    diverted_weight_kg: 240.0,
    avoided_co2e_kg: 588.00,
    water_saved_liters: 201600,
    logged_at: '2026-11-07T17:30:00Z'
  },
  {
    id: 'esg-prev-03',
    store_id: 'store-103',
    order_id: 'ord-8770',
    diverted_weight_kg: 320.0,
    avoided_co2e_kg: 784.00,
    water_saved_liters: 268800,
    logged_at: '2026-11-06T18:00:00Z'
  }
];

// Specification Financial Model Parameters
export const FINANCIAL_BENCHMARKS = {
  pilotStore: {
    monthlyClearanceUnits: 1200,
    averageRetailMSRP: 4.50,
    discountedPrice: 1.80,
    targetSellThrough: 0.70, // 70%
    actualUnitsSold: 840,
    monthlyGMV: 1512.00,
    supermarketNetRecovery: 1285.20,
    takeRatePct: 0.15, // 15%
    platformGrossRevenue: 226.80,
    paymentProcessingFeePct: 0.03, // 3%
    paymentProcessingFees: 45.36,
    platformNetContribution: 181.44
  },
  cluster50Stores: {
    storeCount: 50,
    monthlyGMV: 75600.00,
    platformNetContribution: 9072.00,
    operatingOverhead: 2500.00,
    monthlyNetOperatingProfit: 6572.00
  },
  revenueStreams: [
    {
      name: 'Transactional Commission',
      nameZh: '交易佣金抽成',
      structure: '12% - 18% take rate paid by retailer out of recovered revenue (default 15%).',
      structureZh: '由零售商从挽回的清仓收入中支付 12%–18% 抽成（基准 15%）。'
    },
    {
      name: 'B2B Priority Subscription',
      nameZh: 'B2B 商业买家优先订阅',
      structure: '$49/month (or ¥299/mo) for commercial buyers (caterers, bakeries) to receive 2-hour early access alerts to bulk clearances.',
      structureZh: '餐饮/烘焙商户 ¥299/月 ($49/月)，享提前 2 小时推送整箱米面粮油与调味品清仓并锁定库存。'
    },
    {
      name: 'Retailer Enterprise Analytics',
      nameZh: '连锁商超企业端防损与 ESG SaaS',
      structure: '$150/store/month (or ¥800/store/mo) for chains wanting predictive waste analytics, automated expiry markdown schedules, and certified ESG audit reports.',
      structureZh: '针对大型连锁集团收取 ¥800/店/月 ($150/店/月)，输出《反食品浪费法》合规审计证书与智能折价算法。'
    }
  ]
};
