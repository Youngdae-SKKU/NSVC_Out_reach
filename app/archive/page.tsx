import Link from "next/link";

export default function ArchivePage() {
  const historyData = [
    {
      id: 1,
      year: "2025",
      title: "제2회 겨울 아웃리치: '빛으로'",
      description: "추운 겨울을 뜨거운 기도로 녹였던 시간. 조별 미션 수행과 저녁 집회가 기억에 남습니다.",
      image: "/history_2025.jpg", // 이따가 사진 이름을 이렇게 바꿀 거예요.
    },
    {
      id: 2,
      year: "2024",
      title: "제1회 여름 아웃리치: '다시 복음으로'",
      description: "첫 시작의 설렘. 무더위 속에서도 웃음을 잃지 않았던 우리들의 찬양과 물놀이!",
      image: "/history_2024.jpg",
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white pb-20 font-sans">
      <nav className="p-6 max-w-4xl mx-auto flex items-center justify-between">
        <Link href="/" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-bold backdrop-blur-md transition-all">
          ← 메인으로
        </Link>
        <span className="text-slate-400 font-bold text-sm tracking-widest uppercase">History Archive</span>
      </nav>

      <div className="max-w-4xl mx-auto px-6 mt-10">
        <header className="mb-16 space-y-4 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            이전 Out Reach <br/>
            <span className="text-indigo-400 font-extrabold underline decoration-indigo-500/30 underline-offset-8">우리의 기록들</span>
          </h1>
          <p className="text-slate-400 text-lg break-keep max-w-2xl">
            함께 웃고 울며 성장했던 시간들을 돌아봅니다. 하나님께서 부어주신 은혜의 조각들을 확인하세요.
          </p>
        </header>

        <div className="space-y-24">
          {historyData.map((item) => (
            <article key={item.id} className="group relative">
              <div className="flex flex-col md:flex-row gap-10 items-start">
                <div className="w-full md:w-1/2 aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-slate-800 shadow-2xl relative border border-white/5">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-6 left-6 bg-indigo-600 px-4 py-1.5 rounded-full text-xs font-black shadow-lg">
                    {item.year}
                  </div>
                </div>

                <div className="w-full md:w-1/2 space-y-4 pt-4">
                  <h2 className="text-2xl md:text-3xl font-black tracking-tight group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-slate-400 leading-relaxed break-keep text-lg font-medium">
                    {item.description}
                  </p>
                  <div className="flex gap-2 text-xs font-bold text-slate-500">
                    <span className="px-3 py-1 bg-white/5 rounded-lg"># 은혜의_현장</span>
                    <span className="px-3 py-1 bg-white/5 rounded-lg"># 추억소환</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <footer className="mt-32 text-center p-12 bg-indigo-600/10 rounded-[3rem] border border-indigo-500/20">
          <h3 className="text-xl font-bold mb-4 italic text-indigo-300">"기억하는 자에게는 감사가, 기대하는 자에게는 소망이 있습니다."</h3>
          <p className="text-slate-400 font-medium">2026년, 새로운 추억을 함께 써 내려갈 주인공은 바로 당신입니다.</p>
        </footer>
      </div>
    </div>
  );
}