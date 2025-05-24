import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Bot, 
  Zap, 
  Shield, 
  Rocket, 
  Users, 
  MessageSquare,
  ArrowRight,
  Star,
  Check,
  Sparkles,
  Globe,
  BarChart3,
  Lock,
  Smartphone,
  Code,
  PlayCircle
} from 'lucide-react'
import { 
  FadeInUp, 
  SlideInLeft, 
  SlideInRight, 
  FloatingAnimation,
  StaggerContainer,
  ParallaxElement,
  TypewriterText
} from '@/components/animations/GSAPAnimations'
import { useAuthStore } from '@/store/slices/authSlice'

const LandingPage = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const heroRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    // Hero background animation
    const tl = gsap.timeline({ repeat: -1 })
    tl.to('.hero-bg-1', { rotation: 360, duration: 20, ease: 'none' })
    tl.to('.hero-bg-2', { rotation: -360, duration: 25, ease: 'none' }, 0)

    // Floating particles
    gsap.to('.particle', {
      y: 'random(-100, 100)',
      x: 'random(-100, 100)',
      duration: 'random(2, 4)',
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      stagger: 0.2
    })

    // Stats counter animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll('.counter')
          counters.forEach((counter) => {
            const target = parseInt(counter.getAttribute('data-target') || '0')
            gsap.to(counter, {
              textContent: target,
              duration: 2,
              ease: 'power2.out',
              snap: { textContent: 1 },
              stagger: 0.2
            })
          })
        }
      })
    })

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const features = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI-Powered Intelligence",
      description: "Advanced natural language processing that understands context and provides accurate, human-like responses.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast Responses",
      description: "Sub-second response times with optimized AI processing and intelligent caching for instant user satisfaction.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "Bank-grade encryption, SOC 2 compliance, and complete data isolation ensure your information stays protected.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "One-Click Deployment",
      description: "Deploy anywhere with our universal embed code. No technical expertise required - just copy, paste, and go live.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Collaboration",
      description: "Seamless team management with role-based permissions, shared workspaces, and real-time collaboration tools.",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Analytics",
      description: "Deep insights into user interactions, conversation patterns, and performance metrics to optimize your chatbot.",
      gradient: "from-red-500 to-pink-500"
    }
  ]

  const stats = [
    { number: 10000, label: "Active Chatbots", suffix: "+" },
    { number: 1000000, label: "Messages Processed", suffix: "+" },
    { number: 99, label: "Uptime Guarantee", suffix: "%" },
    { number: 24, label: "Support Available", suffix: "/7" }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO, TechFlow",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
      content: "This platform transformed our customer support. 90% reduction in response time and our customers love the instant, accurate answers.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of Operations, DataVault",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
      content: "The AI understands our complex documentation perfectly. It's like having a expert available 24/7 for our users.",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Product Manager, InnovateLab",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      content: "Setup took 5 minutes. The results were immediate. Our user engagement increased by 300% in the first month.",
      rating: 5
    }
  ]

  const pricing = [
    {
      name: "Starter",
      price: 29,
      description: "Perfect for small teams and startups",
      features: [
        "3 AI Chatbots",
        "10 Document uploads",
        "1,000 messages/month",
        "Email support",
        "Basic analytics",
        "Standard templates"
      ],
      popular: false,
      gradient: "from-gray-500 to-gray-600"
    },
    {
      name: "Professional",
      price: 99,
      description: "Ideal for growing businesses",
      features: [
        "10 AI Chatbots",
        "50 Document uploads",
        "10,000 messages/month",
        "Priority support",
        "Advanced analytics",
        "Custom branding",
        "API access",
        "Team collaboration"
      ],
      popular: true,
      gradient: "from-brand-500 to-purple-600"
    },
    {
      name: "Enterprise",
      price: 299,
      description: "For large organizations",
      features: [
        "Unlimited chatbots",
        "Unlimited documents",
        "100,000 messages/month",
        "24/7 phone support",
        "White-label solution",
        "Custom integrations",
        "Dedicated account manager",
        "SLA guarantee"
      ],
      popular: false,
      gradient: "from-purple-600 to-pink-600"
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-brand-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">ChatBot AI</span>
            </motion.div>
            
            <motion.div 
              className="hidden md:flex items-center space-x-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a href="#features" className="text-gray-600 hover:text-brand-600 transition-colors font-medium">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-brand-600 transition-colors font-medium">Pricing</a>
              <a href="#testimonials" className="text-gray-600 hover:text-brand-600 transition-colors font-medium">Reviews</a>
              <a href="#demo" className="text-gray-600 hover:text-brand-600 transition-colors font-medium">Demo</a>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link to="/login">
                <Button variant="ghost" className="font-medium">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button variant="gradient" className="font-medium shadow-lg hover:shadow-xl">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 min-h-screen flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="hero-bg-1 absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-brand-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="hero-bg-2 absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
          
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle absolute w-2 h-2 bg-brand-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <FadeInUp>
              <div className="inline-flex items-center space-x-2 bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 px-4 py-2 rounded-full text-sm font-medium mb-8">
                <Sparkles className="w-4 h-4" />
                <span>Powered by Advanced AI Technology</span>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                Build Intelligent
                <br />
                <span className="gradient-text">AI Chatbots</span>
                <br />
                <TypewriterText 
                  text="in Minutes" 
                  className="text-gray-600 dark:text-gray-400"
                  speed={100}
                />
              </h1>
            </FadeInUp>
            
            <FadeInUp delay={0.4}>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
                Transform your documents into intelligent conversational AI. 
                Create, deploy, and manage chatbots that understand your content 
                and provide instant, accurate responses to your users.
              </p>
            </FadeInUp>
            
            <FadeInUp delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <Link to="/register">
                  <Button size="xl" variant="gradient" className="font-semibold group">
                    Start Building Free
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button size="xl" variant="outline" className="font-semibold group">
                  <PlayCircle className="mr-2 w-5 h-5" />
                  Watch Demo
                </Button>
              </div>
            </FadeInUp>

            {/* Hero Stats */}
            <FadeInUp delay={0.8}>
              <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      <span className="counter" data-target={stat.number}>0</span>
                      <span>{stat.suffix}</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
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
          <div className="absolute top-48 right-20 hidden lg:block">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
          </div>
        </FloatingAnimation>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-6">
          <FadeInUp>
            <div className="text-center mb-20">
              <div className="inline-flex items-center space-x-2 bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                <span>Powerful Features</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
                Everything You Need
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Comprehensive tools and features to create, customize, and deploy 
                intelligent chatbots that deliver exceptional user experiences.
              </p>
            </div>
          </FadeInUp>
          
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white dark:bg-gray-900 overflow-hidden">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {React.cloneElement(feature.icon, { className: "w-8 h-8 text-white" })}
                  </div>
                  <CardTitle className="text-xl mb-3 group-hover:text-brand-600 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <FadeInUp>
            <div className="text-center mb-20">
              <div className="inline-flex items-center space-x-2 bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Star className="w-4 h-4" />
                <span>Customer Stories</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
                Loved by Thousands
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Join thousands of satisfied customers who have transformed 
                their customer experience with our AI chatbots.
              </p>
            </div>
          </FadeInUp>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed italic">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-6">
          <FadeInUp>
            <div className="text-center mb-20">
              <div className="inline-flex items-center space-x-2 bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Rocket className="w-4 h-4" />
                <span>Simple Pricing</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
                Choose Your Plan
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Start free and scale as you grow. All plans include our core features 
                with no hidden fees or setup costs.
              </p>
            </div>
          </FadeInUp>
          
          <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricing.map((plan, index) => (
              <Card key={index} className={`relative group transition-all duration-500 hover:-translate-y-2 border-0 overflow-hidden ${
                plan.popular 
                  ? 'shadow-2xl scale-105 bg-white dark:bg-gray-900' 
                  : 'shadow-lg bg-white dark:bg-gray-900 hover:shadow-2xl'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className={`bg-gradient-to-r ${plan.gradient} text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg`}>
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-5 group-hover:opacity-10 transition-opacity`} />
                
                <CardContent className="p-8 relative z-10">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-5xl font-bold">${plan.price}</span>
                      <span className="text-gray-600 dark:text-gray-400 ml-2">/month</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Billed monthly</p>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center mr-3 flex-shrink-0`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link to="/register">
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? `bg-gradient-to-r ${plan.gradient} hover:shadow-xl text-white` 
                          : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                      } font-semibold transition-all duration-300`}
                      size="lg"
                    >
                      {plan.popular ? 'Start Free Trial' : 'Get Started'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </StaggerContainer>

          <FadeInUp delay={0.6}>
            <div className="text-center mt-16">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Need a custom solution for your enterprise?
              </p>
              <Button variant="outline" size="lg" className="font-semibold">
                Contact Sales Team
              </Button>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-brand-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/20" />
          <ParallaxElement speed={0.3}>
            <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl" />
          </ParallaxElement>
          <ParallaxElement speed={0.5}>
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/10 rounded-full blur-xl" />
          </ParallaxElement>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <FadeInUp>
            <div className="text-center text-white max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-bold mb-8">
                Ready to Transform Your
                <br />
                Customer Experience?
              </h2>
              <p className="text-xl mb-12 text-white/90 leading-relaxed">
                Join thousands of businesses using our AI chatbots to provide instant, 
                intelligent support and boost customer satisfaction.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link to="/register">
                  <Button size="xl" className="bg-white text-brand-600 hover:bg-gray-100 font-semibold shadow-2xl group">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button size="xl" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-600 font-semibold">
                  Schedule Demo
                </Button>
              </div>
              
              <div className="mt-12 flex items-center justify-center space-x-8 text-white/80">
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-brand-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">ChatBot AI</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Building the future of conversational AI, one intelligent chatbot at a time. 
                Empowering businesses to provide exceptional customer experiences.
              </p>
              <div className="flex space-x-4">
                {['twitter', 'linkedin', 'github', 'youtube'].map((social) => (
                  <a 
                    key={social}
                    href="#" 
                    className="w-10 h-10 bg-gray-800 hover:bg-brand-600 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-lg">Product</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-lg">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-lg">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; 2025 ChatBot AI. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
