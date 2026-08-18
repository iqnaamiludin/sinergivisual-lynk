import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sinergi Visual Lynk • Mendukung Ekonomi Kreator Indonesia",
  description:
    "Buat halaman web instan untuk menjual karya & keahlianmu. Bagikan aset digital, kelas online, konsultasi, dan terima pembayaran langsung dari satu link bio.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${roboto.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans selection:bg-[#00C170] selection:text-zinc-950">
        {children}
      </body>
    </html>
  );
}
