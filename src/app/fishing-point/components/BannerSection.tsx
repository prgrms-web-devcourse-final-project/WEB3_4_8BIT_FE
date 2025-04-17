import Image from "next/image";

export default function BannerSection() {
  return (
    <div className="w-full h-[500px] relative overflow-hidden">
      <Image
        src="/images/fishing-point-banner.jpg"
        alt="낚시 포인트 배너"
        fill
        className="object-cover brightness-75 scale-105 transition-transform duration-10000 hover:scale-110"
        priority
        sizes="100vw"
      />

      <div className="container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-[#bdd4fe] to-[#4a7ede] rounded-full"></div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 pl-8 tracking-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            <span className="inline-block animate-fade-in-up">실시간</span>{" "}
            <span className="text-[#bdd4fe] drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)] inline-block animate-fade-in-up animation-delay-200">
              낚시 포인트
            </span>
          </h1>
        </div>
        <div className="relative pl-8">
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl leading-loose drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]">
            <span className="inline-block animate-fade-in-up animation-delay-300">
              전국 바다 낚시 포인트의 정보를 실시간으로 확인하세요!
            </span>{" "}
            <br />
            <span className="text-[#9abbf9] font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)] inline-block animate-fade-in-up animation-delay-400">
              전국의 낚시 포인트부터
            </span>
            <span className="italic drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)] inline-block animate-fade-in-up animation-delay-500">
              , 실시간 날씨 정보로 더 나은 낚시를.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
