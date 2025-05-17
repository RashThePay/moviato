"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/use-debounce";
import getTMDB from "@/lib/api";

type MovieSearchResult = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
};

export function MovieSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MovieSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const searchMovies = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const data = await getTMDB(`/search/movie?query=${encodeURIComponent(debouncedQuery)}`
        );
        setResults(data.results || []);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    searchMovies();
  }, [debouncedQuery]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (movieId: number) => {
    setOpen(false);
    router.push(`/movies/${movieId}`);
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative w-fit justify-start text-sm text-muted-foreground md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 md:mr-2" />
        <span className="hidden lg:inline-flex">Search movies...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search movies..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {isLoading && (
              <div className="space-y-2 p-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            )}
            {!isLoading && results.length === 0 && query !== "" && (
              <CommandEmpty>No movies found</CommandEmpty>
            )}
            {!isLoading && results.length > 0 && (
              <CommandGroup heading="Movies">
                {results.map((movie) => (
                  <CommandItem
                    key={movie.id}
                    value={movie.title}
                    onSelect={() => handleSelect(movie.id)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {movie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                          alt={movie.title}
                          className="h-12 w-8 rounded object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="h-12 w-8 bg-muted rounded flex items-center justify-center">
                          <Search className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{movie.title}</p>
                        <div className="flex gap-2 text-xs text-muted-foreground">
                          {movie.release_date && (
                            <span>
                              {new Date(movie.release_date).getFullYear()}
                            </span>
                          )}
                          {movie.vote_average > 0 && (
                            <span>⭐ {movie.vote_average.toFixed(1)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}