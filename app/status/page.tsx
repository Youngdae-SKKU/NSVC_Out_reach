import { getPaymentStatus } from "../../notion"; // 경로 확인 필요 (예: ../notion)
import Link from "next/link";

// ✅ Next.js 빌드 에러 해결을 위한 동적 렌더링 강제 설정
export const dynamic = "force-dynamic";

// 이름 마스킹 함수
const maskName = (name: string) => {
  if (!name || name.length < 2) return name;
  return name[0] + '*' + name.substring(2);
};

// 커스텀 정렬을 위한 그룹 순위 지정 함수
const getGroupRank = (group: string) => {
  const order = [
    '교역자', '교사',
    '1-1', '1-2', '1-3', '1-4',
    '2-1', '2-2', '2-3',
    '3-1', '3-2', '3-3', '3-4',
    '예배셀'
  ];
  
  const index = order.indexOf(group);
  return index === -1 ? 999 : index; 
};

export default async function StatusPage(props: any) {
  // 주소창에서 검색어(?q=홍길동) 가져오기
  const searchParams = await Promise.resolve(props.searchParams);
  const keyword = (searchParams?.q as string) || '';

  const data = await getPaymentStatus();
  const safeData = data || { total: 0, paidCount: 0, students: [] };
  
  // 통계는 검색과 상관없이 '전체 인원' 기준으로 보여줍니다.
  const total = safeData.total || 0;
  const paidCount = safeData.paidCount || 0;
  const percentage = total > 0 ? Math.round((paidCount / total) * 100) : 0;

  // 1차 정렬: 그룹 순위, 2차 정렬: 이름 ㄱㄴㄷ순
  const sortedStudents = [...safeData.students].sort((a: any, b: any) => {
    const groupA = a.group || "미분류";
    const groupB = b.group || "미분류";
    const rankDiff = getGroupRank(groupA) - getGroupRank(groupB);
    
    if (rankDiff !== 0) return rankDiff;
    
    const nameA = a.name || "";
    const nameB = b.name || "";
    return nameA.localeCompare(nameB, 'ko-KR'); 
  });

  // 검색어로 리스트 필터링
  const filteredStudents = sortedStudents.filter((student: any) => {
    if (!keyword) return true;
    
    const searchWord = keyword.replace(/\s+/g, '').toLowerCase();
    const studentName = (student.name || "").replace(/\s+/g, '').toLowerCase();
    const studentGroup = (student.group || "").replace(/\s+/g, '').toLowerCase();
    
    return studentName.includes(searchWord) || studentGroup.includes(searchWord);
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-8">
      <div className="max-w-4xl mx-auto px-3 pt-4">
        
        {/* 뒤로 가기 버튼 */}
        <Link href="/" className="inline-flex items-center text-[11px] font-bold text-slate-400 hover:text-blue-600 transition-colors mb-3 group">
          <span className="group-hover:-translate-x-1 transition-transform mr-1">&larr;</span> 메인 화면으로 돌아가기
        </Link>

        {/* 🚀 페이지 타이틀 & 검색 영역 (무조건 한 줄에 위치하도록 수정) */}
        <div className="flex justify-between items-center mb-3">
          
          {/* 왼쪽: 타이틀 */}
          <h2 className="text-lg md:text-xl font-black italic text-slate-800 flex items-center gap-1.5 tracking-tight shrink-0">
            <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded not-italic tracking-wider shadow-sm">STATUS</span>
            전체 등록 현황
          </h2>

          {/* 오른쪽: 검색창 + 예시 문구 */}
          <div className="flex flex-col items-end gap-0.5 shrink-0">
            <form method="GET" action="/status" className="flex items-center gap-1">
              <input 
                type="text" 
                name="q" 
                defaultValue={keyword} 
                placeholder="소속 또는 이름" 
                className="w-24 md:w-32 bg-white border border-slate-200 text-slate-700 text-[11px] px-2 py-1.5 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm transition-all"
              />
              <button type="submit" className="bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-bold px-2.5 py-1.5 rounded-md transition-colors shadow-sm shrink-0">
                검색
              </button>
              {keyword && (
                <Link href="/status" className="bg-rose-100 hover:bg-rose-200 text-rose-600 text-[11px] font-bold px-2 py-1.5 rounded-md transition-colors shadow-sm shrink-0">
                  초기화
                </Link>
              )}
            </form>
            {/* 💡 검색 예시를 작게 줄여서 검색창 바로 아래에 찰싹 붙임 */}
            <p className="text-[9px] text-slate-400 font-medium pr-0.5">
              💡 예시: <span className="font-bold text-slate-500">1-1</span>, <span className="font-bold text-slate-500">교사</span>, <span className="font-bold text-slate-500">홍길동</span>
            </p>
          </div>
          
        </div>

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
          {filteredStudents.length > 0 ? (
            <ul className="flex flex-col">
              {filteredStudents.map((student: any) => (
                <li key={student.id} className="flex justify-between items-center py-2.5 px-1 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors w-full">

                  {/* 왼쪽: [학년/셀] + [이름] + [📅 신청일] */}
                  <div className="flex items-center gap-2">
                    <span className="w-[42px] text-center text-[9px] font-bold text-slate-600 bg-slate-100 py-0.5 rounded border border-slate-200 whitespace-nowrap shadow-sm shrink-0">
                      {student.group || "미분류"}
                    </span>
                    
                    {/* 이름 */}
                    <span className="text-[13px] font-black text-slate-800 tracking-widest shrink-0">
                      {maskName(student.name)}
                    </span>
                    
                    {/* 신청일 */}
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
            <div className="text-center py-10">
              <div className="text-3xl mb-2 opacity-50">🔍</div>
              <p className="text-[12px] text-slate-500 font-bold">
                "{keyword}" 검색 결과가 없습니다.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}