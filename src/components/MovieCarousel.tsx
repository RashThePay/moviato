'use client'

import { Link } from "lucide-react";
import { Heading1 } from "./Heading";
import { Button } from "./ui/button";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Movie } from "@/lib/types";
import MovieCard from "./MovieCard";

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