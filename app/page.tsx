import { getPaymentStatus, getNotices } from "../notion"; // notion.js 위치에 맞게 수정
import StatusSection from "./StatusSection"; // StatusSection.tsx 위치에 맞게 수정
import Link from "next/link";

// ✅ Next.js 빌드 및 배포 에러 방지를 위한 설정
export const dynamic = "force-dynamic";

// 📅 D-Day 계산 함수
function getDDay() {
  const now = new Date();
  const target = new Date('2026-08-05T00:00:00+09:00'); 
  const diff = target.getTime() - now.getTime();
  const dDay = Math.ceil(diff / (1000 * 60 * 60 * 24));
  
  if (dDay > 0) return `D-${dDay}`;
  if (dDay === 0) return 'D-Day🔥';
  return `D+${Math.abs(dDay)}`;
}

// ✅ 1주일 이내 NEW 배지 확인 함수
const isNew = (dateString: string) => {
  if (!dateString) return false;
  const today = new Date();
  const postDate = new Date(dateString);
  const diffTime = Math.abs(today.getTime() - postDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 7;
};

// 공지사항 카드 스타일 함수
function getNoticeStyle(note: string, title: string) {
  if (note?.includes('중요') || title.includes('TEST')) return { color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100' };
  if (note?.includes('기도') || title.includes('기도') || title.includes('Pray')) return { color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' };
  return { color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' };
}

export default async function Home() {
  const data = await getPaymentStatus();
  const allNotices = await getNotices();
  
  // 최신순 정렬 후 3개만 추출
  const recentNotices = [...allNotices]
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3); 
  
  const dDayText = getDDay();

  return (
    <div className="min-h-screen bg-[#EAEFFF] font-sans pb-20 relative">
      
      {/* 🌌 배경 이미지 */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-[#8B5CF6]/10 to-[#EAEFFF] z-10"></div>
        <div className="absolute inset-0 opacity-30 mix-blend-multiply bg-[url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
      </div>

      {/* 🚀 상단 헤더 */}
      <div className="relative z-10 bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] to-[#3B82F6] pt-2 pb-2 text-center rounded-b-[30px] shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="inline-flex items-center gap-1 bg-white/20 text-white text-[12px] md:text-[14px] font-black pl-4 pr-1.5 py-1.5 rounded-full backdrop-blur-md border border-white/30 mb-3 tracking-widest shadow-sm">
            <span>🔥 2026 SUMMER OUTREACH</span>
            
            {/* 🌟 수정 포인트 1: D-Day 배지 초강력 네온사인 효과 */}
            <span className="bg-gradient-to-r from-[#FFD700] via-[#FFF8B0] to-[#FFD700] text-indigo-900 px-3 py-0.5 rounded-full tracking-tighter shadow-[0_0_20px_rgba(255,215,0,0.9),0_0_10px_rgba(255,255,255,0.6)] border border-yellow-200 animate-pulse font-extrabold">
              {dDayText}
            </span>
          </div>
          
          <h1 className="text-2xl md:text-4xl lg:text-4xl font-black text-white drop-shadow-lg tracking-tight leading-tight">
             2026년 제3회 <br/> 
              중등부 제주 아웃리치<br/> 
                <span className="text-lg md:text-xl font-bold opacity-80">
                - 남서울비전교회 -
                </span>
            </h1>
          <p className="text-white/95 text-lg md:text-xl mt-2 font-bold italic drop-shadow-md tracking-tight">
            "푯대를 향하여 (빌 3:14)"
          </p>
        </div>
      </div>

      <div className="relative z-20 max-w-6xl mx-auto px-1 mt-1 grid grid-cols-1 lg:grid-cols-2 gap-1">
        
        <div className="flex flex-col gap-1">
          {/* 1️⃣ 아웃리치 여정 카드 */}
          <Link href="/intro" className="relative rounded-[1.5rem] overflow-hidden shadow-xl group h-[160px] flex flex-col justify-between p-5 border border-white/40 hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1473172763806-38374e2d26f3?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/90"></div>
            <div className="relative z-10 text-white">
              <h3 className="text-xl md:text-2xl font-black drop-shadow-md">2026 아웃리치 여정</h3>
              <p className="text-xs md:text-sm mt-1 text-gray-200 font-medium truncate drop-shadow-sm">저희와 함께 새로운 믿음의 여정을 떠나실래요?</p>
            </div>
            <div className="relative z-10 flex justify-between items-end mt-auto">
              <div className="text-3xl drop-shadow-xl translate-y-1 group-hover:scale-110 transition-transform">🗺️🧭</div>
              <span className="bg-white text-slate-900 font-black text-[13px] px-4 py-2 rounded-full shadow-lg group-hover:bg-slate-100 transition-colors">자세히 보기 &rarr;</span>
            </div>
          </Link>

          {/* 2️⃣ 아카이브 카드 */}
          <Link href="/archive" className="relative rounded-[1.5rem] overflow-hidden shadow-xl group h-[160px] flex flex-col justify-between p-5 border border-white/40 hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/90"></div>
            <div className="relative z-10 text-white">
              <h3 className="text-xl md:text-2xl font-black drop-shadow-md">1차, 2차 아웃리치의 기록들</h3>
              <p className="text-xs md:text-sm mt-1 text-gray-200 font-medium truncate drop-shadow-sm">지체의 뜨겁고 아름다운 추억들을 만나보세요</p>
            </div>
            <div className="relative z-10 flex justify-between items-end mt-auto">
              <div className="text-3xl drop-shadow-xl translate-y-1 group-hover:scale-110 transition-transform">📸</div>
              <span className="bg-white text-slate-900 font-black text-[13px] px-4 py-2 rounded-full shadow-lg group-hover:bg-slate-100 transition-colors">추억 보기 &rarr;</span>
            </div>
          </Link>
        </div>

        <div className="flex flex-col gap-1">
          {/* 3️⃣ 준비함의 소식 */}
          <div className="bg-white/95 backdrop-blur-2xl rounded-[1.5rem] p-4 md:p-5 shadow-xl border border-white flex flex-col relative h-full">
            <div className="absolute top-3 right-4 text-3xl opacity-20 transform -scale-x-100 pointer-events-none">🌿</div>
            
            <div className="flex justify-between items-end mb-4 relative z-10 px-1">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-1 tracking-tight">
                🙏 준비함의 소식
              </h2>
              <Link href="/notices" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors mb-0.5">
                전체보기 &rarr;
              </Link>
            </div>

            <div className="flex-1 space-y-2 relative z-10">
              {recentNotices.length > 0 ? (
                recentNotices.map((notice: any) => {
                  const style = getNoticeStyle(notice.note, notice.title);
                  return (
                    <div key={notice.id} className="flex items-start p-3 bg-white rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer group">
                      
                      <div className={`w-14 h-10 shrink-0 rounded-xl flex items-center justify-center text-[11px] font-black ${style.bg} ${style.color} border ${style.border} shadow-inner mt-0.5 px-1 text-center break-keep`}>
                        {notice.author || "교회"}
                      </div>

                      <div className="flex flex-col flex-1 ml-3 overflow-hidden">
                        <div className="flex items-center gap-1 mb-0.5">
                          
                          {/* 🌟 수정 포인트 2: NEW 배지 그라데이션, 강력한 빛 번짐, 반짝이 아이콘(✨) 추가 */}
                          {isNew(notice.date) && (
                            <span className="bg-gradient-to-r from-rose-500 to-red-600 text-white text-[9px] px-1.5 py-0.5 rounded font-black animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.8)] border border-red-400/80 tracking-widest flex items-center gap-0.5">
                              NEW ✨
                            </span>
                          )}
                        </div>
                        
                        <h4 className="text-[14px] font-bold text-slate-800 group-hover:text-indigo-600 transition-colors leading-snug break-keep">
                          {notice.title}
                        </h4>
                        
                        <div className="text-xs text-slate-500 font-medium mt-1 flex items-center gap-1.5">
                          <span>📅 {notice.date}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-6 text-slate-400 font-bold text-sm">소식이 없습니다.</div>
              )}
            </div>
          </div>

          {/* 4️⃣ 등록 및 납부 현황 */}
          <div className="bg-white/95 backdrop-blur-2xl rounded-[1.5rem] p-4 md:p-5 shadow-xl border border-white relative overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <div className="text-[150px] font-black text-blue-600">✝</div>
             </div>
             <div className="relative z-10 flex flex-col gap-1">
               <StatusSection data={data} isMainPage={true} />
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}