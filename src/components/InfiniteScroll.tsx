'use client'
import { Movie } from "@/lib/types"
import { useEffect, useState } from "react"
import MovieCard from "./MovieCard"
import { useInView } from "react-intersection-observer"
import { LucideLoader2 } from "lucide-react"

export default function InfiniteScroll({ initial, path, getter }: { initial: Movie[], path: string, getter: (slug: string, page: number) => Promise<{ results: Movie[] }> }) {
    const [page, setPage] = useState(1)
    const [movies, setMovies] = useState<Movie[]>([...initial])
    const { ref, inView } = useInView()
    const loadMore = async () => {
        const data = await getter(path, page+1)
        setMovies(movies => [...movies, ...data.results])
        setPage(page => page + 1)
    }
    useEffect(() => {
        if (inView) {
            loadMore()
        }
    }, [inView, loadMore])
    return (
        <div className="flex flex-wrap justify-center gap-4">
            {movies.map((movie: Movie) => (
                <MovieCard movie={movie} key={movie.id} />
            ))}
            <div ref={ref} className="w-full flex justify-center">
                <LucideLoader2 className="animate-spin size-12" />
            </div>
        </div>
    )
}