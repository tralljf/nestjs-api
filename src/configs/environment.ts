require('dotenv').config({
  path: `.env.${process.env.NODE_ENV ? process.env.NODE_ENV : 'development'}`,
});

export const environment = {
  elastic: {
    NodeUrl: process.env.ELASTIC_NODE,
  },
  fileName: () => `.env.${environment.name()}`,
  name: () => (process.env.NODE_ENV ? process.env.NODE_ENV : 'development'),

  isDevelopment: () => environment.name() == 'development',
  isProduction: () => environment.name() == 'production',
  isStaging: () => environment.name() == 'staging',
  isSandbox: () => environment.name() == 'sandbox',
  applicationName: 'core-crypto-conversion',
  ttl: {
    idempotency: parseInt(process.env.IDEMPOTENCY_TTL_SECONDS),
  },
};
