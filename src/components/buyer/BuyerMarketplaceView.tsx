import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TargetAudience, Order } from '../../types';
import {
  Package,
  Clock,
  Filter,
  Search,
  Truck,
  CheckCircle,
  QrCode,
  ShieldAlert,
  ChevronRight,
  Plus,
  Minus,
  Sparkles,
  ExternalLink,
  Printer
} from 'lucide-react';

interface BuyerMarketplaceViewProps {
  onOpenCart: () => void;
  activePassOrder: Order | null;
  onClosePass: () => void;
}

export const BuyerMarketplaceView: React.FC<BuyerMarketplaceViewProps> = ({
  onOpenCart,
  activePassOrder,
  onClosePass
}) => {
  const {
    products,
    batches,
    currentStore,
    currency,
    formatPrice,
    addToCart
  } = useApp();

  const [audienceFilter, setAudienceFilter] = useState<TargetAudience>('B2B_BULK');
  const [maxDaysToExpiry, setMaxDaysToExpiry] = useState<number>(60);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addedBatchId, setAddedBatchId] = useState<string | null>(null);

  // Calculate days remaining helper
  const getDaysRemaining = (expiryDateStr: string): number => {
    const today = new Date('2026-11-08');
    const exp = new Date(expiryDateStr);
    const diff = exp.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const categories = [
    'All',
    'Pasta & Grains / 面食粮油',
    'Cooking Oils / 食用油品',
    'Canned & Pulses / 罐头蔬果',
    'Sauces & Condiments / 调味佐料',
    'Plant Beverages / 植物饮品'
  ];

  // Filter batches
  const filteredBatches = batches.filter((batch) => {
    // Only active batches with available quantity
    if (batch.status !== 'Active' || batch.available_quantity <= 0) return false;

    // Audience filter
    if (audienceFilter !== 'ALL') {
      if (batch.target_audience !== 'ALL' && batch.target_audience !== audienceFilter) {
        return false;
      }
    }

    // Expiry filter
    const daysLeft = getDaysRemaining(batch.expiry_date);
    if (daysLeft > maxDaysToExpiry) return false;

    // Product search & category
    const product = products.find((p) => p.id === batch.product_id);
    if (!product) return false;

    if (selectedCategory !== 'All' && product.category !== selectedCategory) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = product.title.toLowerCase().includes(q) || (product.title_zh && product.title_zh.includes(q));
      const matchBrand = product.brand.toLowerCase().includes(q);
      const matchBatch = batch.batch_number.toLowerCase().includes(q);
      if (!matchTitle && !matchBrand && !matchBatch) return false;
    }

    return true;
  });

  const handleQuickAdd = (batchId: string, minQty: number) => {
    const success = addToCart(batchId, minQty);
    if (success) {
      setAddedBatchId(batchId);
      setTimeout(() => setAddedBatchId(null), 1200);
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Header Banner & Audience Switcher */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                {currency === 'RMB' ? '商超临期救援直采专区' : 'Direct Clearance Catalog'}
              </span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span className="text-xs text-slate-500 font-mono">
                {currentStore.name}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {audienceFilter === 'B2B_BULK'
                ? (currency === 'RMB' ? 'B2B 商业集采：后厨/烘焙/食堂整箱特惠' : 'B2B Commercial Bulk: Wholesale Cartons & Pallets')
                : (currency === 'RMB' ? 'B2C 个人捡漏：家庭精选常温临期特价' : 'B2C Retail Clearance: Neighborhood Value Grocery')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {audienceFilter === 'B2B_BULK'
                ? (currency === 'RMB'
                    ? '专为周边餐馆、快餐连锁、外卖厨房及烘焙工坊提供商超后仓整箱米面粮油与调味品，按装卸码头指定时间自提，低至 2–4 折。'
                    : 'Wholesale pallet and carton lots for caterers, cloud kitchens, and bakeries. Scheduled loading dock pickups with minimum order quantities (MOQ).')
                : (currency === 'RMB'
                    ? '周边居民与年轻人日常省钱好物，凭数字提货码于商超总服务台免排队自提。'
                    : 'Quality shelf-stable pantry items rescued from supermarket shelves. Fast front-counter pickup passes.')}
            </p>
          </div>

          {/* Audience Filter Segmented Switch */}
          <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0">
            <button
              onClick={() => setAudienceFilter('B2B_BULK')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                audienceFilter === 'B2B_BULK'
                  ? 'bg-slate-900 text-white dark:bg-emerald-600 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" />
                <span>{currency === 'RMB' ? 'B2B 商业整箱' : 'B2B Commercial Bulk'}</span>
              </span>
            </button>
            <button
              onClick={() => setAudienceFilter('B2C_RETAIL')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                audienceFilter === 'B2C_RETAIL'
                  ? 'bg-slate-900 text-white dark:bg-emerald-600 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5" />
                <span>{currency === 'RMB' ? 'B2C 个人自提' : 'B2C Retail Bag'}</span>
              </span>
            </button>
            <button
              onClick={() => setAudienceFilter('ALL')}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
                audienceFilter === 'ALL'
                  ? 'bg-white text-slate-900 dark:bg-slate-700 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>{currency === 'RMB' ? '全部' : 'All'}</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search bar */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={currency === 'RMB' ? '搜索面粉、橄榄油、生抽、番茄酱...' : 'Search pasta, olive oil, sauces, brands...'}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Days to Expiry Slider */}
          <div className="md:col-span-4 flex items-center gap-3">
            <span className="text-xs text-slate-500 whitespace-nowrap">
              {currency === 'RMB' ? '最长剩余保质期:' : 'Max Shelf-Life:'}
            </span>
            <input
              type="range"
              min="20"
              max="65"
              step="5"
              value={maxDaysToExpiry}
              onChange={(e) => setMaxDaysToExpiry(parseInt(e.target.value, 10))}
              className="flex-1 accent-emerald-600"
            />
            <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 w-12 text-right">
              &le; {maxDaysToExpiry}d
            </span>
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 2. Product Lots Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-slate-500">
            {currency === 'RMB' ? '符合筛选条件的在售批次:' : 'Available Clearance Lots:'}{' '}
            <span className="font-bold text-slate-900 dark:text-white font-mono">
              {filteredBatches.length}
            </span>{' '}
            {currency === 'RMB' ? '个批次' : 'lots'}
          </div>

          <div className="text-xs text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>
              {currency === 'RMB' ? '下单享 10 分钟独占防超卖锁库保护' : 'Cart items hold 10-minute inventory reservation'}
            </span>
          </div>
        </div>

        {filteredBatches.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3">
            <Package className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {currency === 'RMB' ? '暂无符合条件的清仓货品' : 'No lots match your current filters'}
            </h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {currency === 'RMB'
                ? '尝试放宽保质期天数滑块，或切换到“全部”渠道查看更多商品。'
                : 'Try adjusting the shelf-life slider or changing the category filter.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBatches.map((batch) => {
              const product = products.find((p) => p.id === batch.product_id) || products[0];
              const daysRemaining = getDaysRemaining(batch.expiry_date);
              const minQty = batch.target_audience === 'B2B_BULK' ? batch.minimum_order_quantity : 1;
              const isAdded = addedBatchId === batch.id;

              // Calculate price per kg/liter for B2B comparison
              const pricePerKg = (batch.discounted_price / product.unit_weight_kg).toFixed(2);
              const pricePerKgRmb = (batch.discounted_price_rmb / product.unit_weight_kg).toFixed(2);

              return (
                <div
                  key={batch.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Image with subtle scrim overlay */}
                    <div className="relative h-44 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <img
                        src={product.image_url}
                        alt={product.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Styled SVG fallback
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Remaining Days Kicker */}
                      <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-mono px-2 py-0.5 rounded-md flex items-center gap-1 font-semibold">
                        <Clock className="w-3 h-3 text-emerald-400" />
                        <span>{daysRemaining} {currency === 'RMB' ? '天后到期' : 'days left'}</span>
                      </div>

                      {/* Condition Rating */}
                      <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs text-slate-800 dark:text-slate-200 text-[11px] font-semibold px-2 py-0.5 rounded-md border border-slate-200/50">
                        {batch.condition_rating.replace('_', ' ')}
                      </div>

                      {/* Staging Location tag */}
                      <div className="absolute bottom-2.5 left-3 text-white text-xs flex items-center gap-1 font-medium drop-shadow-sm">
                        <Truck className="w-3.5 h-3.5 text-emerald-300" />
                        <span>
                          {batch.staging_location.startsWith('Loading_Dock')
                            ? (currency === 'RMB' ? '货运卸货码头提货' : 'Loading Dock Pickup')
                            : (currency === 'RMB' ? '前台总服务台提货' : 'Customer Service Desk')}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 space-y-3">
                      {/* Quiet Unboxed Metadata */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <span>{product.brand}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono">{product.standard_pack_size}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                        {currency === 'RMB' && product.title_zh ? product.title_zh : product.title}
                      </h3>

                      {/* B2B Unit Metric Comparison */}
                      <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg text-xs space-y-1">
                        <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                          <span className="text-[11px] text-slate-400">
                            {currency === 'RMB' ? '折合单价 (每公斤/升):' : 'Unit Cost Per Kg:'}
                          </span>
                          <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                            {currency === 'RMB' ? `¥${pricePerKgRmb}/kg` : `$${pricePerKg}/kg`}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-[11px] text-slate-500">
                          <span>{currency === 'RMB' ? '起订门槛 (MOQ):' : 'Minimum Order (MOQ):'}</span>
                          <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                            {minQty} {currency === 'RMB' ? '箱/件' : 'units'}
                          </span>
                        </div>
                      </div>

                      {/* Pricing display */}
                      <div className="flex items-baseline justify-between pt-1">
                        <div>
                          <div className="text-lg font-black text-emerald-600 font-mono">
                            {formatPrice(batch.discounted_price, batch.discounted_price_rmb)}
                            <span className="text-[11px] font-normal text-slate-400 ml-1">
                              /{currency === 'RMB' ? '箱' : 'lot'}
                            </span>
                          </div>
                          <div className="text-xs text-slate-400 line-through font-mono">
                            MSRP {formatPrice(batch.original_price)}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-[11px] font-mono text-slate-500">
                            {currency === 'RMB' ? '剩余库存:' : 'In Stock:'}{' '}
                            <span className="font-bold text-slate-800 dark:text-slate-200">
                              {batch.available_quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Buy Button */}
                  <div className="p-4 pt-0">
                    <button
                      type="button"
                      onClick={() => handleQuickAdd(batch.id, minQty)}
                      className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        isAdded
                          ? 'bg-emerald-700 text-white'
                          : 'bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white shadow-xs'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>{currency === 'RMB' ? '已锁库 10 分钟！' : 'Reserved in Cart (10m)'}</span>
                        </>
                      ) : (
                        <>
                          <Package className="w-3.5 h-3.5" />
                          <span>
                            {currency === 'RMB'
                              ? `锁定集采 (${minQty} 件起订)`
                              : `Reserve Lot (${minQty} MOQ)`}
                          </span>
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

      {/* 3. Modal: Active Digital Pickup Pass (Rendered when buyer placed order) */}
      {activePassOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {currency === 'RMB' ? '数字自提通行证 (已生成)' : 'Digital Pickup Pass Generated'}
                  </h3>
                  <div className="text-[11px] text-slate-400 font-mono">
                    Order #{activePassOrder.order_number}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={onClosePass}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1"
              >
                ✕
              </button>
            </div>

            {/* QR Card Pass Display */}
            <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 text-center space-y-4">
              <div className="text-xs uppercase font-mono tracking-widest text-emerald-600 font-bold">
                {activePassOrder.pickup_token}
              </div>

              {/* Animated QR Code Display */}
              <div className="w-44 h-44 bg-white p-3 rounded-2xl border-2 border-slate-200 shadow-sm mx-auto flex flex-col items-center justify-center">
                <QrCode className="w-36 h-36 text-slate-900" />
              </div>

              <div className="space-y-1 text-xs">
                <div className="font-semibold text-slate-900 dark:text-white">
                  {currency === 'RMB' ? '提货商超门店:' : 'Pickup Location:'} {currentStore.name}
                </div>
                <div className="text-slate-500 text-[11px]">
                  {currentStore.address}
                </div>
              </div>

              {/* Pickup Window and Gate Directions */}
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-left space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">{currency === 'RMB' ? '提货通道:' : 'Gate Instructions:'}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {activePassOrder.buyer_type === 'B2B'
                      ? (currency === 'RMB' ? '商超后门货运装卸码头 3 号门' : 'Rear Commercial Loading Dock Gate #3')
                      : (currency === 'RMB' ? '商超前台总服务台' : 'Front Customer Service Counter')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">{currency === 'RMB' ? '提货时间窗:' : 'Pickup Window:'}</span>
                  <span className="font-mono font-semibold text-emerald-600">
                    {activePassOrder.buyer_type === 'B2B'
                      ? currentStore.pickup_window_hours.b2b_dock
                      : currentStore.pickup_window_hours.b2c_counter}
                  </span>
                </div>
              </div>
            </div>

            {/* Legal terms disclaimer */}
            <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800/50 text-[11px] text-amber-800 dark:text-amber-300 space-y-1">
              <div className="font-bold flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>
                  {currency === 'RMB'
                    ? '国际食品减损法规与最佳赏味期说明'
                    : 'Food Surplus Liquidation Terms'}
                </span>
              </div>
              <p className="leading-relaxed">
                {currency === 'RMB'
                  ? '本商品处于法定剩余保质期内，符合食品安全国家标准。现场提货请当面核验外箱与封口，确认无误后店员扫码核销。'
                  : 'Items sold within 30-60 day shelf life under Good Samaritan guidelines. Counter damage disputes must be claimed during dock handoff.'}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  alert(currency === 'RMB' ? '通行证已保存至离线相册！' : 'Pickup Pass saved to offline photo album!');
                  onClosePass();
                }}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
              >
                {currency === 'RMB' ? '保存至微信卡包 / 手机' : 'Save Pass to Phone'}
              </button>
              <button
                type="button"
                onClick={onClosePass}
                className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold"
              >
                {currency === 'RMB' ? '完成' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
