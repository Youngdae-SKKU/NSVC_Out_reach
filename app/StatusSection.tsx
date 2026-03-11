"use client";

export default function StatusSection({ data }: { data: any }) {
  const total = data?.total || 0;
  const paidCount = data?.paidCount || 0;
  const students = data?.students || [];
  const percent = total === 0 ? 0 : Math.round((paidCount / total) * 100);

  return (
    <section className="mb-12">
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-xl md:text-2xl font-bold italic text-slate-800 flex items-center gap-2">
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded not-italic">STATUS</span>
          등록 및 납부 현황
        </h2>
        {/* 설명 문구 변경 */}
        <span className="text-xs font-bold text-slate-400">전체 명단 노출 중</span>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-blue-600">{paidCount}</span>
            <span className="text-slate-500 font-medium">/ {total} 명 완료</span>
          </div>
          <div className="bg-blue-50 text-blue-600 text-sm font-bold px-3 py-1 rounded-full">
            {percent}% 달성
          </div>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-3 mb-8 overflow-hidden">
          <div 
            className="bg-blue-600 h-3 rounded-full transition-all duration-1000 ease-out" 
            style={{ width: `${percent}%` }}
          ></div>
        </div>

        {/* 🚀 항상 열려있도록 수정한 부분 (isOpen 로직 제거) */}
        <div className="border-t border-slate-100 pt-6">
          {students.length === 0 ? (
            <div className="text-center py-8 text-slate-400">데이터를 불러오는 중이거나 명단이 없습니다.</div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {students.map((student: any) => (
                <li key={student.id} className="flex flex-col md:flex-row md:justify-between md:items-center py-5 gap-4">
                  
                  {/* 왼쪽: 학생 이름과 신청날짜 */}
                  <div className="flex flex-col">
                    <div className="flex items-end gap-2">
                      <span className="text-xl font-bold text-slate-800">{student.name}</span>
                      <span className="text-sm font-medium text-slate-400 mb-[2px]">학생</span>
                    </div>
                    <span className="text-sm text-slate-500 mt-1">
                      📅 신청일: {student.applyDate}
                    </span>
                  </div>

                  {/* 오른쪽: 납부 금액과 완납 배지 */}
                  <div className="flex items-center gap-4">
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
    </section>
  );
}