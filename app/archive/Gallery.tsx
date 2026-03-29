"use client";

import Link from "next/link";
import { useState } from "react";

// page.tsx에서 넘겨받을 사진 데이터 타입 정의
interface GalleryProps {
  firstOutreach: string[];
  secondOutreach: string[];
}

export default function Gallery({ firstOutreach, secondOutreach }: GalleryProps) {
  // 사진을 클릭했을 때 크게 보여주기 위한 상태
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    // 🌌 훅킹 포인트 1: 몰입감을 주는 다크 네이비 배경
    <div className="min-h-screen bg-[#0F172A] font-sans pb-24 text-slate-100 selection:bg-indigo-500 selection:text-white">
      
      <div className="max-w-4xl mx-auto px-4 pt-8">
        
        {/* 뒤로 가기 버튼 */}
        <Link href="/" className="inline-flex items-center text-[11px] font-bold text-slate-400 hover:text-white transition-colors mb-8 group">
          <span className="group-hover:-translate-x-1 transition-transform mr-1">&larr;</span> 메인 화면으로 돌아가기
        </Link>

        {/* 🎬 타이틀 영역 */}
        <div className="mb-14 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight drop-shadow-xl">
            이전 아웃리치의 기록
          </h1>
          <p className="text-slate-400 text-sm md:text-base font-bold tracking-wide">
            우리의 발걸음, 은혜의 기록들
          </p>
        </div>

        {/* 📸 2차 아웃리치 (최신 기록을 먼저 보여주는 것이 좋습니다) */}
        <Section 
          title="2회\n2022년" 
          subtitle="07.27 ~ 07.30 : 제주를 주님께!" 
          images={secondOutreach} 
          badgeColor="bg-indigo-600" 
          onImageClick={setSelectedImg} 
        />

        {/* 📸 1차 아웃리치 */}
        <Section 
          title="1회\n2019년" 
          subtitle="08.07 ~ 08.10 : 첫 번째 발걸음, 시작의 은혜" 
          images={firstOutreach} 
          badgeColor="bg-rose-600" 
          onImageClick={setSelectedImg} 
        />

        {/* 🚀 훅킹 포인트 2: 다음 여정으로 초대하는 강력한 CTA (Call To Action) */}
        <div className="mt-20 text-center bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-8 md:p-12 rounded-[2rem] border border-slate-700/50 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <h3 className="text-xl md:text-2xl font-black text-white mb-2 relative z-10">
            2026년, 다음 여정의 주인공은 당신입니다.
          </h3>
          <p className="text-slate-400 text-xs md:text-sm mb-6 relative z-10">
            세 번째 제주 아웃리치가 여러분을 기다립니다.
          </p>
          <Link href="/intro" className="inline-block bg-white text-slate-900 font-black text-sm px-6 py-3 rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.15)] relative z-10">
            2026 여정 알아보기 &rarr;
          </Link>
        </div>

      </div>

      {/* 🔍 사진 확대 모달 (사진 클릭 시 팝업) */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md cursor-zoom-out animate-in fade-in duration-200"
          onClick={() => setSelectedImg(null)}
        >
          <img 
            src={selectedImg} 
            alt="확대된 이미지" 
            className="max-w-full max-h-[90vh] rounded-xl shadow-2xl" 
          />
          <button className="absolute top-6 right-6 text-white/50 hover:text-white text-4xl font-black transition-colors">
            &times;
          </button>
          <p className="absolute bottom-6 text-white/50 text-xs font-bold tracking-widest">
            화면을 터치하면 닫힙니다
          </p>
        </div>
      )}
    </div>
  );
}

// 📌 반복되는 '섹션(N차 아웃리치)'을 그려주는 미니 컴포넌트
function Section({ title, subtitle, images, badgeColor, onImageClick }: any) {
  // 사진이 없으면 화면에 표시하지 않음
  if (!images || images.length === 0) return null;

  return (
    <div className="mb-14">
      {/* 섹션 제목 영역 */}
      <div className="flex items-center gap-3 mb-5">
        <div className={`${badgeColor} text-white font-black text-[10px] md:text-xs px-3 py-1.5 rounded-2xl shadow-lg leading-tight text-center whitespace-pre-line`}>
          {/* \n 을 기준으로 줄바꿈 처리 */}
          {title.split('\\n').join('\n')}
        </div>
        <h2 className="text-lg md:text-xl font-black italic text-white tracking-tight leading-tight drop-shadow-md">
          {subtitle}
        </h2>
      </div>

      {/* 🖼️ 사진 그리드 영역 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((img: string, idx: number) => (
          <div
            key={idx}
            className="relative aspect-square rounded-[1.5rem] overflow-hidden shadow-lg cursor-zoom-in group bg-slate-800 border border-slate-700/50"
            onClick={() => onImageClick(img)}
          >
            <img
              src={img}
              alt={`아웃리치 사진 ${idx + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
              loading="lazy"
            />
            {/* 마우스 올렸을 때 어두워지는 효과 (사진 집중도 상승) */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        ))}
      </div>
    </div>
  );
}