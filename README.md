# ERP Backend (Inventory-First)

A backend ERP system built with **NestJS, Prisma, and PostgreSQL**, starting with a **proper inventory module**.
This project focuses on **real backend architecture**, not just CRUD.

> Goal: build a solid, extensible ERP backend that can scale from single-tenant to multi-tenant.

---

## Tech Stack

* **NestJS** – application framework
* **Prisma** – ORM & migrations
* **PostgreSQL** – database
* **Swagger (OpenAPI)** – API documentation
* **TypeScript**

---

## Current Scope

### Implemented

* Inventory module
* Warehouse management (single warehouse for now)
* Products
* Stock tracking using **stock movements**
* Prisma migrations & seeding
* Swagger API docs

### Planned

* Orders (auto stock deduction)
* Customers
* Basic accounting
* Authentication & roles (later phase)
* Multi-warehouse support
* Multi-tenant support

---

## Core Design Principle

**Stock never changes directly.**

* All inventory changes go through `StockMovement`
* `InventoryItem` holds the current balance
* History is always preserved and auditable

This mirrors how real ERPs work.

---

## Project Structure

```
src/
 ├─ inventory/
 │   ├─ inventory.controller.ts
 │   ├─ inventory.service.ts
 │   ├─ inventory.module.ts
 │   └─ dto/
 ├─ prisma/
 │   ├─ schema.prisma
 │   └─ seed.ts
 ├─ app.module.ts
 └─ main.ts
```

---

## Database Models (Simplified)

* Product
* Warehouse
* InventoryItem (product + warehouse balance)
* StockMovement (IN / OUT / ADJUSTMENT)

---

## Setup Instructions

### 1️ Clone repo

```bash
git clone https://github.com/your-username/erp-backend.git
cd erp-backend
```

### 2️ Install dependencies

```bash
npm install
```

### 3️ Configure environment

Create `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/erp_db"
```

Make sure **PostgreSQL is running**.

---

### 4️ Run migrations

```bash
npx prisma migrate dev
```

---

### 5️ Seed initial data

```bash
npx ts-node prisma/seed.ts
```

Creates:

* Default warehouse
* Sample product

---

### 6️ Start server

```bash
npm run start:dev
```

---

## API Documentation

Swagger is available at:

```
http://localhost:3000/api
```

All inventory endpoints are documented there.

---

## Example Inventory Endpoints

* `POST /inventory/in` – stock in
* `POST /inventory/out` – stock out
* `GET /inventory` – view inventory
* `GET /inventory/movements` – stock history

---

## Why This Project Exists

This is not a tutorial project.

It’s a **long-term, production-minded ERP backend** built to:

* Demonstrate backend fundamentals
* Show proper data modeling
* Reflect real business logic
* Serve as a flagship portfolio project

---

## Status

 **In active development**
Inventory module is the foundation. Everything else builds on it.

 
