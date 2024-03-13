import { cookies } from 'next/headers'
import Link from 'next/link'
import { Icons } from './Icons'
import MaxWidthWrapper from './MaxWidthWrapper'
import MobileNav from './MobileNav'
import NavItems from './NavItems'
import { buttonVariants } from './ui/button'

const Navbar = async () => {
  const nextCookies = cookies()
  const user = null;

  return (
    <div className='bg-white sticky z-50 top-0 inset-x-0 h-16'>
      <header className='relative bg-white'>
        <MaxWidthWrapper>
          <div className='border-b border-gray-200'>
            <div className='flex h-16 items-center'>
              <MobileNav />

              <div className='ml-4 flex lg:ml-0'>
                <Link href='/'>
                  <Icons.logo className='h-10 w-10' />
                </Link>
              </div>

              <div className='hidden z-50 lg:ml-8 lg:block lg:self-stretch'>
                <NavItems />
              </div>

              <div className='ml-auto flex items-center'>
                <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                  <div className='ml-4 flow-root lg:ml-6'>
                    Cart
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}

export default Navbar