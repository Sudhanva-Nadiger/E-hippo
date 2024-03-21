import { fetchAllCategoriesWithBillBoard } from "@/lib/actions";
import  CategoryClient  from "./components/client";
import Error from "@/components/Error";
import { CategoryColumn } from "./components/columns";

export default async function CategoriesPage({
  params
}: {
  params: { storeId: string }
}) {
  
  const response = await fetchAllCategoriesWithBillBoard(params.storeId);

  if(!response.success) {
    return <Error />
  }

  const categories = response.data || [];

  const formattedBillboards: CategoryColumn[] = categories.map((category) => {
    return {
      id: category.id.toString(),
      name: category.name,
      billboardLabel: category.billBoards.label,
      createdAt: category.createdAt.toLocaleDateString("en-GB"),
    };
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedBillboards} />
      </div>
    </div>
  );
};
