import ActiveChatPointCard from "@/components/ActiveChatPointCard";
import FishingPoint from "@/components/FishingPoint";
import FishingPointCard from "@/components/FishingPointCard";
import NearbyFishingPointCard from "@/components/NearbyFishingPointCard";

export default function Home() {
  return (
    <main>
      <section className="relative w-full h-[550px] flex items-center justify-start">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-20 to-gray-40 opacity-90" />
        <div className="absolute inset-0 bg-[url('/images/mainbanner.png')] bg-cover bg-center mix-blend-overlay" />
        <div className="relative z-10 text-left px-4 sm:px-6 lg:px-8">
          <h1 className="text-title-1 font-semibold text-white mb-6 leading-tight">
            손끝에서 전해지는 짜릿한 순간,
            <br />
            미끼미끼에서 시작해보세요
          </h1>
          <p className="text-body-1 text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            낚시를 즐기는 모든 이들을 위한 종합 플랫폼 <br />
            어류 도감부터 선상 낚시 예약까지 낚시에 필요한 모든 것
          </p>
        </div>
      </section>

      <FishingPoint />

      {/* 3개의 카드 섹션 */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FishingPointCard />
            <NearbyFishingPointCard />
            <ActiveChatPointCard />
          </div>
        </div>
      </section>
    </main>
  );
}
