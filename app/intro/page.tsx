"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type GoalKey = "spiritual" | "community" | "mission" | "calling";

type Program = { name: string; when: string; place: string; why: string };

type Goal = {
  key: GoalKey;
  title: string;
  emoji: string;
  color: string;
  ring: string;
  desc: string;
  note?: string;
  programs: Program[];
};

export default function IntroPage() {
  const [active, setActive] = useState<GoalKey | null>(null);
  const topScrollRef = useRef<HTMLDivElement>(null);
  const bottomScrollRef = useRef<HTMLDivElement>(null);
  const [tableWidth, setTableWidth] = useState<number>(620);

  // 표의 실제 가로 폭을 측정해 상단 스크롤바 더미 폭과 맞춤
  useEffect(() => {
    const measure = () => {
      if (bottomScrollRef.current) setTableWidth(bottomScrollRef.current.scrollWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // 상단/하단 스크롤바 좌우 이동 동기화 (무한 루프 방지 위해 값이 다를 때만 설정)
  const onTopScroll = () => {
    if (topScrollRef.current && bottomScrollRef.current &&
        bottomScrollRef.current.scrollLeft !== topScrollRef.current.scrollLeft) {
      bottomScrollRef.current.scrollLeft = topScrollRef.current.scrollLeft;
    }
  };
  const onBottomScroll = () => {
    if (topScrollRef.current && bottomScrollRef.current &&
        topScrollRef.current.scrollLeft !== bottomScrollRef.current.scrollLeft) {
      topScrollRef.current.scrollLeft = bottomScrollRef.current.scrollLeft;
    }
  };

  // PART 02 표에서 선택된 목표에 해당하는 칸을 강조
  const hl = (key: GoalKey) =>
    active === key
      ? " relative z-20 outline outline-[3px] -outline-offset-2 outline-rose-500 "
      : "";

  const T = "border-l border-r border-slate-400 align-top bg-[#EDE7F6] font-black text-[12px] text-slate-600 px-1";
  const B = "border border-slate-400";

  // PART 01 사역 목표(4카드) + 목표별 연결 프로그램
  // programs의 날짜·시간은 PART 02 표(일정_0710.jpg, 30분 격자)에서 산출.
  const goals: Goal[] = [
    {
      key: "spiritual",
      title: "영적 성장",
      emoji: "🌱",
      color: "bg-blue-50 text-blue-600",
      ring: "ring-blue-400",
      desc: "매일 아침 큐티와 집회로 하나님을 인격적으로 만나고 ‘하나님의 자녀’라는 정체성을 세웁니다.",
      programs: [
        { name: "방별 말씀 나눔", when: "8/6(목)·8/7(금) 06:00~07:00", place: "", why: "하루를 말씀으로 시작하며 전날 은혜를 나눔 — 영적 습관 형성" },
        { name: "예배 및 기도회 1", when: "8/5(수) 19:00~22:00", place: "", why: "하나님을 인격적으로 만나 정체성을 세우는 핵심 시간" },
        { name: "예배 및 기도회 2", when: "8/6(목) 19:00~22:00", place: "", why: "말씀 앞에서 소명과 정체성을 깊이 확인" },
        { name: "예배 및 기도회 3", when: "8/7(금) 19:00~23:30", place: "", why: "마지막 밤, 결단과 헌신으로 나아가는 시간" },
      ],
    },
    {
      key: "community",
      title: "공동체 연합",
      emoji: "🤝",
      color: "bg-purple-50 text-purple-600",
      ring: "ring-purple-400",
      desc: "미디어에서 벗어나 동역자·선생님과 소통하며 서로의 강점을 격려하는 ‘한 몸’ 공동체를 경험합니다.",
      programs: [
        { name: "연합 1", when: "8/5(수) 13:30~16:00", place: "알프스 제주점", why: "함께 활동하며 서로의 다름을 인정하고 하나 됨을 경험" },
        { name: "연합 2", when: "8/5(수) 16:00~18:00", place: "다이나믹 메이즈", why: "협력 미션을 통해 관계성을 세움" },
        { name: "연합 3", when: "8/6(목) 16:00~18:00", place: "런닝맨", why: "게임·미션으로 서로의 강점을 격려" },
        { name: "연합 4", when: "8/7(금) 13:30~16:00", place: "퍽당제주", why: "공동 체험으로 ‘한 몸’ 공동체를 다짐" },
        { name: "하나됨", when: "8/7(금) 16:00~18:00", place: "곽지 해수욕장", why: "자연 속 공동 활동으로 공동체가 하나 되는 체험" },
        { name: "간식으로 화합과 나눔", when: "8/5(수)·8/6(목) 22:00~22:30", place: "", why: "하루를 마무리하며 나누는 교제 — 관계성 형성" },
      ],
    },
    {
      key: "mission",
      title: "선교적 실천",
      emoji: "🧭",
      color: "bg-emerald-50 text-emerald-600",
      ring: "ring-emerald-400",
      desc: "제주 선교지와 기독교 역사를 탐방하며 ‘내가 선 모든 곳이 선교지’임을 깨닫고 복음의 증인으로 살아갑니다.",
      programs: [
        { name: "선교지 탐방 1", when: "8/6(목) 10:30~11:30", place: "모슬포교회", why: "제주 기독교 역사의 현장을 직접 돌아봄" },
        { name: "선교지 탐방 2", when: "8/6(목) 11:30~13:00", place: "이기풍 선교기념관", why: "선교사의 삶을 통해 부르심과 헌신을 배움" },
        { name: "선교지 탐방 3", when: "8/6(목) 14:30~16:00", place: "강병대 교회", why: "믿음의 유산을 이어받아 ‘내가 선 곳이 선교지’임을 자각" },
        { name: "전도", when: "8/7(금) 08:00~10:30", place: "만장굴", why: "복음의 증인 된 삶을 현장에서 직접 연습" },
      ],
    },
    {
      key: "calling",
      title: "소명 발견",
      emoji: "🚀",
      color: "bg-amber-50 text-amber-600",
      ring: "ring-amber-400",
      desc: "나를 향한 하나님의 부르심을 확인하고 고유한 은사(달란트)를 발견해 세상을 향한 비전을 설계합니다.",
      note: "일정상 별도 ‘비전 세션’은 없습니다. 취지문의 ‘창조 세계·역사 체험 → 감사·은사(달란트) 발견’ 흐름에 따라 제주 체험을 연결했으며, 소명은 예배·기도회를 통해서도 함께 형성됩니다.",
      programs: [
        { name: "제주 체험 1", when: "8/6(목) 08:00~10:30", place: "스카이 워터쇼", why: "창조 세계를 체험하며 감사를 회복하고 자신의 은사를 돌아봄" },
        { name: "제주 체험 2", when: "8/7(금) 10:30~11:30", place: "국립제주박물관", why: "역사와 문화를 배우며 세상을 향한 비전을 구체화" },
      ],
    },
  ];

  const DetailPanel = ({ goal }: { goal: Goal }) => (
    <div className="mt-2 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className={`flex items-center gap-2 px-4 py-3 ${goal.color}`}>
        <span className="text-lg">{goal.emoji}</span>
        <h3 className="text-sm font-black">{goal.title} · 연결 프로그램</h3>
      </div>
      <div className="p-3 space-y-2">
        {goal.programs.map((p: Program, i: number) => (
          <div key={i} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-[13px] font-black text-slate-800">{p.name}</span>
              {p.place && (
                <span className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 rounded px-1.5 py-0.5">
                  {p.place}
                </span>
              )}
              <span className="text-[10px] font-bold text-rose-500 ml-auto">{p.when}</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium leading-snug break-keep mt-1">{p.why}</p>
          </div>
        ))}
        {goal.note && (
          <p className="text-[10px] text-slate-400 font-medium leading-snug break-keep px-1 pt-1">
            ※ {goal.note}
          </p>
        )}
        <p className="text-[10px] text-indigo-500 font-bold px-1 pt-1">
          아래 상세 프로그램 표에서 해당 칸이 <span className="text-rose-500">빨간 테두리</span>로 강조됩니다.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12 font-sans text-slate-900">

      <div className="relative h-[80px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-500 rounded-b-[30px] shadow-sm">
        <Link href="/" className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md z-30">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </Link>
        <div className="relative z-10 text-center">
          <span className="text-[9px] font-black text-white/70 tracking-widest uppercase block mb-0.5">2026 JEJU OUTREACH</span>
          <h1 className="text-xl md:text-2xl font-black text-white italic tracking-tighter">2026 아웃리치 여정</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 mt-5 space-y-6">

        <section className="space-y-2">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="bg-indigo-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded italic">PART 01</span>
              <h2 className="text-lg font-black italic">사역 목표</h2>
            </div>
            <span className="text-[10px] text-indigo-500 font-bold">카드를 눌러 관련 프로그램 보기 👆</span>
          </div>

          <div className="grid gap-2">
            {goals.map((goal: Goal) => {
              const isActive = active === goal.key;
              return (
                <div key={goal.key}>
                  <button
                    type="button"
                    onClick={() => setActive(isActive ? null : goal.key)}
                    aria-expanded={isActive}
                    className={`w-full text-left flex items-center gap-3 p-3 rounded-2xl border bg-white shadow-sm transition-all
                      ${isActive
                        ? `border-transparent ring-2 ${goal.ring} shadow-md`
                        : "border-slate-100 hover:border-slate-200 hover:shadow"}`}
                  >
                    <div className={`shrink-0 w-10 h-10 ${goal.color} rounded-lg flex items-center justify-center text-xl`}>{goal.emoji}</div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-black flex items-center gap-1.5">
                        {goal.title}
                        <span className="text-[9px] font-bold text-slate-400">· 프로그램 {goal.programs.length}</span>
                      </h3>
                      <p className="text-slate-500 text-[11px] leading-tight break-keep font-medium mt-0.5">{goal.desc}</p>
                    </div>
                    <svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                      className={`shrink-0 text-slate-300 transition-transform ${isActive ? "rotate-180 text-slate-500" : ""}`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {isActive && <DetailPanel goal={goal} />}
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-2">
          <div className="flex justify-between items-end mb-2">
            <div className="flex items-center gap-2">
              <span className="bg-indigo-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded italic shadow-sm">PART 02</span>
              <h2 className="text-lg font-black italic">상세 프로그램</h2>
            </div>
            <span className="text-[10px] text-rose-500 font-bold animate-pulse">
              표를 좌우로 밀어보세요 👉
            </span>
          </div>

          <div className="rounded-xl overflow-hidden shadow-lg border border-slate-400 bg-white">
            {/* 상단 가로 스크롤바 (아래 표와 좌우 이동 동기화) */}
            <div ref={topScrollRef} onScroll={onTopScroll} className="overflow-x-auto">
              <div style={{ width: tableWidth, height: 1 }} />
            </div>
            <div ref={bottomScrollRef} onScroll={onBottomScroll} className="overflow-x-auto">
              <table className="w-full text-center text-[11.5px] min-w-[620px] border-collapse leading-tight">
                <thead>
                  <tr className="bg-[#B4C6E7] text-slate-800 font-black">
                    <th className={`${B} py-3 w-16 text-[12px]`}>시간 / 날짜</th>
                    <th className={`${B} py-3 w-[21%] text-[13px]`}>8/5 (수)</th>
                    <th className={`${B} py-3 w-[21%] text-[13px]`}>8/6 (목)</th>
                    <th className={`${B} py-3 w-[21%] text-[13px]`}>8/7 (금)</th>
                    <th className={`${B} py-3 w-[21%] text-[13px]`}>8/8 (토)</th>
                  </tr>
                </thead>
                <tbody className="text-slate-900 font-bold tracking-tight">
                  {/* 05:00 */}
                  <tr><td rowSpan={2} className={T}><span className="relative -top-[8px] inline-block">05:00</span></td><td className={`${B} bg-[#E2D2ED] py-2`}>집결 및 기도</td><td colSpan={2} rowSpan={2} className={`${B} bg-[#E2EFDA] py-2`}>기상<br/><span className="text-red-600 font-black">(06:30)</span></td><td rowSpan={5} className={`${B} bg-[#E2EFDA] py-2`}>기상<br/><span className="text-red-600 font-black">(07:30)</span></td></tr>
                  {/* 05:30 */}
                  <tr><td rowSpan={3} className={`${B} bg-[#FCE4D6] py-2`}>공항으로 출발</td></tr>
                  {/* 06:00 */}
                  <tr><td rowSpan={2} className={T}><span className="relative -top-[8px] inline-block">06:00</span></td><td colSpan={2} rowSpan={2} className={`${B} bg-[#E2D2ED] ${hl("spiritual")} py-2`}>방별 말씀 나눔</td></tr>
                  {/* 06:30 */}
                  <tr></tr>
                  {/* 07:00 */}
                  <tr><td rowSpan={2} className={T}><span className="relative -top-[8px] inline-block">07:00</span></td><td rowSpan={4} className={`${B} bg-[#FCE4D6] py-2`}>조식 및<br/>탑승 수속</td><td colSpan={2} rowSpan={2} className={`${B} bg-[#FFF2CC] py-2`}>숙소 조식</td></tr>
                  {/* 07:30 */}
                  <tr><td rowSpan={2} className={`${B} bg-[#FFF2CC] py-2`}>숙소 조식</td></tr>
                  {/* 08:00 */}
                  <tr><td rowSpan={2} className={T}><span className="relative -top-[8px] inline-block">08:00</span></td><td rowSpan={5} className={`${B} bg-[#D9E1F2] ${hl("calling")} py-2`}>제주 체험 1<br/><span className="text-[10px] font-medium">&lt;스카이 워터쇼&gt;</span></td><td rowSpan={5} className={`${B} bg-[#D9E1F2] ${hl("mission")} py-2`}>전도<br/><span className="text-[10px] font-medium">&lt;만장굴&gt;</span></td></tr>
                  {/* 08:30 */}
                  <tr><td rowSpan={2} className={`${B} bg-white py-2`}>정리 및 퇴실</td></tr>
                  {/* 09:00 */}
                  <tr><td rowSpan={2} className={T}><span className="relative -top-[8px] inline-block">09:00</span></td><td rowSpan={3} className={`${B} bg-white py-2`}>비행기 이동<br/><span className="text-red-600 font-black">(09:20 ~ 10:35)</span></td></tr>
                  {/* 09:30 */}
                  <tr><td rowSpan={4} className={`${B} bg-[#FCE4D6] py-2`}>공항으로 출발</td></tr>
                  {/* 10:00 */}
                  <tr><td rowSpan={2} className={T}><span className="relative -top-[8px] inline-block">10:00</span></td></tr>
                  {/* 10:30 */}
                  <tr><td rowSpan={3} className={`${B} bg-[#FCE4D6] py-2`}>짐 찾기<br/>이동</td><td rowSpan={2} className={`${B} bg-[#E2D2ED] ${hl("mission")} py-2`}>선교지 탐방 1<br/><span className="text-[10px] font-medium">&lt;모슬포교회&gt;</span></td><td rowSpan={2} className={`${B} bg-[#D9E1F2] ${hl("calling")} py-2`}>제주 체험 2<br/><span className="text-[10px] font-medium">&lt;국립제주박물관&gt;</span></td></tr>
                  {/* 11:00 */}
                  <tr><td rowSpan={2} className={T}><span className="relative -top-[8px] inline-block">11:00</span></td></tr>
                  {/* 11:30 */}
                  <tr><td rowSpan={3} className={`${B} bg-[#E2D2ED] ${hl("mission")} py-2`}>선교지 탐방 2<br/><span className="text-[10px] font-medium">&lt;이기풍 선교기념관&gt;</span></td><td rowSpan={4} className={`${B} bg-[#FFF2CC] py-2`}>중식<br/><span className="text-[10px] font-medium">&lt;명륜진사 삼화점&gt;</span></td><td rowSpan={4} className={`${B} bg-[#FCE4D6] py-2`}>중식 (푸드코트)<br/>및<br/>탑승 수속</td></tr>
                  {/* 12:00 */}
                  <tr><td rowSpan={2} className={T}><span className="relative -top-[8px] inline-block">12:00</span></td><td rowSpan={3} className={`${B} bg-[#FFF2CC] py-2`}>중식<br/><span className="text-[10px] font-medium">&lt;고사리맛집흑돼지&gt;</span></td></tr>
                  {/* 12:30 */}
                  <tr></tr>
                  {/* 13:00 */}
                  <tr><td rowSpan={2} className={T}><span className="relative -top-[8px] inline-block">13:00</span></td><td rowSpan={3} className={`${B} bg-[#FFF2CC] py-2`}>중식<br/><span className="text-[10px] font-medium">&lt;그때 그 집&gt;</span></td></tr>
                  {/* 13:30 */}
                  <tr><td rowSpan={5} className={`${B} bg-[#D9E1F2] ${hl("community")} py-2`}>연합 1<br/><span className="text-[10px] font-medium">&lt;알프스 제주점&gt;</span></td><td rowSpan={5} className={`${B} bg-[#D9E1F2] ${hl("community")} py-2`}>연합 4<br/><span className="text-[10px] font-medium">&lt;퐁당제주&gt;</span></td><td rowSpan={3} className={`${B} bg-[#FCE4D6] py-2`}>비행기 이동<br/><span className="text-red-600 font-black">(13:45 ~ 15:00)</span></td></tr>
                  {/* 14:00 */}
                  <tr><td rowSpan={2} className={T}><span className="relative -top-[8px] inline-block">14:00</span></td></tr>
                  {/* 14:30 */}
                  <tr><td rowSpan={3} className={`${B} bg-[#E2D2ED] ${hl("mission")} py-2`}>선교지 탐방 3<br/><span className="text-[10px] font-medium">&lt;강병대 교회&gt;</span></td></tr>
                  {/* 15:00 */}
                  <tr><td rowSpan={2} className={T}><span className="relative -top-[8px] inline-block">15:00</span></td><td rowSpan={17} className={`${B} bg-[#FCE4D6] py-2`}>짐 찾기<br/><br/>교회 이동</td></tr>
                  {/* 15:30 */}
                  <tr></tr>
                  {/* 16:00 */}
                  <tr><td rowSpan={2} className={T}><span className="relative -top-[8px] inline-block">16:00</span></td><td rowSpan={4} className={`${B} bg-[#D9E1F2] ${hl("community")} py-2`}>연합 2<br/><span className="text-[10px] font-medium">&lt;다이나믹 메이즈&gt;</span></td><td rowSpan={4} className={`${B} bg-[#D9E1F2] ${hl("community")} py-2`}>연합 3<br/><span className="text-[10px] font-medium">&lt;런닝맨&gt;</span></td><td rowSpan={4} className={`${B} bg-[#D9E1F2] ${hl("community")} py-2`}>하나됨<br/><span className="text-[10px] font-medium">&lt;곽지 해수욕장&gt;</span></td></tr>
                  {/* 16:30 */}
                  <tr></tr>
                  {/* 17:00 */}
                  <tr><td rowSpan={2} className={T}><span className="relative -top-[8px] inline-block">17:00</span></td></tr>
                  {/* 17:30 */}
                  <tr></tr>
                  {/* 18:00 */}
                  <tr><td rowSpan={2} className={T}><span className="relative -top-[8px] inline-block">18:00</span></td><td colSpan={3} rowSpan={2} className={`${B} bg-[#FFF2CC] py-2`}>숙소 석식</td></tr>
                  {/* 18:30 */}
                  <tr></tr>
                  {/* 19:00 */}
                  <tr><td rowSpan={2} className={T}><span className="relative -top-[8px] inline-block">19:00</span></td><td rowSpan={6} className={`${B} bg-[#E2D2ED] ${hl("spiritual")} py-2`}>예배 및 기도회 1</td><td rowSpan={6} className={`${B} bg-[#E2D2ED] ${hl("spiritual")} py-2`}>예배 및 기도회 2</td><td rowSpan={9} className={`${B} bg-[#E2D2ED] ${hl("spiritual")} py-2`}>예배 및 기도회 3</td></tr>
                  {/* 19:30 */}
                  <tr></tr>
                  {/* 20:00 */}
                  <tr><td rowSpan={2} className={T}><span className="relative -top-[8px] inline-block">20:00</span></td></tr>
                  {/* 20:30 */}
                  <tr></tr>
                  {/* 21:00 */}
                  <tr><td rowSpan={2} className={T}><span className="relative -top-[8px] inline-block">21:00</span></td></tr>
                  {/* 21:30 */}
                  <tr></tr>
                  {/* 22:00 */}
                  <tr><td rowSpan={2} className={T}><span className="relative -top-[8px] inline-block">22:00</span></td><td colSpan={2} className={`${B} bg-[#FFF2CC] ${hl("community")} py-2`}>맛있는 간식으로 화합과 나눔</td></tr>
                  {/* 22:30 */}
                  <tr><td colSpan={2} rowSpan={2} className={`${B} bg-[#E2EFDA] py-2`}>취침</td></tr>
                  {/* 23:00 */}
                  <tr><td className={T}><span className="relative -top-[8px] inline-block">23:00</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <div className="pt-8 text-center border-t border-slate-200 mt-8">
          <p className="text-slate-400 text-[10px] font-black tracking-tighter">CONNECT & COMBINE | 2026 JEJU</p>
        </div>

      </div>
    </div>
  );
}