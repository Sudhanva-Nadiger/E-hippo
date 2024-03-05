import { fetchStore } from "@/lib/actions";

interface DashBoardPageProps {
    params: {
        storeId: string;
    };
}

export default async function DashBoardPage({
    params: { storeId },
}: DashBoardPageProps) {

    const store = await fetchStore(storeId);

    return (
        <div>
            <h1>active store: {store?.name}</h1>
        </div>
    );
}