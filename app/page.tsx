import { getPaymentStatus, getNotices } from "../notion";
import StatusSection from "./StatusSection";
import Link from "next/link";

export default async function Home() {
  const data = await getPaymentStatus();
  
  // 모든 공지사항을 가져온 뒤, 최근 3개만 자릅니다.
  const allNotices = await getNotices();
  const recentNotices = allNotices.slice(0, 3); 

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
      {/* 헤더 섹션 (높이와 여백 살짝 축소) */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 text-white py-10 px-4 text-center rounded-b-[2.5rem] shadow-md">
        <div className="max-w-4xl mx-auto space-y-2">
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 text-xs font-bold tracking-widest backdrop-blur-sm border border-white/30">
            🔥 2026 SUMMER OUTREACH
          </span>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight break-keep leading-tight">
            2026년 남서울비전교회<br/>중등부 아웃리치
          </h1>
          <p className="text-base md:text-lg font-semibold text-indigo-100 opacity-90 italic">
            "연결되고 결합되어(엡 4:16)"
          </p>
        </div>
      </div>

      {/* 전체 컨텐츠 영역 (섹션 간 여백 space-y-16 -> space-y-8 로 대폭 축소) */}
      <div className="max-w-4xl mx-auto px-4 mt-8 space-y-8">
        
        {/* 메인 메뉴 카드 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <Link href="/intro" className="group relative overflow-hidden bg-white rounded-2xl p-4 shadow-sm hover:shadow-md border border-slate-100 hover:border-blue-100 transition-all duration-300 flex items-center gap-4">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full blur-2xl -mr-8 -mt-8 transition-all group-hover:bg-blue-100"></div>
            <div className="relative flex-shrink-0 w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">🎯</div>
            <div className="relative z-10">
              <span className="text-blue-600 font-black text-[9px] uppercase tracking-widest block mb-0.5">About 2026</span>
              <h3 className="text-lg font-extrabold text-slate-800 tracking-tight">이번 아웃리치는?</h3>
              <p className="text-slate-500 text-[11px] font-semibold mt-0.5 group-hover:text-blue-600 transition-colors">상세 일정 및 사역 목표 보기 &rarr;</p>
            </div>
          </Link>

          <Link href="/archive" className="group relative overflow-hidden bg-slate-900 rounded-2xl p-4 shadow-sm hover:shadow-md border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 flex items-center gap-4">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl -mr-8 -mt-8 transition-all group-hover:bg-indigo-500/20"></div>
            <div className="relative flex-shrink-0 w-12 h-12 bg-slate-800 text-indigo-400 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">📸</div>
            <div className="relative z-10">
              <span className="text-indigo-400 font-black text-[9px] uppercase tracking-widest block mb-0.5">Archive</span>
              <h3 className="text-lg font-extrabold text-white tracking-tight">이전 기록 돌아보기</h3>
              <p className="text-slate-400 text-[11px] font-semibold mt-0.5 group-hover:text-indigo-300 transition-colors">우리의 아름다운 추억 여행 &rarr;</p>
            </div>
          </Link>
        </section>

        {/* 📢 공지사항 섹션 */}
        <section>
          <div className="flex justify-between items-end mb-3">
            <h2 className="text-lg md:text-xl font-bold italic text-slate-800 flex items-center gap-2">
              <span className="bg-rose-600 text-white text-[10px] px-2 py-0.5 rounded not-italic">NOTICE</span>
              최신 공지사항
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-4 md:px-5 md:py-4 shadow-sm border border-slate-100">
            {recentNotices.length > 0 ? (
              <ul className="divide-y divide-slate-100">
                {recentNotices.map((notice: any) => (
                  <li key={notice.id} className="flex flex-col md:flex-row md:items-center py-3 gap-3 group hover:bg-slate-50/50 transition-all rounded-lg px-2 -mx-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold self-start md:self-auto whitespace-nowrap ${
                      notice.note === '중요' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {notice.note || "공지"}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-base md:text-lg font-bold text-slate-800 group-hover:text-rose-600 transition-colors">
                        {notice.title}
                      </span>
                      <span className="text-xs text-slate-400 mt-0.5">📅 게시일: {notice.date}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-6 text-slate-400 font-medium text-sm">등록된 공지사항이 없습니다.</div>
            )}
            
            <div className="border-t border-slate-100 pt-3 mt-1 text-center">
              <Link href="/notices" className="inline-block text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">
                공지사항 전체보기 &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* 📊 등록 및 납부 현황 섹션 */}
        <StatusSection data={data} />

        {/* 푸터 섹션 */}
        <footer className="pt-4 text-center opacity-40">
          <p className="text-[9px] font-black tracking-[0.15em] uppercase text-slate-400">
            Namseoul Vision Church Middle School Outreach 2026
          </p>
        </footer>
      </div>
    </div>
  );
}