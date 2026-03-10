"use client";

import { useState } from "react";

export default function StatusSection({ initialData }: { initialData: any }) {
  const [isOpen, setIsOpen] = useState(false);
  
  // 데이터가 없을 경우를 대비한 안전장치
  const { total = 0, paidCount = 0, students = [] } = initialData || {};
  const progress = total > 0 ? (paidCount / total) * 100 : 0;

  return (
    <section className="space-y-4">
      <div className="text-center space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-slate-800">📊 등록 및 납부 현황</h2>
        <p className="text-slate-500 text-sm">카드를 터치하면 상세 명단을 볼 수 있습니다.</p>
      </div>
      
      {/* 클릭 가능한 요약 카드 */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 hover:border-blue-300 transition-all active:scale-[0.98] group"
      >
        <div className="flex items-end justify-between mb-4">
          <div className="flex items-end gap-2">
            <span className="text-5xl font-black text-blue-600">{paidCount}</span>
            <span className="text-slate-500 pb-1 font-medium">/ {total} 명 완료</span>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-sm font-bold text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
              {Math.round(progress)}% 달성
            </span>
            <span className="text-xs text-slate-400 font-bold group-hover:text-blue-500 transition-colors">
              {isOpen ? "접기 ▲" : "자세히 보기 ▼"}
            </span>
          </div>
        </div>
        {/* 진행 바 */}
        <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-400 to-blue-600 h-full transition-all duration-500" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </button>

      {/* 펼쳐지는 상세 명단 */}
      {isOpen && (
        <div className="bg-white rounded-3xl shadow-inner border border-slate-100 overflow-hidden mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <table className="w-full text-left">
            <tbody className="divide-y divide-slate-50">
              {students.length > 0 ? (
                students.map((student: any) => (
                  <tr key={student.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-1 font-bold text-slate-800">{student.name}</td>
                    <td className="px-6 py-1 text-center">
                      {student.isPaid ? (
                        <span className="text-xs font-bold text-blue-600">● 납부완료</span>
                      ) : (
                        <span className="text-xs font-bold text-slate-300">○ 확인중</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="px-6 py-1 text-center text-slate-400">데이터가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}