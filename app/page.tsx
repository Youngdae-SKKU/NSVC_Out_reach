import { getPaymentStatus, getNotices } from "../notion";
import StatusSection from "./StatusSection";
import Link from "next/link";

export default async function Home() {
  const data = await getPaymentStatus();
  const notices = await getNotices();

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-32">
      {/* 🚀 헤더 섹션 (기존 유지) */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 text-white py-12 px-4 text-center rounded-b-[3rem] shadow-xl">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="inline-block py-1 px-4 rounded-full bg-white/20 text-sm font-bold tracking-widest backdrop-blur-sm border border-white/30">
            🔥 2026 SUMMER OUTREACH
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight break-keep leading-tight">
            2026년 남서울비전교회<br/>중등부 아웃리치
          </h1>
          <p className="text-lg md:text-xl font-semibold text-indigo-100 opacity-90 italic">
            "연결되고 결합되어(엡 4:16)"
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 mt-12 space-y-16">
        
        {/* ✨ 메인 메뉴 카드 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/intro" className="group p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
            <span className="text-blue-600 font-bold text-[10px] uppercase tracking-tighter">About 2026</span>
            <h3 className="text-2xl font-black text-slate-800 mt-2 mb-2">2026 Out Reach는?</h3>
            <p className="text-slate-400 text-xs font-medium">상세 일정 및 사역 목표 확인하기 →</p>
          </Link>
          <Link href="/archive" className="group p-8 bg-slate-900 rounded-[2.5rem] shadow-lg hover:shadow-2xl transition-all text-white">
            <span className="text-indigo-400 font-bold text-[10px] uppercase tracking-tighter">Archive</span>
            <h3 className="text-2xl font-black mt-2 mb-2">이전 기록 돌아보기</h3>
            <p className="text-slate-400 text-xs font-medium">우리의 아름다웠던 추억 여행 →</p>
          </Link>
        </section>

        {/* 📢 공지사항 섹션 (UI 통일) */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-xl md:text-2xl font-bold italic text-slate-800 flex items-center gap-2">
              <span className="bg-rose-600 text-white text-xs px-2 py-1 rounded not-italic">NOTICE</span>
              공지사항
            </h2>
            <Link href="/notices" className="text-xs text-slate-400 font-bold hover:text-rose-500">전체보기 →</Link>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            {notices.length > 0 ? (
              <ul className="divide-y divide-slate-100">
                {notices.map((notice: any) => (
                  <li key={notice.id} className="flex flex-col md:flex-row md:justify-between md:items-center py-5 gap-4 group cursor-pointer hover:bg-slate-50/30 transition-all rounded-xl px-2 -mx-2">
                    
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* 태그(비고)를 완납 배지 스타일로 통일 */}
                      <span className={`px-4 py-1.5 rounded-full text-sm font-bold self-start md:self-auto whitespace-nowrap ${
                        notice.note === '중요' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {notice.note || "공지"}
                      </span>
                      
                      {/* 제목과 날짜를 학생 이름/신청일 스타일로 통일 */}
                      <div className="flex flex-col">
                        <span className="text-xl font-bold text-slate-800 group-hover:text-rose-600 transition-colors">
                          {notice.title}
                        </span>
                        <span className="text-sm text-slate-500 mt-1">
                          📅 게시일: {notice.date}
                        </span>
                      </div>
                    </div>

                    <span className="hidden md:block text-slate-300 font-bold group-hover:translate-x-1 transition-transform">→</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8 text-slate-400 font-medium">등록된 공지사항이 없습니다. 😊</div>
            )}
            
            <div className="border-t border-slate-100 pt-6 mt-2 text-center">
              <button className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">
                이전 공지사항 더보기 ▼
              </button>
            </div>
          </div>
        </section>

        {/* 📊 등록 및 납부 현황 섹션 */}
        <StatusSection data={data} />

        {/* 푸터 섹션 */}
        <footer className="pt-10 text-center opacity-40">
          <p className="text-[10px] font-black tracking-[0.2em] uppercase text-slate-400">
            Namseoul Vision Church Middle School Outreach 2026
          </p>
        </footer>
      </div>
    </div>
  );
}