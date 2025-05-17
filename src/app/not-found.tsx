import { Heading1 } from "@/components/Heading";


export default function NotFound() {
    return (
        <div className="grid place-items-center-safe h-[80dvh] w-screen">
           <div>
             <Heading1>404 - Not Found</Heading1>
            <p className="text-center">The page you requested was not found!</p>
            </div>
        </div>
    )
}