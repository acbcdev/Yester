export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  department: string;
  createdAt: string;
  lastLogin?: string;
}

export interface Expense {
  id: string;
  userId: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  attachments?: string[];
  approvedBy?: string;
  approvedAt?: string;
}

export interface Resource {
  id: string;
  name: string;
  type: 'equipment' | 'material' | 'software' | 'other';
  status: 'available' | 'in-use' | 'maintenance' | 'retired';
  assignedTo?: string;
  location: string;
  purchaseDate: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
  cost: number;
}

export interface Credential {
  id: string;
  name: string;
  type: 'system' | 'application' | 'service' | 'other';
  username: string;
  encryptedPassword: string;
  url?: string;
  lastUpdated: string;
  expiresAt?: string;
  accessLevel: 'admin' | 'user' | 'readonly';
  sharedWith: string[];
}