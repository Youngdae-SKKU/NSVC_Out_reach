"use client";

import Link from "next/link"; // 링크 이동 기능 추가

export default function StatusSection({ data }: { data: any }) {
  const total = data?.total || 0;
  const paidCount = data?.paidCount || 0;
  const percent = total === 0 ? 0 : Math.round((paidCount / total) * 100);

  return (
    <section>
      <div className="flex justify-between items-end mb-3">
        <h2 className="text-lg md:text-xl font-bold italic text-slate-800 flex items-center gap-2">
          <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded not-italic">STATUS</span>
          등록 및 납부 현황
        </h2>
        {/* 상단 텍스트를 버튼으로 변경 */}
        <Link href="/status" className="text-[10px] font-bold text-slate-400 hover:text-blue-500 transition-colors">
          전체 명단 보기 &rarr;
        </Link>
      </div>

      <div className="bg-white rounded-2xl p-4 md:px-5 md:py-5 shadow-sm border border-slate-100">
        
        {/* 현황 요약 */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl md:text-4xl font-black text-blue-600 leading-none">{paidCount}</span>
            <span className="text-sm text-slate-500 font-medium">/ {total} 명 완료</span>
          </div>
          <div className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">
            {percent}% 달성
          </div>
        </div>

        {/* 프로그레스 바 */}
        <div className="w-full bg-slate-100 rounded-full h-2.5 mb-2 overflow-hidden">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out" 
            style={{ width: `${percent}%` }}
          ></div>
        </div>

        {/* 하단 더보기 버튼 */}
        <div className="border-t border-slate-100 pt-4 mt-4 text-center">
          <Link href="/status" className="inline-block text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors">
            전체 현황 상세보기 &rarr;
          </Link>
        </div>

      </div>
    </section>
  );
}