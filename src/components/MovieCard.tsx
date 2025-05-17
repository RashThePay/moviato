import { Movie } from "@/lib/types";
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { LucideStar } from "lucide-react"
import { genres } from "@/lib/genres"
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import Image from "next/image";

export default function MovieCard({ movie }: { movie: Movie }) {
    return (
        <Link href={"/movies/" + movie.id + "/" + movie.title.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}>
            <Card key={movie.id} className="w-48 h-72 overflow-clip relative group">
                <Skeleton className=" absolute inset-0" />

                <Image
                    loading="eager"
                    className="absolute inset-0 blur-md"
                    width={500} height={500} alt={movie.title} src={"https://image.tmdb.org/t/p/w45" + movie.poster_path} />
                <Image
                    onError={(e)=>(e.target as HTMLImageElement).remove()}
                    loading="lazy"
                    className="absolute inset-0"
                    width={500} height={500} alt={movie.title} src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />
                <CardContent className="opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0 bg-black/65 flex flex-col justify-end-safe p-2">
                    <h2 className="font-semibold text-xl leading-tight font-saira text-emerald-200 mb-1">{movie.title} </h2>
                    <div className="flex gap-0.5 flex-wrap mb-1">
                        <Badge variant="outline"><LucideStar className=" stroke-amber-300 fill-amber-300" />{movie.vote_average.toFixed(1)}</Badge>
                        {movie.genre_ids.map((genreId: number) => (
                            <Badge key={genreId} variant="secondary">{genres.find(g => g.id == genreId)?.name}</Badge>
                        ))}
                    </div>
                    <p className="text-white text-xs">{movie.overview.split(" ").slice(0, 10).join(" ")}...</p>
                </CardContent>
            </Card>
        </Link>
    )
}