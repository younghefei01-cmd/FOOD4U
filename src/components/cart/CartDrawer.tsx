import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BuyerType, Order } from '../../types';
import {
  X,
  Trash2,
  Clock,
  ShieldCheck,
  CreditCard,
  Building2,
  User,
  ArrowRight,
  Truck,
  Package
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onOrderSuccess
}) => {
  const {
    cart,
    cartHoldSecondsLeft,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    formatPrice,
    checkoutOrder,
    currency,
    currentStore
  } = useApp();

  const [buyerType, setBuyerType] = useState<BuyerType>('B2B');
  const [buyerName, setBuyerName] = useState<string>('Chef Marco / 王厨师长');
  const [buyerOrg, setBuyerOrg] = useState<string>('Pudong Cloud Kitchen / 浦东云厨房餐饮');
  const [paymentMethod, setPaymentMethod] = useState<string>('WeChat_Pay_Escrow');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Calculations
  const subtotalUSD = cart.reduce(
    (acc, item) => acc + item.batch.discounted_price * item.quantity,
    0
  );
  const subtotalRMB = cart.reduce(
    (acc, item) => acc + item.batch.discounted_price_rmb * item.quantity,
    0
  );
  const msrpTotalUSD = cart.reduce(
    (acc, item) => acc + item.batch.original_price * item.quantity,
    0
  );
  const totalSavingsUSD = Math.max(0, msrpTotalUSD - subtotalUSD);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    setTimeout(() => {
      const res = checkoutOrder({
        buyerType,
        buyerName,
        buyerOrg: buyerType === 'B2B' ? buyerOrg : undefined,
        paymentMethod
      });

      setIsSubmitting(false);

      if (res.success && res.order) {
        onOrderSuccess(res.order);
        onClose();
      } else {
        setErrorMsg(res.message || 'Checkout failed.');
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 dark:border-slate-800">
        {/* Drawer Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {currency === 'RMB' ? '救援订购清单 & 锁库车' : 'Surplus Cart & Reservation'}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5 text-xs text-slate-500 font-mono">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {currency === 'RMB' ? '独占锁库倒计时:' : 'Inventory Hold:'}{' '}
                <strong className="text-emerald-600 font-bold">
                  {formatTimer(cartHoldSecondsLeft)}
                </strong>
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Package className="w-12 h-12 text-slate-300 mx-auto" />
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {currency === 'RMB' ? '订购车为空' : 'Your cart is empty'}
              </div>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                {currency === 'RMB'
                  ? '在集市中选择 B2B 整箱批发或 B2C 个人临期商品，即可锁定库存 10 分钟。'
                  : 'Select lots in the marketplace to lock inventory for 10 minutes.'}
              </p>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              <div className="space-y-3">
                {cart.map(({ batch, product, quantity }) => (
                  <div
                    key={batch.id}
                    className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 text-xs flex gap-3"
                  >
                    <img
                      src={product.image_url}
                      alt={product.title}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 object-cover rounded-lg bg-slate-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white truncate">
                          {currency === 'RMB' && product.title_zh ? product.title_zh : product.title}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          LOT: {batch.batch_number} · Exp: {batch.expiry_date}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700">
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(batch.id, quantity - 1)}
                            className="px-2 py-0.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                          >
                            -
                          </button>
                          <span className="px-2 font-mono font-bold text-slate-900 dark:text-white">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(batch.id, quantity + 1)}
                            className="px-2 py-0.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                          >
                            +
                          </button>
                        </div>

                        {/* Price & Remove */}
                        <div className="flex items-center gap-3">
                          <div className="font-mono font-bold text-emerald-600">
                            {formatPrice(
                              batch.discounted_price * quantity,
                              batch.discounted_price_rmb * quantity
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(batch.id)}
                            className="text-slate-400 hover:text-red-500"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Buyer Type & Checkout Form */}
              <form onSubmit={handleCheckout} className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {currency === 'RMB' ? '采购身份类型' : 'Buyer Profile Type'}
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setBuyerType('B2B')}
                      className={`p-2.5 rounded-lg border text-left flex items-center gap-2 ${
                        buyerType === 'B2B'
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <Building2 className="w-4 h-4" />
                      <div>
                        <div>{currency === 'RMB' ? 'B2B 商业采购' : 'B2B Commercial'}</div>
                        <div className="text-[10px] text-slate-400 font-normal">
                          {currency === 'RMB' ? '卸货码头提货' : 'Loading Dock'}
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setBuyerType('B2C')}
                      className={`p-2.5 rounded-lg border text-left flex items-center gap-2 ${
                        buyerType === 'B2C'
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <User className="w-4 h-4" />
                      <div>
                        <div>{currency === 'RMB' ? 'B2C 个人散购' : 'B2C Shopper'}</div>
                        <div className="text-[10px] text-slate-400 font-normal">
                          {currency === 'RMB' ? '前台服务台提货' : 'Customer Desk'}
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {currency === 'RMB' ? '提货联系人姓名' : 'Pickup Contact Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    />
                  </div>

                  {buyerType === 'B2B' && (
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        {currency === 'RMB' ? '餐厅/烘焙/食堂机构全称' : 'Business / Restaurant Name'}
                      </label>
                      <input
                        type="text"
                        required
                        value={buyerOrg}
                        onChange={(e) => setBuyerOrg(e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {currency === 'RMB' ? '托管结算通道' : 'Escrow Settlement Gateway'}
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    >
                      <option value="WeChat_Pay_Escrow">
                        {currency === 'RMB' ? '微信支付·电商收付通 (商超分账托管)' : 'WeChat Pay Escrow (Automated Split)'}
                      </option>
                      <option value="Alipay_Direct_Pay">
                        {currency === 'RMB' ? '支付宝·互联网平台直付通 (资金存管)' : 'Alipay Direct Split Escrow'}
                      </option>
                      <option value="Bank_Virtual_Account">
                        {currency === 'RMB' ? '商业银行二类电子账户资金存管' : 'Commercial Bank Escrow Account'}
                      </option>
                    </select>
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-2.5 bg-red-50 text-red-700 text-xs rounded-lg">
                    {errorMsg}
                  </div>
                )}
              </form>
            </>
          )}
        </div>

        {/* Drawer Footer with Price Summary and Action Button */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3">
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-slate-500">
                <span>{currency === 'RMB' ? '原厂零售指导价 (MSRP):' : 'Original MSRP:'}</span>
                <span className="line-through">{formatPrice(msrpTotalUSD)}</span>
              </div>
              <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-medium">
                <span>{currency === 'RMB' ? '救食优惠挽回:' : 'Total Rescued Savings:'}</span>
                <span>-{formatPrice(totalSavingsUSD)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-white pt-1 border-t border-slate-200 dark:border-slate-700">
                <span>{currency === 'RMB' ? '实付结算金额:' : 'Checkout Total:'}</span>
                <span className="text-emerald-600 font-black text-base">
                  {formatPrice(subtotalUSD, subtotalRMB)}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-sans">
                {currency === 'RMB'
                  ? '（含商超净所得 85% 及平台技术服务费 15%，现场核销后放款）'
                  : '(Includes 85% store net payout & 15% platform take-rate in escrow)'}
              </div>
            </div>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleCheckout}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>{currency === 'RMB' ? '正在创建银行托管锁库订单...' : 'Securing Reservation in Escrow...'}</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    {currency === 'RMB'
                      ? `安全托管支付并生成提货码 (${formatPrice(subtotalUSD, subtotalRMB)})`
                      : `Capture Payment & Generate Digital Pass (${formatPrice(subtotalUSD)})`}
                  </span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
