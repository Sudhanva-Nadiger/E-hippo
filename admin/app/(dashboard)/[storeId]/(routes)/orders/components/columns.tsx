"use client"

import { ColumnDef } from "@tanstack/react-table"

export type OrderColumn = {
  id: string
  phone: string | null	
  address: string | null
  products: string
  totalPrice: string
  createdAt: string
  isPaid: boolean
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
]
