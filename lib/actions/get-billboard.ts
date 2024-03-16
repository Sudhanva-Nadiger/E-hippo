import { Billboard } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/billboards`;

export async function getBillboard(id: string): Promise<Billboard> {
  const res = await fetch(`${URL}/${id}`,{
    cache: "no-cache"
  });

  return res.json();
};