import { fetchAllOrders } from "@/lib/actions";
import  OrderClient  from "./components/client";
import Error from "@/components/Error";
import { OrderColumn } from "./components/columns";
import { formatPrice } from "@/lib/utils";

export default async function OrdersPage({
  params
}: {
  params: { storeId: string }
}) {
  
  const response = await fetchAllOrders(params.storeId);

  if(!response.success) {
    return <Error />
  }

  const orders = response.data || [];

  const formattedOrders: OrderColumn[] = orders.map((order) => {
    return {
      id: order.id.toString(),
      isPaid: order.isPaid || false,
      phone: order.phone,
      address: order.address,
      products: order.orderItems.map(item => item.product.name).join(", "),
      totalPrice: formatPrice(order.orderItems.reduce((total, item) => total + (+item.product.price), 0)),
      createdAt: order.createdAt.toLocaleDateString("en-GB"),
    };
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};
