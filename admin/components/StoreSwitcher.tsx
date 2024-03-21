"use client";

import { useParams, useRouter } from "next/navigation";
import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from "lucide-react";


import { useStoreModal } from "@/hooks/use-store-modal";
import { Store } from "@/lib/schema"
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { 
    Popover, 
    PopoverContent, 
    PopoverTrigger 
} from "@/components/ui/popover"
import { 
    Command, 
    CommandEmpty, 
    CommandGroup, 
    CommandInput, 
    CommandItem, 
    CommandList, 
    CommandSeparator
} from "@/components/ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[]
}

export default function StoreSwitcher({
    className,
    items = [],
}: StoreSwitcherProps) {
    const storeModal = useStoreModal();
    const params = useParams();
    const router = useRouter();

    const currentStore = items.find(store => store.id+"" === params.storeId);

    const onStoreSelect = (store: Store) => {
        router.push(`/${store.id}`);
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"} 
                    role="combobox"
                    size={"sm"}
                    aria-label="Select a store"
                    className={cn("w-[200px] justify-between", className)}
                >
                    <StoreIcon className="mr-2 h-4 w-4" />
                    {currentStore?.name || "Select a store"}
                    <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50 shrink-0" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search store..." />
                        <CommandEmpty>No store available.</CommandEmpty>
                        <CommandGroup heading="Stores">
                            {
                                items.map(store => (
                                    <CommandItem
                                        key={store.id}
                                        onSelect={() => onStoreSelect(store)}
                                        className="text-sm"
                                    >
                                        <StoreIcon className="mr-2 h-4 w-4" />
                                        {store.name}
                                        <Check
                                            className={cn(
                                                "ml-auto h-4 w-4", 
                                                store.id === currentStore?.id ? "opacity-150": "opacity-0"
                                            )}
                                         />
                                    </CommandItem>
                                ))
                            }
                        </CommandGroup>
                    </CommandList>

                    <CommandSeparator />

                    <CommandList>
                        <CommandGroup>
                            <CommandItem className="cursor-pointer" onSelect={() => storeModal.onOpen()}>
                                <PlusCircle className="w-5 h-5 mr-2" />
                                Create store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>

                </Command>
            </PopoverContent>
        </Popover>
    )
}