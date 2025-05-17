'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import getTMDB, { discoverMovies } from '@/lib/api';
import { Movie, Genre } from '@/lib/types';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { genres } from '@/lib/genres';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import MovieCard from '@/components/MovieCard';
import { LucideArrowBigUp, LucideLoader2 } from 'lucide-react';

export default function DiscoverPage() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    // Get current filter values from URL
    const genre = searchParams.get('genre') || '';
    const year = searchParams.get('year') || '';
    const voteAverage = searchParams.get('vote_average') || '0';
    const [page, setPage] = useState(1)
    // Fetch movies with fetch
    const { data } = useQuery({
        queryKey: ['discover', genre, year, voteAverage],
        queryFn: () =>
            discoverMovies({
                with_genres: genre,
                primary_release_year: year,
                'vote_average.gte': voteAverage,
            }),
    });
    const [movies, setMovies] = useState(data?.results || [])

    // Debounce the search updates to avoid too many requests
    const handleSearch = useDebouncedCallback((key: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 300);

    const handleVoteChange = (value: number[]) => {
        const params = new URLSearchParams(searchParams);
        params.set('vote_average', value[0].toString());
        router.replace(`${pathname}?${params.toString()}`);
    };
    const handleYearChange = (value: number[]) => {
        const params = new URLSearchParams(searchParams);
        params.set('year', value[0].toString());
        router.replace(`${pathname}?${params.toString()}`);
    };
    const clearFilters = () => {
        router.replace(pathname);
    };
    const { ref, inView } = useInView()
    const loadMore = async () => {
        setPage(page => page + 1)
        const params = new URLSearchParams(searchParams);
        params.append('page', page.toString())
        const data = await getTMDB(`/discover/movie?${params.toString()}`)
        setMovies(movies => [...movies, ...data.results])
    }
    useEffect(() => {

        if (inView) {
            loadMore()
        }
    }, [inView, loadMore])
    useEffect(() => {
        setMovies(data?.results || [])
    }, [data])
    useEffect(() => {
        window.addEventListener("scroll", () => {
            const button = document.getElementById("top-button");
            if (window.scrollY > 200) {
                button?.classList.remove("hidden");
            } else {
                button?.classList.add("hidden");
            }
        })
    }, [])
    return (
        <div className="container mx-auto text-center px-4 py-8 font-saira">
            <h1 className="text-3xl font-bold mb-8">Discover Movies</h1>

            {/* Filters Section */}
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Genre Filter */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Genre</label>
                            <Select
                                
                                value={genre}
                                onValueChange={(value) => handleSearch('genre', value)}
                            >
                                <SelectTrigger className='w-full'>
                                    <SelectValue placeholder="Select a genre" className='w-full' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="-">All Genres</SelectItem>
                                    {genres.map((genre: Genre) => (
                                        <SelectItem key={genre.id} value={genre.id.toString()}>
                                            {genre.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Year Filter */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Release Year: {year}</label>
                            <Slider
                                defaultValue={[parseInt(year)]}
                                max={new Date().getFullYear()}
                                min={1900}
                                step={1}
                                onValueChange={handleYearChange}
                            />
                        </div>

                        {/* Vote Average Filter */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Minimum Rating: {voteAverage}
                            </label>
                            <Slider
                                defaultValue={[parseInt(voteAverage)]}
                                max={10}
                                step={0.1}
                                onValueChange={handleVoteChange}
                            />
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        className="mt-4"
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </Button>
                </CardContent>
            </Card>
            <div className="flex flex-wrap justify-center gap-4">
                {movies.map((movie: Movie) => (
                    <MovieCard movie={movie} key={movie.id + Math.random()} />
                ))}

                <a href="#top" id='top-button' className='fixed hidden bottom-12 left-12 rounded-full bg-emerald-500 p-2 text-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out'>
                    <LucideArrowBigUp />
                </a>

            </div>
            <div ref={ref} className="mx-auto flex justify-center py-12">
                <LucideLoader2 className="animate-spin size-12" />
            </div>
        </div>
    )
}