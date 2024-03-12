import { fetchAllSizes } from "@/lib/actions";
import  SizeClient  from "./components/client";
import Error from "@/components/Error";
import { SizeColumn } from "./components/columns";

export default async function SizesPage({
  params
}: {
  params: { storeId: string }
}) {
  
  const response = await fetchAllSizes(params.storeId);

  if(!response.success) {
    return <Error />
  }

  const sizes = response.data || [];

  const formattedSizes: SizeColumn[] = sizes.map((size) => {
    return {
      id: size.id.toString(),
      name: size.name,
      value: size.value,
      createdAt: size.createdAt.toLocaleDateString("en-GB"),
    };
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  );
};
