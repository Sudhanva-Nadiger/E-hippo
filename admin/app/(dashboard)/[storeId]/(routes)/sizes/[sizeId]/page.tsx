import { fetchSize } from "@/lib/actions";
import { SizeForm } from "./components/size-form";
import Error from "@/components/Error";

export default async function SizePage({
  params
}: {
  params: { sizeId: string }
}){
  const response = await fetchSize(params.sizeId);

  if(!response.success) {
    return <Error />
  }

  const size = response.data;

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
}