'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useTransform, useMotionValueEvent, MotionValue } from 'framer-motion'

interface ScrollSequenceProps {
  scrollYProgress: MotionValue<number>
}

export default function ScrollSequence({ scrollYProgress }: ScrollSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
// Using scrollYProgress prop from parent instead of doing it internally
  
  const frameCount = 240
  const images = useRef<HTMLImageElement[]>([])
  const [imagesLoaded, setImagesLoaded] = useState(false)

  // Preload images
  useEffect(() => {
    let loaded = 0
    const loadedImages: HTMLImageElement[] = []
    
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image()
        const indexStr = i.toString().padStart(3, '0')
        img.src = `/images/sequence/ezgif-frame-${indexStr}.jpg`
        img.onload = () => {
            loaded++
            if (loaded === frameCount) {
                images.current = loadedImages
                setImagesLoaded(true)
            }
        }
        loadedImages.push(img)
    }
  }, [])

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1])

  const renderFrame = (index: number) => {
    if (!images.current[index] || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Force high-quality interpolation
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    const img = images.current[index]
    
    // Add high resolution display support
    const dpr = window.devicePixelRatio || 1
    const cw = canvas.width / dpr
    const ch = canvas.height / dpr
    const iw = img.width
    const ih = img.height

    // Use containment fitting logic with focus on matching background
    const fitScale = Math.min(cw / iw, ch / ih) * 0.8 // scale it down slightly so the headphones don't touch edges

    const x = (cw / 2) - ((iw * fitScale) / 2)
    const y = (ch / 2) - ((ih * fitScale) / 2)

    // Clear and draw matching background color explicitly to avoid tearing
    ctx.fillStyle = '#050505'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    ctx.drawImage(img, x * dpr, y * dpr, iw * fitScale * dpr, ih * fitScale * dpr)
  }

  useMotionValueEvent(frameIndex, 'change', (latest) => {
    if (imagesLoaded) {
      renderFrame(Math.round(latest))
    }
  })

  useEffect(() => {
    if (imagesLoaded) {
        const handleResize = () => {
            if (canvasRef.current && canvasRef.current.parentElement) {
                const dpr = window.devicePixelRatio || 1
                const parent = canvasRef.current.parentElement

                canvasRef.current.width = parent.clientWidth * dpr
                canvasRef.current.height = parent.clientHeight * dpr
                
                // CSS sizes
                canvasRef.current.style.width = `${parent.clientWidth}px`
                canvasRef.current.style.height = `${parent.clientHeight}px`

                // Render immediately with new dims
                renderFrame(Math.round(frameIndex.get()))
            }
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }
  }, [imagesLoaded, frameIndex])

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full absolute inset-0 mix-blend-screen transition-opacity duration-1000 contrast-[1.15] brightness-[1.05] saturate-[1.1] filter" 
    />
  )
}
