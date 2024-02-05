import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/customs/header";
import React from "react";
import clsx from "clsx";
import "mapbox-gl/dist/mapbox-gl.css";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SeroTracker",
  description:
    "A collection of dashboards tracking global seroprevalence data for mutliple pathogens.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "text-black no-scrollbar")}>
        <Header />
        <main className={"h-full-screen w-screen bg-foreground"}>
          {children}
        </main>
        <SpeedInsights />
      </body>
    </html>
  );
}
