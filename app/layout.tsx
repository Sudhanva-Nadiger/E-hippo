// import Navbar from '@/components/Navbar'
import { cn, } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import { Toaster } from 'sonner'
import './globals.css'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
// import Footer from '@/components/Footer'

import { ClerkProvider } from '@clerk/nextjs'
import { ModalProvider } from '@/providers/ModalProvider'

import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin dashboard for managing the ecommerce app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang='en' className='h-full'>
        <>
          <body
            className={cn(
              'relative h-full font-sans antialiased',
              inter.className
            )}>
            <main className='relative flex flex-col min-h-screen'>
              {/* <Navbar /> */}
              <MaxWidthWrapper>
                <ModalProvider />
                {children}
              </MaxWidthWrapper>
              {/* <Footer /> */}
            </main>
            <Toaster  />
          </body>
        </>
      </html>
    </ClerkProvider>
  )
}