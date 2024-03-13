import { 
  fetchAllCategories, 
  fetchAllColors, 
  fetchAllSizes, 
  fetchProduct 
} from "@/lib/actions";
import { ProductForm } from "./components/product-form";
import Error from "@/components/Error";

export default async function ProductPage({
  params
}: {
  params: { 
    productId: string,
    storeId: string
  }
}){
  const productPromise = fetchProduct(params.productId);
  const categoryPromise = fetchAllCategories(params.storeId);
  const sizePromise = fetchAllSizes(params.storeId);
  const colorPromise = fetchAllColors(params.storeId);

  const [
    productResponse, 
    categoryResponse, 
    sizeResponse,
    colorResponse
  ] = await Promise.all([
    productPromise, 
    categoryPromise, 
    sizePromise,
    colorPromise
  ]);

  if(
      !productResponse.success || 
      !categoryResponse.success || 
      !sizeResponse.success || 
      !colorResponse.success
    ) {
    return <Error />
  }

  const product = productResponse.data;
  const categories = categoryResponse.data || [];
  const sizes = sizeResponse.data || [];
  const colors = colorResponse.data || [];

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm 
          initialData={product} 
          categories={categories}
          sizes={sizes}
          colors={colors}
        />
      </div>
    </div>
  );
}