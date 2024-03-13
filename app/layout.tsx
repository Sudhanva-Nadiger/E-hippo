// import Navbar from '@/components/Navbar'
import { cn, constructMetadata } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import { Toaster } from 'sonner'
import Footer from '@/components/Footer'
import Navbar from '@/components/NavBar'
import './globals.css'
// import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = constructMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='h-full'>
      <body
        className={cn(
          'relative h-full font-sans antialiased',
          inter.className
        )}>
        <main className='relative flex flex-col min-h-screen'>

          <Navbar />
          <div className='flex-grow flex-1'>
            {children}
          </div>
          <Footer />
        </main>

        {/* <Toaster position='top-center' richColors /> */}
      </body>
    </html>
  )
}