import { fetchAllBillboards } from "@/lib/actions";
import  BillboardClient  from "./components/client";
import Error from "@/components/Error";

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

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={billboards} />
      </div>
    </div>
  );
};
