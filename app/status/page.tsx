import { getPaymentStatus } from "../../notion"; // 경로 확인 필요 (예: ../notion)
import Link from "next/link";

// ✅ Next.js 빌드 에러 해결을 위한 동적 렌더링 강제 설정
export const dynamic = "force-dynamic";

// 이름 마스킹 함수
const maskName = (name: string) => {
  if (!name || name.length < 2) return name;
  return name[0] + '*' + name.substring(2);
};

export default async function StatusPage() {
  const data = await getPaymentStatus();
  const safeData = data || { total: 0, paidCount: 0, students: [] };
  const total = safeData.total || 0;
  const paidCount = safeData.paidCount || 0;
  const percentage = total > 0 ? Math.round((paidCount / total) * 100) : 0;

  // 학년/셀(group)을 기준으로 '내림차순' 정렬
  const sortedStudents = [...safeData.students].sort((a: any, b: any) => {
    const groupA = a.group || "";
    const groupB = b.group || "";
    return groupB.localeCompare(groupA); 
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-8">
      <div className="max-w-4xl mx-auto px-3 pt-4">
        
        {/* 뒤로 가기 버튼 */}
        <Link href="/" className="inline-flex items-center text-[11px] font-bold text-slate-400 hover:text-blue-600 transition-colors mb-3 group">
          <span className="group-hover:-translate-x-1 transition-transform mr-1">&larr;</span> 메인 화면으로 돌아가기
        </Link>

        {/* 페이지 타이틀 */}
        <h2 className="text-lg md:text-xl font-black italic text-slate-800 flex items-center gap-1.5 tracking-tight mb-3">
          <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded not-italic tracking-wider shadow-sm">STATUS</span>
          전체 등록 현황
        </h2>

        {/* 메인 화이트 박스 */}
        <div className="bg-white rounded-xl p-3 md:p-4 shadow-sm border border-slate-100">
          
          {/* 상단 통계 영역 */}
          <div className="mb-2 border-b border-slate-100 pb-3">
            <div className="flex justify-between items-end mb-2 px-1">
              <div className="flex flex-col gap-0.5">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl md:text-4xl leading-none font-black text-[#5B21B6] tracking-tighter drop-shadow-sm">
                    {paidCount}
                  </span>
                  <span className="text-slate-400 font-black text-lg">/</span>
                  <span className="text-2xl md:text-3xl font-black text-slate-700 leading-none">
                    {total}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-slate-500 pl-0.5">
                  완납 인원 / 전체 신청 인원
                </span>
              </div>
              
              <div className="bg-[#EEF2FF] text-[#4F46E5] text-[11px] font-black px-2.5 py-1.5 rounded-lg mb-0.5 whitespace-nowrap shadow-sm">
                {percentage}% 달성
              </div>
            </div>
            
            <div className="relative w-full h-2.5 bg-slate-100 rounded-full mt-2 mb-1 shadow-inner">
              <div
                className="absolute top-0 left-0 h-full bg-[#5B21B6] transition-all duration-1000 ease-out rounded-full"
                style={{ width: `${percentage}%` }}
              ></div>
              <div 
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 transition-all duration-1000 ease-out"
                style={{ left: `${percentage}%` }}
              >
                <div className="text-[22px] drop-shadow-md">👦🏻</div>
              </div>
            </div>
          </div>

          {/* 등록 명단 리스트 영역 */}
          {sortedStudents.length > 0 ? (
            <ul className="flex flex-col">
              {sortedStudents.map((student: any) => (
                // 1줄로 구성
                <li key={student.id} className="flex justify-between items-center py-2.5 px-1 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors w-full">

                  {/* 왼쪽: [학년/셀] + [이름] + [📅 신청일] */}
                  <div className="flex items-center gap-2">
                    <span className="w-[36px] text-center text-[9px] font-bold text-slate-600 bg-slate-100 py-0.5 rounded border border-slate-200 whitespace-nowrap shadow-sm shrink-0">
                      {student.group || "미분류"}
                    </span>
                    
                    {/* 이름 (자간 넓힘 유지) */}
                    <span className="text-[13px] font-black text-slate-800 tracking-widest shrink-0">
                      {maskName(student.name)}
                    </span>
                    
                    {/* 🚀 신청일: 아이콘 추가 & 크기를 text-[10px]로 키움 */}
                    <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap ml-1 flex items-center gap-0.5">
                      📅 {student.applyDate}
                    </span>
                  </div>

                  {/* 오른쪽: [납입액] + [완납/미납 배지] */}
                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    <span className="text-[11px] font-bold text-slate-800 text-right whitespace-nowrap">
                      {student.amount?.toLocaleString() || 0}원
                    </span>
                    
                    {student.isPaid ? (
                      <span className="bg-green-100 text-green-700 text-[9px] font-black w-[32px] text-center py-0.5 rounded shadow-sm shrink-0">완납</span>
                    ) : (
                      <span className="bg-rose-100 text-rose-600 text-[9px] font-black w-[32px] text-center py-0.5 rounded shadow-sm shrink-0">미납</span>
                    )}
                  </div>

                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-6 text-[11px] text-slate-400 font-bold">
              아직 등록된 인원이 없습니다. 😊
            </div>
          )}

        </div>
      </div>
    </div>
  );
}