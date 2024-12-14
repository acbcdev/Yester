import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User, Expense, Resource, Credential } from '../types/enterprise';
import bcrypt from 'bcryptjs';

type EnterpriseStore = {
  users: User[];
  expenses: Expense[];
  resources: Resource[];
  credentials: Credential[];
  
  // User Management
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, data: Partial<User>) => void;
  removeUser: (id: string) => void;
  
  // Expense Management
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpenseStatus: (id: string, status: Expense['status'], approvedBy?: string) => void;
  removeExpense: (id: string) => void;
  
  // Resource Management
  addResource: (resource: Omit<Resource, 'id'>) => void;
  updateResourceStatus: (id: string, status: Resource['status'], assignedTo?: string) => void;
  removeResource: (id: string) => void;
  
  // Credential Management
  addCredential: (credential: Omit<Credential, 'id' | 'encryptedPassword' | 'lastUpdated'> & { password: string }) => void;
  updateCredential: (id: string, data: Partial<Omit<Credential, 'encryptedPassword'>> & { password?: string }) => void;
  removeCredential: (id: string) => void;
};

export const useEnterpriseStore = create<EnterpriseStore>()(
  persist(
    (set, get) => ({
      users: [],
      expenses: [],
      resources: [],
      credentials: [],

      // User Management
      addUser: (user) => {
        const newUser = {
          ...user,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          users: [...state.users, newUser],
        }));
      },

      updateUser: (id, data) => {
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? { ...user, ...data } : user
          ),
        }));
      },

      removeUser: (id) => {
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
        }));
      },

      // Expense Management
      addExpense: (expense) => {
        const newExpense = {
          ...expense,
          id: crypto.randomUUID(),
        };
        set((state) => ({
          expenses: [...state.expenses, newExpense],
        }));
      },

      updateExpenseStatus: (id, status, approvedBy) => {
        set((state) => ({
          expenses: state.expenses.map((expense) =>
            expense.id === id
              ? {
                  ...expense,
                  status,
                  ...(status === 'approved'
                    ? {
                        approvedBy,
                        approvedAt: new Date().toISOString(),
                      }
                    : {}),
                }
              : expense
          ),
        }));
      },

      removeExpense: (id) => {
        set((state) => ({
          expenses: state.expenses.filter((expense) => expense.id !== id),
        }));
      },

      // Resource Management
      addResource: (resource) => {
        const newResource = {
          ...resource,
          id: crypto.randomUUID(),
        };
        set((state) => ({
          resources: [...state.resources, newResource],
        }));
      },

      updateResourceStatus: (id, status, assignedTo) => {
        set((state) => ({
          resources: state.resources.map((resource) =>
            resource.id === id
              ? {
                  ...resource,
                  status,
                  assignedTo: status === 'in-use' ? assignedTo : undefined,
                }
              : resource
          ),
        }));
      },

      removeResource: (id) => {
        set((state) => ({
          resources: state.resources.filter((resource) => resource.id !== id),
        }));
      },

      // Credential Management
      addCredential: async (credential) => {
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(credential.password, salt);
        
        const newCredential = {
          ...credential,
          id: crypto.randomUUID(),
          encryptedPassword,
          lastUpdated: new Date().toISOString(),
        };
        
        set((state) => ({
          credentials: [...state.credentials, newCredential],
        }));
      },

      updateCredential: async (id, data) => {
        const salt = data.password ? await bcrypt.genSalt(10) : null;
        const encryptedPassword = data.password 
          ? await bcrypt.hash(data.password, salt!) 
          : undefined;

        set((state) => {
          const credentials = state.credentials.map((cred) => {
            if (cred.id !== id) return cred;
            
            const updates: Partial<Credential> = { ...data };
            if (encryptedPassword) {
              updates.encryptedPassword = encryptedPassword;
              updates.lastUpdated = new Date().toISOString();
            }
            
            return { ...cred, ...updates };
          });

          return { credentials };
        });
      },

      removeCredential: (id) => {
        set((state) => ({
          credentials: state.credentials.filter((cred) => cred.id !== id),
        }));
      },
    }),
    {
      name: 'enterprise-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useEnterpriseStore;