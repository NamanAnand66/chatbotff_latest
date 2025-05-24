import { apiClient } from './client'
import { Chatbot, ChatbotForm, Document, Message, ChatbotSettings, ChatbotAnalytics } from '@/types'

export const chatbotsApi = {
  // Get all chatbots
  getChatbots: async (): Promise<Chatbot[]> => {
    const response = await apiClient.get<Chatbot[]>('/api/chatbots')
    return response.data!
  },

  // Get chatbot by ID
  getChatbot: async (id: string): Promise<Chatbot> => {
    const response = await apiClient.get<Chatbot>(`/api/chatbots/${id}`)
    return response.data!
  },

  // Create new chatbot
  createChatbot: async (data: ChatbotForm): Promise<Chatbot> => {
    const response = await apiClient.post<Chatbot>('/api/chatbots', data)
    return response.data!
  },

  // Update chatbot
  updateChatbot: async (id: string, data: Partial<ChatbotForm>): Promise<Chatbot> => {
    const response = await apiClient.put<Chatbot>(`/api/chatbots/${id}`, data)
    return response.data!
  },

  // Delete chatbot
  deleteChatbot: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/chatbots/${id}`)
  },

  // Toggle chatbot active status
  toggleChatbot: async (id: string): Promise<Chatbot> => {
    const response = await apiClient.patch<Chatbot>(`/api/chatbots/${id}/toggle`)
    return response.data!
  },

  // Get chatbot documents
  getDocuments: async (chatbotId: string): Promise<Document[]> => {
    const response = await apiClient.get<Document[]>(`/api/chatbots/${chatbotId}/documents`)
    return response.data!
  },

  // Upload document to chatbot
  uploadDocument: async (
    chatbotId: string, 
    file: File, 
    onProgress?: (progress: number) => void
  ): Promise<Document> => {
    const formData = new FormData()
    formData.append('pdf', file)

    const response = await apiClient.request<Document>({
      method: 'POST',
      url: `/api/chatbots/${chatbotId}/documents`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          onProgress(progress)
        }
      },
    })

    return response.data!
  },

  // Delete document
  deleteDocument: async (documentId: string): Promise<void> => {
    await apiClient.delete(`/api/documents/${documentId}`)
  },

  // Get embed code
  getEmbedCode: async (chatbotId: string): Promise<{ embedCode: string; iframeCode: string }> => {
    const response = await apiClient.get<{ embedCode: string; iframeCode: string }>(`/api/chatbots/${chatbotId}/embed-code`)
    return response.data!
  },

  // Chat with chatbot
  chat: async (chatbotId: string, message: string): Promise<{
    response: string;
    model: string;
    processingTime: number;
    sources?: string[];
  }> => {
    const response = await apiClient.post<{
      response: string;
      model: string;
      processingTime: number;
      sources?: string[];
    }>(`/api/chat/${chatbotId}`, { message })
    return response.data!
  },

  // Get chatbot settings
  getSettings: async (chatbotId: string): Promise<ChatbotSettings> => {
    const response = await apiClient.get<ChatbotSettings>(`/api/chatbots/${chatbotId}/settings`)
    return response.data!
  },

  // Update chatbot settings
  updateSettings: async (chatbotId: string, settings: Partial<ChatbotSettings>): Promise<ChatbotSettings> => {
    const response = await apiClient.put<ChatbotSettings>(`/api/chatbots/${chatbotId}/settings`, settings)
    return response.data!
  },

  // Get chatbot analytics
  getAnalytics: async (chatbotId: string, period: '7d' | '30d' | '90d' = '30d'): Promise<ChatbotAnalytics> => {
    const response = await apiClient.get<ChatbotAnalytics>(`/api/chatbots/${chatbotId}/analytics?period=${period}`)
    return response.data!
  },

  // Get chat history
  getChatHistory: async (
    chatbotId: string, 
    options?: {
      page?: number;
      limit?: number;
      search?: string;
      startDate?: string;
      endDate?: string;
    }
  ): Promise<{
    messages: Message[];
    total: number;
    page: number;
    totalPages: number;
  }> => {
    const params = new URLSearchParams()
    if (options?.page) params.append('page', options.page.toString())
    if (options?.limit) params.append('limit', options.limit.toString())
    if (options?.search) params.append('search', options.search)
    if (options?.startDate) params.append('startDate', options.startDate)
    if (options?.endDate) params.append('endDate', options.endDate)

    const response = await apiClient.get<{
      messages: Message[];
      total: number;
      page: number;
      totalPages: number;
    }>(`/api/chatbots/${chatbotId}/history?${params.toString()}`)
    return response.data!
  },

  // Export chat history
  exportChatHistory: async (chatbotId: string, format: 'csv' | 'json' = 'csv'): Promise<void> => {
    await apiClient.download(`/api/chatbots/${chatbotId}/export?format=${format}`, `chatbot-${chatbotId}-history.${format}`)
  },

  // Test chatbot
  testChatbot: async (chatbotId: string, testMessage: string): Promise<{
    response: string;
    processingTime: number;
    success: boolean;
  }> => {
    const response = await apiClient.post<{
      response: string;
      processingTime: number;
      success: boolean;
    }>(`/api/chatbots/${chatbotId}/test`, { message: testMessage })
    return response.data!
  },

  // Clone chatbot
  cloneChatbot: async (chatbotId: string, name: string): Promise<Chatbot> => {
    const response = await apiClient.post<Chatbot>(`/api/chatbots/${chatbotId}/clone`, { name })
    return response.data!
  },

  // Get chatbot performance metrics
  getPerformanceMetrics: async (chatbotId: string): Promise<{
    averageResponseTime: number;
    totalMessages: number;
    uniqueUsers: number;
    satisfactionScore: number;
    topQuestions: Array<{ question: string; count: number }>;
  }> => {
    const response = await apiClient.get<{
      averageResponseTime: number;
      totalMessages: number;
      uniqueUsers: number;
      satisfactionScore: number;
      topQuestions: Array<{ question: string; count: number }>;
    }>(`/api/chatbots/${chatbotId}/metrics`)
    return response.data!
  }
}
