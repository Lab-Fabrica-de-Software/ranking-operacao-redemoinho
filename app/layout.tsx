import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Operação Redemoinho | Ranking",
  description: "Ranking dos Jogadores da Operação Redemoinho",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="bg-[url('/background.png')] bg-cover bg-center h-screen w-full">
          <Image src="/logo.png" alt="Operação Redemoinho" width={300} height={100} className="mx-auto pt-8 mb-4" />
          {children}
        </div>
      </body>
    </html>
  );
}
