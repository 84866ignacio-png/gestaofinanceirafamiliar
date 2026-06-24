"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  Trash2,
  PiggyBank,
  UserPlus,
  LogOut,
  Lock,
  Unlock,
  Calendar,
  Sparkles,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  PlusCircle,
  X,
  Menu,
  ChevronRight,
  Shield,
  Briefcase,
  Layers,
  Award,
  BookOpen,
  Mail,
  Key,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
  Pencil,
  Settings,
  Globe,
  Coins,
  Users,
  ListFilter
} from "lucide-react";
import { FamilyMember, Transaction, Chore, FamilyFinanceData, FamilyAsset } from "@/lib/types";

// SEED DATA
const DEFAULT_MEMBERS: FamilyMember[] = [
  {
    id: "m-1",
    name: "Júlio (Pai)",
    role: "admin",
    avatar: "👨‍💼",
    avatarColor: "from-teal-600 to-emerald-500",
    pin: "1234",
    balance: 0.0,
    allowance: 0,
    participationType: "Pai",
  },
  {
    id: "m-2",
    name: "Janaína (Mãe)",
    role: "admin",
    avatar: "👩‍💼",
    avatarColor: "from-pink-600 to-rose-500",
    pin: "1234",
    balance: 0.0,
    allowance: 0,
    participationType: "Mãe",
  },
  {
    id: "m-3",
    name: "Júnior (Filho)",
    role: "child",
    avatar: "👦",
    avatarColor: "from-amber-500 to-yellow-400",
    pin: "5678",
    balance: 0.0,
    allowance: 150.0,
    participationType: "Filho",
  },
  {
    id: "m-4",
    name: "Tereza (Filha)",
    role: "child",
    avatar: "👧",
    avatarColor: "from-purple-600 to-violet-500",
    pin: "5678",
    balance: 0.0,
    allowance: 150.0,
    participationType: "Filha",
  },
];

const DEFAULT_TRANSACTIONS: Transaction[] = [];

const DEFAULT_CHORES: Chore[] = [];

const DEFAULT_FINANCE_DATA: FamilyFinanceData = {
  balance: 0.00,
  budgetLimit: 4000.00,
  totalExpenses: 0.00,
  goals: {
    travel: {
      current: 0.00,
      target: 8000.00,
    },
    emergency: {
      current: 0.00,
      target: 15000.00,
    },
  },
  assets: [],
  transfers: []
};

const DEMO_MEMBERS: FamilyMember[] = [
  {
    id: "m-1",
    name: "Júlio (Pai)",
    role: "admin",
    avatar: "👨‍💼",
    avatarColor: "from-teal-600 to-emerald-500",
    pin: "1234",
    balance: 1500.0,
    allowance: 0,
    participationType: "Pai",
  },
  {
    id: "m-2",
    name: "Janaína (Mãe)",
    role: "admin",
    avatar: "👩‍💼",
    avatarColor: "from-pink-600 to-rose-500",
    pin: "1234",
    balance: 1200.0,
    allowance: 0,
    participationType: "Mãe",
  },
  {
    id: "m-3",
    name: "Júnior (Filho)",
    role: "child",
    avatar: "👦",
    avatarColor: "from-amber-500 to-yellow-400",
    pin: "5678",
    balance: 82.5,
    allowance: 150.0,
    participationType: "Filho",
  },
  {
    id: "m-4",
    name: "Tereza (Filha)",
    role: "child",
    avatar: "👧",
    avatarColor: "from-purple-600 to-violet-500",
    pin: "5678",
    balance: 145.0,
    allowance: 150.0,
    participationType: "Filha",
  },
];

const DEMO_TRANSACTIONS: Transaction[] = [
  {
    id: "t-1",
    description: "Salário Júlio",
    amount: 6500.00,
    category: "Trabalho",
    type: "income",
    date: "05/06/2026",
    member: "Júlio (Pai)",
  },
  {
    id: "t-2",
    description: "Projetos Freelance Janaína",
    amount: 1200.00,
    category: "Trabalho",
    type: "income",
    date: "10/06/2026",
    member: "Janaína (Mãe)",
  },
  {
    id: "t-3",
    description: "Aluguel & Condomínio",
    amount: 1800.00,
    category: "Moradia",
    type: "expense",
    date: "12/06/2026",
    member: "Janaína (Mãe)",
  },
  {
    id: "t-4",
    description: "Supermercado Semanal",
    amount: 420.50,
    category: "Alimentação",
    type: "expense",
    date: "18/06/2026",
    member: "Júlio (Pai)",
  },
  {
    id: "t-5",
    description: "Cinema Fim de Semana",
    amount: 35.00,
    category: "Lazer",
    type: "expense",
    date: "19/06/2026",
    member: "Júnior (Filho)",
  },
];

const DEMO_CHORES: Chore[] = [
  {
    id: "c-1",
    title: "Lavar a louça do jantar",
    reward: 10.00,
    status: "available",
  },
  {
    id: "c-2",
    title: "Levar lixo e organizar quintal",
    reward: 15.00,
    status: "available",
  },
  {
    id: "c-3",
    title: "Pintar estante da garagem",
    reward: 45.00,
    status: "available",
  },
  {
    id: "c-4",
    title: "Organizar e dobrar roupas do guarda-roupa",
    reward: 20.00,
    status: "pending_approval",
    claimedBy: "m-3",
    claimedByName: "Júnior (Filho)",
  },
  {
    id: "c-5",
    title: "Tirar nota máxima em prova de Matemática",
    reward: 50.00,
    status: "completed",
    claimedBy: "m-4",
    claimedByName: "Tereza (Filha)",
  }
];

const DEMO_FINANCE_DATA: FamilyFinanceData = {
  balance: 5414.50,
  budgetLimit: 4000.00,
  totalExpenses: 2255.50,
  goals: {
    travel: {
      current: 4500.00,
      target: 8000.00,
    },
    emergency: {
      current: 12000.00,
      target: 15000.00,
    },
  },
  assets: [
    {
      id: "asset-1",
      name: "Apartamento Alugado (Belo Horizonte)",
      type: "real_estate",
      value: 320000.00,
      owner: "Família",
      description: "Apartamento de 2 quartos gerando renda mensal de aluguel.",
      updatedAt: "22/06/2026"
    },
    {
      id: "asset-2",
      name: "CDB Liquidez Diária (Banco Itaú)",
      type: "investment",
      value: 45000.00,
      owner: "Júlio (Pai)",
      description: "Rendimento de 100% do CDI, de alta liquidez para oportunidades.",
      updatedAt: "22/06/2026"
    },
    {
      id: "asset-3",
      name: "Veículo SUV Hyundai Creta",
      type: "vehicle",
      value: 95000.00,
      owner: "Família",
      description: "Carro principal de uso familiar de 2024.",
      updatedAt: "22/06/2026"
    },
    {
      id: "asset-4",
      name: "Ações Carteira Diversificada (B3)",
      type: "investment",
      value: 34000.00,
      owner: "Janaína (Mãe)",
      description: "Ações de dividendos e fundos imobiliários.",
      updatedAt: "22/06/2026"
    }
  ],
  transfers: [
    {
      id: "tr-1",
      date: "15/06/2026",
      time: "14:32:10",
      amount: 150.00,
      fromName: "Júlio (Pai)",
      goalTitle: "Viagem de Férias",
      type: "contribution"
    },
    {
      id: "tr-2",
      date: "18/06/2026",
      time: "09:15:45",
      amount: 50.00,
      fromName: "Lucas (Filho)",
      goalTitle: "Viagem de Férias",
      type: "contribution"
    },
    {
      id: "tr-3",
      date: "20/06/2026",
      time: "17:40:22",
      amount: 300.00,
      fromName: "Janaína (Mãe)",
      goalTitle: "Reserva de Emergência",
      type: "contribution"
    }
  ]
};


const translations = {
  "pt-BR": {
    dashboard: "Cofre Comum",
    chores: "Tarefas & Mesadas",
    analytics: "Análise Familiar",
    settings: "Configurações",
    welcome: "Seja bem-vindo de volta! Todo o progresso do lar é sincronizado em tempo real.",
    balance: "Fundo Comum da Família",
    budgetLimit: "Limite de Gastos Mensal",
    expenses: "Despesas Coletivas",
    recentTransactions: "Últimas Movimentações",
    familySavings: "Metas de Poupança Coletivas",
    individualSafes: "Cofres Individuais (Capacidade das Crianças)",
    availableBalance: "Valor Disponível",
    roleAdmin: "Administrador (Responsável)",
    roleChild: "Menor (Dependente)"
  },
  "en-US": {
    dashboard: "Common Treasury",
    chores: "Chores & Allowance",
    analytics: "Family Analysis",
    settings: "System Settings",
    welcome: "Welcome back! All household progress is synchronized in real-time.",
    balance: "Common Family Fund",
    budgetLimit: "Monthly Expenses Limit",
    expenses: "Collective Expenses",
    recentTransactions: "Recent Activity Log",
    familySavings: "Collective Savings Goals",
    individualSafes: "Individual Vaults (Kids Pocket Balance)",
    availableBalance: "Available Balance",
    roleAdmin: "Administrator (Parent)",
    roleChild: "Minor (Dependent)"
  },
  "es-ES": {
    dashboard: "Cofre Común",
    chores: "Tareas y Mesadas",
    analytics: "Análisis Familiar",
    settings: "Configuración",
    welcome: "¡Bienvenido de nuevo! Todo el progreso del hogar se sincroniza en tiempo real.",
    balance: "Fondo Común de la Familia",
    budgetLimit: "Límite de Gastos Mensual",
    expenses: "Gastos Colectivos",
    recentTransactions: "Últimas Actividades",
    familySavings: "Metas de Ahorro Colectivas",
    individualSafes: "Cofres Individuales (Saldo de Niños)",
    availableBalance: "Valor Disponible",
    roleAdmin: "Administrador (Responsable)",
    roleChild: "Menor (Dependiente)"
  }
};

