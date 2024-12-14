export * from './system-parameters';
export * from './validation';

// System requirements
export const systemRequirements = {
  minimum: {
    ram: '512MB',
    storage: '1GB',
    cpu: '1 core',
    node: '18.x',
    npm: '8.x',
  },
  recommended: {
    ram: '2GB',
    storage: '5GB',
    cpu: '2 cores',
    node: '20.x',
    npm: '10.x',
  },
};