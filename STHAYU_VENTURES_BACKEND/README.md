# STHAYU VENTURES BACKEND

Autonomous Operating System Enterprise Backend API.

## Overview
This repository contains the standalone, production-ready backend service powering **Sthayu Ventures** autonomous enterprise AI agent orchestration, lead diagnostics, workflow automation, and administrative command center.

---

## 🛠️ Tech Stack & Architecture

- **Runtime**: Node.js (TypeScript) with Express 5
- **Validation**: Schema-level validation & sanitization with `Zod`
- **Security**: JWT Bearer Tokens, Bcrypt Password Hashing, Role-Based Access Control (`admin`, `team`, `client`), Sliding-Window Rate Limiting, Spam Bot Honeypot detection
- **Persistence**: High-performance structured JSON Document Store with zero external database dependencies for immediate local and container deployment
- **Build System**: Single-file bundled output (`dist/index.cjs`) via `esbuild` for ultra-fast container cold starts

---

## 📁 Repository Structure

```
STHAYU_VENTURES_BACKEND/
├── .env.example                # Sample environment configurations
├── .gitignore                  # Git ignore patterns
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript compiler options
├── README.md                   # Full documentation & API guide
├── src/
│   ├── index.ts                # Express application bootstrap & listener
│   ├── config.ts               # Centralized configuration & environment loader
│   ├── db/
│   │   └── database.ts         # Persistent data layer & seed data
│   ├── middleware/
│   │   ├── auth.ts             # JWT authentication & RBAC guards
│   │   ├── rateLimiter.ts      # IP-bucket sliding window rate limiter
│   │   ├── validator.ts        # Zod request body validation middleware
│   │   └── errorHandler.ts     # Global centralized error handler
│   ├── services/
│   │   ├── assessmentService.ts # Bottleneck & ROI blueprint scoring engine
│   │   ├── agentService.ts      # AI Agent registry & execution runner
│   │   ├── workflowService.ts   # Event & webhook orchestration engine
│   │   ├── contactService.ts    # Strategic inquiry & lead sync
│   │   ├── bookingService.ts    # Strategy session scheduling
│   │   └── notificationService.ts # Email/webhook notification dispatcher
│   └── routes/
│       └── v1/
│           ├── index.ts        # Versioned router aggregator (/api/v1)
│           ├── authRoutes.ts   # Login & identity verification
│           ├── assessmentRoutes.ts # Public diagnostic intake
│           ├── contactRoutes.ts    # Strategic inquiry intake
│           ├── bookingRoutes.ts    # Consultation booking intake
│           ├── agentRoutes.ts      # Agent registry & execution
│           ├── workflowRoutes.ts   # Automation & webhooks
│           ├── adminRoutes.ts      # Authenticated admin operations
│           └── healthRoutes.ts     # System health & telemetry
└── tests/
    └── runTests.ts             # 21-point automated verification suite
```

---

## 🚀 Quick Start Guide

### 1. Installation
```bash
cd STHAYU_VENTURES_BACKEND
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Run Automated Test Suite
```bash
npm test
```

### 5. Build for Production
```bash
npm run build
npm start
```

---

## 📡 API Endpoint Reference (`/api/v1`)

### 1. Diagnostic & Lead Ingestion
- `POST /api/v1/assessments`
  - **Body**: `{ name, email, company, teamSize, primaryFriction, currentStack }`
  - **Response**: Computes bottleneck friction score, assigns ROI multiplier, creates lead record, and returns customized Architecture Blueprint.

### 2. Strategic Contact & Booking
- `POST /api/v1/contacts`
  - **Body**: `{ name, email, company, subject, message, enquiryType }`
- `POST /api/v1/bookings`
  - **Body**: `{ name, email, company, requestedDate, timeSlot, notes }`

### 3. AI Agents Registry & Execution
- `GET /api/v1/agents` - List active agents (`STH-SDR-01`, `STH-SUP-02`, `STH-OPS-03`, `STH-VOX-04`)
- `POST /api/v1/agents/execute` - Execute agent with structured input payload
- `GET /api/v1/agents/executions` - View telemetry & execution history (Admin/Team only)

### 4. Workflows & Webhooks
- `GET /api/v1/workflows` - List active automated pipelines
- `POST /api/v1/workflows/:id/trigger` - Trigger manual workflow run (Admin/Team only)
- `POST /api/v1/workflows/webhooks/:webhookId` - Ingest external system webhook

### 5. Authentication & Administrative Command
- `POST /api/v1/auth/login` - Admin/Team authentication (`admin@sthayuventures.com` / `SthayuAdmin2026!`)
- `GET /api/v1/auth/me` - Validate session token
- `GET /api/v1/admin/stats` - High-level system & pipeline metrics
- `GET /api/v1/admin/leads` - Full lead records & qualification scoring
- `GET /api/v1/admin/assessments` - Detailed diagnostic submissions
- `GET /api/v1/admin/contacts` - Inbound enterprise inquiries
- `GET /api/v1/admin/bookings` - Scheduled strategy consultations
- `GET /api/v1/admin/audit-logs` - Security audit trail

---

## 🔐 Default Admin Credentials
- **Email**: `admin@sthayuventures.com`
- **Password**: `SthayuAdmin2026!`
