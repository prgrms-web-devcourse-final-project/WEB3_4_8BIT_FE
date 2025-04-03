import ActiveChatPointCard from "@/components/ActiveChatPointCard";
import FishingPoint from "@/components/FishingPoint";
import FishingPointCard from "@/components/FishingPointCard";
import NearbyFishingPointCard from "@/components/NearbyFishingPointCard";
import BoatCard from "@/components/BoatCard";
import FishSection from "@/components/FishSection";
import BoatReservationSection from "@/components/BoatReservationSection";

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

      {/* BoatCard 컴포넌트 섹션 */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BoatCard
              id="1"
              image="images/test.png"
              name="미끼미끼호1"
              location="서울시 강남구"
              rating={4.5}
              reviews={100}
              price={50000}
              fishTypes={["연어", "참치"]}
            />
            <BoatCard
              id="2"
              image="images/test.png"
              name="미끼미끼호2"
              location="부산시 해운대구"
              rating={4.7}
              reviews={120}
              price={60000}
              fishTypes={["광어", "우럭"]}
            />
            <BoatCard
              id="3"
              image="images/test.png"
              name="미끼미끼호3"
              location="인천시 연수구"
              rating={4.8}
              reviews={80}
              price={70000}
              fishTypes={["대구", "농어"]}
            />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <BoatReservationSection />
            <FishSection />
          </div>
        </div>
      </section>
    </main>
  );
}
