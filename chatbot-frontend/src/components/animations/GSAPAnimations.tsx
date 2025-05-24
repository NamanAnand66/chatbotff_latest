import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface AnimationProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

export const FadeInUp: React.FC<AnimationProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (element) {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
        }
      )
    }
  }, [delay, duration])

  return <div ref={ref} className={className}>{children}</div>
}

export const SlideInLeft: React.FC<AnimationProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (element) {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          x: -100,
        },
        {
          opacity: 1,
          x: 0,
          duration,
          delay,
          ease: 'power3.out',
        }
      )
    }
  }, [delay, duration])

  return <div ref={ref} className={className}>{children}</div>
}

export const SlideInRight: React.FC<AnimationProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (element) {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          x: 100,
        },
        {
          opacity: 1,
          x: 0,
          duration,
          delay,
          ease: 'power3.out',
        }
      )
    }
  }, [delay, duration])

  return <div ref={ref} className={className}>{children}</div>
}

export const ScaleInBounce: React.FC<AnimationProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  className = ''
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (element) {
      gsap.fromTo(
        element,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration,
          delay,
          ease: 'back.out(1.7)',
        }
      )
    }
  }, [delay, duration])

  return <div ref={ref} className={className}>{children}</div>
}

export const FloatingAnimation: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (element) {
      gsap.to(element, {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      })
    }
  }, [])

  return <div ref={ref}>{children}</div>
}

export const StaggerContainer: React.FC<{
  children: React.ReactNode
  stagger?: number
  className?: string
}> = ({ children, stagger = 0.1, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (element) {
      const childElements = element.children
      gsap.fromTo(
        childElements,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger,
          ease: 'power3.out',
        }
      )
    }
  }, [stagger])

  return <div ref={ref} className={className}>{children}</div>
}

export const ParallaxElement: React.FC<{
  children: React.ReactNode
  speed?: number
  className?: string
}> = ({ children, speed = 0.5, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const parallax = scrolled * speed
      gsap.set(element, { y: parallax })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return <div ref={ref} className={className}>{children}</div>
}

export const TypewriterText: React.FC<{
  text: string
  speed?: number
  className?: string
}> = ({ text, speed = 50, className = '' }) => {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    element.textContent = ''
    
    const chars = text.split('')
    chars.forEach((char, index) => {
      setTimeout(() => {
        element.textContent += char
      }, index * speed)
    })
  }, [text, speed])

  return <span ref={ref} className={className} />
}

export const MorphingShape: React.FC<{
  className?: string
}> = ({ className = '' }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (element) {
      gsap.to(element, {
        borderRadius: '50%',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      })
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`w-20 h-20 bg-gradient-to-r from-brand-500 to-purple-600 ${className}`}
    />
  )
}
