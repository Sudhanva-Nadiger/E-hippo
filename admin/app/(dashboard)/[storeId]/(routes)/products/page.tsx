import { fetchAllProducts } from "@/lib/actions";
import  ProductClient  from "./components/client";
import Error from "@/components/Error";
import { ProductColumn } from "./components/columns";
import { formatPrice } from "@/lib/utils";

export default async function ProductsPage({
  params
}: {
  params: { storeId: string }
}) {
  
  const response = await fetchAllProducts(params.storeId);

  if(!response.success) {
    return <Error />
  }

  const products = response.data || [];

  const formattedProducts: ProductColumn[] = products.map((product) => {
    return {
      id: product.id.toString(),
      name : product.name,
      isFeatured: product.isFeatured,
      isArchived: product.isArchived,
      price: formatPrice(parseFloat(product.price)),
      category: product.category.name,
      size: product.size.name,
      color: product.color.value,
      createdAt: product.createdAt.toLocaleDateString("en-GB"),
    };
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};
