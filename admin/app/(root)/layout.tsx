import { fetchUserStores } from "@/lib/actions";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupLayout({ 
    children 
}: { 
    children: React.ReactNode 
}) {
    const { userId } = auth();

    if(!userId) {
        redirect("/sign-in");
    }

    console.log(userId);
    

    const res = await fetchUserStores(userId);

    if(!res.success) {
        return <h1>{"Something went wrong try again later"}</h1>
    }
    
    const store = res.data;

    if(store) {
        redirect(`/${store.id}`);
    }

    return (
        <>
            {children}
        </>
    );
}