import type { Metadata, Viewport } from "next"
import { Bebas_Neue, Space_Mono, DM_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
})

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
})

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "NNX .ROOT — Web Architecture Studio",
  description:
    "NNX .ROOT — Web Architecture Studio. Random Web Design, Digital Product Builder. Custom websites, link in bio, undangan digital, portfolio, toko online, landing page, dan dashboard.",
  generator: "v0.app",
  keywords: [
    "NNX",
    "NNX ROOT",
    "Web Architecture Studio",
    "Web Design",
    "Link in Bio",
    "Undangan Digital",
    "Portfolio",
    "Landing Page",
    "Toko Online",
    "Dashboard",
  ],
}

export const viewport: Viewport = {
  themeColor: "#04040a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${bebas.variable} ${spaceMono.variable} ${dmMono.variable}`}>
      <body className="nnx-body">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
