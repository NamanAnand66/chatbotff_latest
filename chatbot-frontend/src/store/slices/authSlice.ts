import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { User, Organization, Profile } from '@/types'

interface AuthState {
  // State
  user: User | null
  organization: Organization | null
  profile: Profile | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null

  // Actions
  setAuth: (data: {
    user: User
    organization: Organization
    profile: Profile
    token: string
  }) => void
  updateUser: (user: Partial<User>) => void
  updateOrganization: (organization: Partial<Organization>) => void
  updateProfile: (profile: Partial<Profile>) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearAuth: () => void
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      organization: null,
      profile: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      setAuth: (data) => {
        localStorage.setItem('authToken', data.token)
        set({
          user: data.user,
          organization: data.organization,
          profile: data.profile,
          token: data.token,
          isAuthenticated: true,
          error: null,
        })
      },

      updateUser: (userData) => {
        const currentUser = get().user
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData }
          })
        }
      },

      updateOrganization: (orgData) => {
        const currentOrg = get().organization
        if (currentOrg) {
          set({
            organization: { ...currentOrg, ...orgData }
          })
        }
      },

      updateProfile: (profileData) => {
        const currentProfile = get().profile
        if (currentProfile) {
          set({
            profile: { ...currentProfile, ...profileData }
          })
        }
      },

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      clearError: () => set({ error: null }),

      clearAuth: () => {
        localStorage.removeItem('authToken')
        set({
          user: null,
          organization: null,
          profile: null,
          token: null,
          isAuthenticated: false,
          error: null,
        })
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        organization: state.organization,
        profile: state.profile,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

// Selectors
export const useUser = () => useAuthStore((state) => state.user)
export const useOrganization = () => useAuthStore((state) => state.organization)
export const useProfile = () => useAuthStore((state) => state.profile)
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated)
export const useAuthLoading = () => useAuthStore((state) => state.isLoading)
export const useAuthError = () => useAuthStore((state) => state.error)
