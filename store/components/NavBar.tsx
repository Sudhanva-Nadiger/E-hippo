import { getCategories } from '@/lib/actions/get-categories'
import Link from 'next/link'
import { Icons } from './Icons'
import MaxWidthWrapper from './MaxWidthWrapper'
import NavItems from './NavItems'
import Cart from './Cart'
import MobileNav from './MobileNav'

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <div className='bg-white sticky z-40 top-0 inset-x-0 h-16'>
      <header className='relative bg-white'>
        <MaxWidthWrapper>
          <div className='border-b border-gray-200'>
            <div className='flex h-16 items-center'>

              <div className='ml-4 flex lg:ml-0'>
                <Link href='/'>
                  <Icons.logo className='h-10 w-10' />
                </Link>
              </div>

              <div className='hidden z-50 lg:ml-8 lg:block lg:self-stretch'>
                <NavItems data={categories} />
              </div>

              <MobileNav category={categories} />

              <div className='ml-auto flex items-center'>
                <div className='lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                  <div className='ml-4 flow-root lg:ml-6'>
                    <Cart />
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