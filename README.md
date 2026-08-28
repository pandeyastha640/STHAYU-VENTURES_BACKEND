# Sthayu Ventures | Autonomous Operating System Fabric

Production-grade integrated full-stack architecture combining:
1. **Frontend (`STHAYU-VENTURES-WEBSITE`)**: High-performance React 18 + Vite UI, Tailwind CSS, Lucide icons, responsive interactive modals for Consultations, Enterprise RFPs, and Lead Diagnostics.
2. **Backend (`STHAYU-VENTURES_BACKEND`)**: Standalone Express 5 + TypeScript microservice with Zod validation, JWT authentication, RBAC, sliding window rate-limiting, and AI Agent telemetry execution mesh.

---

## 🏛️ System Architecture

```
[ Client Browser / Mobile Web ]
            │
            ▼
[ Frontend: STHAYU-VENTURES-WEBSITE (React / Vite) ]
    ├── Hero & Value Matrix
    ├── Interactive 4-Agent Simulation Sandbox
    ├── 4-Step Operational Diagnostic & Blueprint Generator
    ├── Strategy Booking & Enterprise Contact Modals
    └── Protected Administrator Command Center
            │
            ▼ (HTTP / REST API - /api/v1)
[ Backend: STHAYU-VENTURES_BACKEND (Express / Node.js) ]
    ├── /api/v1/assessments   (Diagnostic & Blueprint Scoring)
    ├── /api/v1/bookings      (Consultation Scheduling)
    ├── /api/v1/contacts      (Enterprise RFP Intake)
    ├── /api/v1/agents        (Agent Mesh Registry & Execution)
    ├── /api/v1/workflows     (Automation Pipelines & Webhooks)
    ├── /api/v1/auth          (JWT Authentication & Session Management)
    ├── /api/v1/admin         (Protected Metrics, Leads & Logs)
    └── /api/v1/health        (Real-time Telemetry & Status)
```

---

## 🔐 Environment Setup

### Frontend & Unified Container (`.env.example`)
```env
PORT=3000
NODE_ENV=development
JWT_SECRET=your-secure-jwt-secret-key-at-least-32-chars
ADMIN_EMAIL=admin@sthayuventures.com
ADMIN_INITIAL_PASSWORD=SthayuAdmin2026!
DATABASE_URL=
EMAIL_PROVIDER_API_KEY=
NOTIFICATION_EMAIL=team@sthayuventures.com
FROM_EMAIL=notifications@sthayuventures.com
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=100
PUBLIC_FORM_RATE_LIMIT_MAX=10
CORS_ORIGIN=*
```

---

## 🧪 Verification & Automated Testing

- **Backend Unit & Service Suite**: `npx tsx server/tests/runTests.ts` (21 Tests Passing)
- **Live HTTP E2E Integration Suite**: `npx tsx server/tests/e2eIntegrationTest.ts` (17 Tests Passing)
- **Standalone Backend Test Suite**: `npx tsx STHAYU_VENTURES_BACKEND/tests/runTests.ts` (21 Tests Passing)

