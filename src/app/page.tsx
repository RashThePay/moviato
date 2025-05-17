import { Heading1 } from "@/components/Heading";
import MovieCard from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import getTMDB from "@/lib/api";
import { Movie } from "@/lib/types";
import Link from "next/link";

export function MovieCarousel({ title, href, movies }: { title: string, href?: string, movies: Movie[] }) {
  return (
    <div className="my-6">
      <div className="w-full flex justify-between items-center">
        <Heading1>{title}</Heading1>
        {href &&
          <Link className=" text-emerald-700 dark:text-emerald-300" href={href}>
            <Button variant="secondary">
              Explore
            </Button>
          </Link>
        }
      </div>
      <Carousel className="w-full relative select-none" opts={{ loop: true, dragFree: true }}>
        <CarouselContent className="-ml-0">
          {movies?.map((movie: Movie) => (
            <CarouselItem key={movie.id} className="basis-48 me-3">
              <MovieCard movie={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute top-0 left-0 h-full w-6 bg-gradient-to-r from-background to-transparent"></div>
        <div className="absolute top-0 right-0 h-full w-6 bg-gradient-to-l from-background to-transparent"></div>
      </Carousel>
    </div>
  )
}
export default async function Home() {
  const nowPlaying = await getTMDB("/movie/now_playing?language=en-US&page=1");
  const popular = await getTMDB("/movie/popular?language=en-US&page=1");
  const topRated = await getTMDB("/movie/top_rated?language=en-US&page=1");
  const upcoming = await getTMDB("/movie/upcoming?language=en-US&page=1");
  return (
    <div className="container mx-auto py-6">
      <MovieCarousel href="/lists/now_playing" title="Now Playing" movies={nowPlaying.results} />
      <MovieCarousel href="/lists/popular" title="Popular Movies" movies={popular.results} />
      <MovieCarousel href="/lists/top_rated" title="Top Rated" movies={topRated.results} />
      <MovieCarousel href="/lists/upcoming" title="Coming Soon" movies={upcoming.results} />
    </div>
  );
}
