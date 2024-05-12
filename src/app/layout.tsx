import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mango Frontend Test',
  description:
    "Know your code skills for an every-day code problem based on our team design system's needs."
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main className='flex flex-col items-center justify-center h-screen gap-10'>
          {children}
        </main>
      </body>
    </html>
  )
}
