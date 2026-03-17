"use client";

import Link from "next/link";

export default function StatusSection({ data }: { data: any }) {
  const total = data?.total || 0;
  const paidCount = data?.paidCount || 0;
  const students = data?.students || [];
  const percent = total === 0 ? 0 : Math.round((paidCount / total) * 100);

  // 최근 2명만 화면에 보여주기 (더보기는 클릭해서 이동)
  const recentStudents = students.slice(0, 2);

  return (
    <section>
      <div className="flex justify-between items-end mb-4 px-1">
        <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
          <span className="text-xl">📊</span> 등록 및 납부 현황
        </h2>
        <Link href="/status" className="text-[9px] font-bold text-slate-400 hover:text-indigo-600 transition-colors">
          전체 명단 노출 중
        </Link>
      </div>

      <div>
        {/* 현황 요약과 점프하는 소년! */}
        <div className="flex justify-between items-end mb-3 px-1 relative">
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl font-black text-indigo-600 leading-none">{paidCount}</span>
            <span className="text-xs text-slate-500 font-bold">/ {total} 명 완료</span>
          </div>
          <div className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-3 py-1.5 rounded-full shadow-sm">
            {percent}% 달성
          </div>
        </div>

        {/* 🚀 그림과 똑같은 두꺼운 프로그레스 바 & 점프 캐릭터 */}
        <div className="relative mb-6">
          <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden shadow-inner">
            <div 
              className="bg-indigo-600 h-3.5 rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${percent}%` }}
            ></div>
          </div>
          {/* 점프하는 소년 이모지 (진행률을 따라 움직임) */}
          <div 
            className="absolute top-[-25px] text-4xl drop-shadow-md transition-all duration-1000 ease-out z-10"
            style={{ left: `calc(${percent}% - 20px)` }}
          >
            👦🏻
          </div>
        </div>

        {/* 얇은 명단 리스트 */}
        <div className="border-t border-slate-100 pt-2">
          {recentStudents.length === 0 ? (
            <div className="text-center py-4 text-xs font-bold text-slate-400">명단이 없습니다.</div>
          ) : (
            <ul className="divide-y divide-slate-50">
              {recentStudents.map((student: any) => (
                <li key={student.id} className="flex justify-between items-center py-2.5">
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-black text-slate-800">{student.name}</span>
                      <span className="text-[9px] font-bold text-slate-400">학생</span>
                    </div>
                    <span className="text-[9px] text-slate-400 mt-0.5 font-medium">
                      📅 신청일: {student.applyDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-slate-700">
                      {student.amount?.toLocaleString()}원
                    </span>
                    <span className={`px-2.5 py-1 rounded-sm text-[9px] font-black ${
                      student.isPaid ? "bg-green-100 text-green-600 border border-green-200" : "bg-red-100 text-red-500 border border-red-200"
                    }`}>
                      {student.isPaid ? "완납" : "미납"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}