import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Store,
  Product,
  InventoryBatch,
  Order,
  OrderItem,
  EsgImpactRecord,
  CartItem,
  Currency,
  BuyerType,
  ConditionRating,
  TargetAudience
} from '../types';
import {
  INITIAL_STORES,
  INITIAL_PRODUCTS,
  INITIAL_BATCHES,
  INITIAL_ORDERS,
  INITIAL_ESG_RECORDS
} from '../data/initialData';

export type ActiveTab = 'store_ops' | 'buyer_market' | 'ai_agent' | 'analytics' | 'china_playbook';

interface AppContextType {
  stores: Store[];
  products: Product[];
  batches: InventoryBatch[];
  orders: Order[];
  esgRecords: EsgImpactRecord[];
  currentStoreId: string;
  currentStore: Store;
  setCurrentStoreId: (id: string) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cart: CartItem[];
  cartHoldSecondsLeft: number;
  addToCart: (batchId: string, quantity: number) => boolean;
  updateCartQuantity: (batchId: string, quantity: number) => void;
  removeFromCart: (batchId: string) => void;
  clearCart: () => void;
  formatPrice: (usd: number, rmb?: number) => string;
  scanCreateBatch: (payload: {
    barcode: string;
    expiry_date: string;
    quantity: number;
    discounted_price: number;
    condition: ConditionRating;
    target_audience: TargetAudience;
    moq: number;
    batch_number?: string;
  }) => { success: boolean; message: string; batch?: InventoryBatch };
  bulkSyncInventory: (storeId: string, items: Array<{
    barcode: string;
    qty: number;
    expiry: string;
    price: number;
    condition: ConditionRating;
    audience: TargetAudience;
    moq: number;
  }>) => number;
  checkoutOrder: (payload: {
    buyerType: BuyerType;
    buyerName: string;
    buyerOrg?: string;
    paymentMethod: string;
  }) => { success: boolean; order?: Order; message?: string };
  verifyPickup: (orderNumber: string, pickupToken: string, notes?: string) => {
    success: boolean;
    order?: Order;
    esgRecord?: EsgImpactRecord;
    message: string;
  };
  disputeAtCounter: (orderNumber: string, reason: string, refundPct: number) => {
    success: boolean;
    order?: Order;
    message: string;
  };
  resetToDefaults: () => void;
  divertedUnitsIncentive: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  STORES: 'rescueshelf_stores_v1',
  PRODUCTS: 'rescueshelf_products_v1',
  BATCHES: 'rescueshelf_batches_v1',
  ORDERS: 'rescueshelf_orders_v1',
  ESG: 'rescueshelf_esg_v1',
  CURRENCY: 'rescueshelf_currency_v1',
  STORE_ID: 'rescueshelf_current_store_v1',
  INCENTIVE: 'rescueshelf_incentive_v1'
};

