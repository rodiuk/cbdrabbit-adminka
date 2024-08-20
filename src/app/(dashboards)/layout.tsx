import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Providers } from "../providers";
import { LayoutWrapper } from "./-components/layout/LayoutWrapper";

import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "400", "700"],
});

export const metadata: Metadata = {
  title: "CBD Admin",
  description: "Manage CDB Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
