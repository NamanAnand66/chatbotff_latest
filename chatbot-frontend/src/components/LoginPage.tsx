import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/Input'
import { Card } from './ui/Card'

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Bot className="w-10 h-10 text-white" />
            <span className="text-3xl font-bold text-white">ChatBot AI</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white/80">Sign in to your account</p>
        </div>

        <Card className="glass-effect">
          <form className="space-y-6">
            <div>
              <Input
                type="email"
                placeholder="Email address"
                className="bg-white/90"
              />
            </div>
            
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="bg-white/90 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <Button className="w-full" size="lg">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                Sign up
              </a>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
