import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Bot, Home, ArrowLeft, Search } from 'lucide-react'
import { FadeInUp, FloatingAnimation } from '@/components/animations/GSAPAnimations'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-brand-400/20 to-purple-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Animation */}
          <FadeInUp>
            <motion.div
              className="mb-8"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <h1 className="text-9xl md:text-[12rem] font-bold gradient-text leading-none">
                404
              </h1>
            </motion.div>
          </FadeInUp>

          {/* Error Message */}
          <FadeInUp delay={0.2}>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Oops! Page Not Found
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                The page you're looking for seems to have wandered off into the digital void. 
                Don't worry, even our AI chatbots get lost sometimes! 🤖
              </p>
            </div>
          </FadeInUp>

          {/* Action Buttons */}
          <FadeInUp delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/">
                <Button variant="gradient" size="lg" className="font-semibold group">
                  <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Back to Home
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="font-semibold"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go Back
              </Button>
            </div>
          </FadeInUp>

          {/* Helpful Links */}
          <FadeInUp delay={0.6}>
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border-0">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Looking for something specific?
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link 
                  to="/dashboard" 
                  className="group p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Dashboard
