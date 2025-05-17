import { Heading1 } from "@/components/Heading";
import InfiniteScroll from "@/components/InfiniteScroll";
import getTMDB, { getTMDBWithPage } from "@/lib/api";
import { Metadata } from "next";
import { redirect } from "next/navigation";

const slugs = ["now_playing", "upcoming", "top_rated", "popular"]
const title: { [key: string]: string } = {
    "now_playing": "Now Playing", "upcoming": "Coming Soon", "top_rated": "Top Rated", "popular": "Popular Movies"
}
type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const slug = (await params).slug

    return {
        title: title[slug],
    }
}
export default async function ListPage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    if (!slugs.includes(slug)) redirect("/");
    const data = await getTMDB("/movie/" + slug);
    return (
        <div className="container mx-auto py-6">
            <div className="flex w-full justify-between items-center">
                <Heading1>{title[slug]}</Heading1>
                <span>{data.total_results} results</span>
            </div>
            <InfiniteScroll initial={data.results} path={"/movie/"+slug} getter={getTMDBWithPage} />
        </div>
    )
}