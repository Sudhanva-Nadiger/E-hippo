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

    const store = await fetchStore(params.storeId);

    if(!store) {
        redirect("/");
    }

    return (
        <div>
            <h1>Navbar</h1>
            {children}
        </div>
    );
};