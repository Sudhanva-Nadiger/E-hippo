import Billboard from '@/components/Billboard'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { ProductList } from '@/components/ProductList'
import {
  Button,
  buttonVariants,
} from '@/components/ui/button'
import { getProducts } from '@/lib/actions/get-products'
import {
  ArrowDownToLine,
  CheckCircle,
  Leaf,
} from 'lucide-react'
import Link from 'next/link'

const perks = [
  {
    name: 'Instant Delivery',
    Icon: ArrowDownToLine,
    description:
      'Get your assets delivered to your email in seconds and download them right away.',
  },
  {
    name: 'Guaranteed Quality',
    Icon: CheckCircle,
    description:
      'Every asset on our platform is verified by our team to ensure our highest quality standards. Not happy? We offer a 30-day refund guarantee.',
  },
  {
    name: 'For the Planet',
    Icon: Leaf,
    description:
      "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
  },
]

export default async function Home() {

  return (
    <div className='space-y-5'>
      <MaxWidthWrapper>
        <div className='py-20 mx-auto text-center flex flex-col items-center max-w-3xl'>
          <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
            Your Ecommerce shop for{' '}
            <span className='text-blue-600'>
              quality products
            </span>
            .
          </h1>
          <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
            Welcome to EHippo. Every product on our
            platform is of highest quality standards. Just purchace them without any hesitations.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 mt-6'>
            <Link
              href='#featuredProducts'
              className={buttonVariants()}>
              Featured products &rarr;
            </Link>
            <Button variant='ghost'>
              Our quality promise &rarr;
            </Button>
          </div>
        </div>
      </MaxWidthWrapper>

      <Billboard id='2' />

      <MaxWidthWrapper id='featuredProducts' className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" query={{isFeatured: true}} />
      </MaxWidthWrapper>

      <section className='border-t border-gray-200 bg-gray-50'>
        <MaxWidthWrapper className='py-20'>
          <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0'>
            {perks.map((perk) => (
              <div
                key={perk.name}
                className='text-center md:flex md:items-start md:text-left lg:block lg:text-center'>
                <div className='md:flex-shrink-0 flex justify-center'>
                  <div className='h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900'>
                    {<perk.Icon className='w-1/3 h-1/3' />}
                  </div>
                </div>

                <div className='mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6'>
                  <h3 className='text-base font-medium text-gray-900'>
                    {perk.name}
                  </h3>
                  <p className='mt-3 text-sm text-muted-foreground'>
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  )
}
