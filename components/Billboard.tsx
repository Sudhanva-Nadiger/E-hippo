import { getBillboard } from "@/lib/actions/get-billboard";
import MaxWidthWrapper from "./MaxWidthWrapper";

export async function Billboard({
    id
}: {
    id: string
}) {
    const data = await getBillboard(id);
    return (
        <MaxWidthWrapper className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
            <div style={{ backgroundImage: `url(${data?.imageUrl})` }} className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover">
                <div className="h-full w-full bg-white bg-opacity-15 flex flex-col justify-center items-center text-center gap-y-8">
                    <div className="font-bold text-blue-600 text-opacity-70 sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
                        {data.label}
                    </div>
                </div>
            </div>
        </MaxWidthWrapper>
    )
}