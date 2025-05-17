import { LucideLoader2 } from "lucide-react";

export default function LoadingPage() {
    return (
        <div className="flex justify-center items-center h-[80dvh] w-screen">
            <LucideLoader2 className="animate-spin text-emerald-700 dark:text-emerald-300" />
        </div>
    )
}