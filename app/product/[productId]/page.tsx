import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ProductList } from "@/components/ProductList";
import Gallery from "@/components/gallery";
import Info from "@/components/ui/Info";
import { getProductById } from "@/lib/actions/get-products";

interface ProductPageProps {
    params: {
        productId: string;
    }
}

export default async function ProductPage({
    params
}: ProductPageProps) {
    const product = await getProductById(params.productId);

    return (
        <>
            <MaxWidthWrapper className="bg-white">
                <div className="px-4 py-10 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                        <Gallery images={product.images} />
                        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                            <Info data={product} />
                        </div>
                    </div>
                    <hr className="my-10" />
                    <ProductList title="Related Items" query={{categoryId: product.category.id}} />
                </div>
            </MaxWidthWrapper>
        </>
    )
}