import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { MovieDetail } from "@/lib/types";

interface MovieDetailPageProps {
    movie: MovieDetail;
}

export default function MovieDetailPage({ movie }: MovieDetailPageProps) {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(value);
    };

    const formatRuntime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {movie.backdrop_path && (
                <div className="relative h-64 w-full overflow-hidden mb-6">
                    <Image
                        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                        alt={movie.title}
                        fill
                        className="object-cover rounded-t-3xl"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    {movie.poster_path && (
                        <Card className="relative w-full  aspect-[2/3]  overflow-hidden mb-6">
                            <div className="absolute inset-0 rounded-lg">
                                <Image
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </Card>
                    )}
                    <Card>
                        <CardContent className="px-4">


                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Rating</span>
                                    <Badge variant="outline">
                                        {movie.vote_average.toFixed(1)}/10
                                    </Badge>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Votes</span>
                                    <span>{movie.vote_count.toLocaleString()}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Runtime</span>
                                    <span>{formatRuntime(movie.runtime)}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Status</span>
                                    <span>{movie.status}</span>
                                </div>

                                {movie.adult && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Rating</span>
                                        <Badge variant="destructive">Adult</Badge>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-3xl">{movie.title}</CardTitle>
                            {movie.tagline && (
                                <p className="text-muted-foreground italic">
                                    &quot;{movie.tagline}&quot;
                                </p>
                            )}
                        </CardHeader>
                    </Card>

                    {/* Overview */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{movie.overview}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground">
                                        Original Title
                                    </h4>
                                    <p>{movie.original_title}</p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground">
                                        Release Date
                                    </h4>
                                    <p>
                                        {new Date(movie.release_date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground">
                                        Budget
                                    </h4>
                                    <p>{movie.budget > 0 ? formatCurrency(movie.budget) : "-"}</p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-muted-foreground">
                                        Revenue
                                    </h4>
                                    <p>{movie.revenue > 0 ? formatCurrency(movie.revenue) : "-"}</p>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                                    Genres
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {movie.genres.map((genre) => (
                                        <Badge key={genre.id} variant="secondary">
                                            {genre.name}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h4 className="text-sm font-medium text-muted-foreground mb-2">
                                    Spoken Languages
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {movie.spoken_languages.map((language) => (
                                        <Badge key={language.iso_639_1} variant="outline">
                                            {language.english_name}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {movie.production_companies.length > 0 && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Production Companies</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-4">
                                    {movie.production_companies.map((company) => (
                                        <Badge key={company.id} className="flex items-center gap-2 bg-neutral-300/90 text-neutral-900">
                                            {company.logo_path ? (
                                                <div className="relative h-8 w-8">
                                                    <Image
                                                        src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                                                        alt={company.name}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center">
                                                    <span className="text-xs">
                                                        {company.name.charAt(0)}
                                                    </span>
                                                </div>
                                            )}
                                            <span>{company.name}</span>
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}