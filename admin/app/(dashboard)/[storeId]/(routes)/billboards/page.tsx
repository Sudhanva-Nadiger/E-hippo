import { fetchAllBillboards } from "@/lib/actions";
import  BillboardClient  from "./components/client";
import Error from "@/components/Error";
import { BillboardColumn } from "./components/columns";

export default async function BillboardsPage({
  params
}: {
  params: { storeId: string }
}) {
  
  const response = await fetchAllBillboards(params.storeId);

  if(!response.success) {
    return <Error />
  }

  const billboards = response.data || [];

  const formattedBillboards : BillboardColumn[] = billboards.map((billboard) => {
    return {
      id: billboard.id.toString(),
      label: billboard.label,
      createdAt: billboard.createdAt.toLocaleDateString("en-GB"),
    };
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};
