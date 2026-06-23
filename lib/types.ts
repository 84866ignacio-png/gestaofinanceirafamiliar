export interface FamilyMember {
  id: string;
  name: string;
  role: "admin" | "child";
  avatar: string; // Emoji
  avatarColor: string; // Tailwind code
  pin: string;
  balance: number; // Child personal wallet
  allowance: number; // Monthly allowance
  participationType?: string; // e.g. "Pai" | "Mãe" | "Filho" | "Filha" or custom
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: "Alimentação" | "Moradia" | "Lazer" | "Transações" | "Educação" | "Transporte" | "Trabalho" | "Mesada" | "Outros" | "Metas de Poupança";
  type: "income" | "expense";
  date: string;
  member: string; // Member name who did it
  accountType?: "common" | "individual"; // Common Fund vs. Individual Profile Wallet
}

export interface Chore {
  id: string;
  title: string;
  reward: number;
  status: "available" | "pending_approval" | "completed";
  claimedBy?: string; // id of child
  claimedByName?: string;
  assignedTo?: string; // directed/assigned specifically to this member id
  assignedToName?: string;
  dueDate?: string;
}

export interface FamilyFinanceData {
  balance: number;
  budgetLimit: number;
  totalExpenses: number;
  goals: {
    travel: {
      current: number;
      target: number;
      title?: string;
      icon?: string;
    };
    emergency: {
      current: number;
      target: number;
      title?: string;
      icon?: string;
    };
    [key: string]: {
      current: number;
      target: number;
      title?: string;
      icon?: string;
    };
  };
  assets?: FamilyAsset[];
}

export interface FamilyAsset {
  id: string;
  name: string;
  type: "investment" | "real_estate" | "vehicle" | "cash_account" | "other";
  value: number;
  owner: string; // e.g. "Família" or a specific member name
  description?: string;
  updatedAt: string;
}
