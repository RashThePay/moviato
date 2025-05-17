export function Heading1({children}: {children: React.ReactNode}) {
    return (
        <h1 className="text-4xl uppercase mb-4 ms-6 font-saira text-emerald-700 dark:text-emerald-300 font-bold">
            {children}
        </h1>
    )
}