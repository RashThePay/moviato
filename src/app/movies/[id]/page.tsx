import { Heading1 } from "@/components/Heading";
import getTMDB from "@/lib/api";
import { redirect } from "next/navigation";

//redirect to the movie details page
export default async function MoviePage({ params }: { params: Promise<{ id: number }> }) {
    const id = (await params).id;
    const details = await getTMDB("/movie/" + id);
    if (details.title) redirect("/movies/" + id + "/" + details.title.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase());
    return (
        <div className="container mx-auto">
            <div className="relative my-24  text-center">
                <Heading1>Uh-oh!</Heading1>
                <p>The movie you requested is not found!</p>
            </div>
        </div>
    )
}