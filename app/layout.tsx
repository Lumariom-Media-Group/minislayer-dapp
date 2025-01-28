import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WalletProvider } from "@/providers/WalletProvider";
import { Toaster } from "react-hot-toast";
export const metadata: Metadata = {
  title: "Mini Slayer",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />

      <body className="antialiased bg-background font-exo text-text">
        <Toaster/>
        <WalletProvider>
          <Header />
          {children}
          <Footer />
        </WalletProvider>

      </body>
    </html>
  );
}
