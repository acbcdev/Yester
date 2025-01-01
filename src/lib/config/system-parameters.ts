import { z } from 'zod';

export const SystemParameters = {
  // Wallet Configuration
  wallet: {
    maxWallets: 10,
    minInitialBalance: 0,
    maxInitialBalance: 1000000000,
    supportedCurrencies: ['EUR', 'USD', 'GBP', 'JPY', 'BTC', 'ETH'],
    transactionLimits: {
      min: 0.01,
      max: 1000000,
    },
  },

  // Password Security
  security: {
    password: {
      minLength: 8,
      maxLength: 128,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSymbols: true,
      saltRounds: 10,
    },
    session: {
      tokenExpiration: '24h',
      refreshTokenExpiration: '7d',
    },
  },

  // Resource Limits
  resources: {
    maxAttachmentSize: 10 * 1024 * 1024, // 10MB
    allowedFileTypes: ['pdf', 'jpg', 'png', 'doc', 'docx', 'xls', 'xlsx'],
    maxFilesPerTransaction: 5,
  },

  // Performance
  performance: {
    cacheTimeout: 300, // 5 minutes
    maxConcurrentRequests: 50,
    browserRequirements: {
      minMemory: 2, // GB
      minCores: 2,
    },
    rateLimiting: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 100,
    },
  }
};

// Validation Schemas
export const TransactionSchema = z.object({
  amount: z.number()
    .min(SystemParameters.wallet.transactionLimits.min)
    .max(SystemParameters.wallet.transactionLimits.max),
  currency: z.enum(SystemParameters.wallet.supportedCurrencies as [string, ...string[]]),
  description: z.string().min(1).max(255),
});

export const PasswordSchema = z.object({
  password: z.string()
    .min(SystemParameters.security.password.minLength)
    .max(SystemParameters.security.password.maxLength)
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character'),
});

export const FileUploadSchema = z.object({
  size: z.number().max(SystemParameters.resources.maxAttachmentSize),
  type: z.enum(SystemParameters.resources.allowedFileTypes as [string, ...string[]]),
});