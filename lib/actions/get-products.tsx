import { Product } from "@/types";
import qs from 'query-string'

export interface Query {
    categoryId?: string | number
    colorId?: string | number
    sizeId?: string | number
    isFeatured?: boolean
}


const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

export async function getProducts(query: Query) {
    const URL = qs.stringifyUrl({
        url: BASE_URL,
        query: {
            ...query
        }
    });

    const res = await fetch(URL, {
        cache: "no-cache"
    });
    const data = await res.json();
    
    return data as Product[];
}

export async function getProductById(id: string) {
    const URL = `${BASE_URL}/${id}`;
    const res = await fetch(URL, {
        cache: "no-cache"
    });
    const data = await res.json();
    
    return data as Product;
}