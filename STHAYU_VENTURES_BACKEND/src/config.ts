import path from "path"

export const config = {
  port: parseInt(process.env.PORT || "4000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",
  
  // Security & Authentication
  jwtSecret: process.env.JWT_SECRET || "sthayu-production-jwt-secret-key-change-in-production-32x",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  adminEmail: process.env.ADMIN_EMAIL || "admin@sthayuventures.com",
  adminInitialPassword: process.env.ADMIN_INITIAL_PASSWORD || "SthayuAdmin2026!",

  // Database
  databaseUrl: process.env.DATABASE_URL || path.join(process.cwd(), "data", "sthayu_db.json"),

  // Notifications / Email
  emailProviderApiKey: process.env.EMAIL_PROVIDER_API_KEY || "",
  notificationEmail: process.env.NOTIFICATION_EMAIL || "team@sthayuventures.com",
  fromEmail: process.env.FROM_EMAIL || "notifications@sthayuventures.com",

  // Rate Limiting
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "60000", 10),
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "100", 10),
  publicFormRateLimitMax: parseInt(process.env.PUBLIC_FORM_RATE_LIMIT_MAX || "10", 10),

  // CORS
  corsOrigin: process.env.CORS_ORIGIN || "*",
}
