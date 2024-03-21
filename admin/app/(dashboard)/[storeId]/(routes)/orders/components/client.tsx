import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "./columns";

interface OrderClientProps {
  data: OrderColumn[];
}

export default function ProductClient({
  data
}: OrderClientProps) {

  return (
    <>
      <Heading
        title={`Orders ${data.length}`}
        description="Manage orders of your store"
      />

      <Separator />

      <DataTable
        columns={columns}
        data={data}
        searchKey="products"
      />
    </>
  );
};