import  BillboardClient  from "./components/client";

export default async function BillboardsPage({
  params
}: {
  params: { storeId: string }
}) {
  

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient />
      </div>
    </div>
  );
};