export default function Page() {
  // STATE MANAGEMENT
  const [mounted, setMounted] = useState(false);

  const getAssetTypeIcon = (type: string) => {
    const found = assetCategories.find(cat => cat.id === type);
    return found ? found.icon : "📦";
  };

  const getAssetTypeLabel = (type: string) => {
    const found = assetCategories.find(cat => cat.id === type);
    return found ? found.name : "Outro Ativo";
  };
  const [systemLanguage, setSystemLanguage] = useState<"pt-BR" | "en-US" | "es-ES">("pt-BR");
  const t = translations[systemLanguage] || translations["pt-BR"];
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [chores, setChores] = useState<Chore[]>([]);
  const [financeData, setFinanceData] = useState<FamilyFinanceData>(DEFAULT_FINANCE_DATA);

  // Demo Mode and Monthly Filter States
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [periodMode, setPeriodMode] = useState<"all" | "monthly">("all");

  // Active login state
  const [activeMember, setActiveMember] = useState<FamilyMember | null>(null);
  const [loginStep, setLoginStep] = useState<"select_profile" | "enter_pin">("select_profile");
  const [selectedMemberForPin, setSelectedMemberForPin] = useState<FamilyMember | null>(null);
  const [pinInput, setPinInput] = useState<string>("");
  const [pinError, setPinError] = useState<string | null>(null);

  // Master Account Gate States
  const [isMasterLoggedIn, setIsMasterLoggedIn] = useState(false);
  const [portalView, setPortalView] = useState<"master_login" | "master_signup" | "master_recovery">("master_login");
  
  // Master Login inputs
  const [masterEmailInput, setMasterEmailInput] = useState("");
  const [masterPasswordInput, setMasterPasswordInput] = useState("");
  const [masterLoginError, setMasterLoginError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(true);
  const [showMasterPassword, setShowMasterPassword] = useState(false);

  // Master Signup inputs
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [signupFamilyName, setSignupFamilyName] = useState("");
  const [signupError, setSignupError] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  // Recovery & Password Reset inputs
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [recoveryStep, setRecoveryStep] = useState<"enter_email" | "enter_code" | "reset_password">("enter_email");
  const [sentCode, setSentCode] = useState(""); // 6-digit verification code
  const [recoveryError, setRecoveryError] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Simulated Inbox State to show sent reset emails to the user interactively
  const [simulatedEmail, setSimulatedEmail] = useState<{
    to: string;
    subject: string;
    body: string;
    code: string;
    active: boolean;
  } | null>(null);

  // New Profile form
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState<"admin" | "child">("child");
  const [newMemberPin, setNewMemberPin] = useState("");
  const [newMemberEmoji, setNewMemberEmoji] = useState("👦");
  const [newMemberColor, setNewMemberColor] = useState("from-teal-600 to-emerald-500");
  const [newMemberBalance, setNewMemberBalance] = useState("");
  const [newMemberAllowance, setNewMemberAllowance] = useState("");
  const [newMemberParticipationType, setNewMemberParticipationType] = useState("Filho");
  const [newMemberCustomParticipationType, setNewMemberCustomParticipationType] = useState("");

  // New Transaction form
  const [txDesc, setTxDesc] = useState("");
  const [txAmount, setTxAmount] = useState("");
  const [txType, setTxType] = useState<"income" | "expense" | "transfer">("expense");
  const [txCategory, setTxCategory] = useState<string>("Alimentação");
  const [txMemberId, setTxMemberId] = useState<string>("");
  const [txGoalKey, setTxGoalKey] = useState<"travel" | "emergency" | "">("");
  const [txAccountType, setTxAccountType] = useState<"common" | "individual">("common");

  // Budget Adjust state (For admin only)
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [newBudgetLimit, setNewBudgetLimit] = useState("");

  // Common Balance Adjust state (For admin only)
  const [showEditCommonBalanceModal, setShowEditCommonBalanceModal] = useState(false);
  const [editCommonBalanceValue, setEditCommonBalanceValue] = useState("");

  // Goal contribute modal
  const [showGoalModal, setShowGoalModal] = useState<string | null>(null);
  const [goalContribution, setGoalContribution] = useState("");

  // Gemini Smart Adviser State
  const [aiAdvice, setAiAdvice] = useState<string>("");
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [showAiModal, setShowAiModal] = useState(false);

  // Tab navigation for active session (for compact layout elements)
  const [activeTab, setActiveTab] = useState<"dashboard" | "chores" | "analytics" | "settings">("dashboard");

  // Ledger Filter States for Extrato Individualizado
  const [ledgerAccountType, setLedgerAccountType] = useState<"all" | "common" | "individual">("all");
  const [statementMemberId, setStatementMemberId] = useState<string>("");

  // Mobile sidebar drawer state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Chore CRUD States
  const [showChoreModal, setShowChoreModal] = useState(false);
  const [editingChore, setEditingChore] = useState<Chore | null>(null);
  const [choreFormTitle, setChoreFormTitle] = useState("");
  const [choreFormReward, setChoreFormReward] = useState("");
  const [choreFormAssignedTo, setChoreFormAssignedTo] = useState<string>("all");

  // Transaction Edit States (CRUD)
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);
  const [showEditTxModal, setShowEditTxModal] = useState(false);
  const [editTxDesc, setEditTxDesc] = useState("");
  const [editTxAmount, setEditTxAmount] = useState("");
  const [editTxType, setEditTxType] = useState<"income" | "expense">("expense");
  const [editTxCategory, setEditTxCategory] = useState<string>("Alimentação");
  const [editTxMember, setEditTxMember] = useState("");
  const [editTxGoalKey, setEditTxGoalKey] = useState<string>("");

  // Transaction date selectors & month navigators
  const [txDateInput, setTxDateInput] = useState<string>(new Date().toISOString().split("T")[0]);
  const [editTxDate, setEditTxDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [filterMonth, setFilterMonth] = useState<number>(6); // June
  const [filterYear, setFilterYear] = useState<number>(2026);

  const getTodayFormatted = () => {
    const d = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
  };

  const isTxInPeriod = (dateStr: string, m: number, y: number) => {
    if (!dateStr) return false;
    // YYYY-MM-DD
    if (dateStr.includes("-")) {
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        const yearPart = parseInt(parts[0], 10);
        const monthPart = parseInt(parts[1], 10);
        return yearPart === y && monthPart === m;
      }
    }
    // DD/MM/YYYY
    if (dateStr.includes("/")) {
      const parts = dateStr.split("/");
      if (parts.length === 3) {
        const monthPart = parseInt(parts[1], 10);
        const yearPart = parseInt(parts[2], 10);
        return yearPart === y && monthPart === m;
      }
    }
    return false;
  };

  const handlePrevMonth = () => {
    setFilterMonth((current) => {
      if (current === 1) {
        setFilterYear((y) => y - 1);
        return 12;
      }
      return current - 1;
    });
  };

  const handleNextMonth = () => {
    setFilterMonth((current) => {
      if (current === 12) {
        setFilterYear((y) => y + 1);
        return 1;
      }
      return current + 1;
    });
  };

  // System Language and Currency Settings
  const [systemCurrency, setSystemCurrency] = useState<string>("R$");

  // Settings Edit Member states
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
  const [editMemberName, setEditMemberName] = useState("");
  const [editMemberRole, setEditMemberRole] = useState<"admin" | "child">("child");
  const [editMemberPin, setEditMemberPin] = useState("");
  const [editMemberBalance, setEditMemberBalance] = useState("");
  const [editMemberAllowance, setEditMemberAllowance] = useState("");
  const [editMemberParticipationType, setEditMemberParticipationType] = useState("");
  const [editMemberCustomParticipationType, setEditMemberCustomParticipationType] = useState("");

  // Settings Goal Edit States (CRUD)
  const [editingGoalKey, setEditingGoalKey] = useState<string | null>(null);
  const [showAddGoalInline, setShowAddGoalInline] = useState(false);
  const [addGoalKey, setAddGoalKey] = useState("");
  const [addGoalTitle, setAddGoalTitle] = useState("");
  const [addGoalTarget, setAddGoalTarget] = useState("");
  const [addGoalIcon, setAddGoalIcon] = useState("🎯");
  
  const [editGoalTitle, setEditGoalTitle] = useState("");
  const [editGoalTarget, setEditGoalTarget] = useState("");
  const [editGoalIcon, setEditGoalIcon] = useState("");
  const [editGoalCurrent, setEditGoalCurrent] = useState("");

  // Settings Asset Edit States (CRUD)
  const [editingAssetId, setEditingAssetId] = useState<string | null>(null);
  const [showAddAssetInline, setShowAddAssetInline] = useState(false);
  const [addAssetName, setAddAssetName] = useState("");
  const [addAssetType, setAddAssetType] = useState<string>("investment");
  const [addAssetValue, setAddAssetValue] = useState("");
  const [addAssetOwner, setAddAssetOwner] = useState("Família");
  const [addAssetDescription, setAddAssetDescription] = useState("");

  const [editAssetName, setEditAssetName] = useState("");
  const [editAssetType, setEditAssetType] = useState<string>("investment");
  const [editAssetValue, setEditAssetValue] = useState("");
  const [editAssetOwner, setEditAssetOwner] = useState("");
  const [editAssetDescription, setEditAssetDescription] = useState("");

  // Demo Explanation Guide Modal state
  const [showDemoExplanationModal, setShowDemoExplanationModal] = useState(false);

  // Custom confirmation and success modal states for resetting system
  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);
  const [showResetSuccessModal, setShowResetSuccessModal] = useState(false);

  // Dynamic Categories States
  const [expenseCategories, setExpenseCategories] = useState<{ id: string; name: string; icon: string }[]>([
    { id: "Alimentação", name: "Alimentação", icon: "🍇" },
    { id: "Moradia", name: "Moradia", icon: "🏠" },
    { id: "Lazer", name: "Lazer", icon: "🍿" },
    { id: "Educação", name: "Educação", icon: "📖" },
    { id: "Transporte", name: "Transporte", icon: "🚗" },
    { id: "Outros", name: "Outros", icon: "⚙️" }
  ]);

  const [incomeCategories, setIncomeCategories] = useState<{ id: string; name: string; icon: string }[]>([
    { id: "Trabalho", name: "Salários", icon: "💼" },
    { id: "Outros", name: "Rendimentos/Outros", icon: "💰" }
  ]);

  const [assetCategories, setAssetCategories] = useState<{ id: string; name: string; icon: string }[]>([
    { id: "investment", name: "Investimento", icon: "📈" },
    { id: "real_estate", name: "Imóvel / Propriedade", icon: "🏡" },
    { id: "vehicle", name: "Veículo", icon: "🚗" },
    { id: "cash_account", name: "Conta Bancária", icon: "🏦" },
    { id: "other", name: "Outro Ativo", icon: "📦" }
  ]);

  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [editingCatType, setEditingCatType] = useState<"expense" | "income" | "asset" | null>(null);
  const [catFormName, setCatFormName] = useState("");
  const [catFormIcon, setCatFormIcon] = useState("");

  // Common Fund Admin & Dependent Management States
  const [showManageCommonFundModal, setShowManageCommonFundModal] = useState(false);
  const [commonFundActionType, setCommonFundActionType] = useState<"add" | "remove" | "adjust" | "transfer">("add");
  const [commonFundAmount, setCommonFundAmount] = useState("");
  const [commonFundDescription, setCommonFundDescription] = useState("");

  // Extrato Geral em Lista Search/Filter States
  const [statementSearch, setStatementSearch] = useState("");
  const [statementTypeFilter, setStatementTypeFilter] = useState<"all" | "income" | "expense">("all");
  const [statementCategoryFilter, setStatementCategoryFilter] = useState("all");

  // LOAD FROM LOCAL STORAGE (or set default seeded)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDemo = localStorage.getItem("gff_is_demo") === "true";

      const savedMembers = localStorage.getItem(isDemo ? "gff_demo_members" : "gff_members");
      const savedTxs = localStorage.getItem(isDemo ? "gff_demo_transactions" : "gff_transactions");
      const savedChores = localStorage.getItem(isDemo ? "gff_demo_chores" : "gff_chores");
      const savedFinance = localStorage.getItem(isDemo ? "gff_demo_finance" : "gff_finance");
      const savedMasterAccount = localStorage.getItem("gff_master_account");
      const savedMasterSession = localStorage.getItem("gff_master_session");

      setTimeout(() => {
        setIsDemoMode(isDemo);
        // Core data
        if (savedMembers) {
          setMembers(JSON.parse(savedMembers));
        } else {
          const initialMembers = isDemo ? DEMO_MEMBERS : DEFAULT_MEMBERS;
          setMembers(initialMembers);
          localStorage.setItem(isDemo ? "gff_demo_members" : "gff_members", JSON.stringify(initialMembers));
        }

        if (savedTxs) {
          setTransactions(JSON.parse(savedTxs));
        } else {
          const initialTxs = isDemo ? DEMO_TRANSACTIONS : DEFAULT_TRANSACTIONS;
          setTransactions(initialTxs);
          localStorage.setItem(isDemo ? "gff_demo_transactions" : "gff_transactions", JSON.stringify(initialTxs));
        }

        if (savedChores) {
          setChores(JSON.parse(savedChores));
        } else {
          const initialChores = isDemo ? DEMO_CHORES : DEFAULT_CHORES;
          setChores(initialChores);
          localStorage.setItem(isDemo ? "gff_demo_chores" : "gff_chores", JSON.stringify(initialChores));
        }

        if (savedFinance) {
          setFinanceData(JSON.parse(savedFinance));
        } else {
          const initialFinance = isDemo ? DEMO_FINANCE_DATA : DEFAULT_FINANCE_DATA;
          setFinanceData(initialFinance);
          localStorage.setItem(isDemo ? "gff_demo_finance" : "gff_finance", JSON.stringify(initialFinance));
        }

        const savedLang = localStorage.getItem("gff_language");
        const savedCurr = localStorage.getItem("gff_currency");
        if (savedLang) setSystemLanguage(savedLang as any);
        if (savedCurr) setSystemCurrency(savedCurr);

        const savedExpCats = localStorage.getItem(isDemo ? "gff_demo_exp_categories" : "gff_exp_categories");
        const savedIncCats = localStorage.getItem(isDemo ? "gff_demo_inc_categories" : "gff_inc_categories");
        const savedAssetCats = localStorage.getItem(isDemo ? "gff_demo_asset_categories" : "gff_asset_categories");
        if (savedExpCats) setExpenseCategories(JSON.parse(savedExpCats));
        if (savedIncCats) setIncomeCategories(JSON.parse(savedIncCats));
        if (savedAssetCats) setAssetCategories(JSON.parse(savedAssetCats));

        // Master account initialization
        if (!savedMasterAccount) {
          const defaultMaster = {
            email: "roberto.silva@email.com",
            password: "SenhaForte@2026",
            familyName: "Silva"
          };
          localStorage.setItem("gff_master_account", JSON.stringify(defaultMaster));
        }

        // Master session check
        if (savedMasterSession === "true") {
          setIsMasterLoggedIn(true);
        }

        setMounted(true);
      }, 0);
    }
  }, []);

  // Update localStorage helper
  const syncWithStorage = (
    updatedM: FamilyMember[],
    updatedT: Transaction[],
    updatedC: Chore[],
    updatedF: FamilyFinanceData
  ) => {
    setMembers(updatedM);
    setTransactions(updatedT);
    setChores(updatedC);
    setFinanceData(updatedF);

    const isDemo = localStorage.getItem("gff_is_demo") === "true";
    if (isDemo) {
      localStorage.setItem("gff_demo_members", JSON.stringify(updatedM));
      localStorage.setItem("gff_demo_transactions", JSON.stringify(updatedT));
      localStorage.setItem("gff_demo_chores", JSON.stringify(updatedC));
      localStorage.setItem("gff_demo_finance", JSON.stringify(updatedF));
    } else {
      localStorage.setItem("gff_members", JSON.stringify(updatedM));
      localStorage.setItem("gff_transactions", JSON.stringify(updatedT));
      localStorage.setItem("gff_chores", JSON.stringify(updatedC));
      localStorage.setItem("gff_finance", JSON.stringify(updatedF));
    }
  };

  const updateExpenseCategories = (cats: typeof expenseCategories) => {
    setExpenseCategories(cats);
    const isDemo = localStorage.getItem("gff_is_demo") === "true";
    localStorage.setItem(isDemo ? "gff_demo_exp_categories" : "gff_exp_categories", JSON.stringify(cats));
  };

  const updateIncomeCategories = (cats: typeof incomeCategories) => {
    setIncomeCategories(cats);
    const isDemo = localStorage.getItem("gff_is_demo") === "true";
    localStorage.setItem(isDemo ? "gff_demo_inc_categories" : "gff_inc_categories", JSON.stringify(cats));
  };

  const updateAssetCategories = (cats: typeof assetCategories) => {
    setAssetCategories(cats);
    const isDemo = localStorage.getItem("gff_is_demo") === "true";
    localStorage.setItem(isDemo ? "gff_demo_asset_categories" : "gff_asset_categories", JSON.stringify(cats));
  };

  const [newCatName, setNewCatName] = useState("");
  const [newCatIcon, setNewCatIcon] = useState("🏷️");

  const handleAddCategory = (type: "expense" | "income" | "asset") => {
    if (!newCatName.trim()) {
      alert("Por favor, digite um nome para a categoria.");
      return;
    }
    const newId = newCatName.trim();
    const newCat = { id: newId, name: newCatName.trim(), icon: newCatIcon };

    if (type === "expense") {
      if (expenseCategories.some(c => c.id === newId)) {
        alert("Esta categoria já existe!");
        return;
      }
      updateExpenseCategories([...expenseCategories, newCat]);
    } else if (type === "income") {
      if (incomeCategories.some(c => c.id === newId)) {
        alert("Esta categoria já existe!");
        return;
      }
      updateIncomeCategories([...incomeCategories, newCat]);
    } else {
      if (assetCategories.some(c => c.id === newId)) {
        alert("Esta categoria já existe!");
        return;
      }
      updateAssetCategories([...assetCategories, newCat]);
    }

    setNewCatName("");
    setNewCatIcon("🏷️");
  };

  const handleDeleteCategory = (type: "expense" | "income" | "asset", id: string) => {
    if (type === "expense") {
      if (expenseCategories.length <= 1) {
        alert("É necessário manter pelo menos uma categoria de gasto.");
        return;
      }
      updateExpenseCategories(expenseCategories.filter(c => c.id !== id));
    } else if (type === "income") {
      if (incomeCategories.length <= 1) {
        alert("É necessário manter pelo menos uma categoria de receita.");
        return;
      }
      updateIncomeCategories(incomeCategories.filter(c => c.id !== id));
    } else {
      if (assetCategories.length <= 1) {
        alert("É necessário manter pelo menos uma categoria de ativo.");
        return;
      }
      updateAssetCategories(assetCategories.filter(c => c.id !== id));
    }
  };

  const handleStartEditCategory = (type: "expense" | "income" | "asset", cat: { id: string; name: string; icon: string }) => {
    setEditingCatId(cat.id);
    setEditingCatType(type);
    setCatFormName(cat.name);
    setCatFormIcon(cat.icon);
  };

  const handleSaveEditCategory = () => {
    if (!catFormName.trim()) {
      alert("Nome não pode ser vazio.");
      return;
    }
    if (!editingCatId || !editingCatType) return;

    if (editingCatType === "expense") {
      const updated = expenseCategories.map(c => c.id === editingCatId ? { ...c, name: catFormName.trim(), icon: catFormIcon } : c);
      updateExpenseCategories(updated);
    } else if (editingCatType === "income") {
      const updated = incomeCategories.map(c => c.id === editingCatId ? { ...c, name: catFormName.trim(), icon: catFormIcon } : c);
      updateIncomeCategories(updated);
    } else {
      const updated = assetCategories.map(c => c.id === editingCatId ? { ...c, name: catFormName.trim(), icon: catFormIcon } : c);
      updateAssetCategories(updated);
    }

    setEditingCatId(null);
    setEditingCatType(null);
    setCatFormName("");
    setCatFormIcon("");
  };

  const performSystemReset = () => {
    // Apaga completamente os usuários, transações, tarefas, ativos, metas e fundo comum para começar do zero absoluto
    const emptyMembers: FamilyMember[] = [];
    const emptyTransactions: Transaction[] = [];
    const emptyChores: Chore[] = [];
    const emptyFinanceData: FamilyFinanceData = {
      balance: 0.00,
      budgetLimit: 0.00,
      totalExpenses: 0.00,
      goals: {
        travel: {
          current: 0.00,
          target: 0.00,
        },
        emergency: {
          current: 0.00,
          target: 0.00,
        },
      },
      assets: []
    };

    setMembers(emptyMembers);
    setTransactions(emptyTransactions);
    setChores(emptyChores);
    setFinanceData(emptyFinanceData);

    localStorage.setItem("gff_members", JSON.stringify(emptyMembers));
    localStorage.setItem("gff_transactions", JSON.stringify(emptyTransactions));
    localStorage.setItem("gff_chores", JSON.stringify(emptyChores));
    localStorage.setItem("gff_finance", JSON.stringify(emptyFinanceData));

    // Deselect selected profile
    setActiveMember(null);
    setLoginStep("select_profile");
    setSelectedMemberForPin(null);
    setActiveTab("dashboard");

    setShowResetConfirmModal(false);
    setShowResetSuccessModal(true);
  };

  const handleResetSystem = () => {
    setShowResetConfirmModal(true);
  };

  // HANDLERS
  const handleSelectProfile = (member: FamilyMember) => {
    setSelectedMemberForPin(member);
    setPinInput("");
    setPinError(null);
    setLoginStep("enter_pin");
  };

  const handlePinSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!selectedMemberForPin) return;

    if (pinInput === selectedMemberForPin.pin) {
      setActiveMember(selectedMemberForPin);
      setPinInput("");
      setPinError(null);
      // Automatically generate first advice when logging in
      triggerGetAiAdvice(selectedMemberForPin);
    } else {
      setPinError("Código PIN incorreto. Tente novamente.");
      setPinInput("");
    }
  };

  const handleLogout = () => {
    setActiveMember(null);
    setSelectedMemberForPin(null);
    setLoginStep("select_profile");
    setAiAdvice("");
    setAiError(null);
  };

  // PASSWORD AND EMAIL VALIDATORS
  const validatePasswordStrength = (pwd: string): string | null => {
    if (pwd.length < 8) {
      return "Para sua segurança, a senha deve ter pelo menos 8 caracteres.";
    }
    if (!/[A-Z]/.test(pwd)) {
      return "A senha deve conter pelo menos uma letra maiúscula (A-Z).";
    }
    if (!/[0-9]/.test(pwd)) {
      return "A senha deve conter pelo menos um número (0-9).";
    }
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?#]/;
    if (!specialChars.test(pwd)) {
      return "A senha deve conter pelo menos um caractere especial (ex: @, #, $, !, %).";
    }
    return null;
  };

  const validateEmailFormat = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // MASTER PORTAL AUTH COMPONENT HANDLERS
  const handleEnterDemoMode = () => {
    setMasterLoginError(null);
    setMasterEmailInput("");
    setMasterPasswordInput("");
    setIsMasterLoggedIn(true);
    setIsDemoMode(true);
    localStorage.setItem("gff_master_session", "true");
    localStorage.setItem("gff_is_demo", "true");

    // Write transient demo configs dynamically
    localStorage.setItem("gff_demo_members", JSON.stringify(DEMO_MEMBERS));
    localStorage.setItem("gff_demo_transactions", JSON.stringify(DEMO_TRANSACTIONS));
    localStorage.setItem("gff_demo_chores", JSON.stringify(DEMO_CHORES));
    localStorage.setItem("gff_demo_finance", JSON.stringify(DEMO_FINANCE_DATA));

    setMembers(DEMO_MEMBERS);
    setTransactions(DEMO_TRANSACTIONS);
    setChores(DEMO_CHORES);
    setFinanceData(DEMO_FINANCE_DATA);

    setShowDemoExplanationModal(true);
  };

  const handleMasterLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMasterLoginError(null);

    const email = masterEmailInput.trim();
    const password = masterPasswordInput;

    if (!email || !password) {
      setMasterLoginError("Por favor, preencha todos os campos do gestor.");
      return;
    }

    // Intercept test account for real non-demo testing area with pre-seeded data
    if (email.toLowerCase() === "teste@teste.com" && password === "1234") {
      setIsMasterLoggedIn(true);
      setIsDemoMode(false);
      localStorage.setItem("gff_is_demo", "false");
      if (rememberMe) {
        localStorage.setItem("gff_master_session", "true");
      } else {
        localStorage.removeItem("gff_master_session");
      }

      const hasSeeded = localStorage.getItem("gff_has_seeded_teste") === "true";
      if (!hasSeeded) {
        localStorage.setItem("gff_members", JSON.stringify(DEMO_MEMBERS));
        localStorage.setItem("gff_transactions", JSON.stringify(DEMO_TRANSACTIONS));
        localStorage.setItem("gff_chores", JSON.stringify(DEMO_CHORES));
        localStorage.setItem("gff_finance", JSON.stringify(DEMO_FINANCE_DATA));
        localStorage.setItem("gff_has_seeded_teste", "true");

        setMembers(DEMO_MEMBERS);
        setTransactions(DEMO_TRANSACTIONS);
        setChores(DEMO_CHORES);
        setFinanceData(DEMO_FINANCE_DATA);
      } else {
        // Load the existing real data
        const savedMembers = localStorage.getItem("gff_members");
        const savedTxs = localStorage.getItem("gff_transactions");
        const savedChores = localStorage.getItem("gff_chores");
        const savedFinance = localStorage.getItem("gff_finance");

        if (savedMembers) setMembers(JSON.parse(savedMembers));
        if (savedTxs) setTransactions(JSON.parse(savedTxs));
        if (savedChores) setChores(JSON.parse(savedChores));
        if (savedFinance) setFinanceData(JSON.parse(savedFinance));
      }

      // Pre-save master account of "teste@teste.com" so it's registered
      const testeAcct = {
        email: "teste@teste.com",
        password: "1234",
        familyName: "Teste"
      };
      localStorage.setItem("gff_master_account", JSON.stringify(testeAcct));

      setMasterEmailInput("");
      setMasterPasswordInput("");
      return;
    }

    const savedAccountStr = localStorage.getItem("gff_master_account");
    if (savedAccountStr) {
      const savedAccount = JSON.parse(savedAccountStr);
      if (savedAccount.email.toLowerCase() === email.toLowerCase() && savedAccount.password === password) {
        setIsMasterLoggedIn(true);
        if (rememberMe) {
          localStorage.setItem("gff_master_session", "true");
        } else {
          localStorage.removeItem("gff_master_session");
        }
        setMasterEmailInput("");
        setMasterPasswordInput("");
      } else {
        setMasterLoginError("E-mail ou senha de administrador inválidos.");
      }
    } else {
      // Fallback fallback default
      if (email.toLowerCase() === "roberto.silva@email.com" && password === "SenhaForte@2026") {
        setIsMasterLoggedIn(true);
        if (rememberMe) localStorage.setItem("gff_master_session", "true");
      } else {
        setMasterLoginError("Conta não encontrada. Cadastre uma nova conta.");
      }
    }
  };

  const handleMasterSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError(null);

    const email = signupEmail.trim();
    const password = signupPassword;
    const confirm = signupConfirmPassword;
    const name = signupFamilyName.trim();

    if (!email || !password || !confirm || !name) {
      setSignupError("Preencha todos os dados solicitados.");
      return;
    }

    if (!validateEmailFormat(email)) {
      setSignupError("O formato do e-mail inserido é inválido.");
      return;
    }

    const strengthError = validatePasswordStrength(password);
    if (strengthError) {
      setSignupError(strengthError);
      return;
    }

    if (password !== confirm) {
      setSignupError("As senhas digitadas não coincidem. Tente redigitar.");
      return;
    }

    // Save master account in state and local storage
    const newMasterAcct = {
      email: email,
      password: password,
      familyName: name
    };

    localStorage.setItem("gff_master_account", JSON.stringify(newMasterAcct));
    setSignupSuccess(true);
    
    // Clear signup state inputs
    setSignupEmail("");
    setSignupPassword("");
    setSignupConfirmPassword("");
    setSignupFamilyName("");

    // Automatically transition back to login view after successful registration delay
    setTimeout(() => {
      setPortalView("master_login");
      setSignupSuccess(false);
    }, 3000);
  };

  const handleSendRecoveryCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryError(null);

    const email = recoveryEmail.trim();
    if (!email) {
      setRecoveryError("Você deve preencher seu e-mail de cadastro.");
      return;
    }

    if (!validateEmailFormat(email)) {
      setRecoveryError("E-mail com formato incorreto.");
      return;
    }

    const savedAccountStr = localStorage.getItem("gff_master_account");
    let isMatch = false;

    if (savedAccountStr) {
      const savedAccount = JSON.parse(savedAccountStr);
      if (savedAccount.email.toLowerCase() === email.toLowerCase()) {
        isMatch = true;
      }
    } else if (email.toLowerCase() === "roberto.silva@email.com" || email.toLowerCase() === "teste@teste.com") {
      isMatch = true;
    }

    if (!isMatch) {
      setRecoveryError("Não encontramos nenhuma conta com o e-mail digitado.");
      return;
    }

    // Generate random 6-digit recovery code
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    setSentCode(generatedCode);
    setRecoveryStep("enter_code");

    // Launch beautiful simulated interactive email inbox on-screen
    setSimulatedEmail({
      to: email,
      subject: "🔒 Código de Recuperação da Conta - Gestão Financeira Familiar",
      code: generatedCode,
      body: `Prezado Gestor Familiar,\n\nRecebemos uma solicitação de redefinição de senha para o seu portal financeiro doméstico.\n\nSeu código de verificação seguro é: ${generatedCode}\n\nEste código é de uso exclusivo e deve ser mantido em segredo absoluto. Se você não solicitou esta redefinição, altere suas credenciais imediatamente no painel de controle.`,
      active: true
    });
  };

  const handleVerifyRecoveryCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryError(null);

    if (recoveryCode.trim() === sentCode) {
      setRecoveryStep("reset_password");
      setRecoveryCode("");
    } else {
      setRecoveryError("O código informado é incorreto. Verifique o alerta de e-mail enviado.");
    }
  };

  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryError(null);

    const pwd = newPassword;
    const confirm = confirmNewPassword;

    if (!pwd || !confirm) {
      setRecoveryError("Preencha e confirme a nova senha.");
      return;
    }

    const strengthError = validatePasswordStrength(pwd);
    if (strengthError) {
      setRecoveryError(strengthError);
      return;
    }

    if (pwd !== confirm) {
      setRecoveryError("As senhas não coincidem.");
      return;
    }

    // Update account with new password
    const savedAccountStr = localStorage.getItem("gff_master_account");
    let currentAccount = {
      email: "roberto.silva@email.com",
      password: "SenhaForte@2026",
      familyName: "Silva"
    };

    if (savedAccountStr) {
      currentAccount = JSON.parse(savedAccountStr);
    }

    currentAccount.password = pwd;
    localStorage.setItem("gff_master_account", JSON.stringify(currentAccount));

    // Clear and redirect on complete
    setNewPassword("");
    setConfirmNewPassword("");
    setRecoveryEmail("");
    setSentCode("");
    setRecoveryStep("enter_email");
    setSimulatedEmail(null); // Close email preview toast
    
    // Play a friendly notice back to login
    alert("Senha redefinida com sucesso! Você já pode entrar com sua nova senha.");
    setPortalView("master_login");
  };

  // Complete master account signout
  const handleMasterSignout = () => {
    setIsMasterLoggedIn(false);
    setActiveMember(null);
    setSelectedMemberForPin(null);
    setLoginStep("select_profile");
    setPortalView("master_login");
    localStorage.removeItem("gff_master_session");

    // Reset demo storage and restore standard user keys if exiting demo mode
    localStorage.removeItem("gff_is_demo");
    localStorage.removeItem("gff_demo_members");
    localStorage.removeItem("gff_demo_transactions");
    localStorage.removeItem("gff_demo_chores");
    localStorage.removeItem("gff_demo_finance");
    setIsDemoMode(false);

    // Reload standard user keys or fall back to default empty standard database
    const savedMembers = localStorage.getItem("gff_members");
    const savedTxs = localStorage.getItem("gff_transactions");
    const savedChores = localStorage.getItem("gff_chores");
    const savedFinance = localStorage.getItem("gff_finance");

    setMembers(savedMembers ? JSON.parse(savedMembers) : DEFAULT_MEMBERS);
    setTransactions(savedTxs ? JSON.parse(savedTxs) : DEFAULT_TRANSACTIONS);
    setChores(savedChores ? JSON.parse(savedChores) : DEFAULT_CHORES);
    setFinanceData(savedFinance ? JSON.parse(savedFinance) : DEFAULT_FINANCE_DATA);
  };

  const handleKeyPress = (num: string) => {
    if (pinInput.length < 4) {
      const newPin = pinInput + num;
      setPinInput(newPin);
      setPinError(null);
      // Auto-validate code when 4 keys are reached
      if (newPin.length === 4 && selectedMemberForPin) {
        if (newPin === selectedMemberForPin.pin) {
          setTimeout(() => {
            setActiveMember(selectedMemberForPin);
            setPinInput("");
            triggerGetAiAdvice(selectedMemberForPin);
          }, 200);
        } else {
          setTimeout(() => {
            setPinError("Código PIN incorreto. Tente novamente.");
            setPinInput("");
          }, 200);
        }
      }
    }
  };

  const handleBackspace = () => {
    setPinInput(pinInput.slice(0, -1));
    setPinError(null);
  };

  // ADD NEW MEMBER PROFILE
  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim() || !newMemberPin.trim()) return;

    const parsedBalance = parseFloat(newMemberBalance) || 0;
    const parsedAllowance = parseFloat(newMemberAllowance) || (newMemberRole === "child" ? 100 : 0);

    const resolvedParticipation = newMemberParticipationType === "Outro"
      ? newMemberCustomParticipationType.trim()
      : newMemberParticipationType;

    const newMember: FamilyMember = {
      id: "m-" + Date.now(),
      name: newMemberName,
      role: newMemberRole,
      avatar: newMemberEmoji,
      avatarColor: newMemberColor,
      pin: newMemberPin,
      balance: parsedBalance,
      allowance: newMemberRole === "child" ? parsedAllowance : 0,
      participationType: resolvedParticipation || (newMemberRole === "admin" ? "Pai" : "Filho"),
    };

    const updatedM = [...members, newMember];
    syncWithStorage(updatedM, transactions, chores, financeData);

    setNewMemberName("");
    setNewMemberPin("");
    setNewMemberBalance("");
    setNewMemberAllowance("");
    setNewMemberEmoji("👦");
    setNewMemberParticipationType("Filho");
    setNewMemberCustomParticipationType("");
    setShowAddMemberModal(false);
  };

  // ADD TRANSACTION
  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txDesc.trim() || !txAmount) return;

    const amountNum = parseFloat(txAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    // Determine who made it
    const actingMemberId = txMemberId || activeMember?.id || "";
    const actingMember = members.find(m => m.id === actingMemberId) || activeMember;
    const authorName = actingMember ? actingMember.name : "Desconhecido";

    // Set custom description when category is Metas de Poupança
    let finalDesc = txDesc;
    if (txCategory === "Metas de Poupança") {
      const prefix = txType === "expense" ? "Reserva" : "Resgate";
      const goalText = (financeData.goals as Record<string, any>)[txGoalKey]?.title || (txGoalKey === "travel" ? "Viagem" : txGoalKey === "emergency" ? "Emergência" : txGoalKey);
      finalDesc = `[${prefix}: ${goalText}] ` + txDesc;
    }

    let formattedDate = "";
    if (txDateInput) {
      const parts = txDateInput.split("-"); // [YYYY, MM, DD]
      if (parts.length === 3) {
        formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
    }
    if (!formattedDate) {
      formattedDate = getTodayFormatted();
    }

    if (txType === "transfer") {
      const actingMemberId = txMemberId || activeMember?.id || "";
      const targetMember = members.find(m => m.id === actingMemberId) || activeMember;
      if (!targetMember) {
        alert("Membro de origem não encontrado.");
        return;
      }

      if (amountNum > targetMember.balance) {
        alert(`O saldo individual de ${targetMember.name} (R$ ${targetMember.balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}) é insuficiente para esta transferência.`);
        return;
      }

      // Deduct from the member's individual balance
      const newMembers = members.map(m => {
        if (m.id === targetMember.id) {
          return { ...m, balance: m.balance - amountNum };
        }
        return m;
      });

      // Add to common fund balance
      const newFamilyBalance = financeData.balance + amountNum;
      const updatedFinance = {
        ...financeData,
        balance: newFamilyBalance,
      };

      // Create transaction log in General Ledger
      const transferTx: Transaction = {
        id: "tx-transfer-" + Date.now(),
        description: `[Transferência para Fundo Comum] De: ${targetMember.name} | Motivo: ${txDesc.trim() || "Contribuição voluntária"}`,
        amount: amountNum,
        category: "Transferência",
        type: "income", // Enters common fund
        date: formattedDate,
        member: targetMember.name,
        accountType: "common"
      };

      const updatedTxs = [transferTx, ...transactions];
      syncWithStorage(newMembers, updatedTxs, chores, updatedFinance);

      // Reset Form
      setTxDesc("");
      setTxAmount("");
      setTxCategory("Alimentação");
      setTxType("expense");
      setTxGoalKey("");
      setTxAccountType("common");
      setTxDateInput(new Date().toISOString().split("T")[0]);
      return;
    }

    const newTx: Transaction = {
      id: "tx-" + Date.now(),
      description: finalDesc,
      amount: amountNum,
      category: txCategory as any,
      type: txType,
      date: formattedDate,
      member: authorName,
      accountType: txCategory === "Metas de Poupança" ? "common" : txAccountType,
    };

    // Update Finance Balances
    let newFamilyBalance = financeData.balance;
    let newExpensesTotal = financeData.totalExpenses;
    let newMembers = [...members];
    let updatedFinance = { ...financeData };

    if (txCategory === "Metas de Poupança") {
      if (!txGoalKey) {
        alert("Por favor, selecione qual meta de poupança deseja associar.");
        return;
      }

      const currentGoalData = (financeData.goals as Record<string, any>)[txGoalKey];
      const goalName = currentGoalData?.title || (txGoalKey === "travel" ? "Viagem" : txGoalKey === "emergency" ? "Emergência" : txGoalKey);

      // Create goal transfer log
      const now = new Date();
      const pad2 = (n: number) => n.toString().padStart(2, "0");
      const timeStr = `${pad2(now.getHours())}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())}`;

      const newTransfer = {
        id: "tr-" + Date.now(),
        date: formattedDate,
        time: timeStr,
        amount: amountNum,
        fromName: authorName,
        goalTitle: goalName,
        type: txType === "expense" ? ("contribution" as const) : ("rescue" as const)
      };

      if (txType === "expense") {
        // Contribution (expense)
        if (amountNum > financeData.balance) {
          alert("Valor insuficiente no Saldo do Cofre Comum.");
          return;
        }

        const newCurrent = Math.min(currentGoalData.target, currentGoalData.current + amountNum);
        newFamilyBalance = financeData.balance - amountNum;
        newExpensesTotal = financeData.totalExpenses + amountNum;

        updatedFinance = {
          ...financeData,
          balance: newFamilyBalance,
          totalExpenses: newExpensesTotal,
          goals: {
            ...financeData.goals,
            [txGoalKey]: {
              ...currentGoalData,
              current: newCurrent
            }
          },
          transfers: [newTransfer, ...(financeData.transfers || [])]
        };
      } else {
        // Rescue / Withdrawal (income)
        if (amountNum > currentGoalData.current) {
          alert(`Valor de resgate excede o saldo acumulado da meta (${goalName}: R$ ${currentGoalData.current.toFixed(2)}).`);
          return;
        }

        const newCurrent = Math.max(0, currentGoalData.current - amountNum);
        newFamilyBalance = financeData.balance + amountNum;

        updatedFinance = {
          ...financeData,
          balance: newFamilyBalance,
          goals: {
            ...financeData.goals,
            [txGoalKey]: {
              ...currentGoalData,
              current: newCurrent
            }
          },
          transfers: [newTransfer, ...(financeData.transfers || [])]
        };
      }
    } else {
      // Standard transaction
      if (txAccountType === "common") {
        if (txType === "income") {
          newFamilyBalance += amountNum;
        } else {
          newFamilyBalance -= amountNum;
          newExpensesTotal += amountNum;
        }
      } else {
        // Individual wallet transaction
        newMembers = members.map(m => {
          if (m.id === actingMemberId) {
            const currentBal = m.balance;
            const updatedBal = txType === "income" 
              ? currentBal + amountNum 
              : Math.max(0, currentBal - amountNum);
            return { ...m, balance: updatedBal };
          }
          return m;
        });
        if (txType === "expense") {
          newExpensesTotal += amountNum;
        }
      }

      updatedFinance = {
        ...financeData,
        balance: newFamilyBalance,
        totalExpenses: newExpensesTotal,
      };
    }

    const updatedTxs = [newTx, ...transactions];
    syncWithStorage(newMembers, updatedTxs, chores, updatedFinance);

    // Reset Form
    setTxDesc("");
    setTxAmount("");
    setTxCategory("Alimentação");
    setTxType("expense");
    setTxGoalKey("");
    setTxAccountType("common");
    setTxDateInput(new Date().toISOString().split("T")[0]);
  };

  // DELETE TRANSACTION
  const handleDeleteTransaction = (id: string) => {
    // Only administrators can delete core logs
    if (activeMember?.role !== "admin") return;

    const targetTx = transactions.find(t => t.id === id);
    if (!targetTx) return;

    let newFamilyBalance = financeData.balance;
    let newExpensesTotal = financeData.totalExpenses;
    let updatedGoals = { ...financeData.goals };
    let newMembers = [...members];

    if (targetTx.category === "Metas de Poupança") {
      let key = null;
      for (const gKey of Object.keys(financeData.goals)) {
        const goalData = (financeData.goals as Record<string, any>)[gKey];
        const title = goalData.title || (gKey === "travel" ? "Viagem" : gKey === "emergency" ? "Emergência" : gKey);
        if (targetTx.description.includes(title) || targetTx.description.toLowerCase().includes(gKey.toLowerCase())) {
          key = gKey;
          break;
        }
      }
      if (!key) {
        const isTravel = targetTx.description.includes("Viagem") || targetTx.description.includes("travel");
        const isEmergency = targetTx.description.includes("Emergência") || targetTx.description.includes("emergency");
        key = isTravel ? "travel" : (isEmergency ? "emergency" : null);
      }

      if (key && (financeData.goals as Record<string, any>)[key]) {
        const currentGoalData = (financeData.goals as Record<string, any>)[key];
        if (targetTx.type === "expense") {
          // Revert allocation/contribution: subtract from goal, return to common balance
          const newCurrent = Math.max(0, currentGoalData.current - targetTx.amount);
          (updatedGoals as Record<string, any>)[key] = {
            ...currentGoalData,
            current: newCurrent
          };
          newFamilyBalance += targetTx.amount;
          newExpensesTotal = Math.max(0, newExpensesTotal - targetTx.amount);
        } else {
          // Revert rescue/withdrawal: add back to goal, subtract from common balance
          const newCurrent = Math.min(currentGoalData.target, currentGoalData.current + targetTx.amount);
          (updatedGoals as Record<string, any>)[key] = {
            ...currentGoalData,
            current: newCurrent
          };
          newFamilyBalance = Math.max(0, newFamilyBalance - targetTx.amount);
        }
      }
    } else {
      // Standard transaction
      const isIndividual = targetTx.accountType === "individual";
      if (!isIndividual) {
        if (targetTx.type === "income") {
          newFamilyBalance = Math.max(0, newFamilyBalance - targetTx.amount);
        } else {
          newFamilyBalance += targetTx.amount;
          newExpensesTotal = Math.max(0, newExpensesTotal - targetTx.amount);
        }
      } else {
        // Individual wallet transaction
        newMembers = members.map(m => {
          if (m.name === targetTx.member) {
            if (targetTx.type === "income") {
              return { ...m, balance: Math.max(0, m.balance - targetTx.amount) };
            } else {
              return { ...m, balance: m.balance + targetTx.amount };
            }
          }
          return m;
        });
        if (targetTx.type === "expense") {
          newExpensesTotal = Math.max(0, newExpensesTotal - targetTx.amount);
        }
      }
    }

    const updatedTxs = transactions.filter(t => t.id !== id);
    const updatedFinance = {
      ...financeData,
      balance: newFamilyBalance,
      totalExpenses: Math.max(0, newExpensesTotal),
      goals: updatedGoals,
    };

    syncWithStorage(newMembers, updatedTxs, chores, updatedFinance);
  };

  // ADJUST BUDGET (ADMIN ONLY)
  const handleUpdateBudget = (e: React.FormEvent) => {
    e.preventDefault();
    const limitNum = parseFloat(newBudgetLimit);
    if (isNaN(limitNum) || limitNum <= 0) return;

    const updatedFinance = {
      ...financeData,
      budgetLimit: limitNum,
    };

    syncWithStorage(members, transactions, chores, updatedFinance);
    setShowBudgetModal(false);
    setNewBudgetLimit("");
  };

  // ADJUST COMMON TREASURY BALANCE (ADMIN ONLY)
  const handleUpdateCommonBalance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeMember || activeMember.role !== "admin") return;
    const balanceNum = parseFloat(editCommonBalanceValue);
    if (isNaN(balanceNum) || balanceNum < 0) {
      alert("Por favor, digite um valor de saldo válido e positivo.");
      return;
    }

    const previousBalance = financeData.balance;
    const updatedFinance = {
      ...financeData,
      balance: balanceNum,
    };

    // Log this system balance adjustment as a manual transaction
    const difference = Math.abs(balanceNum - previousBalance);
    if (difference > 0) {
      const adjustmentTx: Transaction = {
        id: `tx-adjust-${Date.now()}`,
        description: `Ajuste administrativo do Cofre Comum: de ${systemCurrency} ${previousBalance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} para ${systemCurrency} ${balanceNum.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
        amount: difference,
        type: balanceNum > previousBalance ? "income" : "expense",
        category: "Ajuste",
        date: getTodayFormatted(),
        member: activeMember.name,
        accountType: "common"
      };
      syncWithStorage(members, [adjustmentTx, ...transactions], chores, updatedFinance);
    } else {
      syncWithStorage(members, transactions, chores, updatedFinance);
    }

    setShowEditCommonBalanceModal(false);
    setEditCommonBalanceValue("");
  };

  const handleZeroCommonFund = () => {
    if (!activeMember || activeMember.role !== "admin") return;
    
    const confirmZero = window.confirm("Tem certeza de que deseja zerar completamente o Fundo Comum Familiar? Esta ação não pode ser desfeita.");
    if (!confirmZero) return;

    const previousBalance = financeData.balance;
    const updatedFinance = {
      ...financeData,
      balance: 0.00,
    };

    if (previousBalance > 0) {
      const adjustmentTx: Transaction = {
        id: `tx-zero-${Date.now()}`,
        description: `Zera Fundo Comum Familiar pelo administrador (${activeMember.name})`,
        amount: previousBalance,
        type: "expense",
        category: "Outros",
        date: new Date().toLocaleDateString("pt-BR"),
        member: activeMember.name,
        accountType: "common"
      };
      syncWithStorage(members, [adjustmentTx, ...transactions], chores, updatedFinance);
    } else {
      syncWithStorage(members, transactions, chores, updatedFinance);
    }
  };

  // CONTRIBUTE TO GOALS
  const handleContributeGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showGoalModal) return;

    const amountNum = parseFloat(goalContribution);
    if (isNaN(amountNum) || amountNum <= 0) {
      alert("Valor inválido.");
      return;
    }

    const isChild = activeMember?.role === "child";
    const availableBalance = isChild ? activeMember.balance : financeData.balance;

    if (amountNum > availableBalance) {
      alert(isChild ? "Saldo pessoal insuficiente em seu cofre." : "Saldo da família insuficiente.");
      return;
    }

    const key = showGoalModal;
    const currentGoalData = (financeData.goals as Record<string, any>)[key];
    const newCurrent = Math.min(currentGoalData.target, currentGoalData.current + amountNum);

    let updatedFinance = { ...financeData };
    let updatedMembers = [...members];

    if (isChild) {
      // Deduct from child's personal balance
      updatedMembers = members.map(m => {
        if (m.id === activeMember.id) {
          return { ...m, balance: m.balance - amountNum };
        }
        return m;
      });

      // Update active member state as well
      setActiveMember(prev => prev ? { ...prev, balance: prev.balance - amountNum } : null);

      updatedFinance = {
        ...financeData,
        goals: {
          ...financeData.goals,
          [key]: {
            ...currentGoalData,
            current: newCurrent,
          }
        }
      };
    } else {
      // Deduct from family main balance
      updatedFinance = {
        ...financeData,
        goals: {
          ...financeData.goals,
          [key]: {
            ...currentGoalData,
            current: newCurrent,
          }
        },
        balance: financeData.balance - amountNum,
      };
    }

    // Create a transaction record representing this saving goal allocation
    const goalTitle = currentGoalData?.title || (key === "travel" ? "Viagem" : "Emergência");
    const todayStr = getTodayFormatted();

    const newTx: Transaction = {
      id: "tx-g-" + Date.now(),
      description: `[Reserva: ${goalTitle}] Contribuição de ${activeMember?.name || "Membro"}`,
      amount: amountNum,
      category: "Metas de Poupança",
      type: "expense",
      date: todayStr,
      member: activeMember?.name || "Família",
      accountType: isChild ? "individual" : "common",
    };

    // Create goal transfer log
    const now = new Date();
    const pad2 = (n: number) => n.toString().padStart(2, "0");
    const timeStr = `${pad2(now.getHours())}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())}`;

    const newTransfer = {
      id: "tr-" + Date.now(),
      date: todayStr,
      time: timeStr,
      amount: amountNum,
      fromName: activeMember?.name || "Membro",
      goalTitle: goalTitle,
      type: "contribution" as const
    };

    updatedFinance = {
      ...updatedFinance,
      transfers: [newTransfer, ...(financeData.transfers || [])]
    };

    const updatedTxs = [newTx, ...transactions];
    syncWithStorage(updatedMembers, updatedTxs, chores, updatedFinance);

    setShowGoalModal(null);
    setGoalContribution("");
  };

  // DELETE PROFILE/MEMBER (ADMIN ONLY)
  const handleDeleteMember = (memberId: string) => {
    if (!activeMember || activeMember.role !== "admin") return;
    if (activeMember.id === memberId) {
      alert("Você não pode excluir o seu próprio perfil ativo enquanto está conectado!");
      return;
    }
    if (window.confirm("Deseja realmente excluir este perfil? Todas as tarefas e limites associados serão perdidos.")) {
      const updatedM = members.filter(m => m.id !== memberId);
      syncWithStorage(updatedM, transactions, chores, financeData);
    }
  };

  // SAVE MEMBER CHANGES (ADMIN ONLY)
  const handleSaveEditMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember || !activeMember || activeMember.role !== "admin") return;

    const allowanceNum = parseFloat(editMemberAllowance);
    const balanceNum = parseFloat(editMemberBalance);
    if (!editMemberName.trim() || !editMemberPin.trim() || isNaN(allowanceNum) || isNaN(balanceNum)) {
      alert("Por favor, preencha todos os campos com valores válidos.");
      return;
    }

    const resolvedParticipation = editMemberParticipationType === "Outro"
      ? editMemberCustomParticipationType.trim()
      : editMemberParticipationType;

    const oldMember = members.find(m => m.id === editingMember.id);
    const updatedM = members.map(m => {
      if (m.id === editingMember.id) {
        return {
          ...m,
          name: editMemberName.trim(),
          role: editMemberRole,
          pin: editMemberPin.trim(),
          balance: balanceNum,
          allowance: editMemberRole === "child" ? allowanceNum : 0,
          participationType: resolvedParticipation || (editMemberRole === "admin" ? "Pai" : "Filho"),
        };
      }
      return m;
    });

    let updatedTxs = transactions;
    if (oldMember && oldMember.balance !== balanceNum) {
      const difference = balanceNum - oldMember.balance;
      const adjustTx: Transaction = {
        id: "tx-member-adjust-" + Date.now(),
        description: `[Ajuste de Saldo] Alteração manual da carteira individual de ${oldMember.name}. Antigo: R$ ${oldMember.balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} | Novo: R$ ${balanceNum.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
        amount: Math.abs(difference),
        category: "Outros",
        type: difference > 0 ? "income" : "expense",
        date: getTodayFormatted(),
        member: activeMember.name,
        accountType: "individual"
      };
      updatedTxs = [adjustTx, ...transactions];
    }

    // Sync active member state if changed
    if (activeMember.id === editingMember.id) {
      const updatedActive = updatedM.find(m => m.id === activeMember.id);
      if (updatedActive) {
        setActiveMember(updatedActive);
      }
    }

    syncWithStorage(updatedM, updatedTxs, chores, financeData);
    setEditingMember(null);
  };

  // ADD SAVINGS GOAL (ADMIN ONLY)
  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeMember || activeMember.role !== "admin") return;

    const targetNum = parseFloat(addGoalTarget);
    if (!addGoalTitle.trim() || isNaN(targetNum) || targetNum <= 0) {
      alert("Preencha o título e um valor de meta válido.");
      return;
    }

    const newKey = addGoalKey.trim() ? addGoalKey.trim().toLowerCase().replace(/\s+/g, "_") : "goal_" + Date.now();
    
    // Check if key already exists
    if ((financeData.goals as Record<string, any>)[newKey]) {
      alert("Já existe uma meta com este identificador. Escolha outro título.");
      return;
    }

    const updatedFinance = {
      ...financeData,
      goals: {
        ...financeData.goals,
        [newKey]: {
          current: 0,
          target: targetNum,
          title: addGoalTitle.trim(),
          icon: addGoalIcon || "🎯"
        }
      }
    };

    syncWithStorage(members, transactions, chores, updatedFinance);
    setAddGoalKey("");
    setAddGoalTitle("");
    setAddGoalTarget("");
    setAddGoalIcon("🎯");
    setShowAddGoalInline(false);
  };

  // SAVE EDIT GOAL (ADMIN ONLY)
  const handleSaveEditGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGoalKey || !activeMember || activeMember.role !== "admin") return;

    const targetNum = parseFloat(editGoalTarget);
    const currentNum = parseFloat(editGoalCurrent);
    if (!editGoalTitle.trim() || isNaN(targetNum) || targetNum <= 0 || isNaN(currentNum) || currentNum < 0) {
      alert("Preencha valores válidos para o título, meta e saldo acumulado.");
      return;
    }

    const prevGoalData = (financeData.goals as Record<string, any>)[editingGoalKey];
    const prevCurrent = prevGoalData ? prevGoalData.current : 0;
    const difference = currentNum - prevCurrent;

    let updatedBalance = financeData.balance;
    const updatedTxs = [...transactions];

    if (difference !== 0) {
      if (difference > 0) {
        if (difference > financeData.balance) {
          alert(`Saldo insuficiente no Cofre Comum para incrementar o saldo da meta diretamente. Faltam ${systemCurrency} ${(difference - financeData.balance).toFixed(2)}.`);
          return;
        }
        updatedBalance = financeData.balance - difference;
      } else {
        updatedBalance = financeData.balance + Math.abs(difference);
      }

      const title = editGoalTitle.trim();
      const adjustTx: Transaction = {
        id: `tx-g-adjust-${Date.now()}`,
        description: `[Ajuste de Meta: ${title}] Reajuste de reserva de ${systemCurrency} ${prevCurrent.toFixed(2)} para ${systemCurrency} ${currentNum.toFixed(2)}`,
        amount: Math.abs(difference),
        category: "Metas de Poupança",
        type: difference > 0 ? "expense" : "income",
        date: new Date().toLocaleDateString("pt-BR"),
        member: activeMember.name,
        accountType: "common"
      };
      updatedTxs.unshift(adjustTx);
    }

    const updatedFinance = {
      ...financeData,
      balance: updatedBalance,
      goals: {
        ...financeData.goals,
        [editingGoalKey]: {
          ...prevGoalData,
          title: editGoalTitle.trim(),
          target: targetNum,
          current: currentNum,
          icon: editGoalIcon || "🎯"
        }
      }
    };

    syncWithStorage(members, updatedTxs, chores, updatedFinance);
    setEditingGoalKey(null);
  };

  // DELETE SAVINGS GOAL WITH AUTOMATIC COMMON TREASURY REFUND
  const handleDeleteGoal = (keyToDelete: string) => {
    if (!activeMember || activeMember.role !== "admin") return;

    if (window.confirm("Deseja realmente apagar esta meta de poupança coletiva? Todo o saldo de capital acumulado nela será devolvido automaticamente ao saldo do Cofre Comum.")) {
      const goalToDelete = (financeData.goals as Record<string, any>)[keyToDelete];
      const refundAmt = goalToDelete ? goalToDelete.current : 0;

      const newGoals = { ...financeData.goals } as Record<string, any>;
      delete newGoals[keyToDelete];

      const updatedFinance = {
        ...financeData,
        balance: financeData.balance + refundAmt,
        goals: newGoals
      };

      // Register refund transaction
      const refundTx: Transaction = {
        id: "tx-g-refund-" + Date.now(),
        description: `[Restituição: ${goalToDelete?.title || keyToDelete}] Devolução de saldo ao Cofre Comum por exclusão de meta`,
        amount: refundAmt,
        category: "Disparadores Extraordinários" as any,
        type: "income",
        date: getTodayFormatted(),
        member: activeMember.name,
      };

      const updatedTxs = [refundTx, ...transactions];
      syncWithStorage(members, updatedTxs, chores, updatedFinance as any);
    }
  };

  // CREATE ASSET (ADMIN ONLY)
  const handleCreateAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeMember || activeMember.role !== "admin") return;

    const valNum = parseFloat(addAssetValue);
    if (!addAssetName.trim() || isNaN(valNum) || valNum < 0) {
      alert("Preencha o nome do patrimônio e um valor válido.");
      return;
    }

    const newAsset: FamilyAsset = {
      id: "asset-" + Date.now(),
      name: addAssetName.trim(),
      type: addAssetType,
      value: valNum,
      owner: addAssetOwner || "Família",
      description: addAssetDescription.trim(),
      updatedAt: getTodayFormatted()
    };

    const currentAssets = financeData.assets || [];
    const updatedFinance: FamilyFinanceData = {
      ...financeData,
      assets: [...currentAssets, newAsset]
    };

    const newTx: Transaction = {
      id: "tx-asset-create-" + Date.now(),
      description: `[Patrimônio Criado: ${newAsset.name}] Novo ativo cadastrado (${newAsset.owner})`,
      amount: newAsset.value,
      category: "Ativos & Patrimônio",
      type: "income",
      date: getTodayFormatted(),
      member: activeMember.name,
      accountType: "common"
    };

    const updatedTxs = [newTx, ...transactions];

    syncWithStorage(members, updatedTxs, chores, updatedFinance);
    
    // Reset form states
    setAddAssetName("");
    setAddAssetType("investment");
    setAddAssetValue("");
    setAddAssetOwner("Família");
    setAddAssetDescription("");
    setShowAddAssetInline(false);
  };

  // SAVE EDIT ASSET (ADMIN ONLY)
  const handleSaveEditAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAssetId || !activeMember || activeMember.role !== "admin") return;

    const valNum = parseFloat(editAssetValue);
    if (!editAssetName.trim() || isNaN(valNum) || valNum < 0) {
      alert("Preencha o nome do patrimônio e um valor válido.");
      return;
    }

    const currentAssets = financeData.assets || [];
    let oldAsset: FamilyAsset | undefined;
    const updatedAssets = currentAssets.map(asset => {
      if (asset.id === editingAssetId) {
        oldAsset = asset;
        return {
          ...asset,
          name: editAssetName.trim(),
          type: editAssetType,
          value: valNum,
          owner: editAssetOwner || "Família",
          description: editAssetDescription.trim(),
          updatedAt: getTodayFormatted()
        };
      }
      return asset;
    });

    const updatedFinance: FamilyFinanceData = {
      ...financeData,
      assets: updatedAssets
    };

    let updatedTxs = transactions;
    if (oldAsset) {
      const difference = valNum - oldAsset.value;
      let desc = "";
      let txType: "income" | "expense" = "income";
      if (difference > 0) {
        desc = `[Patrimônio Atualizado: ${editAssetName.trim()}] Revalorização do ativo (${editAssetOwner}). Antigo: R$ ${oldAsset.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} | Novo: R$ ${valNum.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
        txType = "income";
      } else if (difference < 0) {
        desc = `[Patrimônio Atualizado: ${editAssetName.trim()}] Depreciação do ativo (${editAssetOwner}). Antigo: R$ ${oldAsset.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} | Novo: R$ ${valNum.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
        txType = "expense";
      } else {
        desc = `[Patrimônio Atualizado: ${editAssetName.trim()}] Alteração cadastral do ativo (${editAssetOwner})`;
        txType = "income";
      }

      const newTx: Transaction = {
        id: "tx-asset-update-" + Date.now(),
        description: desc,
        amount: Math.abs(difference) || 0,
        category: "Ativos & Patrimônio",
        type: txType,
        date: getTodayFormatted(),
        member: activeMember.name,
        accountType: "common"
      };
      updatedTxs = [newTx, ...transactions];
    }

    syncWithStorage(members, updatedTxs, chores, updatedFinance);
    setEditingAssetId(null);
  };

  // DELETE ASSET (ADMIN ONLY)
  const handleDeleteAsset = (idToDelete: string) => {
    if (!activeMember || activeMember.role !== "admin") return;

    if (window.confirm("Deseja realmente excluir este item de patrimônio familiar?")) {
      const currentAssets = financeData.assets || [];
      const deletedAsset = currentAssets.find(asset => asset.id !== idToDelete); // wait, find the one with id === idToDelete! Let's be careful! Let's use find(asset => asset.id === idToDelete)
      const assetToFind = currentAssets.find(asset => asset.id === idToDelete);
      const updatedAssets = currentAssets.filter(asset => asset.id !== idToDelete);

      const updatedFinance: FamilyFinanceData = {
        ...financeData,
        assets: updatedAssets
      };

      let updatedTxs = transactions;
      if (assetToFind) {
        const newTx: Transaction = {
          id: "tx-asset-delete-" + Date.now(),
          description: `[Patrimônio Excluído: ${assetToFind.name}] Ativo removido do controle (${assetToFind.owner})`,
          amount: assetToFind.value,
          category: "Ativos & Patrimônio",
          type: "expense",
          date: getTodayFormatted(),
          member: activeMember.name,
          accountType: "common"
        };
        updatedTxs = [newTx, ...transactions];
      }

      syncWithStorage(members, updatedTxs, chores, updatedFinance);
    }
  };

  // CHANGE SYSTEM CONFIGS (LANGUAGE AND CURRENCY)
  const handleChangeLanguage = (lang: "pt-BR" | "en-US" | "es-ES") => {
    setSystemLanguage(lang);
    localStorage.setItem("gff_language", lang);
  };

  const handleChangeCurrency = (curr: string) => {
    setSystemCurrency(curr);
    localStorage.setItem("gff_currency", curr);
  };

  // CLAIM A CHORE (CHILD OR ADMIN)
  const handleClaimChore = (choreId: string) => {
    if (!activeMember) return;

    const targetChore = chores.find(c => c.id === choreId);
    if (!targetChore) return;

    if (activeMember.role === "admin") {
      // Admin flow: instantly approve and reward themselves!
      const reward = targetChore.reward;
      if (financeData.balance < reward) {
        alert("O saldo da família é insuficiente para pagar esta recompensa no momento.");
        return;
      }

      const updatedChores = chores.map(c => {
        if (c.id === choreId) {
          return {
            ...c,
            status: "completed" as const,
            claimedBy: activeMember.id,
            claimedByName: activeMember.name,
          };
        }
        return c;
      });

      const updatedFinance = {
        ...financeData,
        balance: financeData.balance - reward,
      };

      const updatedMembers = members.map(m => {
        if (m.id === activeMember.id) {
          return { ...m, balance: m.balance + reward };
        }
        return m;
      });

      const adminName = activeMember.name;
      setTimeout(() => {
        const newTx: Transaction = {
          id: "tx-c-" + Date.now(),
          description: `🏆 Tarefa Concluída (Adm): ${targetChore.title}`,
          amount: reward,
          category: "Mesada",
          type: "expense",
          date: getTodayFormatted(),
          member: adminName,
        };

        // Instantly sync activeMember visual balance too
        setActiveMember(prev => prev ? { ...prev, balance: prev.balance + reward } : null);

        syncWithStorage(updatedMembers, [newTx, ...transactions], updatedChores, updatedFinance);
      }, 0);
    } else {
      // Child flow (pending approval)
      if (financeData.balance < targetChore.reward) {
        alert("O valor será pago assim que houver saldo disponível pelo administrador");
      }

      const updatedChores = chores.map(c => {
        if (c.id === choreId) {
          return {
            ...c,
            status: "pending_approval" as const,
            claimedBy: activeMember.id,
            claimedByName: activeMember.name,
          };
        }
        return c;
      });

      syncWithStorage(members, transactions, updatedChores, financeData);
    }
  };

  // APPROVE A CHORE (ADMIN ONLY)
  const handleApproveChore = (choreId: string) => {
    if (!activeMember || activeMember.role !== "admin") return;

    const choreInput = chores.find(c => c.id === choreId);
    if (!choreInput || !choreInput.claimedBy) return;

    // Mark chore completed, deduct from family balance and credit child's personal bank wallet
    const updatedChores = chores.map(c => {
      if (c.id === choreId) {
        return { ...c, status: "completed" as const };
      }
      return c;
    });

    const reward = choreInput.reward;
    const childId = choreInput.claimedBy;

    // Deduct family treasury balance & add to child wallet balance
    const updatedFinance = {
      ...financeData,
      balance: financeData.balance - reward,
    };

    const updatedMembers = members.map(m => {
      if (m.id === childId) {
        return { ...m, balance: m.balance + reward };
      }
      return m;
    });

    // Create transaction log
    const newTx: Transaction = {
      id: "tx-c-" + Date.now(),
      description: `Bônus Tarefa: ${choreInput.title}`,
      amount: reward,
      category: "Mesada",
      type: "expense",
      date: getTodayFormatted(),
      member: choreInput.claimedByName || "Filho",
    };

    const updatedTxs = [newTx, ...transactions];
    syncWithStorage(updatedMembers, updatedTxs, updatedChores, updatedFinance);
  };

  // OPEN CHORE MODAL (ADMIN ONLY OR GENERAL CHORE MANAGEMENT)
  const handleOpenChoreModal = (chore: Chore | null = null) => {
    if (chore) {
      setEditingChore(chore);
      setChoreFormTitle(chore.title);
      setChoreFormReward(chore.reward.toString());
      setChoreFormAssignedTo(chore.assignedTo || "all");
    } else {
      setEditingChore(null);
      setChoreFormTitle("");
      setChoreFormReward("");
      setChoreFormAssignedTo("all");
    }
    setShowChoreModal(true);
  };

  // SAVE CHORE CREATE/UPDATE (ADMIN ONLY)
  const handleSaveChore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeMember || activeMember.role !== "admin") return;

    const parsedReward = parseFloat(choreFormReward);
    if (!choreFormTitle || isNaN(parsedReward) || parsedReward <= 0) return;

    let updatedChores: Chore[];

    const assignedMember = members.find(m => m.id === choreFormAssignedTo);

    if (editingChore) {
      // Edit mode
      updatedChores = chores.map(c => {
        if (c.id === editingChore.id) {
          return {
            ...c,
            title: choreFormTitle,
            reward: parsedReward,
            assignedTo: choreFormAssignedTo !== "all" ? choreFormAssignedTo : undefined,
            assignedToName: choreFormAssignedTo !== "all" ? (assignedMember?.name || "Filho") : undefined,
          };
        }
        return c;
      });
    } else {
      // Create mode
      const newChore: Chore = {
        id: "c-" + Date.now(),
        title: choreFormTitle,
        reward: parsedReward,
        status: "available",
        assignedTo: choreFormAssignedTo !== "all" ? choreFormAssignedTo : undefined,
        assignedToName: choreFormAssignedTo !== "all" ? (assignedMember?.name || "Filho") : undefined,
      };
      updatedChores = [...chores, newChore];
    }

    syncWithStorage(members, transactions, updatedChores, financeData);
    setShowChoreModal(false);
    setEditingChore(null);
    setChoreFormTitle("");
    setChoreFormReward("");
    setChoreFormAssignedTo("all");
  };

  // DELETE CHORE (ADMIN ONLY)
  const handleDeleteChore = (choreId: string) => {
    if (!activeMember || activeMember.role !== "admin") return;
    if (window.confirm("Deseja realmente excluir esta tarefa?")) {
      const updatedChores = chores.filter(c => c.id !== choreId);
      syncWithStorage(members, transactions, updatedChores, financeData);
    }
  };

  // OPEN TRANSACTION EDIT MODAL (ADMIN ONLY)
  const handleOpenEditTxModal = (tx: Transaction) => {
    if (!activeMember || activeMember.role !== "admin") return;
    setEditingTx(tx);
    // Sanitize the bracketed prefix out of description for easier editing
    setEditTxDesc(tx.description.replace(/^\[(Reserva|Resgate):\s*(.*?)?\]\s*/, ""));
    setEditTxAmount(tx.amount.toString());
    setEditTxType(tx.type);
    setEditTxCategory(tx.category);
    setEditTxMember(tx.member);

    // Parse specific date format DD/MM/YYYY with fallback YYYY-MM-DD
    if (tx.date && tx.date.includes("/")) {
      const parts = tx.date.split("/"); // [DD, MM, YYYY]
      if (parts.length === 3) {
        setEditTxDate(`${parts[2]}-${parts[1]}-${parts[0]}`);
      }
    } else if (tx.date && tx.date.includes("-")) {
      setEditTxDate(tx.date);
    } else {
      setEditTxDate(new Date().toISOString().split("T")[0]);
    }

    // Parse the goal key
    let goalKey = "";
    if (tx.category === "Metas de Poupança") {
      for (const gKey of Object.keys(financeData.goals)) {
        const goalData = (financeData.goals as Record<string, any>)[gKey];
        const title = goalData.title || (gKey === "travel" ? "Viagem" : gKey === "emergency" ? "Emergência" : gKey);
        if (tx.description.includes(title) || tx.description.toLowerCase().includes(gKey.toLowerCase())) {
          goalKey = gKey;
          break;
        }
      }
      if (!goalKey) {
        if (tx.description.includes("Viagem") || tx.description.includes("travel")) {
          goalKey = "travel";
        } else if (tx.description.includes("Emergência") || tx.description.includes("emergency")) {
          goalKey = "emergency";
        }
      }
    }
    setEditTxGoalKey(goalKey);
    setShowEditTxModal(true);
  };

  // SAVE TRANSACTION EDIT (ADMIN ONLY)
  const handleSaveEditTx = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeMember || activeMember.role !== "admin" || !editingTx) return;

    const amountNum = parseFloat(editTxAmount);
    if (!editTxDesc.trim() || isNaN(amountNum) || amountNum <= 0) return;

    // 1. Revert previous transaction impacts on balance, limits, goals
    let tempBalance = financeData.balance;
    let tempExpenses = financeData.totalExpenses;
    let tempGoals = { ...financeData.goals };

    if (editingTx.category === "Metas de Poupança") {
      let key = null;
      for (const gKey of Object.keys(financeData.goals)) {
        const goalData = (financeData.goals as Record<string, any>)[gKey];
        const title = goalData.title || (gKey === "travel" ? "Viagem" : gKey === "emergency" ? "Emergência" : gKey);
        if (editingTx.description.includes(title) || editingTx.description.toLowerCase().includes(gKey.toLowerCase())) {
          key = gKey;
          break;
        }
      }
      if (!key) {
        const isTravel = editingTx.description.includes("Viagem") || editingTx.description.includes("travel");
        const isEmergency = editingTx.description.includes("Emergência") || editingTx.description.includes("emergency");
        key = isTravel ? "travel" : (isEmergency ? "emergency" : null);
      }

      if (key && (tempGoals as Record<string, any>)[key]) {
        const goalData = (tempGoals as Record<string, any>)[key];
        if (editingTx.type === "expense") {
          (tempGoals as Record<string, any>)[key] = {
            ...goalData,
            current: Math.max(0, goalData.current - editingTx.amount)
          };
          tempBalance += editingTx.amount;
          tempExpenses = Math.max(0, tempExpenses - editingTx.amount);
        } else {
          (tempGoals as Record<string, any>)[key] = {
            ...goalData,
            current: Math.min(goalData.target, goalData.current + editingTx.amount)
          };
          tempBalance = Math.max(0, tempBalance - editingTx.amount);
        }
      }
    } else {
      if (editingTx.type === "income") {
        tempBalance -= editingTx.amount;
      } else {
        tempBalance += editingTx.amount;
        tempExpenses = Math.max(0, tempExpenses - editingTx.amount);
      }
    }

    // 2. Apply the newly edited transaction impacts
    let finalDesc = editTxDesc.trim();
    if (editTxCategory === "Metas de Poupança") {
      if (!editTxGoalKey) {
        alert("Por favor, selecione qual meta de poupança deseja associar.");
        return;
      }
      const prefix = editTxType === "expense" ? "Reserva" : "Resgate";
      const goalDataInst = (tempGoals as Record<string, any>)[editTxGoalKey] || (financeData.goals as Record<string, any>)[editTxGoalKey];
      const goalText = goalDataInst?.title || (editTxGoalKey === "travel" ? "Viagem" : "Emergência");
      finalDesc = `[${prefix}: ${goalText}] ` + finalDesc;

      const currentGoalData = (tempGoals as Record<string, any>)[editTxGoalKey];
      if (editTxType === "expense") {
        if (amountNum > tempBalance) {
          alert("Valor insuficiente no Saldo do Cofre Comum após reverter o lançamento original.");
          return;
        }
        (tempGoals as Record<string, any>)[editTxGoalKey] = {
          ...currentGoalData,
          current: Math.min(currentGoalData.target, currentGoalData.current + amountNum)
        };
        tempBalance -= amountNum;
        tempExpenses += amountNum;
      } else {
        if (amountNum > currentGoalData.current) {
          alert(`Valor de resgate excede o saldo acumulado da meta (${goalText} atual: R$ ${currentGoalData.current.toFixed(2)}).`);
          return;
        }
        (tempGoals as Record<string, any>)[editTxGoalKey] = {
          ...currentGoalData,
          current: Math.max(0, currentGoalData.current - amountNum)
        };
        tempBalance += amountNum;
      }
    } else {
      if (editTxType === "income") {
        tempBalance += amountNum;
      } else {
        tempBalance -= amountNum;
        tempExpenses += amountNum;
      }
    }

    let formattedEditDate = "";
    if (editTxDate) {
      const parts = editTxDate.split("-");
      if (parts.length === 3) {
        formattedEditDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
    }
    if (!formattedEditDate) {
      formattedEditDate = editingTx.date || getTodayFormatted();
    }

    // Construct the updated transaction object
    const updatedTx: Transaction = {
      ...editingTx,
      description: finalDesc,
      amount: amountNum,
      category: editTxCategory as any,
      type: editTxType,
      date: formattedEditDate,
      member: editTxMember || editingTx.member
    };

    // Replace the transaction
    const updatedTxs = transactions.map(t => t.id === editingTx.id ? updatedTx : t);

    const updatedFinance = {
      ...financeData,
      balance: tempBalance,
      totalExpenses: tempExpenses,
      goals: tempGoals
    };

    syncWithStorage(members, updatedTxs, chores, updatedFinance);
    setEditingTx(null);
    setShowEditTxModal(false);
  };

  // GET AI SMART FINANCIAL ADVICE
  const triggerGetAiAdvice = async (memberToUse?: FamilyMember) => {
    const member = memberToUse || activeMember;
    if (!member) return;

    setLoadingAi(true);
    setAiError(null);

    try {
      const response = await fetch("/api/finance-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          familyData: financeData,
          transactions: transactions.slice(0, 10), // Send last 10 transactions
          activeMember: member,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setAiAdvice(data.advice);
      } else {
        setAiError(data.error || "Ocorreu um erro ao obter conselhos financeiros.");
      }
    } catch (err: any) {
      console.error(err);
      setAiError("Falha na conexão com o conselheiro de IA.");
    } finally {
      setLoadingAi(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-medium">Carregando ambiente seguro...</p>
        </div>
      </div>
    );
  }

  // RENDER LOGIN PORTAL
  if (!activeMember) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-0 md:p-8 font-sans selection:bg-indigo-100 selection:text-indigo-900">
        <div className="w-full max-w-[1100px] min-h-screen md:min-h-[700px] bg-white flex flex-col md:flex-row overflow-hidden md:rounded-3xl shadow-2xl md:border md:border-slate-100/80">
          
          {/* Left Section: Visual & Value Proposition */}
          <div className="md:w-7/12 bg-indigo-600 relative p-8 md:p-14 flex flex-col justify-between text-white overflow-hidden min-h-[360px] md:min-h-0">
            {/* Abstract Pattern Background */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8 md:mb-10">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md">
                  <div className="w-5 h-5 bg-indigo-600 rounded-sm transform rotate-45"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl md:text-2xl font-black tracking-tight italic leading-none">Gestão Financeira Familiar</span>
                  <span className="text-[10px] uppercase font-bold text-indigo-200 mt-1 tracking-widest">Cooperação Familiar</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 md:mb-6">
                Simplificando as <br/> finanças de quem <br/> você mais ama.
              </h1>
              <p className="text-indigo-100 text-sm md:text-base max-w-md leading-relaxed">
                Acompanhe gastos, defina metas para as próximas férias e gerencie a mesada das crianças em um só lugar de maneira lúdica e inteligente.
              </p>
            </div>

            {/* Interactive Mini-Dashboard Mockup */}
            <div className="relative z-10 mt-6 md:mt-8 bg-white/10 backdrop-blur-md rounded-3xl p-5 md:p-6 border border-white/20 shadow-2xl">
              <div className="flex justify-between items-center mb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-50">Resumo do Mês</span>
                <span className="bg-emerald-400 text-slate-900 text-[10px] px-2.5 py-0.5 rounded-full font-bold">+12.5% p.m.</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-indigo-200 text-[11px] mb-0.5">Economia Acumulada</p>
                    <p className="text-xl md:text-2xl font-black">R$ 14.250,00</p>
                  </div>
                  <div className="flex gap-1 items-end">
                    <div className="w-2 h-6 bg-white/20 rounded-full"></div>
                    <div className="w-2 h-10 bg-white/20 rounded-full"></div>
                    <div className="w-2 h-12 bg-white/40 rounded-full"></div>
                    <div className="w-2 h-8 bg-white/60 rounded-full"></div>
                    <div className="w-2.5 h-16 bg-indigo-300 rounded-full"></div>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <div className="flex justify-between items-center text-[11px] text-indigo-100 mb-2 font-semibold">
                    <span>Meta Familiar: Viagem de Férias ✈️</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full">
                    <div className="w-3/4 h-full bg-rose-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 text-[10px] text-indigo-200 flex gap-6 mt-6 md:mt-0">
              <span>© 2026 Gestão Financeira Familiar Inc.</span>
              <span>Ambiente de Alta Segurança SSL 256-bit</span>
            </div>
          </div>

          {/* Right Section: Master Gate / Profile Selection Code */}
          <div className="md:w-5/12 bg-white flex flex-col justify-center p-6 md:p-12 relative border-t md:border-t-0 md:border-l border-slate-100">
            <div className="max-w-sm w-full mx-auto flex flex-col justify-between h-full py-2">
              
              {/* Conditional Title segment depending on state */}
              <div className="mb-6 md:mb-8">
                {!isMasterLoggedIn ? (
                  <>
                    {portalView === "master_login" && (
                      <>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
                          Portal Família 🛡️
                        </h2>
                        <p className="text-slate-500 text-xs md:text-sm mt-1">
                          Entre na conta principal do gestor para gerenciar o cofre virtual comum.
                        </p>
                      </>
                    )}
                    {portalView === "master_signup" && (
                      <>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                          Registrar Família ✨
                        </h2>
                        <p className="text-slate-500 text-xs md:text-sm mt-1">
                          Crie a conta do responsável administrativo do lar para iniciar sua jornada.
                        </p>
                      </>
                    )}
                    {portalView === "master_recovery" && (
                      <>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                          Recuperar Acesso 🔒
                        </h2>
                        <p className="text-slate-500 text-xs md:text-sm mt-1">
                          Certifique seu e-mail administrativo para redefinir a senha com segurança.
                        </p>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                      Acesso Familiar Casa
                    </h2>
                    <p className="text-slate-500 text-xs md:text-sm mt-1">
                      Selecione um membro do portal e informe o código PIN pessoal de acesso.
                    </p>
                  </>
                )}
              </div>

              {/* ACTION AREA WITH TRANSITIONS */}
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  
                  {/* MASTER LOGIN VIEW */}
                  {!isMasterLoggedIn && portalView === "master_login" && (
                    <motion.div
                      key="m-login"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <form onSubmit={handleMasterLoginSubmit} className="space-y-4">
                        {masterLoginError && (
                          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-start gap-2 animate-bounce">
                            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                            <span>{masterLoginError}</span>
                          </div>
                        )}

                        <div>
                          <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">
                            E-mail do Responsável
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                              <Mail className="w-4 h-4" />
                            </span>
                            <input
                              type="email"
                              required
                              value={masterEmailInput}
                              onChange={(e) => setMasterEmailInput(e.target.value)}
                              placeholder="responsavel@email.com"
                              className="w-full text-xs text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none rounded-xl pl-9 pr-3 py-2.5 bg-slate-50/50"
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1.5">
                            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                              Senha Administrador
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                setPortalView("master_recovery");
                                setMasterLoginError(null);
                              }}
                              className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 hover:underline"
                            >
                              Esqueceu?
                            </button>
                          </div>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                              <Key className="w-4 h-4" />
                            </span>
                            <input
                              type={showMasterPassword ? "text" : "password"}
                              required
                              value={masterPasswordInput}
                              onChange={(e) => setMasterPasswordInput(e.target.value)}
                              placeholder="Digite sua senha cadastrada"
                              className="w-full text-xs text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none rounded-xl pl-9 pr-10 py-2.5 bg-slate-50/50"
                            />
                            <button
                              type="button"
                              onClick={() => setShowMasterPassword(!showMasterPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-indigo-600"
                            >
                              {showMasterPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        {/* Remember option */}
                        <div className="flex items-center justify-between pt-1">
                          <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={rememberMe}
                              onChange={(e) => setRememberMe(e.target.checked)}
                              className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 accent-indigo-600"
                            />
                            <span className="text-xs text-slate-500 font-medium">Manter login neste navegador</span>
                          </label>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md shadow-indigo-100 focus:ring-2 focus:ring-indigo-300 active:scale-[0.98] cursor-pointer"
                        >
                          Entrar no Portal &rarr;
                        </button>
                      </form>

                      {/* Sparkly Demo access option */}
                      <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-slate-100"></div>
                        <span className="flex-shrink mx-3.5 text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">ou teste rápido</span>
                        <div className="flex-grow border-t border-slate-100"></div>
                      </div>

                      <button
                        type="button"
                        onClick={handleEnterDemoMode}
                        className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-extrabold text-xs py-3 rounded-xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                        Acessar Modo Demonstrativo (DEMO 🚀)
                      </button>

                      {/* Seed demo credentials aid */}
                      <div className="mt-6 bg-indigo-50/50 rounded-2xl p-4 border border-indigo-100/50 space-y-2">
                        <p className="text-[10px] text-slate-500 leading-normal font-semibold">
                          💡 <span className="font-extrabold text-indigo-700 uppercase tracking-widest">Área Real de Testes (Não-Demo):</span> <br/>
                          Para testar o ambiente real com lançamentos pré-populados de teste no primeiro acesso, faça login com: <br/>
                          <span className="font-bold text-indigo-650">E-mail:</span> <code className="bg-white/80 border border-indigo-100 px-1 py-0.5 rounded font-mono text-indigo-700 font-extrabold">teste@teste.com</code><br/>
                          <span className="font-bold text-indigo-650">Senha:</span> <code className="bg-white/80 border border-indigo-100 px-1 py-0.5 rounded font-mono text-indigo-700 font-extrabold">1234</code>
                        </p>
                        <p className="text-[10px] text-slate-400 leading-normal font-medium border-t border-indigo-100/30 pt-1.5">
                          💡 <span className="font-extrabold text-indigo-500 uppercase tracking-widest">Modo Demonstrativo (DEMO):</span> <br/>
                          Ao acessar o modo de demonstração, o sistema carregará uma família fictícia e abrirá o <strong>Guia Completo de Uso</strong> detalhando as metas, tarefas, mesadas e Inteligência Artificial.
                        </p>
                      </div>

                      <div className="text-center pt-3 border-t border-slate-100/80">
                        <button
                          onClick={() => {
                            setPortalView("master_signup");
                            setMasterLoginError(null);
                          }}
                          className="text-xs font-extrabold text-indigo-600 hover:text-indigo-700 hover:underline inline-flex items-center gap-1"
                        >
                          <span>Não possui conta?</span>
                          <span className="bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg text-[10px] ml-1">Criar Conta Familiar</span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* MASTER SIGNUP / REGISTRATION VIEW */}
                  {!isMasterLoggedIn && portalView === "master_signup" && (
                    <motion.div
                      key="m-signup"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      {signupSuccess ? (
                        <div className="p-6 bg-emerald-50 border border-emerald-100 text-center rounded-2xl space-y-3">
                          <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md shadow-emerald-200 animate-bounce">
                            <Check className="w-6 h-6" />
                          </div>
                          <h4 className="font-black text-emerald-800 text-sm">Conta Familiar Registrada!</h4>
                          <p className="text-xs text-emerald-600 leading-relaxed font-semibold">
                            Sua família foi cadastrada com sucesso. Redirecionando para o Portal de Login...
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleMasterSignupSubmit} className="space-y-3">
                          {signupError && (
                            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                              <span>{signupError}</span>
                            </div>
                          )}

                          <div>
                            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">
                              Sobrenome / Clã da Família
                            </label>
                            <input
                              type="text"
                              required
                              value={signupFamilyName}
                              onChange={(e) => setSignupFamilyName(e.target.value)}
                              placeholder="Ex: Silva, Oliveira, Souza"
                              className="w-full text-xs text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none rounded-xl px-3 py-2 bg-slate-50/50"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">
                              E-mail principal do Gestor
                            </label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                <Mail className="w-4 h-4" />
                              </span>
                              <input
                                type="email"
                                required
                                value={signupEmail}
                                onChange={(e) => setSignupEmail(e.target.value)}
                                placeholder="responsavel@email.com"
                                className="w-full text-xs text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none rounded-xl pl-9 pr-3 py-2 bg-slate-50/50"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">
                              Senha Segura (Mínimo 8 caracteres)
                            </label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                <Key className="w-4 h-4" />
                              </span>
                              <input
                                type={showSignupPassword ? "text" : "password"}
                                required
                                value={signupPassword}
                                onChange={(e) => setSignupPassword(e.target.value)}
                                placeholder="Crie uma senha forte"
                                className="w-full text-xs text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none rounded-xl pl-9 pr-10 py-2 bg-slate-50/50"
                              />
                              <button
                                type="button"
                                onClick={() => setShowSignupPassword(!showSignupPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-indigo-600"
                              >
                                {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>

                            {/* Real-time strict password strength verification checks indicators */}
                            <div className="mt-2 p-2 bg-slate-100 rounded-xl space-y-1 border border-slate-200/50">
                              <p className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">Requisitos de Segurança:</p>
                              
                              <div className="grid grid-cols-2 gap-1 text-[10px]">
                                <span className={`flex items-center gap-1 font-semibold ${signupPassword.length >= 8 ? "text-emerald-600" : "text-slate-400"}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${signupPassword.length >= 8 ? "bg-emerald-500" : "bg-slate-300"}`} />
                                  Min. 8 caracteres
                                </span>
                                <span className={`flex items-center gap-1 font-semibold ${/[A-Z]/.test(signupPassword) ? "text-emerald-600" : "text-slate-400"}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${/[A-Z]/.test(signupPassword) ? "bg-emerald-500" : "bg-slate-300"}`} />
                                  Letra Maiúscula
                                </span>
                                <span className={`flex items-center gap-1 font-semibold ${/[0-9]/.test(signupPassword) ? "text-emerald-600" : "text-slate-400"}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${/[0-9]/.test(signupPassword) ? "bg-emerald-500" : "bg-slate-300"}`} />
                                  Pelo menos 1 Número
                                </span>
                                <span className={`flex items-center gap-1 font-semibold ${/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?#]/.test(signupPassword) ? "text-emerald-600" : "text-slate-400"}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?#]/.test(signupPassword) ? "bg-emerald-500" : "bg-slate-300"}`} />
                                  Caractere Especial
                                </span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">
                              Confirme a Senha
                            </label>
                            <input
                              type="password"
                              required
                              value={signupConfirmPassword}
                              onChange={(e) => setSignupConfirmPassword(e.target.value)}
                              placeholder="Redigite sua senha para confirmar"
                              className="w-full text-xs text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none rounded-xl px-3 py-2 bg-slate-50/50"
                            />
                            {signupPassword && signupConfirmPassword && (
                              <p className={`text-[10px] font-bold mt-1 text-right ${signupPassword === signupConfirmPassword ? "text-emerald-600" : "text-rose-500"}`}>
                                {signupPassword === signupConfirmPassword ? "✓ As senhas conferem" : "✗ As senhas não conferem"}
                              </p>
                            )}
                          </div>

                          <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-md active:scale-95"
                          >
                            Concluir Cadastro Familiar ✨
                          </button>
                        </form>
                      )}

                      {!signupSuccess && (
                        <div className="text-center pt-3 border-t border-slate-100">
                          <button
                            onClick={() => {
                              setPortalView("master_login");
                              setSignupError(null);
                            }}
                            className="text-xs font-extrabold text-slate-500 hover:text-indigo-600 hover:underline"
                          >
                            Já possui conta familiar? <span className="text-indigo-600">Entrar</span>
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* MASTER PASSWORD RECOVERY & RESET VIEW */}
                  {!isMasterLoggedIn && portalView === "master_recovery" && (
                    <motion.div
                      key="m-recovery"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      {/* Step 1: Input email to generate code */}
                      {recoveryStep === "enter_email" && (
                        <form onSubmit={handleSendRecoveryCodeSubmit} className="space-y-4">
                          {recoveryError && (
                            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                              <span>{recoveryError}</span>
                            </div>
                          )}

                          <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100">
                            <p className="text-[11px] text-indigo-700 leading-normal font-semibold">
                              💡 <span className="font-extrabold text-indigo-800">Recuperação por E-mail:</span><br/>
                              Informe seu e-mail administrativo cadastrado. Processaremos o reset emitindo um código seguro de 6 dígitos que surgirá como e-mail simulado de preview abaixo.
                            </p>
                          </div>

                          <div>
                            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">
                              E-mail do Administrador
                            </label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                <Mail className="w-4 h-4" />
                              </span>
                              <input
                                type="email"
                                required
                                value={recoveryEmail}
                                onChange={(e) => setRecoveryEmail(e.target.value)}
                                placeholder="Insira o e-mail cadastrado"
                                className="w-full text-xs text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none rounded-xl pl-9 pr-3 py-2.5 bg-slate-50/50"
                              />
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md focus:ring-2 focus:ring-indigo-200 active:scale-95"
                          >
                            Enviar Código de Recuperação &rarr;
                          </button>
                        </form>
                      )}

                      {/* Step 2: Validate verification code */}
                      {recoveryStep === "enter_code" && (
                        <form onSubmit={handleVerifyRecoveryCodeSubmit} className="space-y-4">
                          {recoveryError && (
                            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                              <span>{recoveryError}</span>
                            </div>
                          )}

                          <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl">
                            <p className="text-[11px] text-emerald-800 leading-relaxed font-semibold">
                              ✈️ <span className="font-extrabold text-emerald-900">E-mail Enviado!</span><br/>
                              Seu e-mail seguro recebeu um código de redefinição de 6 dígitos. Localize o código na janela &quot;E-mail de Segurança&quot; no canto inferior direito e informe abaixo.
                            </p>
                          </div>

                          <div>
                            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 text-center">
                              Código de Confirmação (6 Dígitos)
                            </label>
                            <input
                              type="text"
                              required
                              maxLength={6}
                              value={recoveryCode}
                              onChange={(e) => setRecoveryCode(e.target.value.replace(/\D/g, ""))}
                              placeholder="Digite o código enviado"
                              className="w-full text-center text-lg tracking-[8px] font-mono text-slate-800 border-2 border-indigo-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none rounded-xl px-3 py-2 bg-slate-50/50 font-extrabold"
                            />
                          </div>

                          <div className="flex gap-2.5">
                            <button
                              type="button"
                              onClick={() => {
                                setRecoveryStep("enter_email");
                                setRecoveryCode("");
                              }}
                              className="w-1/3 border-2 border-slate-100 hover:bg-slate-50 text-slate-600 font-bold text-xs py-2.5 rounded-xl transition-colors"
                            >
                              Refazer
                            </button>
                            <button
                              type="submit"
                              className="w-2/3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-md"
                            >
                              Validar Código
                            </button>
                          </div>
                        </form>
                      )}

                      {/* Step 3: Set and confirm new password */}
                      {recoveryStep === "reset_password" && (
                        <form onSubmit={handleResetPasswordSubmit} className="space-y-3">
                          {recoveryError && (
                            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                              <span>{recoveryError}</span>
                            </div>
                          )}

                          <div className="bg-indigo-50 p-2.5 rounded-xl border border-indigo-100 text-center">
                            <p className="text-[10px] text-indigo-700 font-extrabold uppercase">Código Validado com Sucesso! ✓</p>
                            <p className="text-[11px] text-slate-500 mt-0.5">Defina uma nova senha administrativa robusta.</p>
                          </div>

                          <div>
                            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">
                              Nova Senha
                            </label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                <Key className="w-4 h-4" />
                              </span>
                              <input
                                type={showNewPassword ? "text" : "password"}
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Nova senha forte"
                                className="w-full text-xs text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none rounded-xl pl-9 pr-10 py-2 bg-slate-50/50"
                              />
                              <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-indigo-600"
                              >
                                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </div>

                            {/* Password rules box */}
                            <div className="mt-2 p-2 bg-slate-100 rounded-xl space-y-1 border border-slate-200/50">
                              <p className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">Requisitos Máximos:</p>
                              <div className="grid grid-cols-2 gap-1 text-[9px]">
                                <span className={`flex items-center gap-1 font-semibold ${newPassword.length >= 8 ? "text-emerald-600" : "text-slate-400"}`}>
                                  <span className={`w-1 h-1 rounded-full ${newPassword.length >= 8 ? "bg-emerald-500" : "bg-slate-300"}`} />
                                  Min. 8 caracteres
                                </span>
                                <span className={`flex items-center gap-1 font-semibold ${/[A-Z]/.test(newPassword) ? "text-emerald-600" : "text-slate-400"}`}>
                                  <span className={`w-1 h-1 rounded-full ${/[A-Z]/.test(newPassword) ? "bg-emerald-500" : "bg-slate-300"}`} />
                                  1 Letra Maiúscula
                                </span>
                                <span className={`flex items-center gap-1 font-semibold ${/[0-9]/.test(newPassword) ? "text-emerald-600" : "text-slate-400"}`}>
                                  <span className={`w-1 h-1 rounded-full ${/[0-9]/.test(newPassword) ? "bg-emerald-500" : "bg-slate-300"}`} />
                                  Pelo menos 1 Número
                                </span>
                                <span className={`flex items-center gap-1 font-semibold ${/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?#]/.test(newPassword) ? "text-emerald-600" : "text-slate-400"}`}>
                                  <span className={`w-1 h-1 rounded-full ${/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?#]/.test(newPassword) ? "bg-emerald-500" : "bg-slate-300"}`} />
                                  Caractere Especial
                                </span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">
                              Confirme a Nova Senha
                            </label>
                            <input
                              type="password"
                              required
                              value={confirmNewPassword}
                              onChange={(e) => setConfirmNewPassword(e.target.value)}
                              placeholder="Confirme sua nova senha"
                              className="w-full text-xs text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none rounded-xl px-3 py-2 bg-slate-50/50"
                            />
                            {newPassword && confirmNewPassword && (
                              <p className={`text-[10px] font-bold mt-1 text-right ${newPassword === confirmNewPassword ? "text-emerald-600" : "text-rose-500"}`}>
                                {newPassword === confirmNewPassword ? "✓ Senhas coincidem" : "✗ Senhas não coincidem"}
                              </p>
                            )}
                          </div>

                          <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-md"
                          >
                            Redefinir Senha e Salvar 🔒
                          </button>
                        </form>
                      )}

                      <div className="text-center pt-3 border-t border-slate-100">
                        <button
                          onClick={() => {
                            setPortalView("master_login");
                            setRecoveryEmail("");
                            setRecoveryCode("");
                            setSentCode("");
                            setRecoveryStep("enter_email");
                            setRecoveryError(null);
                            setSimulatedEmail(null);
                          }}
                          className="text-xs font-extrabold text-slate-500 hover:text-indigo-600 hover:underline"
                        >
                          Cancelar e voltar ao Login
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* PORTAL LOGGED WORKSPACE (SELECT FAMILY PROFILE VIEW) */}
                  {isMasterLoggedIn && loginStep === "select_profile" && (
                    <motion.div
                      key="select"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex items-center justify-between mb-5">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Selecione o Membro</h3>
                        <button
                          onClick={() => setShowAddMemberModal(true)}
                          className="flex items-center gap-1 text-[11px] text-indigo-600 hover:text-indigo-700 font-bold bg-indigo-50 hover:bg-indigo-100/80 px-3 py-1.5 rounded-xl transition-all"
                        >
                          <UserPlus className="w-3.5 h-3.5" />
                          <span>Adicionar Perfil</span>
                        </button>
                      </div>

                      {/* PROFILES GRID */}
                      {members.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-8 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 text-center mb-6">
                          <Users className="w-8 h-8 text-indigo-400 mb-2.5" />
                          <p className="text-xs font-bold text-slate-700">Nenhum membro cadastrado</p>
                          <p className="text-[10px] text-slate-400 mt-1 max-w-[220px] mx-auto leading-relaxed">
                            Clique em &quot;Adicionar Perfil&quot; acima para criar o primeiro responsável ou dependente da família.
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-3.5 mb-6">
                          {members.map((member) => (
                            <button
                              key={member.id}
                              onClick={() => handleSelectProfile(member)}
                              className="group relative flex flex-col items-center p-4 rounded-2xl border-2 border-slate-100 hover:border-indigo-400/60 hover:bg-indigo-50/20 bg-slate-50/40 transition-all text-center"
                            >
                              {/* Avatar */}
                              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${member.avatarColor} text-white flex items-center justify-center text-3xl shadow-sm group-hover:scale-105 transition-transform mb-2.5`}>
                                {member.avatar}
                              </div>
                              
                              {/* Member Info */}
                              <span className="font-bold text-slate-800 group-hover:text-indigo-600 text-xs md:text-sm tracking-tight">{member.name}</span>
                              <div className="flex flex-col items-center gap-0.5 mt-1">
                                <span className="text-[9px] text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded font-extrabold uppercase leading-none border border-indigo-100">
                                  {member.participationType || (member.role === "admin" ? "Pai" : "Filho")}
                                </span>
                                <span className="text-[8.5px] text-slate-400 capitalize leading-none mt-0.5">
                                  {member.role === "admin" ? "Responsável 🛡️" : "Dependente 👦"}
                                </span>
                              </div>

                              {/* Hover Overlay Arrow */}
                              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ChevronRight className="w-4 h-4 text-indigo-500" />
                              </div>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* MASTER LOGOUT BUTTON */}
                      <div className="pt-4 border-t border-slate-100 flex flex-col items-center gap-3">
                        <p className="text-[11px] text-slate-400 leading-normal flex items-center justify-center gap-1.5 font-medium text-center">
                          <Shield className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                          Acesso familiar com PIN numérico independente.
                        </p>

                        <button
                          onClick={handleMasterSignout}
                          className="text-[11.5px] font-extrabold text-rose-500 hover:text-rose-600 hover:underline bg-rose-50/55 hover:bg-rose-50 border border-rose-100/60 px-3 py-1.5 rounded-xl transition-all w-full flex items-center justify-center gap-1.5"
                        >
                          <LogOut className="w-3.5 h-3.5 shrink-0" />
                          <span>Desconectar Gestor Geral</span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* PORTAL LOGGED MEMBERS PIN KEYPAD ENTRY VIEW */}
                  {isMasterLoggedIn && loginStep === "enter_pin" && selectedMemberForPin && (
                    <motion.div
                      key="pin"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Back Link */}
                      <button
                        onClick={() => {
                          setLoginStep("select_profile");
                          setSelectedMemberForPin(null);
                        }}
                        className="flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-700 font-bold mb-5 transition-colors"
                      >
                        &larr; Voltar para os perfis
                      </button>

                      <div className="flex flex-col items-center mb-6">
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${selectedMemberForPin.avatarColor} text-white flex items-center justify-center text-3xl shadow-lg mb-2`}>
                          {selectedMemberForPin.avatar}
                        </div>
                        <h3 className="font-black text-slate-800 text-lg leading-tight">Olá, {selectedMemberForPin.name}</h3>
                        <p className="text-xs text-slate-400 mt-1">Digite seu PIN de segurança de 4 dígitos</p>
                      </div>

                      {/* PIN Display block */}
                      <div className="flex justify-center gap-3 mb-6">
                        {[0, 1, 2, 3].map((index) => (
                          <div
                            key={index}
                            className={`w-4 h-4 rounded-full border-2 transition-all ${
                              pinInput.length > index
                                ? "bg-indigo-600 border-indigo-600 scale-110 shadow-sm shadow-indigo-600/30"
                                : "border-slate-300"
                            }`}
                          />
                        ))}
                      </div>

                      {pinError && (
                        <p className="text-xs text-rose-500 text-center font-bold mb-4 animate-[bounce_0.3s_ease-in-out]">
                          {pinError}
                        </p>
                      )}

                      {/* SIMULATED PIN KEYPAD */}
                      <div className="grid grid-cols-3 gap-2.5 mb-6 max-w-xs mx-auto">
                        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"].map((keyChar, index) => {
                          if (keyChar === "") {
                            return <div key="empty" className="h-11" />; // Empty spacer
                          }
                          return (
                            <button
                              type="button"
                              key={index}
                              onClick={() => handleKeyPress(keyChar)}
                              className="h-11 rounded-2xl text-slate-800 font-bold text-base bg-slate-50 hover:bg-slate-100 active:bg-indigo-50 active:text-indigo-600 transition-all flex items-center justify-center border border-slate-100"
                            >
                              {keyChar}
                            </button>
                          );
                        })}
                        <button
                          type="button"
                          onClick={handleBackspace}
                          className="h-11 rounded-2xl text-slate-500 font-bold text-xs bg-slate-100 hover:bg-slate-200/80 active:bg-slate-200 transition-colors flex items-center justify-center"
                        >
                          Limpar
                        </button>
                      </div>

                      {/* DEMO TOOLTIP BOX */}
                      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 text-center">
                        <p className="text-[11px] text-amber-800 leading-relaxed font-semibold">
                          💡 <span className="font-extrabold text-amber-900">Acesso Rápido para Testes:</span> <br />
                          {selectedMemberForPin.role === "admin" ? (
                            <>Responsáveis usam o PIN padrão <span className="underline font-black font-mono">1234</span></>
                          ) : (
                            <>Dependentes usam o PIN padrão <span className="underline font-black font-mono">1234</span></>
                          )}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SECURITY EMBLEM */}
              <div className="mt-6 pt-5 border-t border-slate-100/90 flex items-center justify-center gap-1.5 opacity-60">
                <Shield className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-500">Conexão 100% Criptografada e Segura</span>
              </div>

            </div>
          </div>
        </div>

        {/* CREATE PROFILE DIALOG PANEL */}
        {showAddMemberModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-extrabold text-slate-800 text-lg">Criar Novo Membro</h3>
                <button
                  type="button"
                  onClick={() => setShowAddMemberModal(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddMember} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Nome do Membro</label>
                  <input
                    type="text"
                    required
                    maxLength={15}
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    placeholder="Ex: Tio Bruno, Sofia"
                    className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Tipo de Acesso</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setNewMemberRole("admin");
                        if (newMemberParticipationType === "Filho" || newMemberParticipationType === "Filha") {
                          setNewMemberParticipationType("Pai");
                        }
                      }}
                      className={`py-2 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        newMemberRole === "admin"
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Shield className="w-3.5 h-3.5" />
                      Responsável
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setNewMemberRole("child");
                        if (newMemberParticipationType === "Pai" || newMemberParticipationType === "Mãe") {
                          setNewMemberParticipationType("Filho");
                        }
                      }}
                      className={`py-2 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        newMemberRole === "child"
                          ? "bg-amber-500 text-white border-amber-500"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <Briefcase className="w-3.5 h-3.5" />
                      Dependente
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Participação na Família</label>
                  <select
                    value={newMemberParticipationType}
                    onChange={(e) => setNewMemberParticipationType(e.target.value)}
                    className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-sm bg-white"
                  >
                    <option value="Pai">👨‍💼 Pai</option>
                    <option value="Mãe">👩‍💼 Mãe</option>
                    <option value="Filho">👦 Filho</option>
                    <option value="Filha">👧 Filha</option>
                    <option value="Outro">⚙️ Outro tipo (Customizado)</option>
                  </select>
                </div>

                {newMemberParticipationType === "Outro" && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Especifique o Outro Tipo</label>
                    <input
                      type="text"
                      required
                      value={newMemberCustomParticipationType}
                      onChange={(e) => setNewMemberCustomParticipationType(e.target.value)}
                      placeholder="Ex: Tio, Avó, Madrinha"
                      className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-sm"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Código PIN (Ex: 0000)</label>
                    <input
                      type="password"
                      required
                      maxLength={4}
                      pattern="[0-9]{4}"
                      value={newMemberPin}
                      onChange={(e) => setNewMemberPin(e.target.value.replace(/\D/g, ""))}
                      placeholder="4 números"
                      className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-sm text-center"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Avatar Emoji</label>
                    <select
                      value={newMemberEmoji}
                      onChange={(e) => setNewMemberEmoji(e.target.value)}
                      className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-sm"
                    >
                      <option value="👦">👦 Menino</option>
                      <option value="👧">👧 Menina</option>
                      <option value="👨‍💼">👨‍💼 Pai / Homem</option>
                      <option value="👩‍💼">👩‍💼 Mãe / Mulher</option>
                      <option value="👶">👶 Bebê</option>
                      <option value="👵">👵 Avó</option>
                      <option value="👴">👴 Avô</option>
                      <option value="🐶">🐶 Pet</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Saldo Inicial ({systemCurrency})</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newMemberBalance}
                      onChange={(e) => setNewMemberBalance(e.target.value)}
                      placeholder="0,00"
                      className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-sm font-bold"
                    />
                  </div>

                  {newMemberRole === "child" ? (
                    <div key="new-member-allowance-active">
                      <label className="block text-xs font-semibold text-indigo-650 text-indigo-650 mb-1">Mesada Mensal ({systemCurrency})</label>
                      <input
                        type="number"
                        step="0.01"
                        value={newMemberAllowance}
                        onChange={(e) => setNewMemberAllowance(e.target.value)}
                        placeholder="100,00"
                        className="w-full text-indigo-900 border-2 border-indigo-50 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-sm font-bold"
                      />
                    </div>
                  ) : (
                    <div key="new-member-allowance-disabled">
                      <label className="block text-xs font-semibold text-slate-400 mb-1">Mesada Mensal</label>
                      <input
                        type="text"
                        disabled
                        placeholder="N/A p/ Resp."
                        className="w-full text-slate-400 bg-slate-50 border-2 border-slate-100 rounded-xl px-3 py-2 text-sm font-medium cursor-not-allowed"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Cor do Banner</label>
                  <div className="flex gap-2.5 justify-between">
                    {[
                      { val: "from-teal-600 to-emerald-500", raw: "bg-emerald-500" },
                      { val: "from-pink-600 to-rose-500", raw: "bg-rose-500" },
                      { val: "from-amber-500 to-yellow-400", raw: "bg-yellow-500" },
                      { val: "from-purple-600 to-violet-500", raw: "bg-purple-500" },
                      { val: "from-blue-600 to-indigo-500", raw: "bg-blue-500" }
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setNewMemberColor(item.val)}
                        className={`w-6 h-6 rounded-full ${item.raw} ring-offset-2 transition-transform ${
                          newMemberColor === item.val ? "scale-125 ring-2 ring-slate-400" : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-2.5 rounded-xl transition-all shadow-md  shadow-indigo-100 active:scale-95"
                >
                  Salvar Perfil
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Dynamically filter transactions for Extrato Individualizado / Fundo Comum
  const finalStatementMemberId = statementMemberId || activeMember?.id || "";

  const filteredTxs = transactions.filter(tx => {
    // Apply monthly filter dynamically
    if (periodMode === "monthly" && tx.date) {
      if (!isTxInPeriod(tx.date, filterMonth, filterYear)) return false;
    }

    if (ledgerAccountType === "all") return true;
    if (ledgerAccountType === "common") {
      return tx.accountType === "common" || !tx.accountType;
    }
    if (ledgerAccountType === "individual") {
      const selectedMember = members.find(m => m.id === finalStatementMemberId);
      if (!selectedMember) return false;
      
      const isMyTx = tx.member === selectedMember.name;
      const isIndividual = tx.accountType === "individual" || tx.category === "Mesada";
      return isMyTx && isIndividual;
    }
    return true;
  });

  const displayExpensesTotal = periodMode === "all"
    ? financeData.totalExpenses
    : transactions
        .filter(t => t.type === "expense" && (t.accountType === "common" || !t.accountType) && isTxInPeriod(t.date, filterMonth, filterYear))
        .reduce((sum, t) => sum + t.amount, 0);

  const displayIncomeTotal = periodMode === "all"
    ? transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
    : transactions
        .filter(t => t.type === "income" && isTxInPeriod(t.date, filterMonth, filterYear))
        .reduce((sum, t) => sum + t.amount, 0);

  const displayRawExpensesTotal = periodMode === "all"
    ? financeData.totalExpenses
    : transactions
        .filter(t => t.type === "expense" && isTxInPeriod(t.date, filterMonth, filterYear))
        .reduce((sum, t) => sum + t.amount, 0);

  // RENDER COMPLETE FAMILY FINANCIAL PORTAL / DASHBOARD
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-indigo-100 selection:text-indigo-800 flex flex-col md:flex-row">
      
      {/* MOBILE HEADER BAR */}
      <header className="md:hidden sticky top-0 bg-slate-900 border-b border-slate-800 shadow-md z-40 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 text-white w-8 h-8 rounded-lg flex items-center justify-center shadow-md">
            <PiggyBank className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-white text-sm tracking-tight truncate max-w-[180px]">Gestão Financeira Familiar</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Active Member Icon */}
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${activeMember.avatarColor} text-white flex items-center justify-center text-xs shadow relative flex-shrink-0`}>
            {activeMember.avatar}
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 border border-slate-900 rounded-full"></span>
          </div>

          <button
            onClick={() => setShowDemoExplanationModal(true)}
            className="p-1.5 bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-all border border-slate-700/50 flex items-center justify-center cursor-pointer"
            title="Como utilizar o sistema"
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
          </button>

          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700/50"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER BACKDROP AND OVERLAY */}
      {isMobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileSidebarOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative flex w-full max-w-xs flex-col bg-slate-900 border-r border-slate-800 text-white shadow-2xl h-full animate-in slide-in-from-left duration-200">
            {/* Close button */}
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Header / Brand */}
            <div className="p-6 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="bg-indigo-600 text-white w-9 h-9 rounded-xl flex items-center justify-center shadow-md shadow-indigo-600/20">
                  <PiggyBank className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-white text-base tracking-tight leading-none block">Gestão Financeira</span>
                  <span className="text-xs text-indigo-300 font-mono mt-0.5 block">Familiar v2.0</span>
                </div>
              </div>
            </div>

            {/* Navigation options */}
            <div className="px-4 py-6 flex-1 space-y-2">
              <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Navegação</p>
              
              <button
                onClick={() => {
                  setActiveTab("dashboard");
                  setIsMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 text-sm px-4 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === "dashboard"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>{t.dashboard}</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("chores");
                  setIsMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 text-sm px-4 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === "chores"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                }`}
              >
                <Award className="w-4 h-4" />
                <span>{t.chores}</span>
              </button>

              {activeMember.role === "admin" && (
                <button
                  onClick={() => {
                    setActiveTab("settings");
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 text-sm px-4 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === "settings"
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                      : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>{t.settings}</span>
                </button>
              )}
            </div>

            {/* Profile & Logout */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/40">
              <div className="flex items-center gap-3 p-2 bg-slate-900 rounded-xl mb-3 border border-slate-800/60">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${activeMember.avatarColor} text-white flex items-center justify-center text-lg shadow relative flex-shrink-0`}>
                  {activeMember.avatar}
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-900 rounded-full"></span>
                </div>
                <div className="text-left overflow-hidden">
                  <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider leading-none mb-1">Membro Ativo</p>
                  <p className="text-sm font-bold text-white truncate flex items-center gap-1">
                    <span>{activeMember.name}</span>
                    <span className="text-xs">
                      {activeMember.role === "admin" ? "🛡️" : "👧"}
                    </span>
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2.5 bg-slate-800 hover:bg-slate-700/80 hover:text-rose-400 text-slate-300 text-xs py-2.5 px-4 rounded-xl transition-all font-semibold border border-slate-700/30"
              >
                <LogOut className="w-4 h-4" />
                <span>Trocar Perfil / Bloquear</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white min-h-screen text-slate-200 border-r border-slate-800 flex-shrink-0 sticky top-0 hidden md:flex flex-col justify-between">
        
        <div>
          {/* Logo / Brand */}
          <div className="p-6 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="bg-indigo-600 text-white w-9 h-9 rounded-xl flex items-center justify-center shadow-md shadow-indigo-600/20">
                <PiggyBank className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-white text-base tracking-tight leading-none block">Gestão Financeira</span>
                <span className="text-xs text-indigo-300 font-mono mt-0.5 block">Familiar v2.0</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="px-4 py-6 space-y-2">
            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Navegação</p>
            
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 text-sm px-4 py-3 rounded-xl font-semibold transition-all ${
                activeTab === "dashboard"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{t.dashboard}</span>
            </button>

            <button
              onClick={() => setActiveTab("chores")}
              className={`w-full flex items-center gap-3 text-sm px-4 py-3 rounded-xl font-semibold transition-all ${
                activeTab === "chores"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
              }`}
            >
              <Award className="w-4 h-4" />
              <span>{t.chores}</span>
            </button>

            {activeMember.role === "admin" && (
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center gap-3 text-sm px-4 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === "settings"
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>{t.settings}</span>
              </button>
            )}
          </div>
        </div>

        {/* Member Profile Switcher & Logout */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-3 p-2 bg-slate-900 rounded-xl mb-3 border border-slate-800/60">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${activeMember.avatarColor} text-white flex items-center justify-center text-lg shadow relative flex-shrink-0`}>
              {activeMember.avatar}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-900 rounded-full"></span>
            </div>
            <div className="text-left overflow-hidden">
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider leading-none mb-1">Membro Ativo</p>
              <p className="text-sm font-bold text-white truncate flex items-center gap-1">
                <span>{activeMember.name}</span>
                <span className="text-xs">
                  {activeMember.role === "admin" ? "🛡️" : "👧"}
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2.5 bg-slate-800 hover:bg-slate-700/80 hover:text-rose-400 text-slate-300 text-xs py-2.5 px-4 rounded-xl transition-all font-semibold border border-slate-700/30"
            title="Trocar Perfil / Bloquear"
          >
            <LogOut className="w-4 h-4" />
            <span>Trocar Perfil / Bloquear</span>
          </button>
        </div>

      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* TOP ACTION BAR / HEADER */}
        <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2.5">
            <span className="bg-indigo-50 text-indigo-750 text-indigo-700 rounded-xl text-xs px-3 py-1 font-bold">
              Perfil Ativo: {activeMember.name} {activeMember.role === "admin" ? "🛡️ (Pais/Admin)" : "👧 (Filho)"}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 font-semibold bg-slate-50 px-2.5 py-1 rounded-xl">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Sincronizado
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowDemoExplanationModal(true)}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 font-extrabold text-xs py-2.5 px-4 rounded-xl border border-slate-200/60 transition-all cursor-pointer active:scale-95"
              title="Guia de Utilização (Como funciona o sistema)"
            >
              <BookOpen className="w-4 h-4 text-indigo-650 text-indigo-600" />
              <span>Como Funciona?</span>
            </button>


          </div>
        </header>

        {/* SUB-BAR / HEADER WELCOME ALERT */}
        <section className="bg-indigo-500/10 border-b border-indigo-500/10 text-indigo-900 py-2 px-4 shadow-sm text-center text-xs font-semibold">
          Seja bem-vindo de volta! Todo o progresso do lar é sincronizado em tempo real.
        </section>

        {/* MAIN CONTAINER */}
        <main className="w-full max-w-7xl mx-auto px-4 py-6 md:px-8">

          {/* PERIOD FILTER HEADER SELECTOR */}
          <div className="bg-white border border-slate-100 rounded-3xl p-5 mb-6 shadow-sm flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  Modo de Visualização Temporal
                </h2>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">
                  Alterne entre visão histórica acumulada ou o foco mensal detalhado das finanças e metas do lar
                </p>
              </div>
              
              <div className="flex bg-slate-100/80 p-1 rounded-2xl border border-slate-200/50 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setPeriodMode("all")}
                  className={`flex-1 sm:flex-initial text-center justify-center font-bold text-xs py-1.5 px-3.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    periodMode === "all"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-950"
                  }`}
                >
                  ♾️ Histórico Geral
                </button>
                <button
                  type="button"
                  onClick={() => setPeriodMode("monthly")}
                  className={`flex-1 sm:flex-initial text-center justify-center font-bold text-xs py-1.5 px-3.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    periodMode === "monthly"
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                      : "text-slate-500 hover:text-slate-950"
                  }`}
                >
                  📅 Visão Mensal
                </button>
              </div>
            </div>

            {/* MONTHLY NAVIGATION SUBBAR */}
            {periodMode === "monthly" && (
              <div className="flex items-center justify-between bg-indigo-50/40 border border-indigo-100/40 rounded-2xl px-4 py-2.5 animate-in fade-in slide-in-from-top-1 duration-200">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-1 px-3 bg-white text-indigo-700 hover:bg-indigo-50 border border-indigo-100 rounded-xl font-bold text-xs cursor-pointer flex items-center gap-1 transition-all active:scale-95"
                >
                  ◀️ Anterior
                </button>
                
                <div className="text-center font-extrabold text-xs text-indigo-950 uppercase tracking-wider flex items-center gap-2">
                  <span>📅</span>
                  <span>
                    {[
                      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
                      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
                    ][filterMonth - 1]} de {filterYear}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1 px-3 bg-white text-indigo-700 hover:bg-indigo-50 border border-indigo-100 rounded-xl font-bold text-xs cursor-pointer flex items-center gap-1 transition-all active:scale-95"
                >
                  Próximo ▶️
                </button>
              </div>
            )}
          </div>
        
        {/* VIEW 1: COFRE COMUM / CENTRAL DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* OVERVIEW CARDS: PATRIMÔNIO COLETIVO TOTAL */}
            {(() => {
              const commonFundVal = financeData.balance;
              const membersVal = members.reduce((sum, m) => sum + m.balance, 0);
              const assetsVal = (financeData.assets || []).reduce((sum, a) => sum + a.value, 0);
              const totalWealth = commonFundVal + membersVal + assetsVal;
              
              return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* CARD 1: PATRIMÔNIO COLETIVO TOTAL */}
                  <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-5 relative overflow-hidden shadow-md">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
                    <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-800/60">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                        <span>💰 Patrimônio Coletivo</span>
                      </h4>
                      <span className="text-[9px] bg-indigo-950 text-indigo-300 border border-indigo-900 px-2 py-0.5 rounded-full font-bold">
                        Geral do Lar
                      </span>
                    </div>
                    <p className="text-3xl font-black text-white mt-1">
                      {systemCurrency} {totalWealth.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-2.5 leading-relaxed">
                      Soma dos cofres, saldos individuais e {financeData.assets?.length || 0} ativos monitorados.
                    </p>
                  </div>

                  {/* CARD 2: FUNDO COMUM (LÍQUIDO) */}
                  <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-50 rounded-full blur-xl pointer-events-none" />
                    <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-100">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <span>🏦 Fundo Comum (Cofre)</span>
                      </h4>
                      <div className="flex items-center gap-1.5">
                        {activeMember?.role === "admin" && (
                          <button
                            onClick={() => {
                              setEditCommonBalanceValue(commonFundVal.toString());
                              setShowEditCommonBalanceModal(true);
                            }}
                            className="text-[9px] bg-slate-50 text-slate-500 hover:text-indigo-650 hover:bg-indigo-50 border border-slate-200 px-2 py-0.5 rounded-full font-semibold flex items-center gap-0.5 cursor-pointer transition-all"
                          >
                            <Pencil className="w-2.5 h-2.5" /> Ajustar
                          </button>
                        )}
                        <span className="text-[9px] bg-indigo-50 text-indigo-600 border border-indigo-150 px-2 py-0.5 rounded-full font-bold">
                          Disponível
                        </span>
                      </div>
                    </div>
                    <p className="text-2xl font-black text-slate-800 mt-1">
                      {systemCurrency} {commonFundVal.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-2.5 leading-relaxed">
                      Saldo geral compartilhado para cobrir metas e despesas ordinárias do lar.
                    </p>
                    {activeMember && (
                      <div className="mt-3.5 pt-2.5 border-t border-dashed border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                          <span>{activeMember.avatar} Seu Saldo</span>
                        </span>
                        <span className="text-xs font-black text-indigo-650 bg-indigo-50/40 border border-indigo-100 px-2 py-0.5 rounded-lg text-indigo-700">
                          {systemCurrency} {((members.find(m => m.id === activeMember.id)?.balance) ?? activeMember.balance).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* CARD 3: CARTEIRA DE ATIVOS DE PATRIMÔNIO (CRUD) */}
                  <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-amber-50 rounded-full blur-xl pointer-events-none" />
                    <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-100">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <span>💼 Investimentos & Ativos</span>
                      </h4>
                      <button
                        onClick={() => {
                          if (activeMember.role === "admin") {
                            setActiveTab("settings");
                            setTimeout(() => {
                              const el = document.getElementById("ativos-crud-section");
                              if (el) el.scrollIntoView({ behavior: "smooth" });
                            }, 150);
                          } else {
                            alert("Apenas pais/administradores têm permissão para acessar o painel de Ativos e Patrimônio para inclusão/alterações.");
                          }
                        }}
                        className="text-[10px] text-indigo-600 hover:text-indigo-700 hover:underline font-extrabold cursor-pointer"
                      >
                        Acessar CRUD &rarr;
                      </button>
                    </div>
                    <p className="text-2xl font-black text-slate-800 mt-1">
                      {systemCurrency} {assetsVal.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-2.5 leading-relaxed">
                      Lançamento de investimentos, imóveis e veículos. Administre pelo CRUD no menu Configurações.
                    </p>
                  </div>
                </div>
              );
            })()}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* LEFT / CENTER TWO COLUMNS (BALANCE, LEDGER AND TRANSACTION FORM) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* BALANCE & BUDGET LIMIT CONTAINER */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 overflow-hidden relative">
                
                {/* Visual grid decor */}
                <div className="absolute top-0 right-0 w-44 h-44 bg-indigo-50 rounded-full -translate-y-24 translate-x-24 -z-10 blur-xl pointer-events-none" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                  
                  {/* Common Treasury Balance */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-slate-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-indigo-600" />
                        Fundo Comum da Família
                      </h2>
                      {activeMember?.role === "admin" && (
                        <button
                          onClick={() => {
                            setEditCommonBalanceValue(financeData.balance.toString());
                            setShowEditCommonBalanceModal(true);
                          }}
                          className="text-[9px] bg-slate-50 text-slate-500 hover:text-indigo-650 hover:bg-indigo-50 border border-slate-200 px-2 py-0.5 rounded-full font-semibold flex items-center gap-0.5 cursor-pointer transition-all"
                        >
                          <Pencil className="w-2.5 h-2.5" /> Ajustar
                        </button>
                      )}
                    </div>
                    <p className="text-4xl font-extrabold text-slate-800">
                      R$ {financeData.balance.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                      Este saldo é compartilhado por todos os responsáveis para cobrir as metas e despesas familiares do mês.
                    </p>
                  </div>

                  {/* Monthly Budget Performance */}
                  <div className="md:w-60">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="font-semibold text-slate-600">Limite de Gastos Mensal</span>
                      <span className="font-bold text-slate-800">
                        R$ {financeData.budgetLimit.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    </div>

                    {/* Progress Bar Gauge */}
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${
                          displayExpensesTotal > financeData.budgetLimit
                            ? "bg-rose-500"
                            : (displayExpensesTotal / financeData.budgetLimit) > 0.8
                            ? "bg-amber-500"
                            : "bg-indigo-600"
                        }`}
                        style={{ width: `${Math.min(100, (displayExpensesTotal / financeData.budgetLimit) * 100)}%` }}
                      />
                    </div>

                    <div className="flex justify-between items-center mt-2.5">
                      <span className="text-[11px] text-slate-400">
                        {((displayExpensesTotal / financeData.budgetLimit) * 100).toFixed(0)}% Utilizado
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Despesas: R$ {displayExpensesTotal.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}
                      </span>
                    </div>

                    {/* Budget configuration for Administradores only */}
                    {activeMember.role === "admin" && (
                      <button
                        onClick={() => {
                          setNewBudgetLimit(financeData.budgetLimit.toString());
                          setShowBudgetModal(true);
                        }}
                        className="text-[11px] text-indigo-600 hover:text-indigo-700 font-bold hover:underline mt-2 flex items-center justify-end gap-1 w-full"
                      >
                        Ajustar Teto de Gastos &rarr;
                      </button>
                    )}
                  </div>
                </div>

                {/* Sub-cards summary row */}
                <div className="grid grid-cols-2 gap-4 pt-5 border-t border-slate-100">
                  <div className="flex items-center gap-2.5 bg-slate-50/50 p-3 rounded-2xl">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Total Recebido</p>
                      <p className="text-sm font-bold text-slate-700">R$ {displayIncomeTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 bg-slate-50/50 p-3 rounded-2xl">
                    <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-505 flex items-center justify-center bg-rose-50/40">
                      <ArrowDownRight className="w-5 h-5 text-rose-500" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Total de Saídas</p>
                      <p className="text-sm font-bold text-slate-700">R$ {displayRawExpensesTotal.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* TRANSACTIONS SECTION */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-base">Livro de Movimentações</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Total: {filteredTxs.length} registros filtrados</p>
                  </div>

                  {/* FILTER SELECTION TABS */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      onClick={() => setLedgerAccountType("all")}
                      className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                        ledgerAccountType === "all"
                          ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                          : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      🌐 Todos
                    </button>
                    <button
                      onClick={() => setLedgerAccountType("common")}
                      className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                        ledgerAccountType === "common"
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                          : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      🏦 Fundo Comum
                    </button>
                    <button
                      onClick={() => setLedgerAccountType("individual")}
                      className={`text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                        ledgerAccountType === "individual"
                          ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                          : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      👛 Extratos
                    </button>

                    {/* DYNAMIC MEMBER DROPDOWN FOR STATEMENTS */}
                    {ledgerAccountType === "individual" && (
                      <select
                        value={finalStatementMemberId}
                        onChange={(e) => setStatementMemberId(e.target.value)}
                        className="text-[11px] font-bold border border-amber-250 focus:ring-1 focus:ring-amber-200 focus:outline-none bg-amber-50 text-amber-900 rounded-xl px-2.5 py-1.5 cursor-pointer"
                      >
                        {members.map(m => (
                          <option key={m.id} value={m.id}>
                            {m.avatar} {m.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>

                {/* Grid layout containing transaction list and fast logger form */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  
                  {/* TRANSACTION LIST (Left Column in inner grid) */}
                  <div className="md:col-span-3 space-y-3 max-h-[460px] overflow-y-auto pr-1">
                    <AnimatePresence initial={false}>
                      {filteredTxs.length === 0 ? (
                        <div className="text-center py-12 text-slate-400">
                          <p className="text-xs">Nenhuma movimentação correspondente encontrada.</p>
                        </div>
                      ) : (
                        filteredTxs.map((tx) => (
                          <motion.div
                            key={tx.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="bg-slate-50/30 hover:bg-slate-50 p-3.5 rounded-2xl border border-slate-100/50 flex items-center justify-between group transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              {/* Icon category */}
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                                tx.category === "Metas de Poupança"
                                  ? "bg-indigo-100 text-indigo-600"
                                  : tx.type === "income"
                                  ? "bg-emerald-100 text-emerald-600"
                                  : "bg-slate-100 text-slate-600"
                              }`}>
                                {tx.category === "Metas de Poupança" ? "🎯" : (tx.type === "income" ? "💰" : "🏷️")}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-800 leading-snug">{tx.description}</p>
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-xs text-slate-405 text-slate-400">
                                  <span className="font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded text-[10px] whitespace-nowrap">
                                    {tx.category}
                                  </span>
                                  <span>&bull;</span>
                                  <span className="font-medium text-slate-500 whitespace-nowrap">{tx.member}</span>
                                  <span>&bull;</span>
                                  <span className={`text-[9.5px] font-extrabold px-1.5 py-0.5 rounded whitespace-nowrap ${
                                    tx.accountType === "individual"
                                      ? "bg-amber-50 text-amber-700 border border-amber-200/50"
                                      : "bg-indigo-50 text-indigo-700 border border-indigo-200/50"
                                  }`}>
                                    {tx.accountType === "individual" ? "👛 Individual" : "🏦 Fundo Comum"}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="text-right flex items-center gap-2.5">
                              <div>
                                <p className={`text-sm font-extrabold ${tx.type === "income" ? "text-emerald-600" : "text-slate-700"}`}>
                                  {tx.type === "income" ? "+" : "-"} R$ {tx.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </p>
                                <span className="text-[10px] text-slate-400 block mt-0.5">{tx.date}</span>
                              </div>

                              {/* Edit & Delete actions (only for active administrators) */}
                              {activeMember.role === "admin" && (
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                  <button
                                    onClick={() => handleOpenEditTxModal(tx)}
                                    className="p-1.5 rounded-lg text-slate-300 hover:text-indigo-650 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                                    title="Editar lançamento"
                                  >
                                    <Pencil className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteTransaction(tx.id)}
                                    className="p-1.5 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all"
                                    title="Apagar lançamento"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))
                      )}
                    </AnimatePresence>
                  </div>

                  {/* FAST LOGGER FORM (Right Column in inner grid) */}
                  <div className="md:col-span-2 bg-slate-50/50 border border-slate-100 p-4.5 rounded-2xl flex flex-col justify-between">
                    {activeMember.role === "admin" ? (
                      <>
                        <div>
                          <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
                            <PlusCircle className="w-4 h-4 text-indigo-500" />
                            Lançar Movimentação
                          </h4>

                          <form onSubmit={handleAddTransaction} className="space-y-3.5">
                            {/* TYPE SWITCH */}
                            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-200/50 rounded-xl">
                              <button
                                type="button"
                                onClick={() => {
                                  setTxType("expense");
                                  setTxCategory("Alimentação");
                                }}
                                className={`text-[10px] py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                                  txType === "expense" ? "bg-white text-slate-800 shadow" : "text-slate-500"
                                }`}
                              >
                                💸 Gasto
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setTxType("income");
                                  setTxCategory("Trabalho");
                                }}
                                className={`text-[10px] py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                                  txType === "income" ? "bg-indigo-600 text-white shadow" : "text-slate-500"
                                }`}
                              >
                                📈 Receita
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setTxType("transfer");
                                  setTxCategory("Transferência");
                                }}
                                className={`text-[10px] py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                                  txType === "transfer" ? "bg-teal-650 bg-teal-600 text-white shadow" : "text-slate-500"
                                }`}
                              >
                                🏦 Transf. p/ Cofre
                              </button>
                            </div>

                            {/* DESCRIPTION */}
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                                {txType === "transfer" ? "Motivo / Descrição" : "Descrição"}
                              </label>
                              <input
                                type="text"
                                required
                                value={txDesc}
                                onChange={(e) => setTxDesc(e.target.value)}
                                placeholder={txType === "transfer" ? "Ex: Guardando mesada, Contribuição..." : "Ex: Fruteira, Gasolina, Net..."}
                                className="w-full text-slate-800 border border-slate-200 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 focus:outline-none bg-white rounded-xl px-3 py-2 text-xs font-medium"
                              />
                            </div>

                            {/* AMOUNT & CATEGORY */}
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Valor (R$)</label>
                                <input
                                  type="number"
                                  step="0.01"
                                  required
                                  min="0.01"
                                  value={txAmount}
                                  onChange={(e) => setTxAmount(e.target.value)}
                                  placeholder="0,00"
                                  className="w-full text-slate-800 border border-slate-200 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 focus:outline-none bg-white rounded-xl px-3 py-2 text-xs font-medium"
                                />
                              </div>

                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Categoria</label>
                                <select
                                  value={txCategory}
                                  onChange={(e) => {
                                    setTxCategory(e.target.value);
                                    if (e.target.value !== "Metas de Poupança") {
                                      setTxGoalKey("");
                                    }
                                  }}
                                  className="w-full text-slate-800 border border-slate-200 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 focus:outline-none bg-white rounded-xl px-3 py-2 text-xs font-semibold"
                                >
                                  {txType === "transfer" ? (
                                    <option value="Transferência">🏦 Transferência Interna</option>
                                  ) : txType === "expense" ? (
                                    <>
                                      {expenseCategories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                                      ))}
                                      <option value="Metas de Poupança">🎯 Metas de Poupança</option>
                                    </>
                                  ) : (
                                    <>
                                      {incomeCategories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                                      ))}
                                      <option value="Metas de Poupança">🎯 Resgate de Meta</option>
                                    </>
                                  )}
                                </select>
                              </div>
                            </div>

                            {/* CONDITIONAL GOAL SELECTOR */}
                            {txCategory === "Metas de Poupança" && (
                              <div className="animate-in fade-in slide-in-from-top-1 duration-200 bg-indigo-50/50 p-2.5 rounded-xl border border-indigo-100">
                                <label className="block text-[10px] font-bold text-indigo-700 uppercase mb-1">Qual meta de poupança?</label>
                                <select
                                  required
                                  value={txGoalKey}
                                  onChange={(e) => setTxGoalKey(e.target.value as any)}
                                  className="w-full text-slate-800 border border-slate-200 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 focus:outline-none bg-white rounded-xl px-2.5 py-1.5 text-xs font-bold"
                                >
                                  <option value="">-- Selecione uma Meta --</option>
                                  <option value="travel">✈️ Viagem de Férias (R$ {financeData.goals.travel.current.toFixed(2)})</option>
                                  <option value="emergency">🛡️ Reserva de Emergência (R$ {financeData.goals.emergency.current.toFixed(2)})</option>
                                </select>
                              </div>
                            )}

                            {/* ALLOCATION TO SPECIFIC MEMBER (ADMINS ONLY) */}
                            {activeMember.role === "admin" && (
                              <div className="space-y-3.5">
                                <div>
                                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                                    {txType === "transfer" ? "Transferir de (Membro Origem)" : "Atribuir Lançamento"}
                                  </label>
                                  <select
                                    value={txMemberId}
                                    onChange={(e) => setTxMemberId(e.target.value)}
                                    className="w-full text-slate-800 border border-slate-200 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 focus:outline-none bg-white rounded-xl px-3 py-2 text-xs font-semibold"
                                  >
                                    <option value="">{txType === "transfer" ? `Você (${activeMember.name} - R$ ${activeMember.balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })})` : `Você (${activeMember.name})`}</option>
                                    {members.map((m) => {
                                      if (m.id === activeMember.id) return null;
                                      return (
                                        <option key={m.id} value={m.id}>
                                          {m.name} {txType === "transfer" ? `(Saldo: R$ ${m.balance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })})` : ""}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>

                                {txCategory !== "Metas de Poupança" && txType !== "transfer" && (
                                  <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Conta de Lançamento</label>
                                    <div className="grid grid-cols-2 gap-2">
                                      <button
                                        type="button"
                                        onClick={() => setTxAccountType("common")}
                                        className={`py-1.5 px-2.5 rounded-xl border text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                          txAccountType === "common"
                                            ? "bg-indigo-50 border-indigo-400 text-indigo-700 shadow-sm"
                                            : "border-slate-200 text-slate-500 hover:bg-slate-50"
                                        }`}
                                      >
                                        🏦 Fundo Comum
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => setTxAccountType("individual")}
                                        className={`py-1.5 px-2.5 rounded-xl border text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                          txAccountType === "individual"
                                            ? "bg-amber-50 border-amber-400 text-amber-700 shadow-sm"
                                            : "border-slate-200 text-slate-500 hover:bg-slate-50"
                                        }`}
                                      >
                                        👛 Saldo Individual
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            <button
                              type="submit"
                              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 rounded-xl transition-colors shadow-md mt-2"
                            >
                              Registrar Transação
                            </button>
                          </form>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-6 px-4 flex flex-col items-center justify-center my-auto space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-150 text-slate-500 flex items-center justify-center border border-slate-200 bg-slate-100">
                          <Eye className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-slate-700 text-sm">Modo de Visualização</h4>
                          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                            O Livro de Movimentações é gerido exclusivamente pelos pais/administradores da casa. 
                          </p>
                        </div>
                        <div className="bg-amber-50/50 border border-amber-100 text-amber-800 p-3.5 rounded-2xl text-xs leading-relaxed text-left">
                          🎯 <strong>Acumule saldos:</strong> Solicite e complete tarefas propostas no painel de tarefas domésticas para receber recompensas em seu cofre individual!
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              </div>

            </div>

            {/* RIGHT SIDEBAR COLUMN (GEMINI ADVISOR & SAVINGS COOPERATIVE META) */}
            <div className="space-y-6">
              
              {/* FAMILY SAVINGS GOALS (METAS DE POUPANÇA) */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-extrabold text-slate-800 text-sm">Metas de Poupança Coletivas</h3>
                  <PiggyBank className="w-5 h-5 text-indigo-600" />
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Transfira recursos do saldo do cofre familiar para metas especiais, garantindo a segurança do lar.
                </p>

                {/* GOALS GRID */}
                <div className="space-y-4">
                  {Object.keys(financeData.goals).map((goalKey) => {
                    const goal = (financeData.goals as Record<string, any>)[goalKey];
                    const title = goal.title || (goalKey === "travel" ? "Viagem de Férias" : "Reserva de Emergência");
                    const icon = goal.icon || (goalKey === "travel" ? "✈️" : "🏥");
                    const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));
                    const isDefault = goalKey === "travel" || goalKey === "emergency";

                    return (
                      <div key={goalKey} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-slate-700 flex items-center gap-1.5 truncate">
                            <span>{icon}</span>
                            <span className="truncate">{title}</span>
                            {isDefault && (
                              <span className="text-[7.5px] uppercase bg-slate-200 text-slate-500 py-0.5 px-1.5 rounded-md font-bold leading-none select-none flex-shrink-0">
                                Fixo
                              </span>
                            )}
                          </span>
                          <span className="text-slate-500 font-mono text-[11px] flex-shrink-0">
                            {systemCurrency} {goal.current.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} de {goal.target.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>

                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${goalKey === "emergency" ? "bg-blue-500" : "bg-indigo-600"} transition-all duration-300`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>

                        {/* MONTHLY OPT-IN PACING DETAILS */}
                        {periodMode === "monthly" && (() => {
                          const monthContrib = transactions.filter(tx => {
                            const isMonth = tx.date ? isTxInPeriod(tx.date, filterMonth, filterYear) : false;
                            const isGoalType = tx.category === "Metas de Poupança";
                            const matchTitle = tx.description.toLowerCase().includes(title.toLowerCase()) || 
                                               tx.description.toLowerCase().includes(goalKey.toLowerCase());
                            return isMonth && isGoalType && matchTitle;
                          }).reduce((sum, tx) => sum + tx.amount, 0);

                          const monthlyPace = goal.target / 12;
                          const pacePct = Math.min(100, Math.round((monthContrib / (monthlyPace || 1)) * 100));

                          return (
                            <div className="bg-indigo-50/50 rounded-xl p-2.5 border border-indigo-100/40 text-[10px] space-y-1.5 mt-2 animate-in fade-in duration-200">
                              <div className="flex items-center justify-between font-bold text-indigo-950">
                                <span className="flex items-center gap-1">📈 Guardado este mês:</span>
                                <span className="font-mono text-indigo-750">{systemCurrency} {monthContrib.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                              </div>
                              <div className="flex items-center justify-between text-slate-400">
                                <span>🎯 Alvo mensal estim. (1 ano):</span>
                                <span className="font-mono">{systemCurrency} {monthlyPace.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                              </div>
                              {/* Mini progress bar for pacing */}
                              <div className="w-full bg-slate-200/60 h-1.5 rounded-full overflow-hidden mt-1 relative">
                                <div
                                  className="h-full bg-indigo-500 transition-all duration-300"
                                  style={{ width: `${pacePct}%` }}
                                />
                              </div>
                              <div className="text-[9px] text-indigo-600 italic text-right font-medium">
                                {pacePct}% do ritmo mensal atingido
                              </div>
                            </div>
                          );
                        })()}

                        <div className="flex justify-between items-center text-[10px] text-slate-400">
                          <span>{pct}% Concluído</span>
                          <div className="flex items-center gap-2">
                            {activeMember?.role === "admin" && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingGoalKey(goalKey);
                                    setEditGoalTitle(title);
                                    setEditGoalTarget(goal.target.toString());
                                    setEditGoalIcon(icon);
                                    setEditGoalCurrent(goal.current.toString());
                                  }}
                                  className="text-slate-500 hover:text-indigo-600 font-bold hover:underline flex items-center gap-0.5 pointer-events-auto cursor-pointer"
                                >
                                  <Pencil className="w-2.5 h-2.5" /> Editar
                                </button>
                                <span className="text-slate-300">|</span>
                              </>
                            )}

                            {(activeMember?.role === "admin" || activeMember?.role === "child") && (
                              <button
                                type="button"
                                onClick={() => {
                                  setGoalContribution("");
                                  setShowGoalModal(goalKey);
                                }}
                                className="text-indigo-600 hover:text-indigo-700 font-bold hover:underline cursor-pointer"
                              >
                                + Contribuir
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* GOAL TRANSFER REPORT */}
                <div className="border-t border-slate-100 pt-5 mt-5">
                  <h4 className="font-extrabold text-slate-800 text-xs flex items-center gap-2 mb-3">
                    <span>📊 Relatório de Transferências (Metas)</span>
                    <span className="text-[8.5px] uppercase bg-indigo-50 border border-indigo-100 text-indigo-700 py-0.5 px-1.5 rounded-full font-bold">
                      Público do Lar
                    </span>
                  </h4>
                  
                  {(!financeData.transfers || financeData.transfers.length === 0) ? (
                    <div className="text-center py-4 bg-slate-50/50 rounded-2xl border border-slate-100/50 text-[10px] text-slate-400 font-mono">
                      Nenhuma transferência registrada até o momento.
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-52 overflow-y-auto pr-1 scrollbar-thin">
                      {[...financeData.transfers].reverse().map((transfer, idx) => {
                        const isCont = transfer.type === "contribution" || !transfer.type;
                        return (
                          <div key={idx} className="bg-slate-50 border border-slate-100 p-2 rounded-xl text-[10px] flex items-center justify-between gap-2.5 transition-all hover:bg-white hover:shadow-xs">
                            <div className="flex flex-col min-w-0">
                              <div className="flex items-center gap-1.5">
                                  <span className={`w-1.5 h-1.5 rounded-full ${isCont ? "bg-emerald-500" : "bg-rose-500"}`} />
                                <span className="font-bold text-slate-700 truncate">{transfer.fromName || (transfer as any).who} &rarr; {transfer.goalTitle}</span>
                              </div>
                              <div className="text-slate-400 font-mono text-[9px] mt-0.5 whitespace-nowrap">
                                {transfer.date} às {transfer.time || "00:00"}
                              </div>
                            </div>
                            
                            <div className="flex-shrink-0 text-right font-mono font-black text-[11px]">
                              <span className={isCont ? "text-emerald-600" : "text-rose-600"}>
                                {isCont ? "+" : "-"} R$ {transfer.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

              </div>

            </div>

          </div>
          </div>
        )}

        {/* VIEW 2: TAREFAS E MESADAS (ALLOWANCE SYSTEM) */}
        {activeTab === "chores" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
            
            {/* LEFT ALLOWANCE CARD & GENERAL MEMBER POCKET BALANCES */}
            <div className="lg:col-span-1 space-y-6">
              
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-extrabold text-slate-800 text-base mb-4 flex items-center gap-1.5">
                  <Award className="w-5 h-5 text-amber-500" />
                  Cofres Individuais (Filhos)
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-5">
                  Balancete das mesadas independentes e pagamentos realizados por tarefas concluídas com sucesso.
                </p>

                <div className="space-y-4">
                  {members
                    .filter(m => {
                      if (activeMember?.role === "child") {
                        return m.id === activeMember.id;
                      }
                      return m.role === "child";
                    })
                    .map(kid => (
                    <div
                      key={kid.id}
                      className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${kid.avatarColor} text-white flex items-center justify-center text-xl`}>
                          {kid.avatar}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-700">{kid.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium">Mesada Mensal: R$ {kid.allowance.toFixed(2)}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-indigo-600 text-sm font-extrabold">R$ {kid.balance.toFixed(2)}</p>
                        <span className="text-[9px] text-slate-400 uppercase font-semibold">Valor Disponível</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick note on allowances */}
                <div className="mt-6 pt-5 border-t border-slate-100 bg-indigo-50/20 p-3 rounded-xl border border-indigo-50">
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    🌟 <span className="font-bold text-slate-600">Regra do Lar:</span> O saldo individual pode ser usado para compras próprias ou sacado junto aos pais. Completar tarefas familiares concede prêmios diretos!
                  </p>
                </div>
              </div>

            </div>

            {/* RIGHT CO-CHORES LIST (PENDING ENTRIES, ACTIVE ENTRIES) */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div>
                  <h3 className="font-extrabold text-slate-800 text-base">Tarefas de Educação Financeira</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Faça tarefas cooperativas em casa para ganhar bonificações!</p>
                </div>
                <div className="flex items-center gap-2.5 self-start sm:self-center">
                  {activeMember && activeMember.role === "admin" && (
                    <button
                      onClick={() => handleOpenChoreModal(null)}
                      className="flex items-center gap-1 bg-indigo-650 hover:bg-indigo-700 bg-indigo-600 text-white font-bold text-xs py-1.5 px-3 rounded-xl transition-all shadow-sm active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Nova Tarefa</span>
                    </button>
                  )}
                  <span className="bg-amber-50 text-amber-700 rounded-full text-[10px] px-2.5 py-1 font-bold">
                    Mesada Divertida
                  </span>
                </div>
              </div>

              {/* CHORES GRID */}
              <div className="space-y-4">
                {chores.length === 0 ? (
                  <div className="py-8 text-center bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl">
                    <p className="text-slate-400 text-xs font-semibold">Nenhuma tarefa educativa registrada no momento.</p>
                    {activeMember && activeMember.role === "admin" && (
                      <button
                        onClick={() => handleOpenChoreModal(null)}
                        className="text-indigo-600 text-xs font-bold mt-2 hover:underline"
                      >
                        Clique aqui para adicionar a primeira
                      </button>
                    )}
                  </div>
                ) : (
                  chores.map((chore) => (
                    <div
                      key={chore.id}
                      className="p-4 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        {/* Check icon reflecting chore state */}
                        <div className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          chore.status === "completed"
                            ? "bg-indigo-50 text-indigo-600"
                            : chore.status === "pending_approval"
                            ? "bg-amber-100 text-amber-600"
                            : "bg-slate-100 text-slate-400"
                        }`}>
                          {chore.status === "completed" ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <Clock className="w-5 h-5" />
                          )}
                        </div>
                        
                        <div className="min-w-0">
                          {/* Title of chores */}
                          <p className="text-sm font-bold text-slate-800 leading-tight truncate">{chore.title}</p>
                          
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1.5 text-xs">
                            {/* Reward details */}
                            <span className="font-bold text-indigo-650">Recompensa: R$ {chore.reward.toFixed(2)}</span>
                            
                            {chore.assignedToName && (
                              <>
                                <span className="text-slate-300">&bull;</span>
                                <span className="bg-indigo-50 border border-indigo-150 text-indigo-700 px-2 py-0.5 rounded-md font-extrabold text-[10px] tracking-wide uppercase flex items-center gap-1">
                                  👤 Direcionada: {chore.assignedToName}
                                </span>
                              </>
                            )}

                            {chore.claimedByName && (
                              <>
                                <span className="text-slate-300">&bull;</span>
                                <span className="text-slate-500 font-semibold truncate max-w-[120px]">Entregue por: {chore.claimedByName}</span>
                              </>
                            )}
                          </div>

                          {activeMember && activeMember.role === "child" && chore.status !== "completed" && financeData.balance < chore.reward && (
                            <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-100/55 rounded-xl px-2.5 py-1.5 mt-2 font-medium leading-normal animate-pulse">
                              ⚠️ O valor será pago assim que houver saldo disponível pelo administrador
                            </p>
                          )}
                        </div>
                      </div>

                      {/* STATUS AND INTERACTIVE ACTIONS */}
                      <div className="flex flex-wrap items-center self-end md:self-center gap-3">
                        
                        {/* 1. Status Tag indicator */}
                        <div>
                          {chore.status === "available" && (
                            <span className="bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap">
                              Disponível
                            </span>
                          )}
                          {chore.status === "pending_approval" && (
                            <span className="bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full animate-pulse whitespace-nowrap">
                              Aguardando Aprovação dos Pais
                            </span>
                          )}
                          {chore.status === "completed" && (
                            <span className="bg-indigo-50 text-indigo-850 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap">
                              Pago & Concluído ✅
                            </span>
                          )}
                        </div>

                        {/* 2. Interactive buttons based on membership role */}
                        
                        {/* For DEPENDENT CHILDREN or PARENTS to CLAIM / SUBMIT a task */}
                        {chore.status === "available" && activeMember && (activeMember.role === "child" || activeMember.role === "admin") && (
                          activeMember.role === "child" && chore.assignedTo && chore.assignedTo !== activeMember.id ? (
                            <span className="text-slate-400 italic text-xs font-semibold bg-slate-100/80 px-2.5 py-1 rounded-xl flex items-center gap-1">
                              🔒 Exclusiva de {chore.assignedToName?.split(" ")[0]}
                            </span>
                          ) : (
                            <button
                              onClick={() => handleClaimChore(chore.id)}
                              className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs py-1.5 px-3 rounded-xl transition-all shadow-sm active:scale-95 whitespace-nowrap cursor-pointer"
                            >
                              {activeMember.role === "admin" ? "Realizar e Receber! 🏆" : "Concluí essa tarefa! 🚀"}
                            </button>
                          )
                        )}

                        {/* For PARENT ADMINISTRATORS to APPROVE and reward */}
                        {chore.status === "pending_approval" && activeMember && activeMember.role === "admin" && (
                          <button
                            onClick={() => handleApproveChore(chore.id)}
                            className="bg-indigo-650 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-1.5 px-3 rounded-xl transition-all shadow-sm active:scale-95 whitespace-nowrap"
                          >
                            Aprovar & Pagar R$ {chore.reward.toFixed(2)}
                          </button>
                        )}

                        {/* For PARENT ADMINISTRATORS to EDIT & DELETE */}
                        {activeMember && activeMember.role === "admin" && (
                          <div className="flex items-center gap-1 border-l border-slate-200 pl-2">
                            <button
                              onClick={() => handleOpenChoreModal(chore)}
                              className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                              title="Editar Tarefa"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteChore(chore.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Excluir Tarefa"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}

                      </div>

                    </div>
                  ))
                )}
              </div>

            </div>

          </div>
        )}

        {/* VIEW 3: CONFIGURAÇÕES (ADMIN ONLY) */}
        {activeTab === "settings" && activeMember.role === "admin" && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            
            {/* INTRO GRID HEADER / HERO */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500 rounded-full opacity-10 blur-3xl pointer-events-none -translate-y-12 translate-x-12" />
              <div className="relative">
                <span className="bg-indigo-500/25 text-indigo-200 border border-indigo-500/35 text-[10px] px-3 py-1 font-bold uppercase tracking-widest rounded-full">
                  Painel Administrativo do Sistema
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-3">Configurações Gerais do Lar</h2>
                <p className="text-slate-300 text-xs md:text-sm mt-2 max-w-2xl leading-relaxed">
                  Gerencie permissões de acesso da família, ajuste limites mensais de mesada de cada dependente, personalize moedas, idiomas e gerencie as metas de poupança coletivas.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* LEFT TWO COLUMNS: PROFILES MANAGEMENT & ALLOWANCE LIMITS */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* 1. MEMBERS PROFILE CRUD */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm relative">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-150">
                    <div>
                      <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
                        <Users className="w-5 h-5 text-indigo-600" />
                        Gerenciamento de Perfis & Acessos
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">CRUD completo de usuários familiares e atribuições de níveis administrativos</p>
                    </div>
                    <button
                      onClick={() => {
                        setNewMemberName("");
                        setNewMemberPin("");
                        setNewMemberRole("child");
                        setShowAddMemberModal(true);
                      }}
                      className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all h-fit cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Adicionar Membro
                    </button>
                  </div>

                  {/* PATRIMÔNIO FAMILIAR TOTAL SUMMARY (VALUES AND PERCENTAGES) */}
                  {(() => {
                    const commonFundVal = financeData.balance;
                    const membersVal = members.reduce((sum, m) => sum + m.balance, 0);
                    const assetsVal = (financeData.assets || []).reduce((sum, a) => sum + a.value, 0);
                    const totalWealth = commonFundVal + membersVal + assetsVal;
                    const commonPctReal = totalWealth > 0 ? (commonFundVal / totalWealth) * 100 : 0;
                    const assetsPctReal = totalWealth > 0 ? (assetsVal / totalWealth) * 100 : 0;
                    
                    return (
                      <div className="mb-6 p-5 bg-gradient-to-b from-slate-50 to-slate-100/50 rounded-2xl border border-slate-150 shadow-inner">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                          <div>
                            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                              Patrimônio Familiar Coletivo
                            </span>
                            <h4 className="text-xl font-black text-slate-800 mt-1.5">
                              {systemCurrency} {totalWealth.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </h4>
                          </div>
                          <div className="text-left sm:text-right flex flex-col items-start sm:items-end">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Fundo Comum Familiar</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              {activeMember?.role === "admin" && (
                                <div className="flex gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditCommonBalanceValue(commonFundVal.toString());
                                      setShowEditCommonBalanceModal(true);
                                    }}
                                    className="text-[9px] font-semibold text-indigo-650 hover:text-indigo-800 hover:underline cursor-pointer flex items-center gap-0.5 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-150 transition-all"
                                  >
                                    <Pencil className="w-2 h-2" /> Ajustar
                                  </button>
                                  <button
                                    type="button"
                                    onClick={handleZeroCommonFund}
                                    className="text-[9px] font-bold text-rose-600 hover:bg-rose-100/50 hover:text-rose-800 hover:underline cursor-pointer flex items-center gap-0.5 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-150 transition-all"
                                  >
                                    🧹 Zerar Fundo
                                  </button>
                                </div>
                              )}
                              <span className="text-sm font-extrabold text-indigo-600">
                                {systemCurrency} {commonFundVal.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="font-bold text-xs text-indigo-500">({commonPctReal.toFixed(1)}%)</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* STACKED BAR CHART */}
                        <div className="h-5 w-full bg-slate-200 rounded-full overflow-hidden flex shadow-inner border border-slate-350/10 gap-[2px]">
                          {/* Common Fund Segment */}
                          {commonPctReal > 0 && (
                            <div
                              style={{ width: `${commonPctReal}%` }}
                              className="h-full bg-indigo-600 hover:bg-indigo-700 transition-all relative group"
                              title={`Fundo Comum Familiar: ${commonPctReal.toFixed(1)}%`}
                            >
                              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          )}

                          {/* Member Segments */}
                          {members.map((m) => {
                            const mPctReal = totalWealth > 0 ? (m.balance / totalWealth) * 100 : 0;
                            if (mPctReal <= 0) return null;
                            return (
                              <div
                                key={m.id}
                                style={{ width: `${mPctReal}%` }}
                                className={`h-full bg-gradient-to-r ${m.avatarColor} transition-all relative group cursor-pointer`}
                                title={`${m.name}: ${mPctReal.toFixed(1)}%`}
                              >
                                <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            );
                          })}

                          {/* Assets segment */}
                          {assetsPctReal > 0 && (
                            <div
                              style={{ width: `${assetsPctReal}%` }}
                              className="h-full bg-amber-500 hover:bg-amber-600 transition-all relative group cursor-pointer"
                              title={`Ativos & Investimentos: ${assetsPctReal.toFixed(1)}%`}
                            >
                              <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          )}
                        </div>

                        {/* LEGEND WITH PILLS */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 text-[10px] text-slate-500">
                          <div className="flex items-center gap-1.5 font-bold">
                            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 flex-shrink-0" />
                            <span>🏦 Fundo Comum: <span className="text-slate-800 font-extrabold">{commonPctReal.toFixed(1)}%</span></span>
                          </div>
                          {members.map((m) => {
                            const mPctReal = totalWealth > 0 ? (m.balance / totalWealth) * 100 : 0;
                            return (
                              <div key={m.id} className="flex items-center gap-1.5 font-semibold">
                                <span className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${m.avatarColor} flex-shrink-0`} />
                                <span>{m.avatar} {m.name}: <span className="text-slate-850 font-extrabold">{mPctReal.toFixed(1)}%</span></span>
                              </div>
                            );
                          })}
                          {assetsPctReal > 0 && (
                            <div className="flex items-center gap-1.5 font-bold">
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 flex-shrink-0" />
                              <span>💼 Patrimônio / Ativos: <span className="text-slate-800 font-extrabold">{assetsPctReal.toFixed(1)}%</span></span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}

                  {/* PROFILES GRID */}
                  <div className="space-y-4">
                    {members.map((m) => {
                      return (
                        <div
                          key={m.id}
                          className="p-4 bg-slate-55 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:bg-slate-100/50"
                        >
                          <div className="flex items-center gap-3.5">
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${m.avatarColor} text-white flex items-center justify-center text-2xl shadow-sm relative flex-shrink-0`}>
                              {m.avatar}
                              {m.role === "admin" && (
                                <span className="absolute -top-1.5 -right-1.5 text-xs bg-slate-900 border border-slate-800 p-0.5 rounded-full" title="Administrador">
                                  🛡️
                                </span>
                              )}
                            </div>
                            <div className="space-y-1">
                              <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-1.5">
                                <span>{m.name}</span>
                                {m.id === activeMember.id && (
                                  <span className="text-[10px] font-bold bg-indigo-50 text-indigo-650 px-2 py-0.5 rounded-md border border-indigo-100">
                                    Meu Perfil
                                  </span>
                                )}
                              </h4>
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-slate-400">
                                <span className="uppercase text-[9px] font-black select-none tracking-wider text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
                                  {m.participationType || (m.role === "admin" ? "Pai" : "Filho")}
                                </span>
                                <span className="uppercase text-[9px] font-mono select-none tracking-wider text-slate-500">
                                  {m.role === "admin" ? t.roleAdmin : t.roleChild}
                                </span>
                                <span>•</span>
                                <div className="flex items-center gap-1 font-mono">
                                  <span>PIN:</span>
                                  <span className="font-medium text-slate-600 tracking-widest">{m.pin}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* DETAILS & ACTIONS */}
                          {(() => {
                            const commonFundVal = financeData.balance;
                            const membersVal = members.reduce((sum, member) => sum + member.balance, 0);
                            const totalWealth = commonFundVal + membersVal;
                            const mPctReal = totalWealth > 0 ? (m.balance / totalWealth) * 100 : 0;

                            return (
                              <div className="w-full sm:w-auto flex sm:items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200">
                                <div className="text-left sm:text-right space-y-0.5">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Saldo do Cofre</p>
                                  <p className="text-sm font-extrabold text-slate-800">
                                    {systemCurrency} {m.balance.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                  </p>
                                  {m.role === "child" && (m.id !== "m-3" || activeMember?.id === "m-3" || activeMember?.role === "admin") && (
                                    <p className="text-[10px] text-indigo-600 font-mono">
                                      Limite Mesada: {systemCurrency} {m.allowance.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </p>
                                  )}
                                  <div className="mt-1 flex items-center gap-1.5 justify-start sm:justify-end">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Colaboração:</span>
                                    <span className="text-[10px] font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-150 px-1.5 py-0.5 rounded-md">
                                      {mPctReal.toFixed(1)}%
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-1 border-l border-slate-200 pl-4">
                                  <button
                                    onClick={() => {
                                      setEditingMember(m);
                                      setEditMemberName(m.name);
                                      setEditMemberRole(m.role);
                                      setEditMemberPin(m.pin);
                                      setEditMemberBalance(m.balance.toString());
                                      setEditMemberAllowance(m.allowance.toString());
                                      const isStandard = ["Pai", "Mãe", "Filho", "Filha"].includes(m.participationType || "");
                                      setEditMemberParticipationType(m.participationType ? (isStandard ? m.participationType : "Outro") : (m.role === "admin" ? "Pai" : "Filho"));
                                      setEditMemberCustomParticipationType(m.participationType && !isStandard ? m.participationType : "");
                                    }}
                                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                                    title="Editar membro"
                                  >
                                    <Pencil className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteMember(m.id)}
                                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                                    title="Excluir membro"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            );
                          })()}

                        </div>
                      );
                    })}
                  </div>
                </div>



                {/* 5. GESTÃO DO PATRIMÔNIO COLETIVO (CRUD PATRIMÔNIO) */}
                <div id="ativos-crud-section" className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-indigo-600" />
                        Ativos & Patrimônio Familiar (CRUD)
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">Gerencie investimentos, veículos, imóveis e propriedades do lar</p>
                    </div>
                    {!showAddAssetInline && (
                      <button
                        onClick={() => {
                          setShowAddAssetInline(true);
                          setAddAssetName("");
                          setAddAssetType("investment");
                          setAddAssetValue("");
                          setAddAssetOwner("Família");
                          setAddAssetDescription("");
                        }}
                        className="text-xs text-indigo-600 hover:underline font-bold cursor-pointer flex items-center gap-1 bg-indigo-50 px-2.5 py-1 rounded"
                      >
                        <Plus className="w-3.5 h-3.5" /> Adicionar Ativo
                      </button>
                    )}
                  </div>

                  {/* INLINE ASSET SAVING FORM */}
                  {showAddAssetInline && (
                    <form onSubmit={handleCreateAsset} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-3 animate-in fade-in slide-in-from-top-3">
                      <div className="flex items-center justify-between pb-1">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Novo Item de Patrimônio</span>
                        <button
                          type="button"
                          onClick={() => setShowAddAssetInline(false)}
                          className="text-[10px] font-bold text-rose-500 hover:underline cursor-pointer"
                        >
                          Cancelar
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 mb-0.5">Nome do Ativo / Propriedade</label>
                          <input
                            type="text"
                            required
                            placeholder="Ex: Apartamento em Florianópolis"
                            value={addAssetName}
                            onChange={(e) => setAddAssetName(e.target.value)}
                            className="w-full text-xs text-slate-800 border-2 border-slate-200 focus:border-indigo-500 focus:outline-none rounded-xl px-2.5 py-1.5 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 mb-0.5">Categoria</label>
                          <select
                            value={addAssetType}
                            onChange={(e) => setAddAssetType(e.target.value)}
                            className="w-full text-xs text-[#334155] border-2 border-slate-200 focus:border-indigo-500 focus:outline-none rounded-xl px-2.5 py-1.5 bg-white font-sans cursor-pointer"
                          >
                            {assetCategories.map(cat => (
                              <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 mb-0.5">Valor Atual Estimado ({systemCurrency})</label>
                          <input
                            type="number"
                            required
                            step="0.01"
                            placeholder="Ex: 125000"
                            value={addAssetValue}
                            onChange={(e) => setAddAssetValue(e.target.value)}
                            className="w-full text-xs text-slate-800 font-extrabold border-2 border-slate-200 focus:border-indigo-500 focus:outline-none rounded-xl px-2.5 py-1.5 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 mb-0.5">Proprietário do Ativo</label>
                          <select
                            value={addAssetOwner}
                            onChange={(e) => setAddAssetOwner(e.target.value)}
                            className="w-full text-xs text-[#334155] border-2 border-slate-200 focus:border-indigo-500 focus:outline-none rounded-xl px-2.5 py-1.5 bg-white font-sans cursor-pointer"
                          >
                            <option value="Família">👪 Família (Geral)</option>
                            {members.map(m => (
                              <option key={m.id} value={m.name}>{m.avatar} {m.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 mb-0.5">Notas / Descrição Curta (Opcional)</label>
                        <textarea
                          placeholder="Notas adicionais sobre liquidez, rendimento ou taxas..."
                          value={addAssetDescription}
                          onChange={(e) => setAddAssetDescription(e.target.value)}
                          rows={2}
                          className="w-full text-xs text-slate-800 border-2 border-slate-200 focus:border-indigo-500 focus:outline-none rounded-xl px-2.5 py-1.5 bg-white resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" /> Salvar Novo Patrimônio
                      </button>
                    </form>
                  )}

                  {/* ASSETS LIST */}
                  <div className="space-y-3">
                    {(financeData.assets || []).length === 0 ? (
                      <div className="py-6 text-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
                        <p className="text-slate-400 text-xs font-bold">Nenhum ativo de patrimônio cadastrado.</p>
                        <p className="text-slate-300 text-[10px] mt-0.5">Adicione investimentos e propriedades para expandir o portfólio do lar.</p>
                      </div>
                    ) : (
                      (financeData.assets || []).map((asset) => {
                        const icon = getAssetTypeIcon(asset.type);
                        const categoryLabel = getAssetTypeLabel(asset.type);
                        return (
                          <div key={asset.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white hover:border-slate-200 transition-all">
                            <div className="flex items-start gap-3 min-w-0">
                              <span className="text-2xl mt-0.5 p-1 bg-slate-100 rounded-xl flex-shrink-0">{icon}</span>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-slate-800 text-xs truncate">{asset.name}</span>
                                  <span className="text-[10px] bg-slate-100 text-slate-500 border border-slate-200 px-1.5 py-0.5 rounded font-extrabold whitespace-nowrap">{categoryLabel}</span>
                                </div>
                                {asset.description && (
                                  <p className="text-[11px] text-slate-400 mt-1 leading-snug line-clamp-2">{asset.description}</p>
                                )}
                                <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-400">
                                  <span className="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-bold">🔑 {asset.owner}</span>
                                  <span>&bull;</span>
                                  <span>Atualizado: {asset.updatedAt}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                              <span className="font-mono text-xs font-black text-slate-800">
                                {systemCurrency} {asset.value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </span>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingAssetId(asset.id);
                                    setEditAssetName(asset.name);
                                    setEditAssetType(asset.type);
                                    setEditAssetValue(asset.value.toString());
                                    setEditAssetOwner(asset.owner);
                                    setEditAssetDescription(asset.description || "");
                                  }}
                                  className="text-[10px] font-bold text-slate-500 hover:text-indigo-600 hover:underline px-1.5 py-0.5 rounded cursor-pointer"
                                >
                                  Alterar
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteAsset(asset.id)}
                                  className="text-[10px] font-bold text-rose-500 hover:text-rose-700 hover:underline px-1.5 py-0.5 rounded cursor-pointer"
                                >
                                  Excluir
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: PREFERENCES, CURRENCY, LANGUAGE & COLLECTIVE SAVINGS GOALS CRUD */}
              <div className="space-y-8">
                
                {/* 3. HARDWARE SYSTEM CONFIGS */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                      <Globe className="w-5 h-5 text-indigo-600" />
                      Idioma & Moeda
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">Customize de acordo com o país ou localização de preferência</p>
                  </div>

                  {/* CHOOSE LANGUAGE */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 block">Idioma de Apresentação</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { code: "pt-BR", flag: "🇧🇷", label: "Português" },
                        { code: "en-US", flag: "🇺🇸", label: "English" },
                        { code: "es-ES", flag: "🇪🇸", label: "Español" }
                      ].map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleChangeLanguage(lang.code as any)}
                          type="button"
                          className={`py-2 px-1 text-xs font-bold rounded-xl border-2 flex flex-col items-center gap-1 transition-all ${
                            systemLanguage === lang.code
                              ? "border-indigo-600 bg-indigo-50/30 text-indigo-800 cursor-pointer"
                              : "border-slate-100 bg-white text-slate-500 hover:border-slate-250 hover:bg-slate-50 cursor-pointer"
                          }`}
                        >
                          <span className="text-xl">{lang.flag}</span>
                          <span className="text-[9px] truncate">{lang.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* CHOOSE DEFAULT CURRENCY */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 block">Moeda do Sistema</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { val: "R$", label: "BRL (R$)" },
                        { val: "$", label: "USD ($)" },
                        { val: "€", label: "EUR (€)" }
                      ].map((curr) => (
                        <button
                          key={curr.val}
                          onClick={() => handleChangeCurrency(curr.val)}
                          type="button"
                          className={`py-2 px-1 text-xs font-extrabold rounded-xl border-2 flex flex-col items-center gap-1 transition-all ${
                            systemCurrency === curr.val
                              ? "border-indigo-600 bg-indigo-50/30 text-indigo-800 cursor-pointer"
                              : "border-slate-100 bg-white text-slate-500 hover:border-slate-250 hover:bg-slate-50 cursor-pointer"
                          }`}
                        >
                          <span className="text-base font-mono font-bold">{curr.val}</span>
                          <span className="text-[9px] text-slate-400">{curr.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3.1 SYSTEM MAINTENANCE & DESTRUCTIVE RESET */}
                {!isDemoMode && (
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
                    <div>
                      <h3 className="font-extrabold text-rose-700 text-sm flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-rose-600 animate-pulse" />
                        Manutenção & Reinício
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">Zerar e redefinir o ambiente local do sistema familiar</p>
                    </div>

                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Se você adicionou lançamentos de teste ou deseja limpar o cofre comum com transações fictícias para iniciar do zero com sua própria família, use o botão abaixo.
                    </p>

                    <button
                      type="button"
                      onClick={handleResetSystem}
                      className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 hover:border-rose-300 font-extrabold text-xs py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <Trash2 className="w-4 h-4 text-rose-600" />
                      Zerar Todos os Lançamentos (Resetar Sistema)
                    </button>
                  </div>
                )}

                {/* 4. CRUD FOR METAS DE POUPANÇA COLETIVAS */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                        <PiggyBank className="w-5 h-5 text-indigo-600" />
                        Metas de Poupança Coletivas
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">CRUD completo para gerenciar objetivos globais do lar</p>
                    </div>
                    {!showAddGoalInline && (
                      <button
                        onClick={() => {
                          setShowAddGoalInline(true);
                          setAddGoalKey("goal_" + Date.now());
                          setAddGoalTitle("");
                          setAddGoalTarget("");
                          setAddGoalIcon("🎯");
                        }}
                        className="text-xs text-indigo-600 hover:underline font-bold cursor-pointer"
                      >
                        Nova Meta
                      </button>
                    )}
                  </div>

                  {/* INLINE GOAL SAVING FORM */}
                  {showAddGoalInline && (
                    <form onSubmit={handleCreateGoal} className="p-4 bg-slate-55 bg-slate-50 border border-slate-100 rounded-2xl space-y-3 animate-in fade-in slide-in-from-top-3">
                      <div className="flex items-center justify-between pb-1">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Nova Meta Coletiva</span>
                        <button
                          type="button"
                          onClick={() => setShowAddGoalInline(false)}
                          className="text-[10px] font-bold text-rose-500 hover:underline cursor-pointer"
                        >
                          Cancelar
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-2">
                          <label className="block text-[9px] font-bold text-slate-400 mb-0.5">Título da Poupança</label>
                          <input
                            type="text"
                            required
                            placeholder="Ex: Reforma da Sala"
                            value={addGoalTitle}
                            onChange={(e) => setAddGoalTitle(e.target.value)}
                            className="w-full text-xs text-slate-800 border-2 border-slate-200 focus:border-indigo-500 focus:outline-none rounded-xl px-2.5 py-1.5 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 mb-0.5">Icon</label>
                          <select
                            value={addGoalIcon}
                            onChange={(e) => setAddGoalIcon(e.target.value)}
                            className="w-full text-xs text-slate-800 border-2 border-slate-200 focus:border-indigo-500 focus:outline-none rounded-xl px-2.5 py-1.5 bg-white font-sans"
                          >
                            <option value="🎯">🎯 Alvo</option>
                            <option value="✈️">✈️ Viagem</option>
                            <option value="🏥">🏥 Emergência</option>
                            <option value="🚗">🚗 Carro</option>
                            <option value="🏡">🏡 Casa</option>
                            <option value="🎮">🎮 Lazer</option>
                            <option value="🎓">🎓 Estudos</option>
                            <option value="💻">💻 Computador</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 mb-0.5">Meta Alvo ({systemCurrency})</label>
                        <input
                          type="number"
                          required
                          step="0.01"
                          placeholder="Ex: 5000.00"
                          value={addGoalTarget}
                          onChange={(e) => setAddGoalTarget(e.target.value)}
                          className="w-full text-xs text-slate-800 font-extrabold border-2 border-slate-200 focus:border-indigo-500 focus:outline-none rounded-xl px-2.5 py-1.5 bg-white"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                      >
                        Salvar Nova Meta
                      </button>
                    </form>
                  )}

                  {/* SAVINGS LIST */}
                  <div className="space-y-4">
                    {Object.keys(financeData.goals).map((goalKey) => {
                      const goal = (financeData.goals as Record<string, any>)[goalKey];
                      const title = goal.title || (goalKey === "travel" ? "Viagem" : "Emergência");
                      const icon = goal.icon || (goalKey === "travel" ? "✈️" : "🏥");
                      const isDefault = goalKey === "travel" || goalKey === "emergency";
                      const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));

                      return (
                        <div key={goalKey} className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl space-y-3 transition-all hover:bg-white hover:border-slate-200">
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span className="text-slate-700 flex items-center gap-1.5 truncate">
                              <span>{icon}</span>
                              <span className="truncate">{title}</span>
                              {isDefault && <span className="text-[7.5px] uppercase bg-slate-200 text-slate-500 py-0.5 px-1.5 rounded-md font-bold leading-none select-none flex-shrink-0">Fixo</span>}
                            </span>
                            <span className="text-slate-500 font-mono text-[11px] flex-shrink-0">
                              {systemCurrency} {goal.current.toFixed(0)} / {goal.target.toFixed(0)}
                            </span>
                          </div>

                          {/* Progress Line */}
                          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div className="bg-gradient-to-r from-teal-500 via-indigo-500 to-indigo-600 h-full rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                          </div>

                          {/* ACTIONS */}
                          <div className="flex items-center justify-between pt-1 border-t border-slate-100/60">
                            <span className="text-[10px] font-extrabold text-indigo-600 font-mono">{pct}% Concluído</span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => {
                                  setEditingGoalKey(goalKey);
                                  setEditGoalTitle(title);
                                  setEditGoalTarget(goal.target.toString());
                                  setEditGoalIcon(icon);
                                  setEditGoalCurrent(goal.current.toString());
                                }}
                                className="text-[10px] font-bold text-slate-500 hover:text-indigo-600 hover:underline px-2 py-0.5 rounded cursor-pointer"
                              >
                                Alterar
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteGoal(goalKey)}
                                className="text-[10px] font-bold text-rose-500 hover:text-rose-700 hover:underline px-2 py-0.5 rounded cursor-pointer"
                              >
                                Excluir
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>

            {/* EXPANDED SECTION: EXTRATO EM LISTA & CRUD DE CATEGORIAS (ADMIN ONLY) */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-8 mt-8 col-span-1 lg:col-span-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <h3 className="font-extrabold text-slate-800 text-lg flex items-center gap-2">
                    <ListFilter className="w-5 h-5 text-indigo-600" />
                    Listagem de Extrato & Gestão de Categorias do Sistema (Administrador)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Visão unificada de fluxo de caixa e controle total de categorias de gastos, receitas e patrimônios</p>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* COL 1 & 2: DYNAMIC EXTRATO EM LISTA (CRUD) */}
                <div className="xl:col-span-2 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider text-indigo-700 font-sans">📜 Extrato Geral de Lançamentos</h4>
                    
                    {/* FILTERS TOOLBAR */}
                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        type="text"
                        placeholder="Buscar por descrição..."
                        value={statementSearch}
                        onChange={(e) => setStatementSearch(e.target.value)}
                        className="text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 w-full sm:w-44 text-slate-800 bg-white"
                      />
                      <select
                        value={statementTypeFilter}
                        onChange={(e) => setStatementTypeFilter(e.target.value as any)}
                        className="text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-800 font-sans cursor-pointer"
                      >
                        <option value="all">Todos os tipos</option>
                        <option value="income">Entrada (Receita)</option>
                        <option value="expense">Saída (Gasto)</option>
                      </select>
                    </div>
                  </div>

                  {/* STATEMENT LIST/TABLE */}
                  <div className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/50 max-h-[480px] overflow-y-auto">
                    {(() => {
                      const filteredTxs = transactions.filter(tx => {
                        const matchesSearch = tx.description.toLowerCase().includes(statementSearch.toLowerCase());
                        const matchesType = statementTypeFilter === "all" || tx.type === statementTypeFilter;
                        return matchesSearch && matchesType;
                      });

                      if (filteredTxs.length === 0) {
                        return (
                          <div className="p-8 text-center text-slate-400 text-xs font-bold">
                            Nenhum lançamento encontrado com os filtros selecionados.
                          </div>
                        );
                      }

                      return (
                        <div className="divide-y divide-slate-100">
                          {filteredTxs.map(tx => {
                            const isIncome = tx.type === "income";
                            const isCommon = tx.accountType === "common" || !tx.accountType;
                            return (
                              <div key={tx.id} className="p-4 hover:bg-slate-50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="space-y-1">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-[10px] font-bold text-slate-400 font-mono">{tx.date}</span>
                                    <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                                      isCommon ? "bg-indigo-55 bg-indigo-50 text-indigo-750 text-indigo-700 border border-indigo-150" : "bg-teal-50 text-teal-700 border border-teal-150"
                                    }`}>
                                      {isCommon ? "Fundo Comum" : "Individual"}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-semibold">por {tx.member}</span>
                                  </div>
                                  <p className="font-extrabold text-slate-705 text-slate-700 text-xs line-clamp-1">{tx.description}</p>
                                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold">
                                    <span>Categoria:</span>
                                    <span className="bg-slate-200/60 px-1.5 py-0.2 rounded font-sans">{tx.category}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-4 justify-between sm:justify-end">
                                  <span className={`font-mono text-xs font-black ${isIncome ? "text-emerald-600" : "text-rose-600"}`}>
                                    {isIncome ? "+" : "-"} {systemCurrency} {tx.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                  </span>
                                  <div className="flex items-center gap-1">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setEditTxDesc(tx.description);
                                        setEditTxAmount(tx.amount.toString());
                                        setEditTxType(tx.type);
                                        setEditTxCategory(tx.category);
                                        setEditTxMember(tx.member);
                                        setEditingTx(tx);
                                        setShowEditTxModal(true);
                                      }}
                                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-650 hover:bg-indigo-50 transition-all cursor-pointer"
                                      title="Editar Lançamento"
                                    >
                                      <Pencil className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteTransaction(tx.id)}
                                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all cursor-pointer"
                                      title="Excluir Lançamento"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* COL 3: CATEGORIES LISTS CRUD & FORM */}
                <div className="space-y-6">
                  <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider text-indigo-700 font-sans">🏷️ Gestão de Categorias</h4>

                  {/* MINI FORM TO CREATE NEW CATEGORY */}
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-3">
                    <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block font-sans">Cadastrar Nova Categoria</span>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="col-span-3">
                        <label className="block text-[8px] font-bold text-slate-400 mb-0.5">Nome do Item</label>
                        <input
                          type="text"
                          placeholder="Ex: Streaming, Cashback, Crypto..."
                          value={newCatName}
                          onChange={(e) => setNewCatName(e.target.value)}
                          className="w-full text-xs text-slate-800 border-2 border-slate-200 focus:border-indigo-500 focus:outline-none rounded-xl px-2.5 py-1.5 bg-white font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-bold text-slate-400 mb-0.5">Emoji</label>
                        <select
                          value={newCatIcon}
                          onChange={(e) => setNewCatIcon(e.target.value)}
                          className="w-full text-xs text-[#334155] border-2 border-slate-200 focus:border-indigo-500 focus:outline-none rounded-xl px-2 py-1.5 bg-white font-sans text-center cursor-pointer"
                        >
                          <option value="🏷️">🏷️</option>
                          <option value="🍿">🍿</option>
                          <option value="🍇">🍇</option>
                          <option value="🏠">🏠</option>
                          <option value="📖">📖</option>
                          <option value="🚗">🚗</option>
                          <option value="🍕">🍕</option>
                          <option value="🛒">🛒</option>
                          <option value="🎓">🎓</option>
                          <option value="🌱">🌱</option>
                          <option value="💻">💻</option>
                          <option value="🎮">🎮</option>
                          <option value="💸">💸</option>
                          <option value="💼">💼</option>
                          <option value="💰">💰</option>
                          <option value="📈">📈</option>
                          <option value="🏡">🏡</option>
                          <option value="🏦">🏦</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 pt-1">
                      <button
                        type="button"
                        onClick={() => handleAddCategory("expense")}
                        className="py-1.5 px-2 bg-rose-50 border border-rose-150 hover:bg-rose-100 text-rose-700 text-[10px] font-bold rounded-lg transition-all cursor-pointer"
                      >
                        + Gasto
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddCategory("income")}
                        className="py-1.5 px-2 bg-emerald-50 border border-emerald-150 hover:bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-lg transition-all cursor-pointer"
                      >
                        + Receito
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddCategory("asset")}
                        className="py-1.5 px-2 bg-indigo-50 border border-indigo-150 hover:bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded-lg transition-all cursor-pointer"
                      >
                        + Ativo
                      </button>
                    </div>
                  </div>

                  {/* EDITING CATEGORY INLINE PANE */}
                  {editingCatId && (
                    <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-indigo-750 uppercase font-sans">Editar Categoria</span>
                        <button onClick={() => setEditingCatId(null)} className="text-[9px] text-rose-500 hover:underline cursor-pointer">Cancelar</button>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        <input
                          type="text"
                          value={catFormName}
                          onChange={(e) => setCatFormName(e.target.value)}
                          className="col-span-3 text-xs border border-indigo-250 bg-white rounded-xl px-2.5 py-1.5 font-sans text-slate-800"
                        />
                        <select
                          value={catFormIcon}
                          onChange={(e) => setCatFormIcon(e.target.value)}
                          className="text-xs border border-indigo-250 bg-white rounded-xl px-2.5 py-1.5 font-sans text-slate-800 cursor-pointer"
                        >
                          <option value="🏷️">🏷️</option>
                          <option value="🍿">🍿</option>
                          <option value="🍇">🍇</option>
                          <option value="🏠">🏠</option>
                          <option value="📖">📖</option>
                          <option value="🚗">🚗</option>
                          <option value="🍕">🍕</option>
                          <option value="🛒">🛒</option>
                          <option value="🎓">🎓</option>
                          <option value="🌱">🌱</option>
                          <option value="💻">💻</option>
                          <option value="🎮">🎮</option>
                          <option value="💸">💸</option>
                          <option value="💼">💼</option>
                          <option value="💰">💰</option>
                          <option value="📈">📈</option>
                          <option value="🏡">🏡</option>
                          <option value="🏦">🏦</option>
                        </select>
                      </div>
                      <button
                        type="button"
                        onClick={handleSaveEditCategory}
                        className="w-full py-1.5 bg-indigo-650 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl cursor-pointer"
                      >
                        Atualizar Categoria
                      </button>
                    </div>
                  )}

                  {/* ACCORDION/LIST OF CATEGORIES BY GROUPS */}
                  <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                    
                    {/* EXPENSES GROUP */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-rose-500 uppercase block font-sans">Saídas / Gastos ({expenseCategories.length})</span>
                      <div className="grid grid-cols-1 gap-1.5">
                        {expenseCategories.map(cat => (
                          <div key={cat.id} className="flex items-center justify-between p-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700">
                            <span className="flex items-center gap-1.5 font-sans"><span>{cat.icon}</span> <span>{cat.name}</span></span>
                            <div className="flex gap-1.5">
                              <button onClick={() => handleStartEditCategory("expense", cat)} className="text-[10px] text-indigo-600 hover:underline cursor-pointer">Editar</button>
                              <button onClick={() => handleDeleteCategory("expense", cat.id)} className="text-[10px] text-rose-500 hover:underline cursor-pointer">Remover</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* INCOME GROUP */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-emerald-600 uppercase block font-sans">Entradas / Receitas ({incomeCategories.length})</span>
                      <div className="grid grid-cols-1 gap-1.5">
                        {incomeCategories.map(cat => (
                          <div key={cat.id} className="flex items-center justify-between p-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700">
                            <span className="flex items-center gap-1.5 font-sans"><span>{cat.icon}</span> <span>{cat.name}</span></span>
                            <div className="flex gap-1.5">
                              <button onClick={() => handleStartEditCategory("income", cat)} className="text-[10px] text-indigo-600 hover:underline cursor-pointer">Editar</button>
                              <button onClick={() => handleDeleteCategory("income", cat.id)} className="text-[10px] text-rose-500 hover:underline cursor-pointer">Remover</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ASSET GROUP */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-indigo-600 uppercase block font-sans">Ativos / Patrimônio ({assetCategories.length})</span>
                      <div className="grid grid-cols-1 gap-1.5">
                        {assetCategories.map(cat => (
                          <div key={cat.id} className="flex items-center justify-between p-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700">
                            <span className="flex items-center gap-1.5 font-sans"><span>{cat.icon}</span> <span>{cat.name}</span></span>
                            <div className="flex gap-1.5">
                              <button onClick={() => handleStartEditCategory("asset", cat)} className="text-[10px] text-indigo-600 hover:underline cursor-pointer">Editar</button>
                              <button onClick={() => handleDeleteCategory("asset", cat.id)} className="text-[10px] text-rose-500 hover:underline cursor-pointer">Remover</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </div>

          </div>
        )}

        {/* VIEW 4: ACCESS DENIED (CHILD ATTEMPTING CONFIGS PAGE ATTEMPT) */}
        {activeTab === "settings" && activeMember.role !== "admin" && (
          <div className="bg-white rounded-3xl p-8 text-center max-w-sm mx-auto shadow-sm border border-slate-100 mt-12 animate-in fade-in zoom-in-95">
            <Shield className="w-12 h-12 text-rose-500 mx-auto mb-4" />
            <h3 className="font-bold text-slate-800 text-lg mb-2">Acesso Negado</h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-6">
              Apenas os administradores do lar possuem credenciais e privilégios para visualizar, alterar ou configurar as chaves do sistema.
            </p>
            <button
              onClick={() => setActiveTab("dashboard")}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              Voltar ao Início
            </button>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="mt-12 bg-slate-900 text-slate-400 border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs">&copy; 2026 Gestão Financeira Familiar. Gerenciador Financeiro para Famílias Conectadas.</p>
          <p className="text-[10px] text-slate-600 mt-2">
            Segurança de ponta a ponta e aconselhamento inteligente alimentado por inteligência artificial (Gemini SDK).
          </p>
        </div>
      </footer>

      </div>

      {/* MODAL: CHORE CREATE / UPDATE (ADMINS ONLY) */}
      {showChoreModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 text-base">
                {editingChore ? "Editar Tarefa de Educação" : "Nova Tarefa de Educação"}
              </h3>
              <button
                onClick={() => {
                  setShowChoreModal(false);
                  setEditingChore(null);
                }}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 font-bold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveChore} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Título da Tarefa</label>
                <input
                  type="text"
                  required
                  value={choreFormTitle}
                  onChange={(e) => setChoreFormTitle(e.target.value)}
                  placeholder="Ex: Lavar louça ou Cuidar das plantas"
                  className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Recompensa (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={choreFormReward}
                  onChange={(e) => setChoreFormReward(e.target.value)}
                  placeholder="Ex: 15.00"
                  className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Direcionar para (Membro Família)</label>
                <select
                  value={choreFormAssignedTo}
                  onChange={(e) => setChoreFormAssignedTo(e.target.value)}
                  className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-sm bg-white"
                >
                  <option value="all">🌐 Qualquer Membro (Livre)</option>
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.avatar} {m.name} ({m.role === "admin" ? "Responsável" : "Dependente"})
                    </option>
                  ))}
                </select>
              </div>

              <p className="text-[10px] text-slate-400 italic">
                Tarefas ajudam a ensinar cooperação e o valor do trabalho recompensado para as crianças.
              </p>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-2.5 rounded-xl transition-colors shadow-md shadow-indigo-100 active:scale-95"
              >
                {editingChore ? "Salvar Alterações" : "Criar Tarefa"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: BUDGET TETO CAP (ADMINS ONLY) */}
      {showBudgetModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 text-base">Ajustar Teto de Gastos Familiar</h3>
              <button
                onClick={() => setShowBudgetModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateBudget} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Novo Limite Mensal (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={newBudgetLimit}
                  onChange={(e) => setNewBudgetLimit(e.target.value)}
                  placeholder="Ex: 5000"
                  className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-sm"
                />
              </div>

              <p className="text-[10px] text-slate-400 italic">
                O limite mensal é usado como régua de acompanhamento no painel consolidado familiar.
              </p>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-2.5 rounded-xl transition-colors shadow-md shadow-indigo-100 active:scale-95"
              >
                Salvar Limite
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: AJUSTAR SALDO DO COFRE COMUM (ADMINS ONLY) */}
      {showEditCommonBalanceModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 text-base">Ajustar Saldo do Fundo Comum</h3>
              <button
                onClick={() => setShowEditCommonBalanceModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateCommonBalance} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Novo Saldo Disponível ({systemCurrency})</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={editCommonBalanceValue}
                  onChange={(e) => setEditCommonBalanceValue(e.target.value)}
                  placeholder="Ex: 5000.00"
                  className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-sm font-semibold"
                />
              </div>

              <p className="text-[10px] text-slate-400 leading-relaxed italic">
                O saldo do fundo comum (Cofre Comum) constitui a parcela líquida e principal do Patrimônio Coletivo Familiar. Alterações manuais geram um registro administrativo de segurança de rastreabilidade.
              </p>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-2.5 rounded-xl transition-colors shadow-md shadow-indigo-100 active:scale-95 cursor-pointer"
              >
                Confirmar Ajuste de Saldo
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT TRANSACTION (ADMIN ONLY CRUD) */}
      {showEditTxModal && editingTx && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Pencil className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-sm md:text-base leading-tight">Editar Movimentação</h3>
                  <p className="text-[10px] text-slate-400">Ref.: {editingTx.id}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowEditTxModal(false);
                  setEditingTx(null);
                }}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                title="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditTx} className="space-y-4">
              {/* TYPE SWITCH & FAMILY MEMBER ATTR */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Tipo</label>
                  <select
                    value={editTxType}
                    onChange={(e) => {
                      const newType = e.target.value as "income" | "expense";
                      setEditTxType(newType);
                      setEditTxCategory(newType === "expense" ? "Alimentação" : "Trabalho");
                    }}
                    className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-xs font-bold font-sans"
                  >
                    <option value="expense">💸 Saída Gasto</option>
                    <option value="income">📈 Entrada Receita</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Atribuído a</label>
                  <select
                    value={editTxMember}
                    onChange={(e) => setEditTxMember(e.target.value)}
                    className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-xs font-sans"
                  >
                    {members.map((m) => (
                      <option key={m.id} value={m.name}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Descrição</label>
                <input
                  type="text"
                  required
                  value={editTxDesc}
                  onChange={(e) => setEditTxDesc(e.target.value)}
                  placeholder="Ex: Supermercado, Aluguel..."
                  className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-xs"
                />
              </div>

              {/* VALUE & CATEGORY */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Valor (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    min="0.01"
                    value={editTxAmount}
                    onChange={(e) => setEditTxAmount(e.target.value)}
                    placeholder="0,00"
                    className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-xs font-bold font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Categoria</label>
                  <select
                    value={editTxCategory}
                    onChange={(e) => {
                      setEditTxCategory(e.target.value);
                      if (e.target.value !== "Metas de Poupança") {
                        setEditTxGoalKey("");
                      }
                    }}
                    className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-xs font-sans"
                  >
                    {editTxType === "expense" ? (
                      <>
                        {expenseCategories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                        ))}
                        <option value="Metas de Poupança">🎯 Metas de Poupança</option>
                      </>
                    ) : (
                      <>
                        {incomeCategories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                        ))}
                        <option value="Metas de Poupança">🎯 Resgate de Meta</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              {/* CONDITIONAL GOAL SELECTOR */}
              {editTxCategory === "Metas de Poupança" && (
                <div className="animate-in fade-in duration-200 bg-indigo-50/50 p-2.5 rounded-xl border border-indigo-100">
                  <label className="block text-[10px] font-bold text-indigo-700 uppercase mb-1">Qual meta de poupança?</label>
                  <select
                    required
                    value={editTxGoalKey}
                    onChange={(e) => setEditTxGoalKey(e.target.value as any)}
                    className="w-full text-slate-800 border border-slate-200 focus:border-indigo-500 focus:outline-none bg-white rounded-xl px-2.5 py-1.5 text-xs font-bold font-sans"
                  >
                    <option value="">-- Selecione uma Meta --</option>
                    <option value="travel">✈️ Viagem de Férias (R$ {financeData.goals.travel.current.toFixed(2)})</option>
                    <option value="emergency">🛡️ Reserva de Emergência (R$ {financeData.goals.emergency.current.toFixed(2)})</option>
                  </select>
                </div>
              )}

              <p className="text-[10px] text-slate-400 italic leading-snug">
                ⚠️ Ao salvar, o impacto financeiro anterior deste lançamento será estornado e o novo cálculo será reaplicado ao caixa comum e às metas.
              </p>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-md active:scale-95"
                >
                  Confirmar Alterações
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditTxModal(false);
                    setEditingTx(null);
                  }}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-all"
                >
                  Voltar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CONTRIBUTE TO SAVINGS GOALS */}
      {showGoalModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 text-base capitalize">
                Alocar Repasse de Meta - {showGoalModal === "travel" ? "Viagem" : "Reserva"}
              </h3>
              <button
                onClick={() => setShowGoalModal(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleContributeGoal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Qual valor deseja transferir? (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  max={activeMember?.role === "child" ? activeMember.balance : financeData.balance}
                  value={goalContribution}
                  onChange={(e) => setGoalContribution(e.target.value)}
                  placeholder="0,00"
                  className="w-full text-slate-800 border border-slate-200 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-sm"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="text-[11px] text-slate-500 leading-normal text-slate-600">
                  {activeMember?.role === "child" ? (
                    <>
                      🪙 <span className="font-extrabold text-indigo-700">Seu Saldo Pessoal:</span> R$ {(activeMember?.balance || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <br />
                      Esta quantia será sacada do seu cofre individual de dependente e transferida como investimento para a meta da família!
                    </>
                  ) : (
                    <>
                      💵 <span className="font-extrabold text-indigo-700">Saldo do Cofre Comum:</span> R$ {financeData.balance.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <br />
                      A quantia inserida será removida do tesouro comum e reservada na meta selecionada.
                    </>
                  )}
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-2.5 rounded-xl transition-all shadow-md active:scale-95"
              >
                Efetivar Reserva de Capital
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT MEMBER PROFILE (ADMIN ONLY CRUD) */}
      {editingMember && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-extrabold text-slate-800 text-base">Editar Perfil Familiar</h3>
              <button
                type="button"
                onClick={() => setEditingMember(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-650 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditMember} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Nome do Membro</label>
                <input
                  type="text"
                  required
                  value={editMemberName}
                  onChange={(e) => setEditMemberName(e.target.value)}
                  className="w-full text-slate-850 text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Nível de Acesso (Perfis)</label>
                <select
                  value={editMemberRole}
                  onChange={(e) => {
                    const nextRole = e.target.value as any;
                    setEditMemberRole(nextRole);
                    if (nextRole === "admin" && (editMemberParticipationType === "Filho" || editMemberParticipationType === "Filha")) {
                      setEditMemberParticipationType("Pai");
                    } else if (nextRole === "child" && (editMemberParticipationType === "Pai" || editMemberParticipationType === "Mãe")) {
                      setEditMemberParticipationType("Filho");
                    }
                  }}
                  className="w-full text-slate-850 text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-xs font-sans bg-white"
                >
                  <option value="admin">🛡️ Responsável (Administrador)</option>
                  <option value="child">👦 Dependente (Apenas Visualização)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Participação na Família</label>
                <select
                  value={editMemberParticipationType}
                  onChange={(e) => setEditMemberParticipationType(e.target.value)}
                  className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-xs bg-white"
                >
                  <option value="Pai">👨‍💼 Pai</option>
                  <option value="Mãe">👩‍💼 Mãe</option>
                  <option value="Filho">👦 Filho</option>
                  <option value="Filha">👧 Filha</option>
                  <option value="Outro">⚙️ Outro tipo (Customizado)</option>
                </select>
              </div>

              {editMemberParticipationType === "Outro" && (
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Especifique o Outro Tipo</label>
                  <input
                    type="text"
                    required
                    value={editMemberCustomParticipationType}
                    onChange={(e) => setEditMemberCustomParticipationType(e.target.value)}
                    placeholder="Ex: Tio, Avó, Madrinha"
                    className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-xs"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">PIN Segurança (4 Dígitos)</label>
                  <input
                    type="password"
                    maxLength={4}
                    required
                    value={editMemberPin}
                    onChange={(e) => setEditMemberPin(e.target.value)}
                    className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-xs font-mono tracking-widest text-center"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Saldo Atual ({systemCurrency})</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editMemberBalance}
                    onChange={(e) => setEditMemberBalance(e.target.value)}
                    className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-xs font-bold"
                  />
                </div>
              </div>

              {editMemberRole === "child" && (
                <div className="animate-in fade-in duration-200">
                  <label className="block text-[10px] font-bold text-indigo-700 uppercase mb-1">Limite da Mesada Mensual ({systemCurrency})</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editMemberAllowance}
                    onChange={(e) => setEditMemberAllowance(e.target.value)}
                    className="w-full text-indigo-900 border-2 border-indigo-100 focus:border-indigo-600 focus:outline-none rounded-xl px-3 py-2 text-xs font-extrabold"
                  />
                </div>
              )}

              <div className="flex gap-2.5 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-md"
                >
                  Confirmar Ajustes
                </button>
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-all"
                >
                  Voltar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT SAVINGS GOAL (ADMIN ONLY CRUD) */}
      {editingGoalKey && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-extrabold text-slate-800 text-base">Alterar Meta Coletiva</h3>
              <button
                type="button"
                onClick={() => setEditingGoalKey(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditGoal} className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Título da Meta</label>
                  <input
                    type="text"
                    required
                    value={editGoalTitle}
                    onChange={(e) => setEditGoalTitle(e.target.value)}
                    className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Emoji Icon</label>
                  <select
                    value={editGoalIcon}
                    onChange={(e) => setEditGoalIcon(e.target.value)}
                    className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-xs font-sans"
                  >
                    <option value="🎯">🎯 Alvo</option>
                    <option value="✈️">✈️ Viagem</option>
                    <option value="🏥">🏥 Emergência</option>
                    <option value="🚗">🚗 Carro</option>
                    <option value="🏡">🏡 Casa</option>
                    <option value="🎮">🎮 Lazer</option>
                    <option value="🎓">🎓 Estudos</option>
                    <option value="💻">💻 Computador</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Meta Acumulativa Alvo ({systemCurrency})</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={editGoalTarget}
                  onChange={(e) => setEditGoalTarget(e.target.value)}
                  className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Saldo Acumulado Atual ({systemCurrency})</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={editGoalCurrent}
                  onChange={(e) => setEditGoalCurrent(e.target.value)}
                  className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-xs font-bold bg-amber-50"
                />
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed italic">
                  * Alterações no saldo acumulado transferem recursos automaticamente entre a meta e o Cofre Comum.
                </p>
              </div>

               <div className="flex flex-col gap-2 pt-2">
                <div className="flex gap-2.5">
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-md"
                  >
                    Salvar Alterações
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingGoalKey(null)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-all"
                  >
                    Voltar
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    handleDeleteGoal(editingGoalKey);
                    setEditingGoalKey(null);
                  }}
                  className="w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-150 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  🗑️ Excluir esta Poupança Coletiva
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT FAMILY ASSET (ADMIN ONLY CRUD) */}
      {editingAssetId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-extrabold text-slate-800 text-base">Alterar Item de Patrimônio</h3>
              <button
                type="button"
                onClick={() => setEditingAssetId(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditAsset} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Nome do Ativo</label>
                <input
                  type="text"
                  required
                  value={editAssetName}
                  onChange={(e) => setEditAssetName(e.target.value)}
                  className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Categoria do Ativo</label>
                  <select
                    value={editAssetType}
                    onChange={(e) => setEditAssetType(e.target.value)}
                    className="w-full text-[#334155] border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-xs font-sans cursor-pointer"
                  >
                    {assetCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Proprietário</label>
                  <select
                    value={editAssetOwner}
                    onChange={(e) => setEditAssetOwner(e.target.value)}
                    className="w-full text-[#334155] border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-xs font-sans cursor-pointer"
                  >
                    <option value="Família">👪 Família (Geral)</option>
                    {members.map(m => (
                      <option key={m.id} value={m.name}>{m.avatar} {m.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Valor Atual Avaliado ({systemCurrency})</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={editAssetValue}
                  onChange={(e) => setEditAssetValue(e.target.value)}
                  className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-xs font-extrabold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Descrição / Notas (Opcional)</label>
                <textarea
                  value={editAssetDescription}
                  onChange={(e) => setEditAssetDescription(e.target.value)}
                  rows={2}
                  className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-xs resize-none"
                  placeholder="Detalhes adicionais..."
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Salvar Alterações
                </button>
                <button
                  type="button"
                  onClick={() => setEditingAssetId(null)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Voltar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Simulated Email Widget for easy testing */}
      <AnimatePresence>
        {simulatedEmail && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-4 right-4 z-50 max-w-sm w-full bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-800 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-slate-800 to-indigo-950 p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-300">Caixa de Entrada Segura (Demo)</span>
              </div>
              <button
                type="button"
                onClick={() => setSimulatedEmail(null)}
                className="text-slate-400 hover:text-white transition-colors"
                title="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3">
              <div className="space-y-1 text-slate-400 text-[11px]">
                <p><span className="font-bold text-slate-300">Para:</span> {simulatedEmail.to}</p>
                <p><span className="font-bold text-slate-300">Assunto:</span> {simulatedEmail.subject}</p>
                <p><span className="font-bold text-slate-300">Enviado em:</span> Agora mesmo</p>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800/80">
                <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line font-medium">
                  {simulatedEmail.body}
                </p>
                <div className="mt-3 flex items-center justify-between bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400">Código de Reset:</span>
                  <span className="font-mono text-xs font-black tracking-widest bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30 select-all font-black">
                    {simulatedEmail.code}
                  </span>
                </div>
              </div>

              <div className="text-[10px] text-slate-500/90 text-center flex items-center justify-center gap-1.5 pt-1">
                <Mail className="w-3.5 h-3.5 text-slate-600" />
                <span>Ambiente local de simulação offline</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL: GUIA COMPLETO DE USO - COMO FUNCIONA O SISTEMA */}
      {showDemoExplanationModal && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full text-slate-800 shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-900 to-slate-900 p-6 text-white flex-shrink-0 flex justify-between items-center border-b border-indigo-950">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-indigo-350">
                  <BookOpen className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base tracking-tight text-white uppercase tracking-wider">Guia de Uso & Instruções</h3>
                  <p className="text-xs text-indigo-200 mt-0.5">Aprenda a cooperar com o cofre virtual familiar</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowDemoExplanationModal(false)}
                className="p-1.5 rounded-xl text-indigo-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Fechar Guia"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content (Scrollable Container) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
              
              {/* Intro Banner */}
              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-start gap-3">
                <div className="text-2xl mt-0.5">🚀</div>
                <div>
                  <h4 className="font-black text-indigo-900 text-sm">Pronto para transformar a educação financeira familiar?</h4>
                  <p className="text-xs text-indigo-700 leading-relaxed font-semibold mt-1">
                    Esta aplicação simula de forma lúdica um cofre comum, facilitando gastos transparentes, definição de metas conjuntas e incentivos aos filhos por tarefas domésticas.
                  </p>
                </div>
              </div>

              {/* Core Pillars */}
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-1">Pilares Fundamentais do Sistema</span>
                
                {/* 1. Cofre Comum */}
                <div className="p-4 bg-white border border-slate-150 rounded-2xl flex gap-3.5 shadow-sm">
                  <span className="text-2xl p-2 bg-slate-50 border border-slate-100 rounded-xl flex-shrink-0 h-fit">💰</span>
                  <div className="space-y-1">
                    <h5 className="font-extrabold text-slate-800 text-sm">Fundo Coletivo (Cofre Comum)</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      É o caixa unificado da família. Todas as receitas e despesas familiares são debitadas daqui. O saldo central permite fazer contribuições coletivas e reservar valores.
                    </p>
                  </div>
                </div>

                {/* 2. Níveis de Privilégios */}
                <div className="p-4 bg-white border border-slate-150 rounded-2xl flex gap-3.5 shadow-sm">
                  <span className="text-2xl p-2 bg-slate-50 border border-slate-100 rounded-xl flex-shrink-0 h-fit">🛡️</span>
                  <div className="space-y-1">
                    <h5 className="font-extrabold text-slate-800 text-sm">Níveis de Perfis & Códigos PIN</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      O sistema diferencia dois tipos de acessos protegidos por <strong>PIN de 4 dígitos</strong>:
                    </p>
                    <ul className="text-xs text-slate-500 list-disc pl-5 pt-1 space-y-1">
                      <li><strong>Administradores (Pais) 👨‍💼👩‍💼:</strong> PIN padrão <strong className="font-mono text-slate-750 bg-slate-100 px-1 rounded font-black">1234</strong>. Podem lançar transações livres, criar membros, definir orçamentos, aprovar tarefas concluídas, direcionar tarefas e pagar recompensas.</li>
                      <li><strong>Dependentes (Filhos) 👦👧:</strong> PIN padrão <strong className="font-mono text-slate-750 bg-slate-100 px-1 rounded font-black">5678</strong>. Podem ver o saldo coletivo, resgatar valores que ganharam e submeter a conclusão de tarefas domésticas.</li>
                    </ul>
                  </div>
                </div>

                {/* 3. Recompensas & Mesadas */}
                <div className="p-4 bg-white border border-slate-150 rounded-2xl flex gap-3.5 shadow-sm">
                  <span className="text-2xl p-2 bg-slate-50 border border-slate-100 rounded-xl flex-shrink-0 h-fit">✨</span>
                  <div className="space-y-1">
                    <h5 className="font-extrabold text-slate-800 text-sm">Tarefas Domésticas & Recompensas</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Admins criam tarefas e podem torná-las <strong>exclusivas/direcionadas</strong> para uma criança ou deixá-las livres. O filho conclui a tarefa no seu perfil (&quot;Concluí essa tarefa!&quot;), o admin revisa e aprova, creditando a recompensa direto no cofre individual daquele filho.
                    </p>
                  </div>
                </div>

                {/* 4. Metas Coletivas */}
                <div className="p-3.5 bg-white border border-slate-150 rounded-2xl flex gap-3.5 shadow-sm">
                  <span className="text-2xl p-2 bg-slate-50 border border-slate-100 rounded-xl flex-shrink-0 h-fit">🎯</span>
                  <div className="space-y-1">
                    <h5 className="font-extrabold text-slate-800 text-sm">Poupança para Metas Coletivas</h5>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Defina objetivos maiores (como uma viagem ✈️ de férias ou fundo de saúde 🏥). Qualquer administrador pode retirar fundos do caixa comum e enviar para as economias dessas metas.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer buttons */}
            <div className="p-5 border-t border-slate-100 flex-shrink-0 flex gap-2.5 bg-white justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowDemoExplanationModal(false);
                  handleLogout();
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              >
                🔄 Trocar de Perfil
              </button>
              <button
                type="button"
                onClick={() => setShowDemoExplanationModal(false)}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md shadow-indigo-250 hover:scale-[1.01]"
              >
                Entendi, Explorar Sistema! 👍
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GLOBAL MODAL: CREATE PROFILE DIALOG PANEL FROM DASHBOARD SETTINGS */}
      {showAddMemberModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-slate-800 text-lg">Criar Novo Membro</h3>
              <button
                type="button"
                onClick={() => setShowAddMemberModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-650 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Nome do Membro</label>
                <input
                  type="text"
                  required
                  maxLength={15}
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="Ex: Tio Bruno, Sofia"
                  className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Tipo de Acesso</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setNewMemberRole("admin");
                      if (newMemberParticipationType === "Filho" || newMemberParticipationType === "Filha") {
                        setNewMemberParticipationType("Pai");
                      }
                    }}
                    className={`py-2 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      newMemberRole === "admin"
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5" />
                    Responsável
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNewMemberRole("child");
                      if (newMemberParticipationType === "Pai" || newMemberParticipationType === "Mãe") {
                        setNewMemberParticipationType("Filho");
                      }
                    }}
                    className={`py-2 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      newMemberRole === "child"
                        ? "bg-amber-500 text-white border-amber-500"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    Dependente
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Participação na Família</label>
                <select
                  value={newMemberParticipationType}
                  onChange={(e) => setNewMemberParticipationType(e.target.value)}
                  className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-sm bg-white"
                >
                  <option value="Pai">Pai</option>
                  <option value="Mãe">Mãe</option>
                  <option value="Filho">Filho</option>
                  <option value="Filha">Filha</option>
                  <option value="Outro">Outro tipo (Customizado)</option>
                </select>
              </div>

              {newMemberParticipationType === "Outro" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Especifique o Outro Tipo</label>
                  <input
                    type="text"
                    required
                    value={newMemberCustomParticipationType}
                    onChange={(e) => setNewMemberCustomParticipationType(e.target.value)}
                    placeholder="Ex: Tio, Avó, Madrinha"
                    className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-sm"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Código PIN (Ex: 0000)</label>
                  <input
                    type="password"
                    required
                    maxLength={4}
                    pattern="[0-9]{4}"
                    value={newMemberPin}
                    onChange={(e) => setNewMemberPin(e.target.value.replace(/\D/g, ""))}
                    placeholder="4 números"
                    className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-sm text-center"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Avatar Emoji</label>
                  <select
                    value={newMemberEmoji}
                    onChange={(e) => setNewMemberEmoji(e.target.value)}
                    className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-sm bg-white"
                  >
                    <option value="👦">👦 Menino</option>
                    <option value="👧">👧 Menina</option>
                    <option value="👨‍💼">👨‍💼 Pai / Homem</option>
                    <option value="👩‍💼">👩‍💼 Mãe / Mulher</option>
                    <option value="👶">👶 Bebê</option>
                    <option value="👵">👵 Avó</option>
                    <option value="👴">👴 Avô</option>
                    <option value="🐶">🐶 Pet</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Saldo Inicial ({systemCurrency})</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newMemberBalance}
                    onChange={(e) => setNewMemberBalance(e.target.value)}
                    placeholder="0,00"
                    className="w-full text-slate-800 border-2 border-slate-100 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-sm font-bold"
                  />
                </div>

                {newMemberRole === "child" ? (
                  <div key="global-member-allowance-active">
                    <label className="block text-xs font-semibold text-indigo-650 mb-1">Mesada Mensal ({systemCurrency})</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newMemberAllowance}
                      onChange={(e) => setNewMemberAllowance(e.target.value)}
                      placeholder="100,00"
                      className="w-full text-indigo-900 border-2 border-indigo-50 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2 text-sm font-bold"
                    />
                  </div>
                ) : (
                  <div key="global-member-allowance-disabled">
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Mesada Mensal</label>
                    <input
                      type="text"
                      disabled
                      placeholder="N/A p/ Resp."
                      className="w-full text-slate-400 bg-slate-50 border-2 border-slate-100 rounded-xl px-3 py-2 text-sm font-medium cursor-not-allowed"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Cor do Banner</label>
                <div className="flex gap-2.5 justify-between">
                  {[
                    { val: "from-teal-600 to-emerald-500", raw: "bg-emerald-500" },
                    { val: "from-pink-600 to-rose-500", raw: "bg-rose-500" },
                    { val: "from-amber-500 to-yellow-400", raw: "bg-yellow-500" },
                    { val: "from-purple-600 to-violet-500", raw: "bg-purple-500" },
                    { val: "from-blue-600 to-indigo-500", raw: "bg-blue-500" }
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setNewMemberColor(item.val)}
                      className={`w-6 h-6 rounded-full ${item.raw} ring-offset-2 transition-transform ${
                        newMemberColor === item.val ? "scale-125 ring-2 ring-slate-400" : ""
                      }`}
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-2.5 rounded-xl transition-all shadow-md shadow-indigo-100 active:scale-95 cursor-pointer"
              >
                Salvar Perfil
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CONFIRMAR EM DOIS PASSOS O RESETE COMPLETO DO SISTEMA */}
      {showResetConfirmModal && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full text-slate-800 shadow-2xl border border-rose-100 flex flex-col p-6 space-y-5 animate-in fade-in scale-in duration-155">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-rose-950">Confirmar Redefinição?</h3>
                <p className="text-xs text-rose-500 font-bold uppercase tracking-wider">Ação Irreversível</p>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Você está prestes a <strong className="text-rose-700">limpar e zerar todos os dados locais</strong> do cofre. Isso irá remover definitivamente:
            </p>

            <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5 font-semibold">
              <li>Novas transações adicionadas e lançamentos</li>
              <li>Novos membros da família cadastrados</li>
              <li>Novas tarefas criadas ou editadas</li>
              <li>Ajustes nos limites de orçamento ou metas de poupança</li>
            </ul>

            <p className="text-[11px] text-slate-400 italic font-medium leading-relaxed">
              O cofre virtual familiar será totalmente redefinido para o estado inicial de demonstração, restaurando as transações integradas de exemplo para que você possa continuar conhecendo o sistema.
            </p>

            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirmModal(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer text-center"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={performSystemReset}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-all hover:shadow-lg hover:shadow-rose-350 cursor-pointer text-center flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Trash2 className="w-4 h-4 text-white" />
                Sim, Zerar Dados!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SUCESSO DO RESETE DO SISTEMA */}
      {showResetSuccessModal && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full text-slate-800 shadow-2xl border border-emerald-100 flex flex-col p-6 text-center space-y-4 animate-in fade-in scale-in duration-155">
            <div className="mx-auto w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="font-extrabold text-base text-slate-900">Restaurado com Sucesso!</h3>
              <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider">Cofre Redefinido</p>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              O cofre virtual familiar e as configurações locais foram totalmente limpos e restaurados para os padrões originais de fábrica!
            </p>

            <div className="text-[11px] text-indigo-700 bg-indigo-50/70 border border-indigo-150 rounded-2xl p-3 font-semibold text-left">
              💡 <strong>Dica de Demonstração:</strong> Os perfis e lançamentos padrão foram restabelecidos para que você continue testando a cooperação familiar!
            </div>

            <button
              type="button"
              onClick={() => {
                setShowResetSuccessModal(false);
                setShowDemoExplanationModal(true);
              }}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs tracking-wide rounded-xl transition-all shadow-md shadow-indigo-250 cursor-pointer active:scale-95"
            >
              Maravilha, ir para Início! 👍
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
