import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WalletProvider } from "@/providers/WalletProvider";
import { Toaster } from "react-hot-toast";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
