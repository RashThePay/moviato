import { MovieCarousel } from "@/components/MovieCarousel";
import getTMDB from "@/lib/api";


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
