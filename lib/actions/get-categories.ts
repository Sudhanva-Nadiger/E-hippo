import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

export async function getCategories() {
    const res = await fetch(URL, {
        cache: "no-cache"
    });
    const data = await res.json();
    
    return data as Category[];
}