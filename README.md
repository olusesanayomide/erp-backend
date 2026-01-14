# ERP Backend (Inventory-Ledger Architecture)

A robust ERP backend built with **NestJS, Prisma, and PostgreSQL**. Unlike basic CRUD apps, this system uses a **ledger-based inventory engine** where stock is never edited—it is only moved.

## Recent Updates

* **Full Procurement Cycle:** Implemented Purchase Orders with automated stock-in on receipt.
* **Sales/Orders Module:** Automated stock deduction linked to Customer orders.
* **MDM (Master Data Management):** Added registry modules for Customers, Suppliers, and Warehouses.
* **API Security:** Integrated `ParseUUIDPipe` for all relational lookups.
* **Documentation:** 100% Swagger coverage with `@ApiOperation` and `@ApiResponse`.

---

## Core Architecture: The "Ledger" Principle

The system follows a strict **Event Sourcing** mindset for physical goods:

1. **Stock never changes directly.** You cannot "set" stock to 50.
2. All changes are records in the `StockMovement` table (The Ledger).
3. `InventoryItem` provides a calculated "Current Balance" snapshot.
4. **Full Audit Trail:** Every unit of stock can be traced back to a Purchase Order or an Adjustment.

---

## Project Modules

### Master Data (The Registry)

* **Products:** The central catalog of SKUs and descriptions.
* **Warehouses:** Physical storage locations with address tracking.
* **Customers:** Sales targets with contact and history tracking.
* **Suppliers:** Sources for procurement.

### Transactions (The Flow)

* **Purchases:** Inbound flow. Creating a PO  Receiving  Positive Stock Movement.
* **Orders (Sales):** Outbound flow. Creating Order  Shipping  Negative Stock Movement.
* **Inventory:** The engine that calculates balances and logs manual adjustments.

---

## Tech Stack

* **Framework:** NestJS (Node.js)
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Docs:** Swagger (OpenAPI 3.0)
* **Validation:** Class-validator & ParseUUIDPipes

---

## API Navigation

Once the server is running (`npm run start:dev`), visit:
`http://localhost:3000/api`

**Key Business Workflows to test in Swagger:**

1. **Procurement:** `POST /purchases`  `PATCH /purchases/{id}/receive` (Watch stock go up).
2. **Sales:** `POST /orders`  `POST /orders/{id}/items` (Prepare for shipment).
3. **Inventory:** `GET /inventory/{warehouseId}` (Check current balances).

---

## Project Structure

```text
src/
 ├── customers/    # Customer Registry
 ├── inventory/    # Ledger Engine (In/Out/Adjust)
 ├── orders/       # Sales Module
 ├── products/     # Catalog Management
 ├── purchases/    # Procurement Module
 ├── suppliers/    # Supplier Registry
 ├── warehouses/   # Location Management
 └── prisma/       # Schema & Migrations

```

---

## Roadmap

* [x] Core Ledger Logic
* [x] Sales & Procurement Integration
* [x] Master Data Registry (Warehouse/Customer/Supplier)
* [ ] **Next Phase:** Authentication (JWT) & RBAC Roles
* [ ] **Future:** PDF Invoice Generation & Valuation Reports

