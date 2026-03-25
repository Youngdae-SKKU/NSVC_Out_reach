import { getNotices } from "../../notion"; // 경로 확인 필요 (예: ../notion)
import Link from "next/link";

// ✅ Next.js 빌드 에러 해결을 위한 동적 렌더링 강제 설정
export const dynamic = "force-dynamic";

// 1주일 이내인지 확인하는 함수
const isNewNotice = (dateString: string) => {
  const today = new Date();
  const postDate = new Date(dateString);
  const diffTime = Math.abs(today.getTime() - postDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 7;
};

export default async function NoticesPage() {
  const allNotices = await getNotices();

  // 최신순으로 정렬
  const sortedNotices = [...allNotices].sort(
    (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-32">
      <div className="max-w-4xl mx-auto px-5 pt-12">
        
        {/* 뒤로 가기 버튼 */}
        <Link href="/" className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors mb-8">
          &larr; 메인 화면으로 돌아가기
        </Link>
        
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-black italic text-slate-800 flex items-center gap-3">
            <span className="bg-rose-600 text-white text-sm px-3 py-1.5 rounded-md not-italic tracking-wider shadow-sm">NOTICE</span>
            전체 공지사항
          </h2>
        </div>

        {/* 전체 공지사항 리스트 */}
        <div className="bg-white rounded-3xl p-4 md:p-8 shadow-sm border border-slate-100">
          {sortedNotices.length > 0 ? (
            <ul className="divide-y divide-slate-100">
              {sortedNotices.map((notice: any) => (
                <li key={notice.id} className="flex flex-col md:flex-row md:items-center py-8 gap-6 hover:bg-slate-50/50 transition-all rounded-2xl px-4 -mx-4 group">
                  
                  <div className="flex items-center gap-4">
                    
                    {/* 게시자(작성자) 표시 */}
                    <div className="flex-shrink-0 w-16 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-black text-sm border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors px-1 text-center break-keep">
                      {notice.author || "교회"}
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-1.5">
                        {/* 7일 이내 게시물이면 'New' 반짝이 표시 */}
                        {isNewNotice(notice.date) && (
                          <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded font-black animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.4)]">
                            NEW
                          </span>
                        )}
                      </div>
                      
                      <span className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors leading-tight">
                        {notice.title}
                      </span>
                      
                      <div className="text-sm text-slate-400 mt-2 font-medium flex items-center gap-2">
                        <span>📅 게시일: {notice.date}</span>
                      </div>
                    </div>
                  </div>

                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-16 text-slate-400 font-medium text-lg">
              등록된 공지사항이 없습니다. 😊
            </div>
          )}
        </div>

      </div>
    </div>
  );
}