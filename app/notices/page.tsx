import { getNotices } from "../../notion"; // 두 단계 위(../../)에 있는 notion.js를 불러옵니다.
import Link from "next/link";

export default async function NoticesPage() {
  // 여기서는 자르지 않고 전체 공지사항을 다 가져옵니다.
  const allNotices = await getNotices();

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-32">
      <div className="max-w-4xl mx-auto px-5 pt-12">
        
        {/* 뒤로 가기 (홈으로) 버튼 */}
        <Link href="/" className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors mb-8">
          &larr; 메인 화면으로 돌아가기
        </Link>
        
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-3xl font-black italic text-slate-800 flex items-center gap-3">
            <span className="bg-rose-600 text-white text-sm px-3 py-1.5 rounded-md not-italic tracking-wider">NOTICE</span>
            전체 공지사항
          </h2>
        </div>

        {/* 전체 공지사항 리스트 */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
          {allNotices.length > 0 ? (
            <ul className="divide-y divide-slate-100">
              {allNotices.map((notice: any) => (
                <li key={notice.id} className="flex flex-col md:flex-row md:items-center py-6 gap-5 hover:bg-slate-50/50 transition-all rounded-2xl px-4 -mx-4">
                  
                  <span className={`px-4 py-2 rounded-full text-sm font-bold self-start md:self-auto whitespace-nowrap ${
                    notice.note === '중요' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {notice.note || "공지"}
                  </span>
                  
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-slate-800">
                      {notice.title}
                    </span>
                    <span className="text-sm text-slate-500 mt-1.5 font-medium">
                      📅 게시일: {notice.date}
                    </span>
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