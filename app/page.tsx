import { getPaymentStatus } from "../notion";
import StatusSection from "./StatusSection"; // 잠시 후 만들 파일입니다.

export default async function Home() {
  // 1. 데이터를 '서버'에서 안전하게 미리 가져옵니다.
  const data = await getPaymentStatus();

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
      {/* 🚀 헤로 섹션 (여백 조절 버전) */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500 text-white py-12 px-4 text-center rounded-b-[3rem] shadow-xl">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="inline-block py-0 px-4 rounded-full bg-white/20 text-sm font-bold tracking-widest backdrop-blur-sm border border-white/30">
            🔥 2026 SUMMER OUTREACH
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight break-keep leading-tight">
            2026년 남서울비전교회<br/>중등부 아웃리치
          </h1>
          <p className="text-lg md:text-xl font-semibold text-indigo-100 opacity-90">
            "연결되고 결합되어(엡 4:16)"
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-12 space-y-16">
        {/* 🌟 1번 테마: 사역 핵심 가치 */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-black text-slate-800">🤔 NSVC 중등부 Out Reach ?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-blue-50 rounded-3xl p-6 text-center">
              <div className="text-4xl mb-2">🌱</div>
              <h4 className="font-bold text-blue-900 text-lg">영적 성장</h4>
            </div>
            <div className="bg-rose-50 rounded-3xl p-6 text-center">
              <div className="text-4xl mb-2">🤝</div>
              <h4 className="font-bold text-rose-900 text-lg">공동체 연합</h4>
            </div>
            <div className="bg-amber-50 rounded-3xl p-6 text-center">
              <div className="text-4xl mb-2">🚀</div>
              <h4 className="font-bold text-amber-900 text-lg">사명 발견</h4>
            </div>
          </div>
        </section>

        {/* 📊 클릭 가능한 등록 현황 섹션 (별도 컴포넌트로 분리) */}
        <StatusSection initialData={data} />
      </div>
    </div>
  );
}