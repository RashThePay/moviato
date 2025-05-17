import type { Metadata } from "next";
import { Geist, Saira } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Providers from "./providers";

const saira = Saira({ variable: "--font-saira", subsets: ["latin"] })

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Moviato",
  description: "Discover the movies you would like...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" style={{ colorScheme: "dark" }}>
      <body
        className={`${geistSans.className} ${saira.variable} antialiased`}
      >
        <Providers>

          <ThemeProvider >
            <Navbar />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
