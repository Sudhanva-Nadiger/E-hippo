import { fetchAllBillboards, fetchCategory } from "@/lib/actions";
import { CategoryForm } from "./components/category-form";
import Error from "@/components/Error";

export default async function CategoryPage({
  params
}: {
  params: { 
    categoryId : string,
    storeId: string
  }
}){
  const response = await fetchCategory(params.categoryId);

  if(!response.success) {
    return <Error />
  }

  const category = response.data;

  const result = await fetchAllBillboards(params.storeId);

  if(!result.success) {
    return <Error />
  }

  const billboards = result.data;

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm 
          billboards={billboards}
          initialData={category} 
        />
      </div>
    </div>
  );
}