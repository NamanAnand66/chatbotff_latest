// User types
export interface User {
    id: string;
    email: string;
    fullName: string;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  // Organization types
  export interface Organization {
    id: string;
    name: string;
    slug: string;
    logo?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  // Profile types
  export interface Profile {
    id: string;
    organizationId: string;
    role: 'admin' | 'user';
    email: string;
    fullName: string;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
    organizations: Organization;
  }
  
  // Chatbot types
  export interface Chatbot {
    id: string;
    organizationId: string;
    name: string;
    description?: string;
    embedCode?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    documents?: Document[];
    settings?: ChatbotSettings;
    analytics?: ChatbotAnalytics;
  }
  
  export interface ChatbotSettings {
    theme: {
      primaryColor: string;
      fontFamily: string;
      borderRadius: string;
    };
    behavior: {
      welcomeMessage: string;
      placeholder: string;
      maxMessages: number;
    };
    features: {
      typing: boolean;
      timestamps: boolean;
      fileUpload: boolean;
    };
  }
  
  export interface ChatbotAnalytics {
    totalMessages: number;
    totalSessions: number;
    averageSessionLength: number;
    satisfactionScore: number;
    topQuestions: Array<{
      question: string;
      count: number;
    }>;
  }
  
  // Document types
  export interface Document {
    id: string;
    chatbotId: string;
    organizationId: string;
    fileName: string;
    filePath: string;
    fileSize: number;
    chunksCount: number;
    processedAt: string;
    createdAt: string;
    status: 'processing' | 'completed' | 'failed';
  }
  
  // Message types
  export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    metadata?: {
      model?: string;
      processingTime?: number;
      sources?: string[];
    };
    status?: 'sending' | 'sent' | 'error';
  }
  
  // API Response types
  export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
    meta?: {
      page?: number;
      limit?: number;
      total?: number;
      totalPages?: number;
    };
  }
  
  export interface AuthResponse {
    success: boolean;
    data: {
      user: User;
      organization: Organization;
      profile: Profile;
      token: string;
    };
  }
  
  // Form types
  export interface LoginForm {
    email: string;
    password: string;
  }
  
  export interface RegisterForm {
    fullName: string;
    email: string;
    password: string;
    organizationName: string;
  }
  
  export interface ChatbotForm {
    name: string;
    description?: string;
  }
  
  export interface ProfileForm {
    fullName: string;
    avatar?: File;
  }
  
  export interface OrganizationForm {
    name: string;
    logo?: File;
  }
  
  // UI State types
  export interface UIState {
    theme: 'light' | 'dark' | 'system';
    sidebarOpen: boolean;
    loading: boolean;
    notifications: Notification[];
  }
  
  export interface Notification {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    duration?: number;
    action?: {
      label: string;
      onClick: () => void;
    };
  }
  
  // Analytics types
  export interface DashboardStats {
    chatbots: number;
    documents: number;
    messages: number;
    members: number;
  }
  
  export interface ChatbotMetrics {
    messages: Array<{
      date: string;
      count: number;
    }>;
    sessions: Array<{
      date: string;
      count: number;
    }>;
    satisfaction: Array<{
      date: string;
      score: number;
    }>;
  }
  
  // File upload types
  export interface FileUploadProgress {
    file: File;
    progress: number;
    status: 'pending' | 'uploading' | 'processing' | 'completed' | 'error';
    error?: string;
  }
  
  // Widget types
  export interface WidgetConfig {
    chatbotId: string;
    apiUrl: string;
    theme: {
      primaryColor: string;
      fontFamily: string;
      borderRadius: string;
    };
    position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    size: 'small' | 'medium' | 'large';
    features: {
      minimizable: boolean;
      draggable: boolean;
      sound: boolean;
    };
  }
  
  // Error types
  export interface AppError {
    code: string;
    message: string;
    details?: any;
    timestamp: string;
  }
  
  // Route types
  export interface RouteConfig {
    path: string;
    component: React.ComponentType;
    protected: boolean;
    title: string;
    description?: string;
  }
  
  // Theme types
  export interface ThemeConfig {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      foreground: string;
      muted: string;
      border: string;
    };
    fonts: {
      sans: string;
      mono: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
    };
  }
  
  // Export all types
  export type {
    User,
    Organization,
    Profile,
    Chatbot,
    ChatbotSettings,
    ChatbotAnalytics,
    Document,
    Message,
    ApiResponse,
    AuthResponse,
    LoginForm,
    RegisterForm,
    ChatbotForm,
    ProfileForm,
    OrganizationForm,
    UIState,
    Notification,
    DashboardStats,
    ChatbotMetrics,
    FileUploadProgress,
    WidgetConfig,
    AppError,
    RouteConfig,
    ThemeConfig,
  };
  