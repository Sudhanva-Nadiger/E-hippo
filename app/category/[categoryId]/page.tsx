import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Billboard from '@/components/Billboard';
import ProductCard from '@/components/ProductCard';
import NoResults from '@/components/ui/NoResult';

import { getProducts } from "@/lib/actions/get-products";
import { getCategoryById } from '@/lib/actions/get-categories';
import { getSizes } from '@/lib/actions/get-sizes';
import { getColors } from '@/lib/actions/get-colors';
import Filter from './components/Filter';
import MobileFilters from './components/MobileFilters';

// import Filter from './components/filter';
// import MobileFilters from './components/mobile-filters';

export const revalidate = 0;

interface CategoryPageProps {
  params: {
    categoryId: string;
  },
  searchParams: {
    colorId: string;
    sizeId: string;
  }
}

export default async function CategoryPage({ 
  params, 
  searchParams
}: CategoryPageProps)  {
  const productsPromise =  getProducts({ 
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });
  const sizesPromise =  getSizes();
  const colorsPromise =  getColors();
  const categoryPromise =  getCategoryById(params.categoryId);

  const [products, sizes, colors, category] = await Promise.all([
    productsPromise,
    sizesPromise,
    colorsPromise,
    categoryPromise
  ]);
  

  return (
    <div className="bg-white">
      <MaxWidthWrapper>
        <Billboard 
          id={category?.billBoardId.toString()}
        />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters sizes={sizes} colors={colors} />
            <div className="hidden lg:block">
              <Filter
                valueKey="sizeId" 
                name="Sizes" 
                data={sizes}
              />
              <Filter 
                valueKey="colorId" 
                name="Colors" 
                data={colors}
              />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};