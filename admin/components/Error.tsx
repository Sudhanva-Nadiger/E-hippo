export default function Error({
    message = "Something went wrong"
}: {
    message?: string
}) {
    return (
        <div>
            <h1>{message}</h1>
        </div>
    )
}