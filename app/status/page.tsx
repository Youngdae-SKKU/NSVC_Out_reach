import { getPaymentStatus } from "../../notion"; // 데이터 가져오기
import Link from "next/link";

export default async function StatusPage() {
  const data = await getPaymentStatus();
  const total = data?.total || 0;
  const paidCount = data?.paidCount || 0;
  const students = data?.students || [];
  const percent = total === 0 ? 0 : Math.round((paidCount / total) * 100);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-32">
      <div className="max-w-4xl mx-auto px-5 pt-12">
        
        {/* 뒤로 가기 (홈으로) 버튼 */}
        <Link href="/" className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors mb-8">
          &larr; 메인 화면으로 돌아가기
        </Link>
        
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-3xl font-black italic text-slate-800 flex items-center gap-3">
            <span className="bg-blue-600 text-white text-sm px-3 py-1.5 rounded-md not-italic tracking-wider">STATUS</span>
            전체 등록 및 납부 현황
          </h2>
        </div>

        {/* 상세 현황판 박스 */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
          
          {/* 요약 그래프 (크게) */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-black text-blue-600 leading-none">{paidCount}</span>
              <span className="text-lg text-slate-500 font-medium">/ {total} 명 완료</span>
            </div>
            <div className="bg-blue-50 text-blue-600 text-sm font-bold px-4 py-2 rounded-full">
              {percent}% 달성
            </div>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-3 mb-8 overflow-hidden">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${percent}%` }}
            ></div>
          </div>

          {/* 명단 전체 리스트 */}
          <div className="border-t border-slate-100 pt-6">
            {students.length === 0 ? (
              <div className="text-center py-16 text-slate-400 font-medium text-lg">
                등록된 명단이 없습니다.
              </div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {students.map((student: any) => (
                  <li key={student.id} className="flex flex-col md:flex-row md:justify-between md:items-center py-6 gap-4 hover:bg-slate-50/50 transition-all rounded-2xl px-4 -mx-4">
                    
                    {/* 왼쪽: 학생 이름과 신청날짜 */}
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-slate-800">{student.name}</span>
                        <span className="text-xs font-medium text-slate-400">학생</span>
                      </div>
                      <span className="text-sm text-slate-500 mt-1.5">
                        📅 신청일: {student.applyDate}
                      </span>
                    </div>

                    {/* 오른쪽: 납부 금액과 완납 배지 */}
                    <div className="flex items-center gap-4 mt-2 md:mt-0">
                      <span className="text-lg font-bold text-slate-700">
                        {student.amount?.toLocaleString()}원
                      </span>
                      <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                        student.isPaid ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"
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

      </div>
    </div>
  );
}