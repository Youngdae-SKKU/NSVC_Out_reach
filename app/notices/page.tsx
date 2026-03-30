import { getNotices } from "../../notion"; 
import Link from "next/link";

// ✅ 1. 실시간 데이터 갱신 설정
export const dynamic = "force-dynamic";

// NEW 배지 표시 함수
const isNewNotice = (dateString: string) => {
  if (!dateString) return false;
  try {
    const today = new Date();
    const postDate = new Date(dateString);
    const diffTime = Math.abs(today.getTime() - postDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  } catch (e) {
    return false;
  }
};

export default async function NoticesPage() {
  // ✅ 2. 에러 해결 포인트: 타입을 명확히 선언하여 빌드 에러를 방지합니다.
  let allNotices: any[] = []; 

  try {
    const fetchedData = await getNotices();
    // 데이터가 배열인지 확인 후 안전하게 할당
    allNotices = Array.isArray(fetchedData) ? fetchedData : [];
  } catch (error) {
    console.error("공지사항 로드 에러:", error);
    allNotices = [];
  }

  // ✅ 3. 필터링 및 정렬
  const sortedNotices = allNotices
    .filter((notice: any) => notice.isVisible !== false) 
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    // 🚀 전체 상하 여백 축소 (pb-32 -> pb-16)
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-16">
      {/* 🚀 상단 여백 축소 (pt-12 -> pt-6) */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        
        {/* 🚀 뒤로가기 버튼 하단 여백 축소 (mb-8 -> mb-4) */}
        <Link href="/" className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors mb-4 group">
          <span className="group-hover:-translate-x-1 transition-transform mr-1">&larr;</span> 메인 화면으로 돌아가기
        </Link>
        
        {/* 🚀 타이틀 영역 하단 여백 축소 (mb-8 -> mb-4) */}
        <div className="flex justify-between items-end mb-4">
          {/* 🚀 타이틀 크기 절반으로 축소 (text-3xl -> text-lg md:text-xl) */}
          <h2 className="text-lg md:text-xl font-black italic text-slate-800 flex items-center gap-2">
            <span className="bg-rose-600 text-white text-[11px] px-2 py-1 rounded not-italic tracking-wider shadow-sm">NOTICE</span>
            전체 공지사항
          </h2>
        </div>

        {/* 🚀 흰색 배경 카드 패딩 축소 (p-4 md:p-8 -> p-3 md:p-5) */}
        <div className="bg-white rounded-2xl p-3 md:p-5 shadow-sm border border-slate-100 min-h-[400px]">
          {sortedNotices.length > 0 ? (
            <ul className="divide-y divide-slate-100">
              {sortedNotices.map((notice: any) => (
                <li key={notice.id} className="flex flex-col md:flex-row md:items-start py-3 gap-3 hover:bg-slate-50/50 transition-all rounded-xl px-3 -mx-3 group">
                  
                  <div className="flex items-start gap-3 w-full">
                    
                    {/* 카테고리 배지 */}
                    <div className="flex-shrink-0 w-12 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 font-black text-xs border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors px-1 text-center break-keep shadow-sm">
                      {notice.author || "교회"}
                    </div>
                    
                    {/* 텍스트 컨테이너 */}
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center gap-1.5 mb-1">
                        {isNewNotice(notice.date) && (
                          <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded font-black animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.4)]">
                            NEW
                          </span>
                        )}
                        {notice.note && (
                          <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                            {notice.note}
                          </span>
                        )}
                      </div>
                      
                      {/* 🚀 수정 포인트: leading-relaxed를 leading-snug로 변경하여 메인 화면과 줄 간격 통일! */}
                      <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors leading-snug">
                        {notice.title}
                      </p>
                      
                      <div className="text-[11px] text-slate-400 mt-1 font-medium flex items-center gap-1.5">
                        <span>📅 게시일: {notice.date || "날짜 미상"}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">공지사항이 비어있습니다.</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                노션 데이터베이스에서 내용을 추가하거나,<br />
                '노출여부' 체크박스가 선택되어 있는지 확인해 주세요!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}