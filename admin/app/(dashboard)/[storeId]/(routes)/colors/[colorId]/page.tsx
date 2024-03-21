import { fetchColor } from "@/lib/actions";
import { ColorForm } from "./components/color-form";
import Error from "@/components/Error";

export default async function SizePage({
  params
}: {
  params: { colorId: string }
}){
  const response = await fetchColor(params.colorId);

  if(!response.success) {
    return <Error />
  }

  const color = response.data;

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
}