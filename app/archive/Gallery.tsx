"use client";

import { useState, useEffect } from 'react';

// 서버에서 찾아온 사진 목록(firstOutreach, secondOutreach)을 전달받아서 화면에 그립니다.
export default function Gallery({ firstOutreach, secondOutreach }: { firstOutreach: string[], secondOutreach: string[] }) {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImg(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] text-white pb-20 font-sans">
      <div className="bg-slate-900/80 py-20 px-6 border-b border-slate-800 text-center backdrop-blur-md">
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">아카이브 기록</h1>
        <p className="text-slate-400 text-lg font-medium">우리의 발걸음, 은혜의 기록들</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 space-y-24 mt-20">
        
        {/* --- 제2회 섹션 --- */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <span className="bg-indigo-600 px-4 py-1.5 rounded-full text-sm font-black tracking-tighter">2025 WINTER</span>
            <h2 className="text-2xl md:text-3xl font-black text-white italic">제2회 겨울 아웃리치: '빛으로'</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {secondOutreach.map((src, index) => (
              <div 
                key={index} 
                className="aspect-square rounded-3xl overflow-hidden border-2 border-slate-800/50 group hover:border-indigo-500 transition-all duration-300 cursor-pointer shadow-lg bg-slate-800/30"
                onClick={() => setSelectedImg(src)}
              >
                <img src={src} alt="2회 사진" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
            {secondOutreach.length === 0 && <p className="text-slate-500 text-sm">폴더에 사진이 없습니다.</p>}
          </div>
        </section>

        {/* --- 제1회 섹션 --- */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <span className="bg-purple-600 px-4 py-1.5 rounded-full text-sm font-black tracking-tighter">2024 SUMMER</span>
            <h2 className="text-2xl md:text-3xl font-black text-white italic">제1회 여름 아웃리치: '다시 복음으로'</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {firstOutreach.map((src, index) => (
              <div 
                key={index} 
                className="aspect-square rounded-3xl overflow-hidden border-2 border-slate-800/50 group hover:border-purple-500 transition-all duration-300 cursor-pointer shadow-lg bg-slate-800/30"
                onClick={() => setSelectedImg(src)}
              >
                <img src={src} alt="1회 사진" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
            {firstOutreach.length === 0 && <p className="text-slate-500 text-sm">폴더에 사진이 없습니다.</p>}
          </div>
        </section>

      </div>

      {/* --- 라이트박스 팝업 --- */}
      {selectedImg && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-[100] p-4 cursor-zoom-out animate-in fade-in duration-300"
          onClick={() => setSelectedImg(null)}
        >
          <button className="absolute top-8 right-8 text-white text-4xl font-light hover:rotate-90 transition-transform duration-300" onClick={() => setSelectedImg(null)}>✕</button>
          <img src={selectedImg} alt="원본 사진" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300" />
        </div>
      )}
    </div>
  );
}