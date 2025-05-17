
import { Heading1 } from "@/components/Heading";
import { MovieCarousel } from "@/components/MovieCarousel";
import MovieDetailPage from "@/components/MovieDetails";
import getTMDB from "@/lib/api";
import { MovieDetail } from "@/lib/types";

export default async function MoviePage({ params }: { params: Promise<{ id: number}> }) {
    const id = (await params).id;
    try {
        const details = await getTMDB("/movie/" + id) as MovieDetail;
        const similar = await getTMDB("/movie/" + id + "/similar");
        return (
            <>
                <title>{details.title}</title>
                <MovieDetailPage movie={details} />
                <div className="container mx-auto px-4 py-8">
                    <MovieCarousel movies={similar.results} title="Similar Movies" />
                </div>
            </>
        )
    } catch (e) {
        console.log(e)
        return (
            <div className="container mx-auto">
                <title>Movie not found</title>
                <div className="relative my-24  text-center">
                    <Heading1>Uh-oh!</Heading1>
                    <p>The movie you requested is not found!</p>
                </div>
            </div>
        )
    }
}