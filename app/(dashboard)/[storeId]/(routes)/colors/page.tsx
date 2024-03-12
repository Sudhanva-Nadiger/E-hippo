import { fetchAllColors } from "@/lib/actions";
import  ColorClient  from "./components/client";
import Error from "@/components/Error";
import { ColorColumn } from "./components/columns";

export default async function ColorsPage({
  params
}: {
  params: { storeId: string }
}) {
  
  const response = await fetchAllColors(params.storeId);

  if(!response.success) {
    return <Error />
  }

  const colors = response.data || [];

  const formattedSizes: ColorColumn[] = colors.map((color) => {
    return {
      id: color.id.toString(),
      name: color.name,
      value: color.value,
      createdAt: color.createdAt.toLocaleDateString("en-GB"),
    };
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formattedSizes} />
      </div>
    </div>
  );
};
