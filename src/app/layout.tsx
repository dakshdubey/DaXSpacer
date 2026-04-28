import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { EcosystemProvider } from "@/context/EcosystemContext";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "600"], variable: '--font-inter' });
const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "600", "700"], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: "DA x SPACER | Gateway",
  description: "A digital threshold between Design Aspirations and SPACER upskilling ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} antialiased bg-background text-white font-inter cursor-none`}>
        <EcosystemProvider>
          <CustomCursor />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </EcosystemProvider>
      </body>
    </html>
  );
}
