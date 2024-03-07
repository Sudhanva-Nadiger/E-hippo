import { fetchBillBoard } from "@/lib/actions";
import { BillboardForm } from "./components/billboard-form";
import Error from "@/components/Error";

export default async function BillboardPage({
  params
}: {
  params: { billboardId: string }
}){

  const response = await fetchBillBoard(params.billboardId);

  if(!response.success) {
    return <Error />
  }

  const billboard = response.data;

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
}