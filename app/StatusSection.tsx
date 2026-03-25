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
    <div className="flex flex-col w-full relative z-10 pb-6">
      
      {/* 1️⃣ 상단 헤더 영역 */}
      <div className="flex justify-between items-end mb-6 px-1">
        <h2 className="text-xl font-black text-slate-800 flex items-center gap-2 tracking-tight">
          📊 등록 및 납부 현황
        </h2>
        {isMainPage && (
          <Link href="/status" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors mb-0.5">
            전체보기 &rarr;
          </Link>
        )}
      </div>

      {/* 2️⃣ 요약 통계 및 프로그레스 바 */}
      <div className="mb-2 px-1 relative">
        <div className="flex justify-between items-end mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-[3.5rem] leading-none font-black text-[#5B21B6] tracking-tighter drop-shadow-sm">
              {paidCount}
            </span>
            <span className="text-lg font-bold text-slate-500 mb-1">
              (완납 명수) / <span className="text-4xl font-black text-slate-700 mx-1.5">{total}</span> (신청 명수)
            </span>
          </div>
          <div className="bg-[#EEF2FF] text-[#4F46E5] text-base font-black px-5 py-2.5 rounded-2xl mb-2 whitespace-nowrap shadow-sm">
            {percentage}% 달성
          </div>
        </div>

        <div className="relative w-full h-4 bg-slate-100 rounded-full mt-6 mb-10 shadow-inner">
          <div 
            className="absolute top-0 left-0 h-full bg-[#5B21B6] transition-all duration-1000 ease-out rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
          <div 
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 transition-all duration-1000 ease-out"
            style={{ left: `${percentage}%` }}
          >
            <div className="text-[40px] drop-shadow-md">👦🏻</div>
          </div>
        </div>
      </div>

      {/* 3️⃣ 상세 명단 리스트 (메인 페이지가 아닐 때만 노출) */}
      {!isMainPage && (
        <div className="mt-8 space-y-3 px-1">
          <h3 className="text-sm font-black text-slate-700 mb-4">전체 등록 명단</h3>
          
          {sortedStudents.length > 0 ? (
            <ul className="divide-y divide-slate-100 bg-white/60 rounded-2xl border border-slate-100 p-2 shadow-sm">
              {sortedStudents.map((student: any) => (
                <li key={student.id} className="flex flex-col py-3.5 px-4 hover:bg-white transition-colors rounded-xl gap-1.5">
                  
                  {/* ✅ 요청하신 한 줄 정렬: [학년/셀] [이름] --- [완납여부] [납부금액] */}
                  <div className="flex justify-between items-center w-full">
                    {/* 왼쪽: 학년/셀 + 마스킹된 이름 */}
                    <div className="flex items-center gap-2.5">
                      <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100 whitespace-nowrap">
                        {student.group || "미분류"}
                      </span>
                      <span className="text-sm font-black text-slate-800">
                        {maskName(student.name)}
                      </span>
                    </div>

                    {/* 오른쪽: 완납여부 배지 + 납부금액 */}
                    <div className="flex items-center gap-2.5">
                      {student.isPaid ? (
                        <span className="bg-[#EEF2FF] text-[#4F46E5] text-[10px] font-black px-2 py-1 rounded-md border border-indigo-100">완납</span>
                      ) : (
                        <span className="bg-rose-50 text-rose-500 text-[10px] font-black px-2 py-1 rounded-md border border-rose-100">미납</span>
                      )}
                      <span className="text-sm font-bold text-slate-700 text-right min-w-[65px]">
                        {student.amount?.toLocaleString() || 0}원
                      </span>
                    </div>
                  </div>

                  {/* 아래쪽: 신청일 (기존과 동일) */}
                  <div className="ml-1 mt-0.5">
                    <span className="text-[10px] text-slate-400 font-medium">📅 신청일: {student.applyDate}</span>
                  </div>

                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-10 text-sm text-slate-400 font-bold bg-white/60 rounded-2xl border border-slate-100 shadow-sm">
              아직 등록된 인원이 없습니다. 😊
            </div>
          )}
        </div>
      )}
      
    </div>
  );
}