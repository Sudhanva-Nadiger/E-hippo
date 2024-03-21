import Error from "@/components/Error";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { fetchStore } from "@/lib/actions";
import { auth } from "@clerk/nextjs";
import CardWrapper from "./components/Cards";
import GraphOverview from "./components/GraphOverview";

interface DashBoardPageProps {
    params: {
        storeId: string;
    };
}

export default async function DashBoardPage({
    params: { storeId },
}: DashBoardPageProps) {
    const { userId } = auth();

    const res = await fetchStore(storeId, userId!);

    if (!res.success) {
        return <Error message="Could notload the data! Try again later." />
    }

    const store = res.data

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Heading title="Dashboard" description="Overview of your store" />
                <Separator />
                <div className="grid gap-4 grid-cols-3">
                    <CardWrapper storeId={storeId} />
                </div>
                <GraphOverview storeId={storeId} />
            </div>
        </div>
    );
}