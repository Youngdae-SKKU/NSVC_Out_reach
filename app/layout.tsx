import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 🚀 1. 선생님이 화살표 쳐주신 바로 그 자리! 챗봇 부품 불러오기
import ChannelTalk from "./ChannelTalk";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 💡 웹사이트 탭에 뜨는 이름도 예쁘게 수정했습니다
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
        
        {/* 🚀 2. 홈페이지 전체 화면에 챗봇 버튼 달아주기! */}
        <ChannelTalk />
        
      </body>
    </html>
  );
}