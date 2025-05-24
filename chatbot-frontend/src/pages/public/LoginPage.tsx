import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bot, Eye, EyeOff, Mail, Lock, ArrowLeft, Sparkles } from 'lucide-react'
import { authApi } from '@/lib/api/auth'
import { useAuthStore } from '@/store/slices/authSlice'
import { FadeInUp, SlideInLeft, FloatingAnimation } from '@/components/animations/GSAPAnimations'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginForm = z.infer<typeof loginSchema>

const LoginPage = () => {
  const navigate = useNavigate()
  const { setAuth, setLoading } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true)
      const response = await authApi.login(data)
      
      setAuth(response.data)
      toast.success('Welcome back! 🎉')
      navigate('/dashboard')
    } catch (error: any) {
      toast.error(error.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-brand-400/20 to-purple-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-brand-400/30 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${4 + Math.random() * 4}s`,
          }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Back to Home */}
          <FadeInUp>
            <Link 
              to="/" 
              className="inline-flex items-center text-gray-600 hover:text-brand-600 transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </FadeInUp>

          {/* Header */}
          <FadeInUp delay={0.1}>
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center space-x-3 mb-8 group">
                <div className="w-12 h-12 bg-gradient-to-r from-brand-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Bot className="w-7 h-7 text-white" />
                </div>
                <span className="text-3xl font-bold gradient-text">ChatBot AI</span>
              </Link>
              
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Welcome Back! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Sign in to continue building amazing chatbots
              </p>
            </div>
          </FadeInUp>

          {/* Login Card */}
          <FadeInUp delay={0.2}>
            <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-2xl text-center font-bold">Sign In</CardTitle>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Sparkles className="w-4 h-4" />
                  <span>Access your AI dashboard</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email Address
                    </label>
                    <Input
                      {...register('email')}
                      type="email"
                      placeholder="Enter your email"
                      icon={<Mail className="w-4 h-4" />}
                      error={errors.email?.message}
                      className="h-12"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        {...register('password')}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        icon={<Lock className="w-4 h-4" />}
                        error={errors.password?.message}
                        className="h-12 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Forgot Password */}
                  <div className="flex justify-end">
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-brand-600 hover:text-brand-700 font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    className="w-full font-semibold"
                    loading={isSubmitting}
                  >
                    {isSubmitting ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300 dark:border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-gray-900 px-2 text-gray-500">
                      New to ChatBot AI?
                    </span>
                  </div>
                </div>

                {/* Sign Up Link */}
                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <Link 
                      to="/register" 
                      className="text-brand-600 hover:text-brand-700 font-semibold transition-colors"
                    >
                      Create one now
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </FadeInUp>

          {/* Features Preview */}
          <FadeInUp delay={0.4}>
            <div className="mt-12 grid grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl mx-auto flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">AI Powered</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mx-auto flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Easy Setup</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mx-auto flex items-center justify-center">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Secure</p>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>

      {/* Floating Elements */}
      <FloatingAnimation>
        <div className="absolute top-32 left-10 hidden lg:block">
          <div className="w-20 h-20 bg-gradient-to-r from-brand-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl">
            <Bot className="w-10 h-10 text-white" />
          </div>
        </div>
      </FloatingAnimation>

      <FloatingAnimation>
        <div className="absolute bottom-32 right-10 hidden lg:block">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>
      </FloatingAnimation>
    </div>
  )
}

export default LoginPage
