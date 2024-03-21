import { Size } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes`;

export async function getSizes() {
    const res = await fetch(URL, {
        cache: "no-cache"
    });
    const data = await res.json();
    
    return data as Size[];
}