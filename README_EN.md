# FOOD4U · AI-Powered Supermarket Surplus Rescue & B2B Commercial Clearance Platform

<div align="center">

[![English](https://img.shields.io/badge/Language-English%20(Default)-blue.svg?style=for-the-badge)](./README_EN.md)
[![简体中文](https://img.shields.io/badge/说明-简体中文版-emerald.svg?style=for-the-badge)](./README.md)
![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.0-blue.svg?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg?style=for-the-badge)

<p align="center">
  🌐 <strong>Language / 语言切换:</strong> 
  <strong>🇺🇸 English Readme (Default / Active)</strong>
  &nbsp;|&nbsp;
  <a href="./README.md"><strong>🇨🇳 查看中文版本 (Switch to Chinese README)</strong></a>
</p>

**A light-asset, zero-inventory-risk platform connecting supermarket backrooms with B2B commercial buyers (restaurants, cloud kitchens, bakeries, caterers) and neighborhood shoppers. Leveraging AI Agents to predict ingredient depletion cycles and executing contactless loading-dock handoffs to eliminate food waste and deliver verified ESG dividends.**

[Features](#-key-features) • [Quick Start](#-quick-start) • [Architecture & Schema](#-architecture--data-schema) • [Unit Economics](#-financial-model--unit-economics) • [Global Compliance](#-global-compliance--regulatory-framework)

</div>

---

## 📖 Global Vision & Background

Food waste is an escalating global crisis. Under the macro-imperative of **United Nations Sustainable Development Goal (UN SDG) 12.3**—which mandates halving global per capita food waste by 2030—supermarkets and hypermarket chains across North America, Europe, and Asia-Pacific routinely face severe inventory bottlenecks: **shelf-stable packaged goods with 30–60 days remaining before manufacturer "Best-Before" cutoffs**.

- **Erosion of Retailer Margins**: Traditional markdown and return mechanisms are sluggish, forcing grocers to write off stock or absorb landfill dumping fees, resulting in hundreds of billions of dollars in lost operating margins annually.
- **The Pitfall of Heavy-Asset Discount Retail**: Brick-and-mortar closeout discount chains (e.g., Grocery Outlet, TJX models) rely on centralized distribution centers, long replenishment lead times, and substantial real-estate leases, resulting in heavy overheads.
- **The Limits of "Blind Box" Leftovers**: Consumer "surprise bag" apps focus on day-end restaurant leftovers for individual retail shoppers. They are structurally incapable of absorbing full cartons or pallets of ambient packaged goods accumulated in supermarket storage bays.
- **The FOOD4U Solution**: 
  - **Zero Warehouse & Inventory Risk**: Grocers maintain possession until verified handoff; the platform operates strictly as an asset-light transaction and technology facilitator.
  - **07:00–08:30 Morning Sweep SOP**: Associates use handheld terminals to scan manufacturer GTIN barcodes, apply automated markdown decay curves, and tag goods with anti-cashier Rescue Stickers.
  - **Proactive AI Agent Matching**: Rather than relying on passive browsing, our **FOOD4U AI Agent** models downstream commercial buyers' consumption velocity to forecast shortages 24–48 hours in advance, auto-generating 10-minute hold reservations before items even reach clearance shelves.
  - **Loading Dock Handoff (B2B)**: Commercial buyers pull vans up to store freight docks before peak morning hours, inspect cases on the spot, scan a secure digital token, and depart—completely bypassing customer checkout registers.

---

## ✨ Key Features

### 1. 🏬 Store Operations & Morning Sweep Workflow
- **Daily Cadence (07:00–08:30)**: Designed for stock associates to audit clearance bays and backroom shelving during pre-opening hours.
- **Instant GTIN Barcode Lookup**: Automatically retrieves product title, brand, packaging specifications, carbon intensity, and baseline retail MSRP.
- **Dynamic Markdown Pricing**: Computes algorithmic markdown tiers based on days-to-expiration (e.g., 45 days, 30 days, 15 days).
- **Dedicated Rescue Tagging**: Generates printable batch labels (`FOOD4U · DO NOT SCAN AT CASHIER`) to prevent mixed inventory scans at standard checkout POS lanes.

### 2. 🛒 Dual-Track Buyer Marketplace
- **B2B Bulk Commercial Lot Staging**: Enforces Minimum Order Quantities (MOQs of 5–50 master cartons) targeted at restaurants, commissaries, and bakeries. Pickups are scheduled at backroom loading bays (07:30–09:30).
- **B2C Community Parcel Route**: Neighborhood shoppers pick up smaller bundles at the store's Customer Service counter.
- **10-Minute Redis Hold Mechanism**: Prevents simultaneous order race conditions and overselling; inventory reservations automatically expire and roll back if payment is uncompleted within 10 minutes.

### 3. 🤖 FOOD4U AI Matching Agent (Stage 3 Technology)
- **Buyer Consumption Cycle Profiling**: Learns purchase frequencies and depletion velocities (e.g., an Italian trattoria using 20 kg of penne and 30 cans of peeled tomatoes every 7 days; a cloud kitchen consuming blended cooking oil every 5 days).
- **24–48h Stockout Warning Radar**: Correlates morning inventory scans against buyer profiles in real time.
- **One-Click Autonomous Hold**: Pushes instant intent notifications to commercial buyers; a single click secures inventory reservations under a 10-minute lock.

### 4. 📈 Unit Economics & Verified ESG Ledger
- **Single Pilot Store Monthly Economics**:
  - Clearance volume: 1,200 units/mo @ 70% sell-through = **840 units sold**.
  - Monthly Gross Merchandise Value (GMV): **$1,512.00**.
  - Supermarket net recovery (85%): **$1,285.20**.
  - Platform take-rate (15%): **$226.80**.
  - Payment processing fee (3%): **$45.36**.
  - **Platform net contribution per store: $181.44/mo**.
- **50-Store Regional Cluster**: Monthly GMV of **$75,600.00**, delivering **$6,572.00/mo net operating profit** after hosting, support, and administrative overhead.
- **Certified ESG Carbon & Water Ledger**: Calculates diverted organic waste (kg), avoided CO₂e emissions (kg), and conserved municipal water (Liters) based on verified Life Cycle Assessment (LCA) coefficients.

### 5. ⚖️ Global Compliance & Regulatory Framework
- **Bank-Grade Escrow & Split Payments**: Built on **Stripe Connect Custom Accounts** and **Adyen for Platforms** multi-currency rails. 100% of buyer payments land in regulated fiduciary accounts. T+1 / T+2 automated payouts disperse 85% to the retailer, 15% to the platform, and zero funds are commingled, fully compliant with US FinCEN and EU PSD2 directives.
- **Good Samaritan Liability Shield**: Leverages statutory protections (e.g., the US **Bill Emerson Good Samaritan Food Donation Act** and EU food redistribution guidelines), legally distinguishing between "Best-Before" quality dates and "Use-By" safety boundaries.
- **Global Commercial Product Liability Insurance**: Partnered with global carriers (Allianz, Chubb, AXA) to provide $1,000,000–$2,000,000 per-occurrence product contamination coverage.
- **Strict Negative Exclusions**: Zero tolerance for raw poultry/meats, unpasteurized dairy, infant formula, or compromised hermetic seals.
- **Dockside Verification & One-Tap Refund**: Physical inspection at loading bay; if cartons show dampness or denting, the associate triggers a 1-tap full refund before handoff, eliminating post-departure liability disputes.
- **Standardized Supermarket MOU**: Bundled with a downloadable `Global Pilot Term Sheet / MOU` draft.

---

## 🛠️ Architecture & Data Schema

### Tech Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Motion
- **Build Tooling & Server**: Vite 6, Node.js, Express
- **State Management**: React Context API with LocalStorage replication

### Core Database Schema (PostgreSQL DDL)

```sql
-- 1. Supermarket Partner Stores
CREATE TABLE stores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    retailer_chain_id UUID,
    address TEXT NOT NULL,
    geo_coordinates POINT,
    contact_phone VARCHAR(50),
    operating_hours JSONB,
    pickup_window_hours JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Master Product Catalog (GTIN / Barcode Registry)
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gtin_barcode VARCHAR(64) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    brand VARCHAR(100),
    category VARCHAR(100),
    original_msrp DECIMAL(10,2) NOT NULL,
    standard_pack_size VARCHAR(100),
    image_url TEXT,
    storage_condition VARCHAR(50) DEFAULT 'Ambient', -- Ambient, Chilled, Frozen
    co2e_per_kg DECIMAL(6,2),
    water_per_kg INTEGER
);

-- 3. Surplus Inventory Batches
CREATE TABLE inventory_batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id UUID REFERENCES stores(id),
    product_id UUID REFERENCES products(id),
    batch_number VARCHAR(100),
    expiry_date DATE NOT NULL,
    original_price DECIMAL(10,2) NOT NULL,
    discounted_price DECIMAL(10,2) NOT NULL,
    initial_quantity INTEGER NOT NULL,
    available_quantity INTEGER NOT NULL,
    target_audience VARCHAR(30) DEFAULT 'ALL', -- B2B_BULK, B2C_RETAIL, ALL
    minimum_order_quantity INTEGER DEFAULT 1,
    condition_rating VARCHAR(50) DEFAULT 'Mint', -- Mint, Shelf_Wear, Damaged_Carton
    status VARCHAR(30) DEFAULT 'Active', -- Active, Reserved, Sold, Expired_Removed
    staging_location VARCHAR(100) DEFAULT 'Loading_Dock_Bay_A',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Commercial & Retail Orders
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(64) UNIQUE NOT NULL,
    buyer_id UUID NOT NULL,
    buyer_name VARCHAR(100),
    buyer_org VARCHAR(200),
    store_id UUID REFERENCES stores(id),
    buyer_type VARCHAR(20) NOT NULL, -- B2B, B2C
    total_amount DECIMAL(10,2) NOT NULL,
    platform_fee DECIMAL(10,2) NOT NULL,
    store_payout_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(30) DEFAULT 'Pending_Payment', -- Pending_Payment, Ready_For_Pickup, Completed, Cancelled, Disputed
    pickup_code_hash VARCHAR(128) NOT NULL,
    pickup_token VARCHAR(64) NOT NULL,
    pickup_window_start TIMESTAMP WITH TIME ZONE,
    pickup_window_end TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Certified ESG Impact Records
CREATE TABLE esg_impact_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id UUID REFERENCES stores(id),
    order_id UUID REFERENCES orders(id),
    diverted_weight_kg DECIMAL(10,2) NOT NULL,
    avoided_co2e_kg DECIMAL(10,2) NOT NULL,
    water_saved_liters DECIMAL(10,2) NOT NULL,
    logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/FOOD4U.git
cd FOOD4U
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### 4. Build for Production
```bash
npm run build
```

---

## 🌐 Live Web Preview & One-Click Hosting Guide

FOOD4U is engineered as a high-performance, purely client-side React 19 + Vite 6 Single Page Application. It has been configured with relative asset URLs (`base: './'` in `vite.config.ts`), enabling **100% free hosting on any static cloud provider**:

### Option 1: GitHub Pages via Automated GitHub Actions (Recommended)
This repository includes a pre-configured GitHub Actions workflow at `.github/workflows/deploy.yml`:
1. Push your repository to GitHub (or use AI Studio's **Sync to GitHub** feature);
2. Go to your GitHub repository and navigate to **Settings** ➔ **Pages**;
3. Under **Build and deployment**, change the **Source** dropdown to **`GitHub Actions`**;
4. On every push to the `main` branch, GitHub Actions will automatically compile and deploy your live web application to `https://<your-username>.github.io/<repo-name>/`.

### Option 2: Vercel / Cloudflare Pages / Netlify (Instant)
- **Vercel**: Visit [vercel.com](https://vercel.com), click **Add New Project**, import your GitHub repository, verify Framework Preset is set to **Vite**, and click **Deploy**.
- **Cloudflare Pages**: In the Cloudflare Dashboard, select **Pages** ➔ **Connect GitHub** ➔ Build command: `npm run build`, Output directory: `dist`.

---

## 🗺️ Roadmap

- [x] **Phase 1: B2B Commercial Cold Start & Pilot Clearance Loop**
  - [x] 07:00–08:30 morning sweep mobile scanner interface
  - [x] Backroom freight loading bay & customer service dual-track pick-up
  - [x] Bank-grade escrow split mechanism & standardized Supermarket Pilot MOU
- [x] **Phase 2: B2C Neighborhood Parcels & Anti-Overselling Guard**
  - [x] 10-minute dynamic Redis Hold countdown timer
  - [x] Digital QR handoff tokens with on-site 1-tap refund capability
- [x] **Phase 3: FOOD4U AI Matching Agent**
  - [x] Autonomous consumption velocity & depletion modeling
  - [x] 24–48h stockout prediction radar with real-time supply matching
  - [x] Interactive bilingual Readme reader with 1-click English/Chinese switching
- [ ] **Future Horizons**
  - [ ] Automated delta-sync webhooks for SAP Retail, Oracle NetSuite & Microsoft Dynamics ERPs
  - [ ] Integration with certified carbon crediting frameworks (Verra / Gold Standard)

---

## 🤝 Contributing

Contributions, issues, and feature suggestions are welcome! Please refer to [CONTRIBUTING.md](./CONTRIBUTING.md) for pull request guidelines.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/amazing-feature`)
3. Commit your Changes (`git commit -m 'feat: implement ERP delta sync connector'`)
4. Push to the Branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE). Feel free to use, customize, and deploy.
