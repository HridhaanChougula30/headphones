import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Sony WH-1000XM6 | Silence, perfected.',
  description: 'Experience the Apple-level cinematic scrollytelling landing page for Sony WH-1000XM6 flagship noise-cancelling headphones.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans bg-[#050505] text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}
