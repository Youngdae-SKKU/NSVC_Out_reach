import type { Metadata } from 'next';
import './globals.css';

// 🚀 이 부분이 카카오톡 등 링크를 공유할 때 나타나는 미리보기(오픈그래프) 설정입니다!
export const metadata: Metadata = {
  title: '2026년 제3회 중등부 제주 아웃리치',
  description: '남서울비전교회 중등부 아웃리치에 여러분을 초대합니다! 여기를 눌러 상세 일정을 확인하세요.',
  openGraph: {
    title: '2026년 제3회 중등부 제주 아웃리치',
    description: '남서울비전교회 중등부 아웃리치에 여러분을 초대합니다! 여기를 눌러 상세 일정을 확인하세요.',
    url: 'https://nsvc-out-reach.vercel.app',
    siteName: '2026 남서울비전교회 중등부 아웃리치',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {/* 모든 페이지의 내용이 이곳(children)에 담깁니다 */}
        {children}
        
        {/* 혹시 전체 페이지에 띄우는 카카오톡 버튼이나 푸터가 있다면 이 아래에 추가됩니다. */}
      </body>
    </html>
  );
}