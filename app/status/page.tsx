import { getPaymentStatus } from "../../notion"; // 경로 확인 필요 (예: ../notion)
import Link from "next/link";

// ✅ 이름의 두 번째 글자를 '*'로 마스킹하는 함수
const maskName = (name: string) => {
  if (!name || name.length < 2) return name;
  return name[0] + '*' + name.substring(2);
};

export default async function StatusPage() {
  // 노션에서 데이터 가져오기
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
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-32">
      <div className="max-w-4xl mx-auto px-5 pt-12">
        
        {/* 뒤로 가기 버튼 */}
        <Link href="/" className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors mb-8">
          &larr; 메인 화면으로 돌아가기
        </Link>

        {/* 페이지 타이틀 */}
        <h2 className="text-3xl font-black italic text-slate-800 flex items-center gap-3 mb-8">
          <span className="bg-blue-600 text-white text-sm px-3 py-1.5 rounded-md not-italic tracking-wider shadow-sm">STATUS</span>
          전체 등록 및 납부 현황
        </h2>

        {/* 메인 화이트 박스 */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
          
          {/* 상단 통계 및 막대그래프 */}
          <div className="mb-6 border-b border-slate-100 pb-10">
            <div className="flex justify-between items-end mb-4 px-1">
              <div className="flex items-baseline gap-2">
                <span className="text-[4rem] leading-none font-black text-[#5B21B6] tracking-tighter drop-shadow-sm">
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
            
            <div className="relative w-full h-4 bg-slate-100 rounded-full mt-6 mb-2 shadow-inner">
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

          {/* 등록 명단 리스트 영역 */}
          {sortedStudents.length > 0 ? (
            <ul className="flex flex-col">
              {sortedStudents.map((student: any) => (
                // 화면이 좁을 때(모바일)를 대비해 flex-wrap 속성을 추가하여 자연스럽게 떨어지도록 처리
                <li key={student.id} className="flex flex-col py-4 px-3 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors gap-1.5">

                  <div className="flex justify-between items-center w-full flex-wrap gap-y-3">
                    
                    {/* 왼쪽: [학년/셀(크기 고정)] + [이름] + [신청일] */}
                    <div className="flex items-center gap-3">
                      {/* ✅ 1. 학년/셀 배지: w-14 (고정 너비) 및 text-center를 주어 모든 배지 크기를 통일했습니다. */}
                      <span className="w-14 text-center text-[13px] font-black text-slate-700 bg-slate-100 py-1.5 rounded-md border border-slate-200 whitespace-nowrap shadow-sm shrink-0">
                        {student.group || "미분류"}
                      </span>
                      
                      {/* 이름 */}
                      <span className="text-lg font-black text-slate-800 tracking-tight shrink-0">
                        {maskName(student.name)}
                      </span>
                      
                      {/* ✅ 2. 신청일: 이름과 똑같은 텍스트 크기(text-lg)로 이름 바로 옆에 배치했습니다. */}
                      <span className="text-lg text-slate-500 font-medium ml-1 whitespace-nowrap">
                        🗓️ 신청일: {student.applyDate}
                      </span>
                    </div>

                    {/* 오른쪽: [납입액 텍스트 + 금액] + [완납/미납(크기 고정)] */}
                    <div className="flex items-center gap-3 ml-auto">
                      {/* ✅ 3. 납입금액 앞에 '납입액' 텍스트를 추가했습니다. */}
                      <span className="text-base font-bold text-slate-800 text-right whitespace-nowrap">
                        <span className="text-sm font-medium text-slate-500 mr-2">납입액</span>
                        {student.amount?.toLocaleString() || 0}원
                      </span>
                      
                      {/* 완납/미납 배지 (크기 통일: w-[42px]) */}
                      {student.isPaid ? (
                        <span className="bg-green-100 text-green-600 text-[11px] font-black w-[42px] text-center py-1.5 rounded-full shadow-sm shrink-0">완납</span>
                      ) : (
                        <span className="bg-red-100 text-red-500 text-[11px] font-black w-[42px] text-center py-1.5 rounded-full shadow-sm shrink-0">미납</span>
                      )}
                    </div>

                  </div>

                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-10 text-sm text-slate-400 font-bold">
              아직 등록된 인원이 없습니다. 😊
            </div>
          )}

        </div>
      </div>
    </div>
  );
}