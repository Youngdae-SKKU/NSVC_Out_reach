"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// ✅ 이름의 두 번째 글자를 '*'로 마스킹하는 함수
const maskName = (name: string) => {
  if (!name || name.length < 2) return name;
  return name[0] + '*' + name.substring(2);
};

export default function StatusSection({ data, isMainPage = false }: { data: any, isMainPage?: boolean }) {
  const [mounted, setMounted] = useState(false);

  const safeData = data || { total: 0, paidCount: 0, students: [] };
  const total = safeData.total || 0; 
  const paidCount = safeData.paidCount || 0; 
  const percentage = total > 0 ? Math.round((paidCount / total) * 100) : 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // ✅ 학년/셀(group)을 기준으로 '내림차순' 정렬합니다.
  const sortedStudents = [...safeData.students].sort((a: any, b: any) => {
    const groupA = a.group || "";
    const groupB = b.group || "";
    return groupB.localeCompare(groupA); // 내림차순 정렬
  });

  return (
    // 💡 메인 페이지일 때는 하단 여백(pb)을 줄여서 카드가 뚱뚱해지지 않게 함
    <div className={`flex flex-col w-full relative z-10 ${isMainPage ? 'pb-2' : 'pb-6'}`}>
      
      {/* 1️⃣ 상단 헤더 영역 */}
      <div className="flex justify-between items-end mb-4 px-1">
        <h2 className="text-lg md:text-xl font-black text-slate-800 flex items-center gap-1.5 tracking-tight">
          📊 등록 및 납부 현황
        </h2>
        {isMainPage && (
          <Link href="/status" className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors mb-0.5">
            전체보기 &rarr;
          </Link>
        )}
      </div>

      {/* 2️⃣ 요약 통계 및 프로그레스 바 */}
      <div className="mb-2 px-1 relative">
        <div className="flex justify-between items-end mb-6">
          
          {/* 🚀 수정 포인트: 숫자가 겹치지 않게 위아래 구조(flex-col)로 분리하고 크기 조절 */}
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl leading-none font-black text-[#5B21B6] tracking-tighter drop-shadow-sm">
                {paidCount}
              </span>
              <span className="text-slate-400 font-black text-xl">/</span>
              <span className="text-3xl md:text-4xl font-black text-slate-700 leading-none">
                {total}
              </span>
            </div>
            {/* 긴 괄호 설명을 작고 직관적인 텍스트로 변경 */}
            <span className="text-[11px] font-bold text-slate-500 pl-1">
              완납 인원 / 전체 신청 인원
            </span>
          </div>

          <div className="bg-[#EEF2FF] text-[#4F46E5] text-sm font-black px-4 py-2 rounded-xl mb-1 whitespace-nowrap shadow-sm">
            {percentage}% 달성
          </div>
        </div>

        {/* 프로그레스 바 */}
        <div className="relative w-full h-3 bg-slate-100 rounded-full mt-4 mb-6 shadow-inner">
          <div 
            className="absolute top-0 left-0 h-full bg-[#5B21B6] transition-all duration-1000 ease-out rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
          <div 
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 transition-all duration-1000 ease-out"
            style={{ left: `${percentage}%` }}
          >
            <div className="text-[32px] drop-shadow-md">👦🏻</div>
          </div>
        </div>
      </div>

      {/* 3️⃣ 상세 명단 리스트 (메인 페이지가 아닐 때만 노출) */}
      {!isMainPage && (
        <div className="mt-6 space-y-3 px-1">
          <h3 className="text-sm font-black text-slate-700 mb-2">전체 등록 명단</h3>
          
          {sortedStudents.length > 0 ? (
            <ul className="divide-y divide-slate-100 bg-white/60 rounded-2xl border border-slate-100 p-2 shadow-sm">
              {sortedStudents.map((student: any) => (
                <li key={student.id} className="flex flex-col py-3 px-3 hover:bg-white transition-colors rounded-xl gap-1">
                  
                  <div className="flex justify-between items-center w-full">
                    {/* 왼쪽: 학년/셀 + 마스킹된 이름 */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100 whitespace-nowrap">
                        {student.group || "미분류"}
                      </span>
                      <span className="text-sm font-black text-slate-800">
                        {maskName(student.name)}
                      </span>
                    </div>

                    {/* 오른쪽: 완납여부 배지 + 납부금액 */}
                    <div className="flex items-center gap-2">
                      {student.isPaid ? (
                        <span className="bg-[#EEF2FF] text-[#4F46E5] text-[9px] font-black px-1.5 py-0.5 rounded-md border border-indigo-100">완납</span>
                      ) : (
                        <span className="bg-rose-50 text-rose-500 text-[9px] font-black px-1.5 py-0.5 rounded-md border border-rose-100">미납</span>
                      )}
                      <span className="text-xs font-bold text-slate-700 text-right min-w-[55px]">
                        {student.amount?.toLocaleString() || 0}원
                      </span>
                    </div>
                  </div>

                  {/* 아래쪽: 신청일 */}
                  <div className="ml-0.5 mt-0.5">
                    <span className="text-[9px] text-slate-400 font-medium">📅 신청일: {student.applyDate}</span>
                  </div>

                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8 text-xs text-slate-400 font-bold bg-white/60 rounded-2xl border border-slate-100 shadow-sm">
              아직 등록된 인원이 없습니다. 😊
            </div>
          )}
        </div>
      )}
      
    </div>
  );
}