const USD_TO_RMB_RATE = 6.95;

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stores] = useState<Store[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STORES);
    return saved ? JSON.parse(saved) : INITIAL_STORES;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [batches, setBatches] = useState<InventoryBatch[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BATCHES);
    return saved ? JSON.parse(saved) : INITIAL_BATCHES;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [esgRecords, setEsgRecords] = useState<EsgImpactRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ESG);
    return saved ? JSON.parse(saved) : INITIAL_ESG_RECORDS;
  });

  const [currentStoreId, setCurrentStoreId] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STORE_ID);
    return saved || 'store-101';
  });

  const [currency, setCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENCY) as Currency;
    return saved === 'RMB' ? 'RMB' : 'USD';
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('store_ops');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartHoldSecondsLeft, setCartHoldSecondsLeft] = useState<number>(600); // 10 minutes
  const [divertedUnitsIncentive, setDivertedUnitsIncentive] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INCENTIVE);
    return saved ? parseInt(saved, 10) : 342;
  });

  // Save state on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BATCHES, JSON.stringify(batches));
  }, [batches]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ESG, JSON.stringify(esgRecords));
  }, [esgRecords]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENCY, currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STORE_ID, currentStoreId);
  }, [currentStoreId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INCENTIVE, divertedUnitsIncentive.toString());
  }, [divertedUnitsIncentive]);

  // Reservation hold countdown timer (10 minutes)
  useEffect(() => {
    if (cart.length === 0) {
      setCartHoldSecondsLeft(600);
      return;
    }
    const interval = setInterval(() => {
      setCartHoldSecondsLeft((prev) => {
        if (prev <= 1) {
          // Timer expired: release inventory reservation
          setCart([]);
          return 600;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [cart]);

  const currentStore = stores.find((s) => s.id === currentStoreId) || stores[0];

  const formatPrice = (usd: number, rmb?: number): string => {
    if (currency === 'RMB') {
      const val = rmb !== undefined ? rmb : usd * USD_TO_RMB_RATE;
      return `¥${val.toFixed(2)}`;
    }
    return `$${usd.toFixed(2)}`;
  };

  const addToCart = (batchId: string, quantity: number): boolean => {
    const batch = batches.find((b) => b.id === batchId);
    if (!batch || batch.available_quantity < quantity) {
      return false;
    }
    const product = products.find((p) => p.id === batch.product_id);
    if (!product) return false;

    setCart((prev) => {
      const existing = prev.find((item) => item.batch.id === batchId);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, batch.available_quantity);
        return prev.map((item) =>
          item.batch.id === batchId ? { ...item, quantity: newQty } : item
        );
      }
      return [...prev, { batch, product, quantity }];
    });
    setCartHoldSecondsLeft(600); // Reset 10-minute hold
    return true;
  };

  const updateCartQuantity = (batchId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(batchId);
      return;
    }
    const batch = batches.find((b) => b.id === batchId);
    if (!batch) return;
    const boundedQty = Math.min(quantity, batch.available_quantity);
    setCart((prev) =>
      prev.map((item) =>
        item.batch.id === batchId ? { ...item, quantity: boundedQty } : item
      )
    );
  };

  const removeFromCart = (batchId: string) => {
    setCart((prev) => prev.filter((item) => item.batch.id !== batchId));
  };

  const clearCart = () => {
    setCart([]);
    setCartHoldSecondsLeft(600);
  };

  // 1. POST /api/v1/store/batches/scan-create
  const scanCreateBatch = (payload: {
    barcode: string;
    expiry_date: string;
    quantity: number;
    discounted_price: number;
    condition: ConditionRating;
    target_audience: TargetAudience;
    moq: number;
    batch_number?: string;
  }) => {
    const product = products.find((p) => p.gtin_barcode === payload.barcode);
    if (!product) {
      return {
        success: false,
        message: `Product GTIN "${payload.barcode}" not found in master catalog. Please verify barcode.`
      };
    }

    const discountedRMB = Math.round(payload.discounted_price * USD_TO_RMB_RATE * 100) / 100;
    const newBatchId = `batch-${Date.now().toString().slice(-6)}`;
    const stagingLoc = payload.target_audience === 'B2B_BULK'
      ? 'Loading_Dock_Bay_A'
      : 'Customer_Service_Rack_1';

    const newBatch: InventoryBatch = {
      id: newBatchId,
      store_id: currentStoreId,
      product_id: product.id,
      batch_number: payload.batch_number || `LOT-REC-${Date.now().toString().slice(-4)}`,
      expiry_date: payload.expiry_date,
      original_price: product.original_msrp,
      discounted_price: payload.discounted_price,
      discounted_price_rmb: discountedRMB,
      initial_quantity: payload.quantity,
      available_quantity: payload.quantity,
      target_audience: payload.target_audience,
      minimum_order_quantity: payload.moq,
      condition_rating: payload.condition,
      status: 'Active',
      staging_location: stagingLoc,
      created_at: new Date().toISOString()
    };

    setBatches((prev) => [newBatch, ...prev]);
    return {
      success: true,
      message: `Batch ${newBatch.batch_number} created successfully with ${payload.quantity} units staged at ${stagingLoc.replace(/_/g, ' ')}.`,
      batch: newBatch
    };
  };

  // 2. POST /api/v1/store/batches/bulk-sync
  const bulkSyncInventory = (
    storeId: string,
    items: Array<{
      barcode: string;
      qty: number;
      expiry: string;
      price: number;
      condition: ConditionRating;
      audience: TargetAudience;
      moq: number;
    }>
  ): number => {
    let syncedCount = 0;
    const newBatches: InventoryBatch[] = [];

    items.forEach((item, idx) => {
      const product = products.find((p) => p.gtin_barcode === item.barcode);
      if (product) {
        newBatches.push({
          id: `batch-sync-${Date.now()}-${idx}`,
          store_id: storeId,
          product_id: product.id,
          batch_number: `LOT-ERP-${Date.now().toString().slice(-4)}-${idx + 1}`,
          expiry_date: item.expiry,
          original_price: product.original_msrp,
          discounted_price: item.price,
          discounted_price_rmb: Math.round(item.price * USD_TO_RMB_RATE * 100) / 100,
          initial_quantity: item.qty,
          available_quantity: item.qty,
          target_audience: item.audience,
          minimum_order_quantity: item.moq,
          condition_rating: item.condition,
          status: 'Active',
          staging_location: item.audience === 'B2B_BULK' ? 'Loading_Dock_Bay_A' : 'Customer_Service_Rack_2',
          created_at: new Date().toISOString()
        });
        syncedCount++;
      }
    });

    if (newBatches.length > 0) {
      setBatches((prev) => [...newBatches, ...prev]);
    }
    return syncedCount;
  };

  // 3. POST /api/v1/orders/checkout
  const checkoutOrder = (payload: {
    buyerType: BuyerType;
    buyerName: string;
    buyerOrg?: string;
    paymentMethod: string;
  }) => {
    if (cart.length === 0) {
      return { success: false, message: 'Cart is empty. Please select lots to reserve.' };
    }

    const orderId = `ord-${Date.now().toString().slice(-6)}`;
    const orderNumber = `RS-26-${Math.floor(1000 + Math.random() * 9000)}`;

    let totalAmount = 0;
    let totalAmountRMB = 0;

    const orderItems: OrderItem[] = cart.map((cartItem, idx) => {
      const subtotal = cartItem.batch.discounted_price * cartItem.quantity;
      const subtotalRMB = cartItem.batch.discounted_price_rmb * cartItem.quantity;
      totalAmount += subtotal;
      totalAmountRMB += subtotalRMB;

      return {
        id: `item-${orderId}-${idx + 1}`,
        order_id: orderId,
        inventory_batch_id: cartItem.batch.id,
        quantity: cartItem.quantity,
        unit_price: cartItem.batch.discounted_price,
        unit_price_rmb: cartItem.batch.discounted_price_rmb,
        subtotal,
        subtotal_rmb: subtotalRMB,
        product_title: cartItem.product.title,
        standard_pack_size: cartItem.product.standard_pack_size,
        condition_rating: cartItem.batch.condition_rating
      };
    });

    // Deduct available quantities from batches
    setBatches((prev) =>
      prev.map((batch) => {
        const item = cart.find((ci) => ci.batch.id === batch.id);
        if (item) {
          const newQty = Math.max(0, batch.available_quantity - item.quantity);
          return {
            ...batch,
            available_quantity: newQty,
            status: newQty === 0 ? 'Sold' : 'Active'
          };
        }
        return batch;
      })
    );

    const platformFee = Math.round(totalAmount * 0.15 * 100) / 100; // 15% take-rate
    const storePayout = Math.round((totalAmount - platformFee) * 100) / 100; // 85% payout

    const now = new Date();
    const pickupStart = new Date(now.getTime() + 12 * 60 * 60 * 1000).toISOString();
    const pickupEnd = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();

    const newOrder: Order = {
      id: orderId,
      order_number: orderNumber,
      buyer_id: `buyer-${payload.buyerType.toLowerCase()}-${Date.now().toString().slice(-4)}`,
      buyer_name: payload.buyerName || 'Valued Buyer',
      buyer_org: payload.buyerOrg,
      store_id: currentStoreId,
      buyer_type: payload.buyerType,
      total_amount: Math.round(totalAmount * 100) / 100,
      total_amount_rmb: Math.round(totalAmountRMB * 100) / 100,
      platform_fee: platformFee,
      store_payout_amount: storePayout,
      status: 'Ready_For_Pickup',
      pickup_code_hash: Math.random().toString(36).substring(2, 12),
      pickup_token: `PASS-${orderNumber}-${payload.buyerType === 'B2B' ? 'DOCK' : 'SVC'}`,
      pickup_window_start: pickupStart,
      pickup_window_end: pickupEnd,
      created_at: new Date().toISOString(),
      items: orderItems
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    return {
      success: true,
      order: newOrder,
      message: `Order ${orderNumber} placed! Pickup Token: ${newOrder.pickup_token}`
    };
  };

  // 4. POST /api/v1/store/orders/verify-pickup
  const verifyPickup = (
    orderNumber: string,
    pickupToken: string,
    notes?: string
  ) => {
    const orderIndex = orders.findIndex(
      (o) =>
        o.order_number.toLowerCase() === orderNumber.trim().toLowerCase() ||
        o.pickup_token.toLowerCase() === pickupToken.trim().toLowerCase()
    );

    if (orderIndex === -1) {
      return {
        success: false,
        message: `Order not found. Please verify Order Number or Pickup Token.`
      };
    }

    const order = orders[orderIndex];
    if (order.status === 'Completed') {
      return {
        success: false,
        message: `Order ${order.order_number} has already been verified and released on ${new Date(
          order.completed_at || ''
        ).toLocaleString()}.`
      };
    }

    // Calculate ESG Impact for this order
    let totalDivertedKg = 0;
    let totalAvoidedCo2e = 0;
    let totalWaterSavedLiters = 0;
    let totalUnits = 0;

    order.items.forEach((item) => {
      const batch = batches.find((b) => b.id === item.inventory_batch_id);
      const product = products.find(
        (p) => p.id === (batch ? batch.product_id : undefined)
      ) || products[0];

      const itemKg = product.unit_weight_kg * item.quantity;
      totalDivertedKg += itemKg;
      totalAvoidedCo2e += itemKg * product.co2e_per_kg;
      totalWaterSavedLiters += itemKg * product.water_per_kg;
      totalUnits += item.quantity;
    });

    const esgRecord: EsgImpactRecord = {
      id: `esg-${Date.now().toString().slice(-6)}`,
      store_id: order.store_id,
      order_id: order.id,
      diverted_weight_kg: Math.round(totalDivertedKg * 100) / 100,
      avoided_co2e_kg: Math.round(totalAvoidedCo2e * 100) / 100,
      water_saved_liters: Math.round(totalWaterSavedLiters),
      logged_at: new Date().toISOString()
    };

    const updatedOrder: Order = {
      ...order,
      status: 'Completed',
      completed_at: new Date().toISOString()
    };

    setOrders((prev) => {
      const copy = [...prev];
      copy[orderIndex] = updatedOrder;
      return copy;
    });

    setEsgRecords((prev) => [esgRecord, ...prev]);
    setDivertedUnitsIncentive((prev) => prev + totalUnits);

    return {
      success: true,
      order: updatedOrder,
      esgRecord,
      message: `Pickup verified! Order ${order.order_number} completed. Escrow of ${formatPrice(
        order.store_payout_amount
      )} released to store account. Logged ${esgRecord.diverted_weight_kg} kg diverted.`
    };
  };

  // 5. 1-Tap Counter Dispute & Refund
  const disputeAtCounter = (
    orderNumber: string,
    reason: string,
    refundPct: number
  ) => {
    const orderIndex = orders.findIndex(
      (o) => o.order_number.toLowerCase() === orderNumber.trim().toLowerCase()
    );

    if (orderIndex === -1) {
      return { success: false, message: 'Order not found.' };
    }

    const order = orders[orderIndex];
    const refundAmount = Math.round(order.total_amount * (refundPct / 100) * 100) / 100;
    const adjustedPayout = Math.max(0, order.store_payout_amount - refundAmount);

    const updatedOrder: Order = {
      ...order,
      status: 'Disputed',
      dispute_reason: reason,
      refund_amount: refundAmount,
      store_payout_amount: adjustedPayout
    };

    setOrders((prev) => {
      const copy = [...prev];
      copy[orderIndex] = updatedOrder;
      return copy;
    });

    return {
      success: true,
      order: updatedOrder,
      message: `Dispute logged for ${order.order_number}: ${refundPct}% refund (${formatPrice(
        refundAmount
      )}) credited to buyer via platform escrow.`
    };
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEYS.BATCHES);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.ESG);
    localStorage.removeItem(STORAGE_KEYS.INCENTIVE);
    setBatches(INITIAL_BATCHES);
    setOrders(INITIAL_ORDERS);
    setEsgRecords(INITIAL_ESG_RECORDS);
    setDivertedUnitsIncentive(342);
    setCart([]);
  };

  return (
    <AppContext.Provider
      value={{
        stores,
        products,
        batches,
        orders,
        esgRecords,
        currentStoreId,
        currentStore,
        setCurrentStoreId,
        currency,
        setCurrency,
        activeTab,
        setActiveTab,
        cart,
        cartHoldSecondsLeft,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        formatPrice,
        scanCreateBatch,
        bulkSyncInventory,
        checkoutOrder,
        verifyPickup,
        disputeAtCounter,
        resetToDefaults,
        divertedUnitsIncentive
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
