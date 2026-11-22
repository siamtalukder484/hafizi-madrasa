import type { Metadata } from "next";
import { Hind_Siliguri, Tiro_Bangla } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { madrasa } from "@/data/site";

const hind = Hind_Siliguri({
  variable: "--font-hind",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

const tiro = Tiro_Bangla({
  variable: "--font-tiro",
  subsets: ["bengali", "latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: madrasa.name,
    template: `%s | ${madrasa.name}`,
  },
  description: `${madrasa.name} — হিফজুল কুরআন ও নূরানী বিভাগ, লিল্লাহ বোর্ডিং। ${madrasa.address.full}।`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="bn" className={`${hind.variable} ${tiro.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
