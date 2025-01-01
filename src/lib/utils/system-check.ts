import { systemRequirements } from '../config';
const getSystemInfo = () => {
  // Browser-safe system info checks
  return {
    ram: navigator.deviceMemory || 4, // Falls back to 4GB if not supported
    cpu: navigator.hardwareConcurrency || 2, // Falls back to 2 cores if not supported
    node: process.version || 'v18.0.0', // Falls back to v18 in browser
  };
};

export const checkSystemRequirements = () => {
  const systemInfo = getSystemInfo();

  const checks = [
    {
      name: 'RAM',
      value: `${systemInfo.ram}GB`,
      minimum: systemRequirements.minimum.ram,
      recommended: systemRequirements.recommended.ram,
      pass: systemInfo.ram >= parseFloat(systemRequirements.minimum.ram),
    },
    {
      name: 'CPU Cores',
      value: systemInfo.cpu,
      minimum: systemRequirements.minimum.cpu,
      recommended: systemRequirements.recommended.cpu,
      pass: systemInfo.cpu >= parseInt(systemRequirements.minimum.cpu),
    },
    {
      name: 'Node.js Version',
      value: systemInfo.node,
      minimum: systemRequirements.minimum.node,
      recommended: systemRequirements.recommended.node,
      pass: parseInt(systemInfo.node.slice(1)) >= parseInt(systemRequirements.minimum.node),
    },
  ];

  return {
    pass: checks.every(check => check.pass),
    checks,
  };
};