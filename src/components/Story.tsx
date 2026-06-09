'use client'

import React, { useEffect, useRef } from 'react'
import { motion, useTransform, useMotionValue, animate } from 'framer-motion'
import ScrollSequence from './ScrollSequence'

export default function Story() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Create a manual progress value from 0 to 1
  const scrollYProgress = useMotionValue(0)

  useEffect(() => {
    // Animate from 0 to 1 over 12 seconds
    const controls = animate(scrollYProgress, 1, {
      duration: 12, // 12 seconds for the full cinematic reveal
      ease: "easeInOut", // Smooth start and end
    })

    return () => controls.stop()
  }, [scrollYProgress])

  // Map opacity and Y transform for the final information dashboard
  // It only appears at the very end (from 85% to 100% of the animation)
  const contentOpacity = useTransform(scrollYProgress, [0.85, 0.95, 1], [0, 1, 1])
  const contentY = useTransform(scrollYProgress, [0.85, 0.95, 1], [40, 0, 0])

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 z-0">
        <ScrollSequence scrollYProgress={scrollYProgress} />
        {/* Subtle radial gradient background behind canvas */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#050815_0%,_transparent_70%)] pointer-events-none opacity-50" />
      </div>

      {/* Final Information Dashboard - Appears only at the end */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="absolute inset-0 z-10 container mx-auto px-6 py-12 md:py-24 h-full pointer-events-auto flex flex-col justify-between"
      >
        {/* Top Title */}
        <div className="text-center pt-8 md:pt-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-2">
            Sony WH‑1000XM6
          </h1>
          <p className="text-lg md:text-2xl font-semibold text-gradient">
            Silence, perfected.
          </p>
        </div>

        {/* Middle Grid for Features orbiting the headphones */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-between w-full mt-8 md:mt-0 pointer-events-none">
          {/* Left Column */}
          <div className="flex flex-col gap-6 w-full md:w-1/3 max-w-sm pointer-events-auto">
            <div className="bg-[#0A0A0C]/70 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl transition-transform hover:scale-105">
              <h3 className="text-white font-bold text-xl mb-2">Precision-Engineered</h3>
              <p className="text-white/60 text-sm leading-relaxed">Custom drivers and sealed acoustic chambers deliver studio-grade clarity and power.</p>
            </div>
            <div className="bg-[#0A0A0C]/70 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl transition-transform hover:scale-105">
              <h3 className="text-white font-bold text-xl mb-2">Immersive Sound</h3>
              <p className="text-white/60 text-sm leading-relaxed">AI-enhanced upscaling restores crisp details to compressed audio, tracking every note.</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6 w-full md:w-1/3 max-w-sm items-end pointer-events-auto mt-6 md:mt-0">
            <div className="bg-[#0A0A0C]/70 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl transition-transform hover:scale-105 text-left w-full">
              <h3 className="text-white font-bold text-xl mb-2">Adaptive Noise Cancelling</h3>
              <p className="text-white/60 text-sm leading-relaxed">Multi-microphone arrays and real-time noise analysis perfectly silence your environment.</p>
            </div>
            <div className="bg-[#0A0A0C]/70 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl transition-transform hover:scale-105 text-left w-full">
              <h3 className="text-white font-bold text-xl mb-2">All-Day Comfort</h3>
              <p className="text-white/60 text-sm leading-relaxed">Lightweight chassis with refined ear cushions crafted for fatigue-free listening.</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pb-8 md:pb-4 pointer-events-auto">
          <a
            href="https://www.amazon.in/s?k=Sony+WH-1000XM6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 md:py-4 rounded-full bg-white text-black font-semibold text-base md:text-lg hover:bg-gray-200 transition-all shadow-[0_0_30px_rgba(0,214,255,0.3)] hover:shadow-[0_0_40px_rgba(0,214,255,0.6)] hover:-translate-y-1 mb-4"
          >
            Experience WH‑1000XM6
          </a>
          <br />
          <a href="#specs" className="text-white/70 hover:text-white transition-colors text-sm font-medium underline underline-offset-4 decoration-white/30 hover:decoration-white">
            See full specs
          </a>
        </div>
      </motion.div>
    </div>
  )
}
