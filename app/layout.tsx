import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NeoScope - 네오픽셀 현미경 조명 제어 시스템",
  description: "고정밀 LED 조명 제어로 최적의 현미경 관찰 환경을 제공하는 네오픽셀 기반 조명 제어 시스템",
  keywords: "네오픽셀, 현미경, 조명 제어, LED, RGBW, 과학 장비",
  authors: [{ name: "NeoScope Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
