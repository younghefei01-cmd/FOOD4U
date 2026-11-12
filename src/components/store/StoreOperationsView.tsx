import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, ConditionRating, TargetAudience, Order } from '../../types';
import {
  Scan,
  Barcode,
  CheckCircle2,
  AlertTriangle,
  Tag,
  ArrowRight,
  UploadCloud,
  QrCode,
  Truck,
  RotateCcw,
  Sparkles,
  Printer,
  X,
  FileSpreadsheet
} from 'lucide-react';

export const StoreOperationsView: React.FC = () => {
  const {
    products,
    batches,
    orders,
    currentStore,
    currentStoreId,
    currency,
    formatPrice,
    scanCreateBatch,
    bulkSyncInventory,
    verifyPickup,
    disputeAtCounter,
    divertedUnitsIncentive
  } = useApp();

  // Barcode Scanning State
  const [scannedBarcode, setScannedBarcode] = useState<string>('00080686001017');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(products[0]);
  const [expiryDaysOffset, setExpiryDaysOffset] = useState<number>(45);
  const [quantity, setQuantity] = useState<number>(20);
  const [condition, setCondition] = useState<ConditionRating>('Mint');
  const [targetAudience, setTargetAudience] = useState<TargetAudience>('B2B_BULK');
  const [moq, setMoq] = useState<number>(3);
  const [discountPercent, setDiscountPercent] = useState<number>(60);
  const [isScanningSimulated, setIsScanningSimulated] = useState<boolean>(false);
  const [statusNotification, setStatusNotification] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Sticker Preview Modal
  const [stickerBatch, setStickerBatch] = useState<any | null>(null);

  // QR Pickup Verification State
  const [pickupInput, setPickupInput] = useState<string>('RS-26-8801');
  const [selectedOrderToVerify, setSelectedOrderToVerify] = useState<Order | null>(null);
  const [verifyResult, setVerifyResult] = useState<{ success: boolean; message: string } | null>(null);
  const [disputeReason, setDisputeReason] = useState<string>('Cardboard seam water damage noticed during dock inspection');
  const [disputeRefundPct, setDisputeRefundPct] = useState<number>(50);
  const [showDisputeModal, setShowDisputeModal] = useState<boolean>(false);

  // Bulk ERP Sync State
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  // Calculate Expiry Date string based on offset
  const getCalculatedExpiry = (days: number): string => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
  };

  const calculatedExpiryDate = getCalculatedExpiry(expiryDaysOffset);

  // Calculate pricing
  const originalPrice = selectedProduct?.original_msrp || 40.00;
  const calculatedDiscountPrice = Math.round(originalPrice * (1 - discountPercent / 100) * 100) / 100;

  const handleBarcodeSelect = (prod: Product) => {
    setScannedBarcode(prod.gtin_barcode);
    setSelectedProduct(prod);
    setIsScanningSimulated(true);
    setTimeout(() => {
      setIsScanningSimulated(false);
    }, 400);
  };

  const handleManualBarcodeChange = (val: string) => {
    setScannedBarcode(val);
    const found = products.find((p) => p.gtin_barcode === val.trim());
    if (found) {
      setSelectedProduct(found);
    }
  };

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) {
      setStatusNotification({
        type: 'error',
        text: currency === 'RMB' ? '未找到对应商品，请先扫描或选择商品条码。' : 'Please scan or select a valid GTIN barcode.'
      });
      return;
    }

    const res = scanCreateBatch({
      barcode: selectedProduct.gtin_barcode,
      expiry_date: calculatedExpiryDate,
      quantity,
      discounted_price: calculatedDiscountPrice,
      condition,
      target_audience: targetAudience,
      moq: targetAudience === 'B2B_BULK' ? moq : 1
    });

    if (res.success && res.batch) {
      setStatusNotification({ type: 'success', text: res.message });
      setStickerBatch({
        batch: res.batch,
        product: selectedProduct
      });
    } else {
      setStatusNotification({ type: 'error', text: res.message });
    }
  };

  // Run simulated ERP bulk sync
  const handleRunBulkSync = () => {
    const mockItems = [
      {
        barcode: '00069012345678', // Haday
        qty: 36,
        expiry: getCalculatedExpiry(50),
        price: 11.50,
        condition: 'Mint' as ConditionRating,
        audience: 'B2B_BULK' as TargetAudience,
        moq: 4
      },
      {
        barcode: '00073500256841', // Oatly
        qty: 24,
        expiry: getCalculatedExpiry(35),
        price: 8.50,
        condition: 'Shelf_Wear' as ConditionRating,
        audience: 'ALL' as TargetAudience,
        moq: 1
      },
      {
        barcode: '00030045012389', // Arawana oil
        qty: 18,
        expiry: getCalculatedExpiry(55),
        price: 29.00,
        condition: 'Mint' as ConditionRating,
        audience: 'B2B_BULK' as TargetAudience,
        moq: 2
      }
    ];

    const synced = bulkSyncInventory(currentStoreId, mockItems);
    setSyncFeedback(
      currency === 'RMB'
        ? `成功模拟从连锁商超 WMS 系统同步 ${synced} 个待清仓批次（共 78 件商品已自动入库）。`
        : `Successfully synced ${synced} inventory delta batches (78 total units) from retailer WMS.`
    );
    setTimeout(() => setSyncFeedback(null), 6000);
  };

  // Verify Order Handled
  const handleVerifyOrder = () => {
    if (!pickupInput) return;
    const res = verifyPickup(pickupInput, pickupInput);
    setVerifyResult(res);
    if (res.order) {
      setSelectedOrderToVerify(res.order);
    }
  };

  // Submit dispute
  const handleSubmitDispute = () => {
    if (!selectedOrderToVerify) return;
    const res = disputeAtCounter(selectedOrderToVerify.order_number, disputeReason, disputeRefundPct);
    setShowDisputeModal(false);
    if (res.success && res.order) {
      setSelectedOrderToVerify(res.order);
      setVerifyResult({
        success: true,
        message: res.message
      });
    }
  };

  // Filter current store batches
  const storeBatches = batches.filter((b) => b.store_id === currentStoreId);
  const pendingOrdersForStore = orders.filter(
    (o) => o.store_id === currentStoreId && o.status === 'Ready_For_Pickup'
  );

  return (
    <div className="space-y-8">
      {/* 1. Daily Cadence SOP & Associate Incentive Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-sm border border-slate-700">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-md text-xs font-semibold tracking-wide border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {currency === 'RMB'
                  ? '商超门店标准运营 SOP (07:00 - 08:30 早巡巡检)'
                  : 'Store Operational Playbook (07:00 - 08:30 Daily Sweep)'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              {currentStore.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currency === 'RMB'
                ? '门店店员于早高峰前巡检货架与后仓 30–60 天临期商品，扫码一键打标并贴附专用救食防串码标签，按 B2B 整箱与 B2C 散单分别移入指定清仓区。'
                : 'Morning sweep before customer rush. Scan ambient inventory with 30–60 days shelf-life, print Rescue Stickers, and stage high-volume lots in Commercial Clearance Bays.'}
            </p>
          </div>

          {/* Associate Incentive Tracker */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/15 w-full lg:w-72 shrink-0">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium text-slate-200">
              <span>{currency === 'RMB' ? '本月门店减损达标奖' : 'Monthly Landfill Diversion'}</span>
              <span className="font-mono text-emerald-400 font-bold">{divertedUnitsIncentive} / 500 件</span>
            </div>
            <div className="w-full bg-slate-700/60 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (divertedUnitsIncentive / 500) * 100)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-300 mt-2">
              <span>
                {divertedUnitsIncentive >= 500
                  ? (currency === 'RMB' ? '已达成 ¥500 团队奖金!' : 'Bonus Achieved ($100)!')
                  : (currency === 'RMB' ? `还差 ${500 - divertedUnitsIncentive} 件达标` : `${500 - divertedUnitsIncentive} units to bonus`)}
              </span>
              <span className="text-emerald-300 font-semibold">
                {currency === 'RMB' ? '¥500 奖金' : '$100 Bonus'}
              </span>
            </div>
          </div>
        </div>

        {/* 4-Step Operational Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-700/80 text-xs">
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center shrink-0 text-[11px]">
              1
            </span>
            <div>
              <div className="font-semibold text-slate-100">
                {currency === 'RMB' ? '07:00 货架后仓扫码' : '07:00 Inventory Sweep'}
              </div>
              <div className="text-slate-400 text-[11px]">
                {currency === 'RMB' ? '手持设备扫码 30–60 天临期商品' : 'Scan shelf-stable items 30-60d to expiry'}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center shrink-0 text-[11px]">
              2
            </span>
            <div>
              <div className="font-semibold text-slate-100">
                {currency === 'RMB' ? '贴专用救食标签' : 'Rescue Tagging'}
              </div>
              <div className="text-slate-400 text-[11px]">
                {currency === 'RMB' ? '贴防撕贴纸，杜绝普通收银台串码' : 'Apply stickers to prevent register conflict'}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center shrink-0 text-[11px]">
              3
            </span>
            <div>
              <div className="font-semibold text-slate-100">
                {currency === 'RMB' ? '分流定点暂存' : 'Dedicated Staging'}
              </div>
              <div className="text-slate-400 text-[11px]">
                {currency === 'RMB' ? 'B2B 移至卸货码头，B2C 置于服务台' : 'B2B to loading dock, B2C to front counter'}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center shrink-0 text-[11px]">
              4
            </span>
            <div>
              <div className="font-semibold text-slate-100">
                {currency === 'RMB' ? '20:00 晚结对账' : '20:00 Reconciliation'}
              </div>
              <div className="text-slate-400 text-[11px]">
                {currency === 'RMB' ? '核对已核销订单，自动对账冲抵报损' : 'Verify completed pickups against ERP logs'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Barcode Scanning & Batch Creation Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Scanner & Inputs */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Scan className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {currency === 'RMB' ? '临期商品扫码录入 (扫码建批)' : 'Barcode Sweep & Batch Creation'}
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
              API: POST /batches/scan-create
            </span>
          </div>

          {/* Quick Select Barcode Presets */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
              {currency === 'RMB' ? '快捷扫码选品预设 (模拟手持红外枪扫码):' : 'Barcode Fast-Select (Simulating Mobile Handheld Scanner):'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {products.slice(0, 6).map((p) => {
                const isSelected = selectedProduct?.id === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleBarcodeSelect(p)}
                    className={`text-left p-2.5 rounded-lg border text-xs transition-all ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold ring-1 ring-emerald-600'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <div className="font-mono text-[10px] text-slate-400 truncate">
                      {p.gtin_barcode}
                    </div>
                    <div className="truncate font-medium mt-0.5">
                      {currency === 'RMB' && p.title_zh ? p.title_zh : p.title}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      MSRP: {formatPrice(p.original_msrp, p.original_msrp_rmb)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scanned Barcode Input & Laser Effect */}
          <div className="relative">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Barcode className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={scannedBarcode}
                  onChange={(e) => handleManualBarcodeChange(e.target.value)}
                  placeholder="Scan or enter GTIN barcode..."
                  className="w-full pl-10 pr-4 py-2 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {isScanningSimulated && (
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-red-500 shadow-[0_0_8px_#ef4444] animate-pulse" />
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  if (selectedProduct) handleBarcodeSelect(selectedProduct);
                }}
                className="px-3 py-2 bg-slate-900 dark:bg-emerald-700 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 flex items-center gap-1.5 whitespace-nowrap"
              >
                <Scan className="w-3.5 h-3.5" />
                <span>{currency === 'RMB' ? '模拟扫描' : 'Laser Scan'}</span>
              </button>
            </div>
          </div>

          {/* Form for Batch Creation */}
          <form onSubmit={handleCreateBatch} className="space-y-4 pt-2">
            {selectedProduct && (
              <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-xs flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {currency === 'RMB' && selectedProduct.title_zh ? selectedProduct.title_zh : selectedProduct.title}
                  </span>
                  <div className="text-slate-500 mt-0.5">
                    {selectedProduct.brand} · {selectedProduct.standard_pack_size} ·{' '}
                    <span className="text-emerald-600 font-medium">{selectedProduct.storage_condition} (常温密封)</span>
                  </div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-slate-400 line-through">
                    {formatPrice(selectedProduct.original_msrp, selectedProduct.original_msrp_rmb)}
                  </div>
                  <div className="text-emerald-600 font-bold text-sm">
                    {formatPrice(calculatedDiscountPrice)}
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Expiry Date Offset */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {currency === 'RMB' ? '剩余保质期 (临期天数)' : 'Remaining Shelf-Life Days'}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="25"
                    max="65"
                    value={expiryDaysOffset}
                    onChange={(e) => setExpiryDaysOffset(parseInt(e.target.value, 10))}
                    className="flex-1 accent-emerald-600"
                  />
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-white w-12 text-right">
                    {expiryDaysOffset} d
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 font-mono">
                  {currency === 'RMB' ? '到期日期:' : 'Expiry:'} {calculatedExpiryDate}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {currency === 'RMB' ? '清仓件数 / 箱数' : 'Units / Cartons Available'}
                </label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
                  className="w-full px-3 py-1.5 text-xs font-mono bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* Target Audience */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {currency === 'RMB' ? '目标流通渠道' : 'Target Channel'}
                </label>
                <select
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value as TargetAudience)}
                  className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="B2B_BULK">{currency === 'RMB' ? 'B2B 商业大宗 (餐饮/食堂/后厨)' : 'B2B Commercial Bulk (Dock)'}</option>
                  <option value="B2C_RETAIL">{currency === 'RMB' ? 'B2C 个人自提 (前台服务台)' : 'B2C Retail Clearance (Counter)'}</option>
                  <option value="ALL">{currency === 'RMB' ? '全部渠道开放 (All Channels)' : 'All Channels Open'}</option>
                </select>
              </div>

              {/* Minimum Order Quantity (MOQ) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {currency === 'RMB' ? '起订门槛 (MOQ)' : 'Minimum Order Qty (MOQ)'}
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={targetAudience === 'B2C_RETAIL' ? 1 : moq}
                  disabled={targetAudience === 'B2C_RETAIL'}
                  onChange={(e) => setMoq(parseInt(e.target.value, 10) || 1)}
                  className="w-full px-3 py-1.5 text-xs font-mono bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white disabled:opacity-50"
                />
              </div>

              {/* Condition Rating */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {currency === 'RMB' ? '货品品相定级' : 'Condition Rating'}
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as ConditionRating)}
                  className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="Mint">{currency === 'RMB' ? 'Mint (完好无损 / 原封)' : 'Mint (Flawless original seal)'}</option>
                  <option value="Shelf_Wear">{currency === 'RMB' ? 'Shelf Wear (陈列微痕 / 标贴微旧)' : 'Shelf Wear (Minor shelf scuffs)'}</option>
                  <option value="Damaged_Carton">{currency === 'RMB' ? 'Damaged Carton (外箱压褶 / 内部完好)' : 'Damaged Carton (Creased outer box)'}</option>
                </select>
              </div>

              {/* Discount Percentage */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {currency === 'RMB' ? '折价率 (建议 50%–70%)' : 'Markdown % (Recommended 50-70%)'}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="30"
                    max="85"
                    step="5"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(parseInt(e.target.value, 10))}
                    className="flex-1 accent-emerald-600"
                  />
                  <span className="text-xs font-mono font-bold text-emerald-600 w-12 text-right">
                    -{discountPercent}%
                  </span>
                </div>
              </div>
            </div>

            {/* Notification alert */}
            {statusNotification && (
              <div
                className={`p-3 rounded-lg text-xs flex items-center justify-between ${
                  statusNotification.type === 'success'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
                }`}
              >
                <span>{statusNotification.text}</span>
                <button
                  type="button"
                  onClick={() => setStatusNotification(null)}
                  className="text-xs font-semibold ml-2 underline"
                >
                  OK
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <Tag className="w-4 h-4" />
              <span>
                {currency === 'RMB'
                  ? `确认生成清仓批次并打印救食防串码标签 (${formatPrice(calculatedDiscountPrice)})`
                  : `Publish Rescue Batch & Generate Rescue Sticker (${formatPrice(calculatedDiscountPrice)})`}
              </span>
            </button>
          </form>

          {/* Quick Bulk ERP Sync Simulator */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {currency === 'RMB' ? '连锁 ERP/WMS 自动对接' : 'Automated Retailer WMS Delta Sync'}:
              </span>{' '}
              {currency === 'RMB' ? '模拟每夜 20:00 自动批量导入商超报损库数据' : 'Simulate nightly inventory sync API'}
            </div>
            <button
              type="button"
              onClick={handleRunBulkSync}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors shrink-0"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
              <span>{currency === 'RMB' ? '同步 ERP 报损' : 'Sync ERP Delta'}</span>
            </button>
          </div>
          {syncFeedback && (
            <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 text-xs rounded-lg border border-blue-200 dark:border-blue-800">
              {syncFeedback}
            </div>
          )}
        </div>

        {/* Right Panel: Counter / Loading Dock QR Pickup Verification */}
        <div className="lg:col-span-5 space-y-6">
          {/* Pickup Verification Box */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {currency === 'RMB' ? '现场提货核销台 (卸货码头 / 服务台)' : 'Counter & Dock Pickup Verification'}
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                API: verify-pickup
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              {currency === 'RMB'
                ? '买家出示数字提货通行证后，店员输入单号或扫描提货二维码，当场核验数量及货损。确认无误后释放托管资金给门店并记录 ESG 数据。'
                : 'Buyer presents digital pickup pass with dynamic QR code. Operator verifies cartons, checks damage, and releases escrow funds to store account.'}
            </p>

            {/* Quick Pick Pending Orders */}
            {pendingOrdersForStore.length > 0 && (
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  {currency === 'RMB' ? '待核销订单列表 (点击快捷载入):' : 'Pending Pickups at this Store (Click to Load):'}
                </label>
                <div className="space-y-1.5">
                  {pendingOrdersForStore.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => setPickupInput(o.order_number)}
                      className={`w-full text-left p-2 rounded-lg border text-xs flex items-center justify-between transition-colors ${
                        pickupInput === o.order_number
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200'
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      <div>
                        <span className="font-mono font-bold">{o.order_number}</span>
                        <span className="mx-1 text-slate-400">·</span>
                        <span>{o.buyer_org || o.buyer_name}</span>
                        <span className="ml-1.5 text-[10px] px-1 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold">
                          {o.buyer_type}
                        </span>
                      </div>
                      <span className="font-mono font-bold text-emerald-600">
                        {formatPrice(o.total_amount, o.total_amount_rmb)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <input
                type="text"
                value={pickupInput}
                onChange={(e) => setPickupInput(e.target.value)}
                placeholder="Enter Order # (e.g. RS-26-8801) or Token..."
                className="flex-1 px-3 py-2 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={handleVerifyOrder}
                className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors whitespace-nowrap"
              >
                {currency === 'RMB' ? '核销放款' : 'Verify & Release'}
              </button>
            </div>

            {verifyResult && (
              <div
                className={`p-3 rounded-lg text-xs space-y-1.5 ${
                  verifyResult.success
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-200 border border-red-200 dark:border-red-800'
                }`}
              >
                <div className="flex items-start gap-1.5 font-medium">
                  {verifyResult.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  )}
                  <span>{verifyResult.message}</span>
                </div>
              </div>
            )}

            {/* If order loaded or verified, show 1-tap dispute affordance */}
            {selectedOrderToVerify && selectedOrderToVerify.status !== 'Disputed' && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowDisputeModal(true)}
                  className="w-full py-1.5 px-3 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-amber-100 transition-colors"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>
                    {currency === 'RMB'
                      ? '现场品相争议：发起 1 键售后退款处置'
                      : 'Counter Condition Dispute: Initiate 1-Tap Refund'}
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Staging Bays Summary */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-slate-500" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  {currency === 'RMB' ? '当前暂存库位概况' : 'Active Clearance Staging Bays'}
                </h4>
              </div>
              <span className="text-xs font-mono text-emerald-600 font-bold">
                {storeBatches.length} {currency === 'RMB' ? '批次' : 'Batches'}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {currency === 'RMB' ? '卸货码头 A/B 区 (B2B 整箱仓)' : 'Loading Dock Bays A/B (B2B Bulk)'}
                  </span>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {currency === 'RMB' ? '专供餐饮/后厨轻卡或面包车自提' : 'Dedicated to van/truck lot pickups'}
                  </div>
                </div>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                  {storeBatches.filter((b) => b.staging_location.startsWith('Loading_Dock')).length} 批
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {currency === 'RMB' ? '总服务台救食专柜 (B2C 散单区)' : 'Customer Service Rack (B2C Walk-ins)'}
                  </span>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {currency === 'RMB' ? '个人消费者凭提货二维码快速提袋' : 'Shopper handoff bag staging'}
                  </div>
                </div>
                <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                  {storeBatches.filter((b) => b.staging_location.startsWith('Customer_Service')).length} 批
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Live Batches Inventory Table for this store */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {currency === 'RMB' ? '本门店在售临期批次明细' : 'Store Active Inventory Batches'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {currency === 'RMB'
                ? '严格处于 30–60 天临期安全期内，满足《反食品浪费法》规范'
                : 'Compliant with 30-60 day durability markdown guidelines'}
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500">
            {storeBatches.length} {currency === 'RMB' ? '个有效在架批次' : 'Active Batches'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-medium">
                <th className="py-2.5 px-3">Batch & Product</th>
                <th className="py-2.5 px-3">Expiry Date</th>
                <th className="py-2.5 px-3">Condition</th>
                <th className="py-2.5 px-3">Audience / Staging</th>
                <th className="py-2.5 px-3 text-right">Available Qty</th>
                <th className="py-2.5 px-3 text-right">Rescue Price</th>
                <th className="py-2.5 px-3 text-center">Sticker</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {storeBatches.map((batch) => {
                const prod = products.find((p) => p.id === batch.product_id) || products[0];
                return (
                  <tr key={batch.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {currency === 'RMB' && prod.title_zh ? prod.title_zh : prod.title}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                        {batch.batch_number} · GTIN {prod.gtin_barcode}
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-300">
                      {batch.expiry_date}
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300">
                        {batch.condition_rating.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">
                        {batch.target_audience === 'B2B_BULK' ? 'B2B Bulk (MOQ ' + batch.minimum_order_quantity + ')' : 'B2C Retail'}
                      </span>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {batch.staging_location.replace(/_/g, ' ')}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-slate-800 dark:text-slate-200">
                      {batch.available_quantity} / {batch.initial_quantity}
                    </td>
                    <td className="py-3 px-3 text-right font-mono">
                      <div className="font-bold text-emerald-600">
                        {formatPrice(batch.discounted_price, batch.discounted_price_rmb)}
                      </div>
                      <div className="text-[10px] text-slate-400 line-through">
                        {formatPrice(batch.original_price)}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        type="button"
                        onClick={() => setStickerBatch({ batch, product: prod })}
                        className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
                        title="Print / View Rescue Sticker"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Modal: Rescue Sticker Printable Preview */}
      {stickerBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-emerald-600" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {currency === 'RMB' ? '专用救食防串码标签 (预览打印)' : 'Platform Rescue Sticker Preview'}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setStickerBatch(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sticker Graphic Container */}
            <div className="border-2 border-dashed border-emerald-600 p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 text-slate-900 dark:text-white space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-emerald-800 dark:text-emerald-400">
                  FOOD4U · 救食清仓标
                </span>
                <span className="text-[10px] font-mono bg-emerald-700 text-white px-2 py-0.5 rounded font-bold">
                  DO NOT SCAN AT CASHIER
                </span>
              </div>

              <div>
                <div className="text-sm font-bold line-clamp-1">
                  {currency === 'RMB' && stickerBatch.product.title_zh ? stickerBatch.product.title_zh : stickerBatch.product.title}
                </div>
                <div className="text-xs text-slate-500 font-mono mt-0.5">
                  LOT: {stickerBatch.batch.batch_number} · EXP: {stickerBatch.batch.expiry_date}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-emerald-200 dark:border-emerald-800/60 font-mono">
                <div>
                  <div className="text-[10px] text-slate-400">RESCUE PRICE</div>
                  <div className="text-lg font-black text-emerald-700 dark:text-emerald-400">
                    {formatPrice(stickerBatch.batch.discounted_price, stickerBatch.batch.discounted_price_rmb)}
                  </div>
                </div>
                <div className="w-14 h-14 bg-white p-1 rounded border border-slate-300 flex items-center justify-center">
                  <QrCode className="w-12 h-12 text-slate-900" />
                </div>
              </div>

              <div className="text-[10px] text-center text-slate-400">
                {currency === 'RMB'
                  ? '注意：严禁在普通收银台扫码！仅限码头或总服务台提货通道核销'
                  : 'Notice: Clearance item. Verified at Loading Dock / Customer Desk only.'}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  alert(currency === 'RMB' ? '已向门店便携热敏打印机发送打印指令！' : 'Sent label job to store Bluetooth thermal printer!');
                  setStickerBatch(null);
                }}
                className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{currency === 'RMB' ? '打印标签 (热敏贴纸)' : 'Print Thermal Label'}</span>
              </button>
              <button
                type="button"
                onClick={() => setStickerBatch(null)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold hover:bg-slate-200"
              >
                {currency === 'RMB' ? '关闭' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Modal: 1-Tap Counter Dispute & Refund */}
      {showDisputeModal && selectedOrderToVerify && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-amber-600">
                <AlertTriangle className="w-5 h-5" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {currency === 'RMB' ? '现场品相争议：发起即时退款处置' : 'Counter Dispute: Instant Refund Resolution'}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowDisputeModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              {currency === 'RMB'
                ? '若装卸交接时发现外箱严重受潮破裂超出标注等级，店员可在手持终端直接发起即时退款，资金原路返还买家账户，免除离店后纠纷。'
                : 'If package damage exceeds listed rating, initiate an instant partial or full refund on device before handoff.'}
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {currency === 'RMB' ? '争议原因说明' : 'Dispute Reason'}
                </label>
                <input
                  type="text"
                  value={disputeReason}
                  onChange={(e) => setDisputeReason(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {currency === 'RMB' ? '退款比例' : 'Refund Percentage'} ({disputeRefundPct}%)
                </label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="10"
                  value={disputeRefundPct}
                  onChange={(e) => setDisputeRefundPct(parseInt(e.target.value, 10))}
                  className="w-full accent-amber-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                  <span>20% (轻微压褶补偿)</span>
                  <span>50% (半额折损)</span>
                  <span>100% (全额拒收退款)</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs space-y-1 font-mono">
              <div className="flex justify-between text-slate-500">
                <span>Order Total:</span>
                <span>{formatPrice(selectedOrderToVerify.total_amount, selectedOrderToVerify.total_amount_rmb)}</span>
              </div>
              <div className="flex justify-between font-bold text-amber-600">
                <span>Refund to Buyer:</span>
                <span>{formatPrice(selectedOrderToVerify.total_amount * (disputeRefundPct / 100))}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSubmitDispute}
                className="flex-1 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-colors"
              >
                {currency === 'RMB' ? '确认并即时退款' : 'Confirm & Execute Refund'}
              </button>
              <button
                type="button"
                onClick={() => setShowDisputeModal(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold"
              >
                {currency === 'RMB' ? '取消' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
