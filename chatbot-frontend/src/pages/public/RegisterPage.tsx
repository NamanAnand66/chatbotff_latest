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
import { Bot, Eye, EyeOff, Mail, Lock, User, Building, ArrowLeft, Sparkles, Check } from 'lucide-react'
import { authApi } from '@/lib/api/auth'
import { useAuthStore } from '@/store/slices/authSlice'
import { FadeInUp, SlideInRight, FloatingAnimation } from '@/components/animations/GSAPAnimations'

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  organizationName: z.string().min(2, 'Organization name must be at least 2 characters'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
})

type RegisterForm = z.infer<typeof registerSchema>

const RegisterPage = () => {
  const navigate = useNavigate()
  const { setAuth, setLoading } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  })

  const password = watch('password', '')

  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  }

  const onSubmit = async (data: RegisterForm) => {
    try {
      setLoading(true)
      const response = await authApi.register(data)
      
      setAuth(response.data)
      toast.success('Account created successfully! Welcome aboard! 🎉')
      navigate('/dashboard')
    } catch (error: any) {
      toast.error(error.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden py-12">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-brand-400/20 to-purple-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
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
                Create Your Account ✨
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Start building intelligent chatbots in minutes
              </p>
            </div>
          </FadeInUp>

          {/* Register Card */}
          <FadeInUp delay={0.2}>
            <Card className="shadow-2xl border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-2xl text-center font-bold">Get Started</CardTitle>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Sparkles className="w-4 h-4" />
                  <span>Join thousands of satisfied users</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Full Name Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Full Name
                    </label>
                    <Input
                      {...register('fullName')}
                      type="text"
                      placeholder="Enter your full name"
                      icon={<User className="w-4 h-4" />}
                      error={errors.fullName?.message}
                      className="h-12"
                    />
                  </div>

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

                  {/* Organization Name Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Organization Name
                    </label>
                    <Input
                      {...register('organizationName')}
                      type="text"
                      placeholder="Enter your organization name"
                      icon={<Building className="w-4 h-4" />}
                      error={errors.organizationName?.message}
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
                        placeholder="Create a strong password"
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
                    
                    {/* Password Strength Indicators */}
                    {password && (
                      <div className="space-y-2 mt-3">
                        <div className="flex items-center space-x-2 text-xs">
                          <div className={`w-2 h-2 rounded-full ${passwordChecks.length ? 'bg-green-500' : 'bg-gray-300'}`} />
                          <span className={passwordChecks.length ? 'text-green-600' : 'text-gray-500'}>
                            At least 8 characters
                          </span>
                          {passwordChecks.length && <Check className="w-3 h-3 text-green-500" />}
                        </div>
                        <div className="flex items-center space-x-2 text-xs">
                          <div className={`w-2 h-2 rounded-full ${passwordChecks.uppercase ? 'bg-green-500' : 'bg-gray-300'}`} />
                          <span className={passwordChecks.uppercase ? 'text-green-600' : 'text-gray-500'}>
                            One uppercase letter
                          </span>
                          {passwordChecks.uppercase && <Check className="w-3 h-3 text-green-500" />}
                        </div>
                        <div className="flex items-center space-x-2 text-xs">
                          <div className={`w-2 h-2 rounded-full ${passwordChecks.lowercase ? 'bg-green-500' : 'bg-gray-300'}`} />
                          <span className={passwordChecks.lowercase ? 'text-green-600' : 'text-gray-500'}>
                            One lowercase letter
                          </span>
                          {passwordChecks.lowercase && <Check className="w-3 h-3 text-green-500" />}
                        </div>
                        <div className="flex items-center space-x-2 text-xs">
                          <div className={`w-2 h-2 rounded-full ${passwordChecks.number ? 'bg-green-500' : 'bg-gray-300'}`} />
                          <span className={passwordChecks.number ? 'text-green-600' : 'text-gray-500'}>
                            One number
                          </span>
                          {passwordChecks.number && <Check className="w-3 h-3 text-green-500" />}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Terms and Privacy */}
                  <div className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    By creating an account, you agree to our{' '}
                    <Link to="/terms" className="text-brand-600 hover:text-brand-700 font-medium">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-brand-600 hover:text-brand-700 font-medium">
                      Privacy Policy
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
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300 dark:border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-gray-900 px-2 text-gray-500">
                      Already have an account?
                    </span>
                  </div>
                </div>

                {/* Sign In Link */}
                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    <Link 
                      to="/login" 
                      className="text-brand-600 hover:text-brand-700 font-semibold transition-colors"
                    >
                      Sign in instead
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </FadeInUp>

          {/* Benefits Preview */}
          <FadeInUp delay={0.4}>
            <div className="mt-12 space-y-4">
              <h3 className="text-center text-lg font-semibold text-gray-900 dark:text-white mb-6">
                What you'll get:
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm">3 AI chatbots to start with</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm">1,000 free messages per month</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm">Advanced analytics and insights</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm">24/7 customer support</span>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>

      {/* Floating Elements */}
      <FloatingAnimation>
        <div className="absolute top-32 right-10 hidden lg:block">
          <div className="w-20 h-20 bg-gradient-to-r from-brand-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl">
            <Bot className="w-10 h-10 text-white" />
          </div>
        </div>
      </FloatingAnimation>

      <FloatingAnimation>
        <div className="absolute bottom-32 left-10 hidden lg:block">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>
      </FloatingAnimation>
    </div>
  )
}

export default RegisterPage
