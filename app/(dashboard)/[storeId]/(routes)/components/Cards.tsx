import Error from '@/components/Error';
import { CardContent, CardHeader, CardTitle, Card as ShadcnCard } from '@/components/ui/card';
import { fetchCardData } from '@/lib/actions';
import {
    CreditCard,
    DollarSign,
    Package
} from 'lucide-react';

const iconMap = {
    revenue: DollarSign,
    sales: CreditCard,
    stock: Package,
};

export default async function CardWrapper({
    storeId
}: {
    storeId: string;
}) {
    const response = await fetchCardData(storeId);

    if (!response.success) {
        return <Error message="Could not load the data! Try again later." />;
    }

    if(!response.data) {
        return <Error message="Please provide a valid store id" />
    }

    const {
        totalRevenue,
        salesCount,
        stockCount
    } = response.data;  

    return (
        <>
            <Card title="Total revenue" value={totalRevenue} type="revenue" />
            <Card title="Sales" value={"+" + salesCount} type="sales" />
            <Card title="Products in stock" value={stockCount} type="stock" />
        </>
    );
}

export function Card({
    title,
    value,
    type,
}: {
    title: string;
    value: number | string;
    type: 'revenue' | 'sales' | 'stock';
}) {
    const Icon = iconMap[type];

    return (
        <ShadcnCard>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </ShadcnCard>
    );
}
