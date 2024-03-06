import Error from "@/components/Error";
import { fetchStore } from "@/lib/actions";

interface DashBoardPageProps {
    params: {
        storeId: string;
    };
}

export default async function DashBoardPage({
    params: { storeId },
}: DashBoardPageProps) {

    const res = await fetchStore(storeId);

    if(!res.success) {
        return <Error message="Could notload the data! Try again later." />
    }

    const store = res.data

    return (
        <div>
            <h1>active store: {store?.name}</h1>
        </div>
    );
}