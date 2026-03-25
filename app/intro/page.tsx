"use client";

import Link from "next/link";

export default function IntroPage() {
  const goals = [
    {
      title: "영적 성장",
      emoji: "🌱",
      color: "bg-blue-50 text-blue-600",
      desc: "매일 아침 큐티와 집회를 통해 하나님을 인격적으로 만나고 삶의 주인을 고백합니다."
    },
    {
      title: "공동체 연합",
      emoji: "🤝",
      color: "bg-purple-50 text-purple-600",
      desc: "조별 미션과 게임을 통해 서로의 다름을 인정하고 그리스도 안에서 하나 됨을 경험합니다."
    },
    {
      title: "소명 발견",
      emoji: "🚀",
      color: "bg-amber-50 text-amber-600",
      desc: "세상을 향한 하나님의 비전을 찾고 나의 꿈을 설계하는 시간입니다."
    }
  ];

  const schedule = [
    {
      day: "DAY 1. 설레는 만남",
      date: "8/5 (수)",
      items: [
        { time: "14:00", task: "교회 집결 및 이동", color: "text-slate-600" },
        { time: "19:30", task: "저녁 집회 I : '부르심'", color: "text-rose-600 font-black" },
      ]
    },
    {
      day: "DAY 2. 깊어지는 교제",
      date: "8/6 (목)",
      items: [
        { time: "14:00", task: "워터 페스티벌 & 게임", color: "text-sky-500 font-black" },
        { time: "19:30", task: "저녁 집회 II : '회복'", color: "text-rose-600 font-black" },
      ]
    },
    {
      day: "DAY 3. 하나되는 우리",
      date: "8/7 (금)",
      items: [
        { time: "10:00", task: "아웃도어 미션 투어", color: "text-amber-600 font-black" },
        { time: "19:30", task: "성령 대망회 & 기도회", color: "text-rose-600 font-black" },
      ]
    },
    {
      day: "DAY 4. 새로운 파송",
      date: "8/8 (토)",
      items: [
        { time: "10:00", task: "파송 예배 및 간증", color: "text-indigo-600 font-black" },
        { time: "13:00", task: "사진 촬영 및 귀가", color: "text-slate-600" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-12 font-sans text-slate-900">
      
      {/* 🚀 헤더 수정 버전 */}
      <div className="relative h-[80px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-500 rounded-b-[30px] shadow-sm">
      {/* 1. h-[120px] -> h-[100px] : 높이를 줄여 폭을 더 슬림하게 만듭니다.
          2. rounded-b-[30px] : 아래쪽(bottom) 모서리만 30px만큼 둥글게 만듭니다.
          3. shadow-sm : (선택사항) 둥근 경계면을 더 돋보이게 약간의 그림자를 줍니다.
      */}

      <Link href="/" className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md z-30">
    {/* 버튼 위치를 top-6 대신 top-1/2 & -translate-y-1/2로 바꾸면 줄어든 높이에서도 정중앙에 위치합니다. */}
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
  </Link>
  
  <div className="relative z-10 text-center">
    <span className="text-[9px] font-black text-white/70 tracking-widest uppercase block mb-0.5">2026 JEJU OUTREACH</span>
    <h1 className="text-xl md:text-2xl font-black text-white italic tracking-tighter">2026 아웃리치 여정</h1>
  </div>
</div>

      {/* 🚀 여백 최소화: mt-2, space-y-4 */}
      <div className="max-w-xl mx-auto px-5 mt-2 space-y-4">
        
        {/* 1. 일정 및 장소 */}
        <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-indigo-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded italic shadow-sm">PART 01</span>
            <h2 className="text-lg font-black italic">일정 및 장소</h2>
          </div>
          
          <div className="rounded-[1.5rem] bg-[#0F172A] p-3 text-white shadow-xl border border-slate-800">
            <div className="space-y-1">
              <div>
                <p className="text-indigo-400 font-bold text-[10px] uppercase tracking-wider mb-1">When</p>
                <p className="text-xl font-black italic tracking-tight">08. 05(수) — 08. 08(토)</p>
                <p className="text-slate-400 text-xs font-medium">3박 4일 영적 대장정</p>
              </div>
              <div className="w-full h-[1px] bg-slate-800"></div>
              <div>
                <p className="text-teal-400 font-bold text-[10px] uppercase tracking-wider mb-1">Where</p>
                <div className="flex justify-between items-end gap-2">
                  <div>
                    <p className="text-xl font-black italic">부영청소년 수련원</p>
                    <p className="text-slate-400 text-xs mt-1">단체 이동 (교회 집결)</p>
                  </div>
                  <a href="https://www.booyoungyouth.com/index.php" target="_blank" className="bg-white/10 hover:bg-white/20 text-white text-[11px] font-black px-4 py-2 rounded-xl border border-white/10 transition-all">상세보기 →</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. 사역 목표 */}
        <section className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded italic">PART 02</span>
            <h2 className="text-lg font-black italic">사역 목표</h2>
          </div>
          <div className="grid gap-2">
            {goals.map((goal, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 bg-white shadow-sm">
                <div className={`shrink-0 w-10 h-10 ${goal.color} rounded-lg flex items-center justify-center text-xl`}>{goal.emoji}</div>
                <div>
                  <h3 className="text-sm font-black">{goal.title}</h3>
                  <p className="text-slate-500 text-[11px] leading-tight break-keep font-medium">{goal.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. 상세 프로그램 */}
        <section className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded italic">PART 03</span>
            <h2 className="text-lg font-black italic">상세 프로그램</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {schedule.map((day, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <div className="mb-2 flex justify-between items-baseline">
                  <h3 className="text-sm font-black text-slate-800">{day.day}</h3>
                  <span className="text-indigo-600 font-black text-[9px]">{day.date}</span>
                </div>
                <div className="space-y-1">
                  {day.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-[11px] border-b border-slate-200/50 pb-1 last:border-0 last:pb-0">
                      <span className="font-bold text-slate-400">{item.time}</span>
                      <span className={`${item.color} font-bold`}>{item.task}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 푸터 */}
        <div className="pt-6 text-center border-t border-slate-100">
          <p className="text-slate-400 text-[10px] font-black tracking-tighter">CONNECT & COMBINE | 2026 JEJU</p>
        </div>

      </div>
    </div>
  );
}