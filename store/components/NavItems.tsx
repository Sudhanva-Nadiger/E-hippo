'use client'

import { cn } from '@/lib/utils'
import { Category } from '@/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavItems = ({
  data
}: {
  data: Category[]
}) => {
  const pathName = usePathname();

  const routes = data.map((route: any) => {
    return {
      href: `/category/${route.id}`,
      label: route.name,
      active: pathName === `/category/${route.id}`
    }
  })

  return (
    <nav className='flex gap-4 h-full items-center'>
      {routes.map((route, index: number) => (
        <Link 
          key={index} 
          href={route.href}
          className={cn("text-sm font-medium transition-colors hover:text-blue-600")}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}

export default NavItems