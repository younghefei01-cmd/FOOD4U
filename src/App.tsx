import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { StoreOperationsView } from './components/store/StoreOperationsView';
import { BuyerMarketplaceView } from './components/buyer/BuyerMarketplaceView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { ChinaPlaybookView } from './components/strategy/ChinaPlaybookView';
import { AiMatchingAgentView } from './components/agent/AiMatchingAgentView';
import { CartDrawer } from './components/cart/CartDrawer';
import { Order } from './types';

const AppContent: React.FC = () => {
  const { activeTab, currency } = useApp();
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [activePassOrder, setActivePassOrder] = useState<Order | null>(null);

  const handleOrderSuccess = (order: Order) => {
    setActivePassOrder(order);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      {/* 3-Zone Navigation Top Bar */}
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'store_ops' && <StoreOperationsView />}
        {activeTab === 'buyer_market' && (
          <BuyerMarketplaceView
            onOpenCart={() => setIsCartOpen(true)}
            activePassOrder={activePassOrder}
            onClosePass={() => setActivePassOrder(null)}
          />
        )}
        {activeTab === 'ai_agent' && <AiMatchingAgentView />}
        {activeTab === 'analytics' && <AnalyticsView />}
        {activeTab === 'china_playbook' && <ChinaPlaybookView />}
      </main>

      {/* Cart & 10-Minute Hold Reservation Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Clean Utility Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black text-slate-900 dark:text-white">FOOD4U</span>
            <span>·</span>
            <span>
              {currency === 'RMB'
                ? 'AI商超临期余量清仓与智能食材主动匹配平台'
                : 'AI Supermarket Surplus Rescue & Proactive Food Matching Platform'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>UN SDG 12.3 全球食品减损准则</span>
            <span>·</span>
            <span>Bill Emerson Good Samaritan Act</span>
            <span>·</span>
            <span>Escrow Settlement API v1</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
