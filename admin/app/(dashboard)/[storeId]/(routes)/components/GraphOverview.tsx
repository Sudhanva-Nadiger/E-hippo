import Error from "@/components/Error";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGraphData } from "@/lib/actions";
import Chart from "./Chart";

export default async function GraphOverview({
    storeId
}: {
    storeId: string;
}) {
    const response = await getGraphData(storeId);

    if (!response.success) {
        return <Error message="Could not load the data! Try again later." />;
    }

    if (!response.data) {
        return <Error message="Please provide a valid store id" />
    }

    const graphData = response.data;

    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <Chart revenue={graphData} />
            </CardContent>
        </Card>
    );
}