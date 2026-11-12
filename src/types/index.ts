export type Currency = 'USD' | 'RMB';

export type BuyerType = 'B2B' | 'B2C';

export type TargetAudience = 'B2B_BULK' | 'B2C_RETAIL' | 'ALL';

export type ConditionRating = 'Mint' | 'Shelf_Wear' | 'Damaged_Carton';

export type BatchStatus = 'Active' | 'Reserved' | 'Sold' | 'Expired_Removed';

export type OrderStatus = 'Pending_Payment' | 'Ready_For_Pickup' | 'Completed' | 'Cancelled' | 'Disputed';

export type StorageCondition = 'Ambient' | 'Chilled' | 'Frozen';

export interface Store {
  id: string;
  name: string;
  retailer_chain_id?: string;
  retailer_name: string;
  address: string;
  city: string;
  geo_coordinates: {
    lat: number;
    lng: number;
  };
  contact_phone: string;
  operating_hours: string;
  pickup_window_hours: {
    b2b_dock: string;
    b2c_counter: string;
  };
  is_active: boolean;
  created_at: string;
}

export interface Product {
  id: string;
  gtin_barcode: string;
  title: string;
  title_zh?: string;
  brand: string;
  category: string;
  original_msrp: number; // in USD
  original_msrp_rmb: number; // in RMB
  standard_pack_size: string;
  unit_weight_kg: number;
  image_url: string;
  storage_condition: StorageCondition;
  co2e_per_kg: number; // kg CO2e saved per kg food diverted
  water_per_kg: number; // liters water saved per kg
}

export interface InventoryBatch {
  id: string;
  store_id: string;
  product_id: string;
  batch_number: string;
  expiry_date: string; // YYYY-MM-DD
  original_price: number;
  discounted_price: number;
  discounted_price_rmb: number;
  initial_quantity: number;
  available_quantity: number;
  target_audience: TargetAudience;
  minimum_order_quantity: number;
  condition_rating: ConditionRating;
  status: BatchStatus;
  staging_location: 'Loading_Dock_Bay_A' | 'Loading_Dock_Bay_B' | 'Customer_Service_Rack_1' | 'Customer_Service_Rack_2';
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  inventory_batch_id: string;
  quantity: number;
  unit_price: number;
  unit_price_rmb: number;
  subtotal: number;
  subtotal_rmb: number;
  product_title: string;
  standard_pack_size: string;
  condition_rating: ConditionRating;
}

export interface Order {
  id: string;
  order_number: string;
  buyer_id: string;
  buyer_name: string;
  buyer_org?: string;
  store_id: string;
  buyer_type: BuyerType;
  total_amount: number;
  total_amount_rmb: number;
  platform_fee: number;
  store_payout_amount: number;
  status: OrderStatus;
  pickup_code_hash: string;
  pickup_token: string;
  pickup_window_start: string;
  pickup_window_end: string;
  completed_at?: string;
  created_at: string;
  dispute_reason?: string;
  refund_amount?: number;
  items: OrderItem[];
}

export interface EsgImpactRecord {
  id: string;
  store_id: string;
  order_id: string;
  diverted_weight_kg: number;
  avoided_co2e_kg: number;
  water_saved_liters: number;
  logged_at: string;
}

export interface CartItem {
  batch: InventoryBatch;
  product: Product;
  quantity: number;
}
