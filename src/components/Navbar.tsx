import React, { useState } from 'react';
import { useApp, ActiveTab } from '../context/AppContext';
import {
  Package,
  ShoppingCart,
  TrendingUp,
  BookOpen,
  Scan,
  Store as StoreIcon,
  Clock,
  RefreshCw,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCart }) => {
  const {
    stores,
    currentStoreId,
    setCurrentStoreId,
    currentStore,
    currency,
    setCurrency,
    activeTab,
    setActiveTab,
    cart,
    cartHoldSecondsLeft,
    resetToDefaults
  } = useApp();

  const [showStoreMenu, setShowStoreMenu] = useState(false);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const navItems: { id: ActiveTab; label: string; labelZh: string; icon: React.ReactNode }[] = [
    {
      id: 'store_ops',
      label: 'Store Operations',
      labelZh: '门店早巡扫码',
      icon: <Scan className="w-4 h-4 mr-1.5" />
    },
    {
      id: 'buyer_market',
      label: 'Buyer Marketplace',
      labelZh: 'B2B/B2C 集市',
      icon: <Package className="w-4 h-4 mr-1.5" />
    },
    {
      id: 'ai_agent',
      label: 'AI Match Agent',
      labelZh: 'FOOD4U AI 智能匹配',
      icon: <Sparkles className="w-4 h-4 mr-1.5 text-amber-500" />
    },
    {
      id: 'analytics',
      label: 'Economics & ESG',
      labelZh: '财务与碳减排',
      icon: <TrendingUp className="w-4 h-4 mr-1.5" />
    },
    {
      id: 'china_playbook',
      label: 'China Strategy & Legal',
      labelZh: '合规与落地智库',
      icon: <BookOpen className="w-4 h-4 mr-1.5" />
    }
  ];

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('store_ops')}
              className="text-left group flex items-center gap-2.5 focus:outline-none"
            >
              <div className="w-10 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-sm font-black text-xs tracking-tight">
                FOOD4U
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                  FOOD4U
                </span>
                <span className="hidden sm:inline-block ml-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  {currency === 'RMB' ? 'AI商超清仓平台' : 'AI Surplus Rescue'}
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-slate-900 text-white dark:bg-emerald-600 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.icon}
                  <span>{currency === 'RMB' ? item.labelZh : item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions & Quick Controls */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Currency Toggle */}
            <div className="flex items-center p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2 py-1 text-xs font-semibold rounded-md transition-all ${
                  currency === 'USD'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
                title="Switch to US Dollar ($)"
              >
                $ USD
              </button>
              <button
                onClick={() => setCurrency('RMB')}
                className={`px-2 py-1 text-xs font-semibold rounded-md transition-all ${
                  currency === 'RMB'
                    ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
                title="切换至人民币 (¥)"
              >
                ¥ RMB
              </button>
            </div>

            {/* Store Location Selector */}
            <div className="relative">
              <button
                onClick={() => setShowStoreMenu(!showStoreMenu)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors max-w-[170px] sm:max-w-[210px] truncate"
              >
                <StoreIcon className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="truncate">{currentStore.name}</span>
              </button>

              {showStoreMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-1.5 z-50">
                  <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {currency === 'RMB' ? '切换合作试点门店' : 'Select Pilot Store'}
                  </div>
                  {stores.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setCurrentStoreId(s.id);
                        setShowStoreMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex flex-col transition-colors ${
                        s.id === currentStoreId
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-semibold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      <span className="font-medium truncate">{s.name}</span>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                        {s.address}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Shopping Cart & Hold Reservation Trigger */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors shrink-0"
              title="View Cart & Reserve Hold"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {currency === 'RMB' ? '提货订单车' : 'Cart'}
              </span>
              {totalCartCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 bg-white text-emerald-800 rounded-full font-mono text-[11px] font-bold">
                  {totalCartCount}
                </span>
              )}
              {cart.length > 0 && (
                <span className="hidden lg:inline-flex items-center ml-1 text-[11px] text-emerald-100 font-mono">
                  <Clock className="w-3 h-3 mr-0.5" />
                  {formatTimer(cartHoldSecondsLeft)}
                </span>
              )}
            </button>


            {/* Reset Data for Demo */}
            <button
              onClick={() => {
                if (window.confirm(currency === 'RMB' ? '确定要重置所有演示数据吗？' : 'Reset all demonstration batches and orders?')) {
                  resetToDefaults();
                }
              }}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Reset demo data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-slate-100 dark:border-slate-800 overflow-x-auto gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center px-2.5 py-1 text-xs font-semibold rounded-md whitespace-nowrap transition-colors ${
                activeTab === item.id
                  ? 'bg-slate-900 text-white dark:bg-emerald-600'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {item.icon}
              <span>{currency === 'RMB' ? item.labelZh : item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
