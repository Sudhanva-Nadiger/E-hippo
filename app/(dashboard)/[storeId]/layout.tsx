import Navbar from "@/components/Navbar";
import { fetchStore } from "@/lib/actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { storeId: string };
}) {
    const { userId } = auth();

    if(!userId) {
        redirect("/sign-in");
    }

    const res = await fetchStore(params.storeId);

    if(!res.success) {
        return <h1>Somethin went wrong please try again Later</h1>
    }

    const store = res.data;

    if(!store) {
        redirect("/");
    }

    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};