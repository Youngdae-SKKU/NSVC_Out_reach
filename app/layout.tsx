import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// ✅ 1. 바뀐 파일 이름(KakaoChatButton)으로 정확히 불러옵니다.
import KakaoChatButton from "./KakaoChatButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "2026 남서울비전교회 아웃리치",
  description: "연결되고 결합되어 (엡 4:16)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        
        {/* ✅ 2. 화면 전체에 카카오톡 버튼을 띄웁니다. */}
        <KakaoChatButton />
        
      </body>
    </html>
  );
}