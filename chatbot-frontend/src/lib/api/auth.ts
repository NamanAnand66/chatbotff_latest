import { apiClient } from './client'
import { AuthResponse, LoginForm, RegisterForm, User, Profile } from '@/types'

export const authApi = {
  // Register new user
  register: async (data: RegisterForm): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse['data']>('/api/auth/register', data)
    return { success: true, data: response.data! }
  },

  // Login user
  login: async (data: LoginForm): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse['data']>('/api/auth/login', data)
    return { success: true, data: response.data! }
  },

  // Get current user profile
  getProfile: async (): Promise<Profile> => {
    const response = await apiClient.get<Profile>('/api/auth/profile')
    return response.data!
  },

  // Update user profile
  updateProfile: async (data: Partial<User>): Promise<Profile> => {
    const response = await apiClient.put<Profile>('/api/auth/profile', data)
    return response.data!
  },

  // Change password
  changePassword: async (data: { currentPassword: string; newPassword: string }): Promise<void> => {
    await apiClient.post('/api/auth/change-password', data)
  },

  // Forgot password
  forgotPassword: async (email: string): Promise<void> => {
    await apiClient.post('/api/auth/forgot-password', { email })
  },

  // Reset password
  resetPassword: async (data: { token: string; password: string }): Promise<void> => {
    await apiClient.post('/api/auth/reset-password', data)
  },

  // Logout user
  logout: async (): Promise<void> => {
    await apiClient.post('/api/auth/logout')
  },

  // Refresh token
  refreshToken: async (): Promise<{ token: string }> => {
    const response = await apiClient.post<{ token: string }>('/api/auth/refresh')
    return response.data!
  },

  // Verify email
  verifyEmail: async (token: string): Promise<void> => {
    await apiClient.post('/api/auth/verify-email', { token })
  },

  // Resend verification email
  resendVerification: async (): Promise<void> => {
    await apiClient.post('/api/auth/resend-verification')
  },

  // Enable 2FA
  enable2FA: async (): Promise<{ qrCode: string; secret: string }> => {
    const response = await apiClient.post<{ qrCode: string; secret: string }>('/api/auth/2fa/enable')
    return response.data!
  },

  // Verify 2FA
  verify2FA: async (token: string): Promise<void> => {
    await apiClient.post('/api/auth/2fa/verify', { token })
  },

  // Disable 2FA
  disable2FA: async (token: string): Promise<void> => {
    await apiClient.post('/api/auth/2fa/disable', { token })
  },

  // Get user sessions
  getSessions: async (): Promise<Array<{
    id: string;
    device: string;
    location: string;
    lastActive: string;
    current: boolean;
  }>> => {
    const response = await apiClient.get<Array<{
      id: string;
      device: string;
      location: string;
      lastActive: string;
      current: boolean;
    }>>('/api/auth/sessions')
    return response.data!
  },

  // Revoke session
  revokeSession: async (sessionId: string): Promise<void> => {
    await apiClient.delete(`/api/auth/sessions/${sessionId}`)
  },

  // Revoke all sessions
  revokeAllSessions: async (): Promise<void> => {
    await apiClient.delete('/api/auth/sessions')
  }
}
