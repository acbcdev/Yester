import { SystemParameters } from './system-parameters';

export const validateConfiguration = () => {
  const validations = [
    {
      check: () => SystemParameters.wallet.maxWallets > 0,
      message: 'Maximum number of wallets must be positive',
    },
    {
      check: () => SystemParameters.wallet.maxInitialBalance > SystemParameters.wallet.minInitialBalance,
      message: 'Maximum initial balance must be greater than minimum',
    },
    {
      check: () => SystemParameters.security.password.maxLength >= SystemParameters.security.password.minLength,
      message: 'Maximum password length must be greater than or equal to minimum length',
    },
    {
      check: () => SystemParameters.resources.maxAttachmentSize > 0,
      message: 'Maximum attachment size must be positive',
    },
    {
      check: () => SystemParameters.performance.maxConcurrentRequests > 0,
      message: 'Maximum concurrent requests must be positive',
    },
  ];

  const failures = validations
    .filter(validation => !validation.check())
    .map(validation => validation.message);

  if (failures.length > 0) {
    throw new Error(`Configuration validation failed:\n${failures.join('\n')}`);
  }

  return true;
};