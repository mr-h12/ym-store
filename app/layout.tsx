import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { storeConfig } from "@/lib/store-config";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const arabic = IBM_Plex_Sans_Arabic({ variable: "--font-arabic", subsets: ["arabic"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: { default: storeConfig.name, template: `%s · ${storeConfig.name}` },
  description: "Designer menswear in Alexandria: Balmain, Calvin Klein, Armani, Hermès, Burberry and more. Same-day delivery in Alexandria, shipping to all of Egypt. Order on WhatsApp.",
  icons: { icon: "/brand/logo_704x705.jpg", apple: "/brand/logo_704x705.jpg" },
  openGraph: { images: ["/brand/cover_banner_1696x624.jpg"] },
  ...(storeConfig.demo && { robots: { index: false, follow: false } }),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={storeConfig.lang} dir={storeConfig.dir}>
      <body className={`${inter.variable} ${arabic.variable} antialiased`}>
        <CartProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-2 focus:top-2 focus:z-50 focus:bg-surface focus:p-2">
            Skip to content
          </a>
          {storeConfig.demo && (
            <p role="note" className="border-b border-line bg-surface-2 px-4 py-1.5 text-center text-xs text-muted">
              Demo preview: prices and stock aren&apos;t final.{" "}
              <span lang="ar" dir="rtl" className="ar">نسخة تجريبية</span>
            </p>
          )}
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
