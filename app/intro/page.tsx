"use client";

import Link from "next/link";

export default function IntroPage() {
  const goals = [
    {
      title: "영적 성장",
      emoji: "🌱",
      color: "bg-blue-50 text-blue-600",
      desc: "매일 아침 큐티와 뜨거운 저녁 집회를 통해 하나님을 인격적으로 만나고, 내 삶의 주인이 누구인지 고백하는 변화의 시간을 갖습니다."
    },
    {
      title: "공동체 연합",
      emoji: "🤝",
      color: "bg-purple-50 text-purple-600",
      desc: "나 혼자가 아닌 '우리'를 배웁니다. 조별 미션과 공동체 게임을 통해 서로의 다름을 인정하고 그리스도 안에서 하나 됨을 경험합니다."
    },
    {
      title: "소명 발견",
      emoji: "🚀",
      color: "bg-amber-50 text-amber-600",
      desc: "나는 왜 태어났을까? 하나님이 나에게 주신 달란트는 무엇일까? 세상을 향한 하나님의 비전을 찾고 나의 꿈을 설계하는 시간입니다."
    }
  ];

  const schedule = [
    {
      day: "DAY 1. 설레는 만남",
      date: "8/5 (수)",
      items: [
        { time: "14:00 - 15:30", task: "교회 집결 및 장소 이동", color: "text-slate-600" },
        { time: "16:30 - 18:00", task: "오리엔테이션 & 아이스브레이킹", color: "text-blue-600" },
        { time: "19:30 - 21:30", task: "저녁 집회 I : '부르심'", color: "text-rose-600 font-black" },
      ]
    },
    {
      day: "DAY 2. 깊어지는 교제",
      date: "8/6 (목)",
      items: [
        { time: "10:00 - 12:00", task: "조별 큐티 및 말씀 나눔", color: "text-slate-600" },
        { time: "14:00 - 17:00", task: "워터 페스티벌 & 공동체 게임", color: "text-sky-500 font-black" },
        { time: "19:30 - 21:30", task: "저녁 집회 II : '회복'", color: "text-rose-600 font-black" },
      ]
    },
    {
      day: "DAY 3. 하나되는 우리",
      date: "8/7 (금)",
      items: [
        { time: "10:00 - 15:00", task: "아웃도어 미션 투어 (팀별활동)", color: "text-amber-600 font-black" },
        { time: "16:00 - 18:00", task: "특강 : '나의 소명을 찾아서'", color: "text-slate-600" },
        { time: "19:30 - 22:00", task: "성령 대망회 & 기도회", color: "text-rose-600 font-black" },
      ]
    },
    {
      day: "DAY 4. 새로운 파송",
      date: "8/8 (토)",
      items: [
        { time: "10:00 - 11:30", task: "파송 예배 및 간증 나눔", color: "text-indigo-600 font-black" },
        { time: "13:00 - 15:00", task: "기념사진 촬영 및 교회 귀가", color: "text-slate-600" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-24 font-sans text-slate-900 leading-relaxed">
      
      {/* 🚀 변경됨: 상단 헤더 - 제주의 활기찬 에너지를 담은 그라데이션 배경 */}
      <div className="relative h-[280px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-500 to-teal-400">
        {/* 장식용 빛무리 */}
        <div className="absolute top-[-20%] left-[-10%] w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-teal-300/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center px-4">
          <Link href="/" className="absolute -top-16 left-0 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur-md">
            <span className="text-white text-xl">←</span>
          </Link>
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 text-[10px] font-black text-white mb-3 backdrop-blur-md border border-white/30 tracking-widest uppercase">
            2026 JEJU OUTREACH
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-xl italic">
            안내 및 일정
          </h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 -mt-10 relative z-20 space-y-20">
        
        {/* 1. 일정 및 장소 섹션 */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-2 mb-6">
            <span className="bg-indigo-600 text-white text-[10px] font-black px-2 py-1 rounded italic uppercase">Part 01</span>
            <h2 className="text-2xl font-black italic">일정 및 장소</h2>
          </div>
          
          <div className="relative group overflow-hidden rounded-[2.5rem] bg-[#0F172A] p-8 md:p-10 text-white shadow-2xl border border-slate-800">
            {/* 장식 아이콘 */}
            <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <span className="text-[140px]">📍</span>
            </div>

            <div className="relative z-10 space-y-8">
              <div>
                <p className="text-indigo-400 font-bold text-xs mb-2 uppercase tracking-widest">When</p>
                <p className="text-2xl md:text-3xl font-black">2026. 08. 05(수) — 08. 08(토)</p>
                <p className="text-slate-400 text-sm mt-2 font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-ping"></span>
                  3박 4일간의 영적 대장정
                </p>
              </div>
              
              <div className="w-full h-[1px] bg-gradient-to-r from-slate-800 via-slate-700 to-transparent"></div>
              
              <div>
                <p className="text-teal-400 font-bold text-xs mb-2 uppercase tracking-widest">Where</p>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <p className="text-2xl md:text-3xl font-black text-white/95">제주 부영청소년 수련원</p>
                    <p className="text-slate-400 text-sm mt-2 font-medium leading-relaxed">
                      모든 이동은 집결 후 이동<br/>(첫날 교회 집결 후 이동)
                    </p>
                  </div>
                  
                  {/* 🚀 추가됨: 수련원 상세정보 버튼 */}
                  <a 
                    href="https://www.booyoungyouth.com/index.php" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-[13px] font-black px-6 py-3.5 rounded-2xl backdrop-blur-md border border-white/10 transition-all hover:-translate-y-1 active:scale-95 shadow-lg group/btn"
                  >
                    🏠 수련원 상세정보
                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. 사역 목표 섹션 */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          <div className="flex items-center gap-2 mb-6">
            <span className="bg-indigo-600 text-white text-[10px] font-black px-2 py-1 rounded italic uppercase">Part 02</span>
            <h2 className="text-2xl font-black italic">사역 목표</h2>
          </div>

          <div className="space-y-4">
            {goals.map((goal, index) => (
              <div key={index} className="flex gap-5 p-6 rounded-[2rem] border border-slate-100 hover:border-indigo-100 transition-all bg-white shadow-sm hover:shadow-md">
                <div className={`shrink-0 w-14 h-14 ${goal.color} rounded-2xl flex items-center justify-center text-3xl shadow-sm`}>
                  {goal.emoji}
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-black">{goal.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed break-keep font-medium">
                    {goal.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. 상세 프로그램 섹션 */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 pb-10">
          <div className="flex items-center gap-2 mb-8">
            <span className="bg-indigo-600 text-white text-[10px] font-black px-2 py-1 rounded italic uppercase">Part 03</span>
            <h2 className="text-2xl font-black italic">상세 프로그램</h2>
          </div>

          <div className="space-y-12">
            {schedule.map((day, idx) => (
              <div key={idx} className="relative pl-8 border-l-2 border-indigo-50">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-indigo-600"></div>
                
                <div className="mb-4">
                  <span className="text-indigo-600 font-black text-xs uppercase tracking-widest">{day.date}</span>
                  <h3 className="text-xl font-black text-slate-800">{day.day}</h3>
                </div>

                <div className="bg-slate-50/50 rounded-3xl p-6 space-y-4 border border-slate-100 shadow-sm">
                  {day.items.map((item, i) => (
                    <div key={i} className={`flex justify-between items-center ${i !== day.items.length - 1 ? 'border-b border-slate-100 pb-3' : ''}`}>
                      <span className="text-xs font-bold text-slate-400 font-mono">{item.time}</span>
                      <span className={`text-sm font-bold ${item.color} break-keep text-right`}>
                        {item.task}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 하단 푸터 문구 */}
        <div className="pt-10 text-center space-y-4 border-t border-slate-100">
          <p className="text-slate-400 text-sm font-medium italic">CONNECT & COMBINE | 2026 SUMMER JEJU</p>
          <h3 className="text-xl font-black leading-tight break-keep">
            제주의 푸른 바다보다 더 깊은 <br/>
            하나님의 사랑을 경험할 여러분을 축복합니다!
          </h3>
        </div>

      </div>
    </div>
  );
}