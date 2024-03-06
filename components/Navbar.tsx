import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "@/components/MainNav";
import StoreSwitcher from "@/components/StoreSwitcher";
import { redirect } from "next/navigation";
import { fetchAllUserStores } from "@/lib/actions";
import Error from "@/components/Error";

export default async function Navbar() {

    const { userId } = auth();

    if(!userId) {
        redirect('/sign-in');
    }

    const res = await fetchAllUserStores(userId);

    if(!res.success) {
        return <Error />
    }

    const stores = res.data;

    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <StoreSwitcher items={stores} />
                <MainNav />
                <div className="ml-auto flex items-center space-x-4">
                    <UserButton afterSignOutUrl="/" />
                </div>
            </div>
        </div>
    )
}