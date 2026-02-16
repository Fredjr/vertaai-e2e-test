/**
 * Security Configuration
 * Centralized security settings for the application
 */

module.exports = {
  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'change-me-in-production',
    algorithm: 'HS256',
    expiresIn: '1h',
    issuer: 'vertaai-api',
  },

  // Password Policy
  password: {
    minLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    maxAge: 90, // days
    preventReuse: 5, // last N passwords
  },

  // Session Configuration
  session: {
    maxAge: 3600, // 1 hour
    maxConcurrent: 5, // max concurrent sessions per user
    absoluteTimeout: 86400, // 24 hours
    idleTimeout: 1800, // 30 minutes
  },

  // MFA Configuration
  mfa: {
    enabled: true,
    issuer: 'VertaAI',
    window: 1, // TOTP window
    backupCodesCount: 10,
  },

  // OAuth Providers
  oauth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    microsoft: {
      clientId: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      callbackURL: process.env.MICROSOFT_CALLBACK_URL,
    },
  },

  // Rate Limiting
  rateLimit: {
    login: {
      maxAttempts: 5,
      windowMs: 900000, // 15 minutes
      blockDuration: 3600000, // 1 hour
    },
    api: {
      maxRequests: 100,
      windowMs: 60000, // 1 minute
    },
  },

  // CORS Configuration
  cors: {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
    maxAge: 86400,
  },

  // Security Headers
  headers: {
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    csp: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
  },
};
