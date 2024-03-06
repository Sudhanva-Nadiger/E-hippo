import { fetchStore } from "@/lib/actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import SettingsForm from "./components/SettingsForm";

interface SettingsPageProps {
    params: {
        storeId: string;
    }
}

export default async function SettingsPage({
    params: { storeId }
}: SettingsPageProps) {

    const { userId } = auth();

    if(!userId) {
        redirect("/sign-in");
    }

    const res = await fetchStore(storeId, userId);

    if(!res.success) {
        return <h1>Somethin went wrong please try again Later</h1>
    }

    const store = res.data;

    if(!store) {
        redirect("/");
    }

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm store={store} />
            </div>
        </div>
    );
}