import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { GlobalChat } from './global-chat'
import { Navbar } from '@/components/navbar'
import { SeedInitializer } from '@/components/seed-initializer'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Lensify - Premium Eyewear',
  description: 'Discover premium eyewear with virtual try-on, AI recommendations, and expert assistance',
  keywords: 'eyewear, glasses, lenses, virtual try-on, sunglasses, prescription frames',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased bg-white`}>
        <SeedInitializer />
        <Navbar />
        {children}
        <GlobalChat />
        <Analytics />
      </body>
    </html>
  )
}
