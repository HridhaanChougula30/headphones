'use client'

import React, { useEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50)
    })
  }, [scrollY])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed top-0 inset-x-0 z-50 flex items-center justify-center transition-all duration-500 ease-out h-14',
        isScrolled
          ? 'bg-[#050505]/75 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      )}
    >
      <div className="flex items-center justify-between w-full max-w-7xl px-6 md:px-12 h-full">
        {/* Logo / Title */}
        <div className="flex-1 flex justify-start">
          <span className="text-white font-medium tracking-tight text-sm">
            WH<span className="opacity-80">-</span>1000XM6
          </span>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center justify-center gap-8 text-[13px] tracking-wide text-white/70 font-medium">
          {['Overview', 'Technology', 'Noise Cancelling', 'Specs'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              className="hover:text-white transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="flex-1 flex justify-end items-center gap-4 text-[13px] font-medium tracking-wide">
          <a
            href="https://www.amazon.in/s?k=Sony+WH-1000XM5"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-colors duration-200 hidden md:block"
          >
            Buy
          </a>
          <a
            href="https://www.amazon.in/s?k=Sony+WH-1000XM5"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white transition-all duration-300 relative group overflow-hidden block"
          >
            <span className="relative z-10">Experience WH-1000XM6</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0050FF] to-[#00D6FF] opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-md" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0050FF] to-[#00D6FF] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          </a>
        </div>
      </div>
    </motion.header>
  )
}
