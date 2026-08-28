import express from "express"
import cors from "cors"
import { config } from "./config"
import v1Router from "./routes/v1"
import { errorHandler } from "./middleware/errorHandler"

export function createApp() {
  const app = express()

  // 1. Middlewares
  app.use(cors({ origin: config.corsOrigin, credentials: true }))
  app.use(express.json({ limit: "2mb" }))
  app.use(express.urlencoded({ extended: true, limit: "2mb" }))

  // Request Logging
  app.use((req, _res, next) => {
    if (req.path.startsWith("/api")) {
      console.log(`[API] ${new Date().toISOString()} ${req.method} ${req.path}`)
    }
    next()
  })

  // 2. Health check route
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      service: "sthayu-ventures-backend",
      uptime: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    })
  })

  // 3. API V1 Routes
  app.use("/api/v1", v1Router)

  // 4. Global Error Handler
  app.use(errorHandler)

  return app
}

function startServer() {
  const app = createApp()
  const PORT = config.port

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`====================================================`)
    console.log(`  STHAYU VENTURES STANDALONE BACKEND SERVER`)
    console.log(`  Port: ${PORT}`)
    console.log(`  API Base: http://0.0.0.0:${PORT}/api/v1`)
    console.log(`  Environment: ${config.nodeEnv}`)
    console.log(`====================================================`)
  })
}

if (process.env.NODE_ENV !== "test") {
  startServer()
}
