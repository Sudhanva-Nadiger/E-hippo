import { Color } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/colors`;

export async function getColors() {
    const res = await fetch(URL, {
        cache: "no-cache"
    });
    const data = await res.json();
    
    return data as Color[];
}