import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Victor Brutti | Full Stack Developer",
  description:
    "Portfólio de Victor Brutti, desenvolvedor Full Stack com foco em Go, PHP, React, Docker e sistemas reais.",
  keywords: [
    "Victor Brutti",
    "Full Stack Developer",
    "Go",
    "PHP",
    "React",
    "Docker",
    "TypeScript",
    "Laravel"
  ],
  authors: [{ name: "Victor Brutti" }],
  openGraph: {
    title: "Victor Brutti | Full Stack Developer",
    description:
      "Go + PHP + React para produtos reais, backend forte e experiências modernas.",
    type: "website",
    locale: "pt_BR"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.variable} bg-void font-sans text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
