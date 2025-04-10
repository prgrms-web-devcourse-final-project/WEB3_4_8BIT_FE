export default function BannerSection() {
  return (
    <section className="w-full h-[488px] bg-[url('/images/fishing-point-banner.png')] bg-cover bg-center">
      <div className="xl:w-[1280px] w-[calc(100%-20px)] mx-auto pt-[178px]">
        <h2 className="xl:text-title-1 text-title-2 text-white">
          실시간 낚시 포인트 정보
        </h2>
        <p className="xl:text-[32px] text-[24px] text-white">
          전국 바다 낚시 포인트의 정보를 실시간으로! <br /> 뭐시기 채팅 뭐시기!
        </p>
      </div>
    </section>
  );
}
