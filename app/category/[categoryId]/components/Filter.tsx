"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Color, Size } from "@/types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import qs from "query-string";

interface FilterProps {
    valueKey: string;
    name: string;
    data: (Size | Color)[];
}

export default function Filter({
    valueKey,
    name,
    data
}: FilterProps) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const selectedValue = searchParams.get(valueKey);

    const onClick = (id: string) => {
        const current = qs.parse(searchParams.toString());

        const query = {
            ...current,
            [valueKey]: id
        };

        if (current[valueKey] === id) {
            query[valueKey] = null;
        }

        const url = qs.stringifyUrl({
            url: window.location.href,
            query,
        }, { skipNull: true });

        router.push(url, { 
            scroll: false,
        });
    }


    return (
        <div className="mb-8">
            <h3 className="text-lg font-semibold">
                {name}
            </h3>
            <hr className="my-4" />
            <div className="flex flex-wrap gap-2">
                {data.map((filter) => (
                    <div key={filter.id} className="flex items-center">
                        <Button
                            className={cn(
                                'rounded-md text-sm text-gray-800 hover:bg-gray-100 p-2 bg-white border border-gray-300',
                                (selectedValue === filter.id.toString()) && 'bg-black text-white hover:bg-black hover:bg-opacity-80'
                            )}
                            onClick={() => onClick(filter.id.toString())}
                        >
                            {filter.name}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}