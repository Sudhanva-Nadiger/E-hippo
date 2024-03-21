import { Product } from "@/types";
import NoResults from "./ui/NoResult";
import { Query, getProducts } from "@/lib/actions/get-products";
import ProductCard from "./ProductCard";

export async function ProductList({
    title,
    query
}: {
    title: string,
    query: Query
}) {
    const products = await getProducts(query);
    
    return (
        <div className="space-y-4">
            <h3 className="font-bold text-3xl">{title}</h3>
            {(!products || products.length === 0) && <NoResults />}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}