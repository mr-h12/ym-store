import type { Metadata, Viewport } from "next";
import { Cinzel, IBM_Plex_Sans_Arabic, Jost } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { storeConfig } from "@/lib/store-config";

const jost = Jost({ variable: "--font-jost", subsets: ["latin"] });
const cinzel = Cinzel({ variable: "--font-cinzel", subsets: ["latin"], weight: ["500", "600"] });
const arabic = IBM_Plex_Sans_Arabic({ variable: "--font-arabic", subsets: ["arabic"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: { default: storeConfig.name, template: `%s · ${storeConfig.name}` },
  description: "Designer menswear in Alexandria: Balmain, Calvin Klein, Armani, Hermès, Burberry and more. Same-day delivery in Alexandria, shipping to all of Egypt. Order on WhatsApp.",
  icons: { icon: "/brand/logo_704x705.jpg", apple: "/brand/logo_704x705.jpg" },
  openGraph: { images: ["/brand/cover_banner_1696x624.jpg"] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0b0c0e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={storeConfig.lang} dir={storeConfig.dir}>
      <body className={`${jost.variable} ${cinzel.variable} ${arabic.variable} antialiased`}>
        <CartProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-2 focus:top-2 focus:z-50 focus:bg-surface focus:p-2">
            Skip to content
          </a>
          <p className="bg-night-2 px-4 py-2 text-center text-xs text-silver">
            {storeConfig.deliveryNote}
            <span lang="ar" dir="rtl" className="ar ms-2 hidden text-silver-muted sm:inline">· متاح شحن لجميع المحافظات</span>
          </p>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppFab />
        </CartProvider>
      </body>
    </html>
  );
}
