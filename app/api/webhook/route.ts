import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { order, product } from "@/lib/schema";
import { SQL, eq, sql } from "drizzle-orm";

export async function POST(req: Request) {
    const body = await req.text()
  const signature = headers().get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country
  ];

  const addressString = addressComponents.filter((c) => c !== null).join(', ');

    const id = parseInt(session?.metadata?.orderId!);

    if(event.type === "checkout.session.completed") {
        if(Number.isNaN(id)) {
            console.log("signature", signature);
            return new NextResponse("Invalid Order Id", { status: 400 });
        }

        await db.update(order).set({
            isPaid: true,
            address: addressString,
            phone: session?.customer_details?.phone || "",
        }).where(eq(order.id, id));

        const orderDetail = await db.query.order.findFirst({
            where: (order, { eq }) => eq(order.id, id),
            with: {
                orderItems: true
            }
        })

        return NextResponse.json(orderDetail, {
            status: 200
        })
    }

    return new NextResponse(null, { status: 200 });
}