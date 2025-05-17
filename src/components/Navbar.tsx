import { LucideFilm } from "lucide-react"
import { ModeToggle } from "./theme-toggle"
import Link from "next/link"
import { MovieSearch } from "./SearchBox"
import { Button } from "./ui/button"

export default function Navbar() {
    return (
        <div className="w-screen  shadow-md">
            <div className="container mx-auto flex justify-between items-center p-6 gap-2 flex-wrap">
                <Link href="/" className="flex gap-4 max-md:gap-2 items-center">
                    <LucideFilm className="size-12 max-md:size-8 text-emerald-700 dark:text-emerald-300" />
                    <h1 className="text-4xl font-bold uppercase font-saira">
                        Moviato
                    </h1>
                </Link>
                <div className="flex gap-4 max-md:gap-2 items-center justify-between max-md:w-full">
                    <Link href="/discover">
                        <Button className="cursor-pointer font-saira" variant="secondary">
                            Discover
                        </Button>
                    </Link>
                    <div className="flex gap-2">
                        <MovieSearch />
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </div>
    )
}