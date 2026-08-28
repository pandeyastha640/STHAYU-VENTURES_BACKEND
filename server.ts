import express from "express"
import path from "path"
import cors from "cors"
import { createServer as createViteServer } from "vite"
import { config } from "./server/config"
import v1Router from "./server/routes/v1"
import { errorHandler } from "./server/middleware/errorHandler"

async function startServer() {
  const app = express()
  const PORT = config.port

  // 1. Security & Core Middlewares
  app.use(cors({ origin: config.corsOrigin, credentials: true }))
  app.use(express.json({ limit: "2mb" }))
  app.use(express.urlencoded({ extended: true, limit: "2mb" }))

  // Request logger (minimal production format)
  app.use((req, _res, next) => {
    if (req.path.startsWith("/api")) {
      console.log(`[API] ${new Date().toISOString()} ${req.method} ${req.path}`)
    }
    next()
  })

  // 2. Health & Status Endpoints
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      service: "sthayu-production-backend",
      uptime: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    })
  })

  // 3. Mount Versioned API Routes (/api/v1/*)
  app.use("/api/v1", v1Router)

  // Global Error Handler for API routes
  app.use(errorHandler)

  // 4. Vite Middleware for Development / Static Serve for Production
  if (config.nodeEnv !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: "0.0.0.0", port: PORT },
      appType: "spa",
    })
    app.use(vite.middlewares)
  } else {
    const distPath = path.join(process.cwd(), "dist")
    app.use(express.static(distPath))
    app.get("*all", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"))
    })
  }

  // 5. Start Server
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`====================================================`)
    console.log(`  STHAYU VENTURES PRODUCTION BACKEND INITIALIZED`)
    console.log(`  URL: http://0.0.0.0:${PORT}`)
    console.log(`  API: http://0.0.0.0:${PORT}/api/v1`)
    console.log(`  Environment: ${config.nodeEnv}`)
    console.log(`====================================================`)
  })
}

startServer().catch((err) => {
  console.error("FATAL: Failed to start Sthayu server:", err)
  process.exit(1)
})
