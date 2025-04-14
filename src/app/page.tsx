"use client";

import React, { useEffect } from "react";
import ActiveChatPointCard from "@/components/ActiveChatPointCard";
import FishingPoint from "@/components/FishingPoint";
import FishingPointCard from "@/components/FishingPointCard";
import NearbyFishingPointCard from "@/components/NearbyFishingPointCard";
import BoatCardSection from "@/components/BoatCardSection";
import FishSection from "@/components/FishSection";
import BoatReservationSection from "@/components/BoatReservationSection";
import FishingGroupSection from "@/components/FishingGroupSection";
import { useQuery } from "@tanstack/react-query";
import { UserAPI } from "@/lib/api/userAPI";
import { useUserStore } from "@/stores/userStore";
import { User } from "@/types/user.interface";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CurrentLocationWeather from "@/components/CurrentLocationWeather";
import Image from "next/image";

export default function Home() {
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  const { data, isError, isSuccess } = useQuery<User | null>({
    queryKey: ["userInfo"],
    queryFn: () => {
      if (!user) return null;
      else return UserAPI.getMemberInfo();
    }, // TODO 추후 수정이 필요한지?
    staleTime: 1000 * 60 * 5,
  });

  const handleMoveRegister = () => {
    router.push("/auth/register");
  };

  useEffect(
    function setUserDataZustand() {
      if (isError) {
        alert("error"); // TODO 추후 에러 처리 필요
        return;
      }

      if (isSuccess && data) {
        setUser(data);
        return;
      }
    },
    [isSuccess, setUser, data, isError]
  );

  return (
    <main>
      <section className="relative w-full h-[450px] md:h-[650px] flex items-center justify-start overflow-hidden">
        {/* 배경 이미지 */}
        <div className="absolute inset-0">
          <Image
            src="/images/mainbanner.png"
            alt="메인 배너"
            fill
            className="object-cover scale-105 transition-transform duration-10000 hover:scale-110"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          {/* 동적 그라데이션 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent animate-shimmer" />
        </div>

        {/* 컨텐츠 */}
        <div className="relative z-10 text-left sm:px-6 lg:px-8 xl:w-[1200px] w-full mx-auto px-4 xl:p-0 p-4">
          <div className="max-w-2xl">
            <div className="relative">
              {/* 세로 그라데이션 바 */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-blue-400/80 to-blue-600/80 rounded-full"></div>

              {/* 장식 요소 */}
              <div className="absolute -left-4 top-0 w-1.5 h-1.5 bg-blue-400/80 rounded-full animate-float"></div>
              <div className="absolute -left-4 top-8 w-1.5 h-1.5 bg-blue-500/80 rounded-full animate-float animation-delay-200"></div>
              <div className="absolute -left-4 top-16 w-1.5 h-1.5 bg-blue-600/80 rounded-full animate-float animation-delay-400"></div>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 pl-8 tracking-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                <span className="inline-block animate-fade-in-up">
                  손끝에서 전해지는
                </span>{" "}
                <span className="text-blue-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)] inline-block animate-fade-in-up animation-delay-200">
                  짜릿한 순간
                </span>
              </h1>
            </div>

            <p className="text-xl md:text-2xl text-white/90 mb-8 pl-8 leading-relaxed drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]">
              <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)] inline-block animate-fade-in-up animation-delay-400">
                나만의 어류 도감부터 실시간 선상낚시 예약, 동출 메이트 찾기까지
              </span>{" "}
              <br />
              <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)] inline-block animate-fade-in-up animation-delay-400 mr-2">
                손끝의 전율,
              </span>
              <span className="text-blue-300 font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)] inline-block animate-fade-in-up animation-delay-500">
                {" "}
                그 시작을 미끼미끼에서!
              </span>
            </p>
          </div>
        </div>

        {/* 배경 장식 요소 */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />

        {/* 추가 장식 요소 */}
        <div className="absolute bottom-8 right-8 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"></div>
        <div className="absolute top-8 right-8 w-24 h-24 bg-blue-400/5 rounded-full blur-xl"></div>
      </section>

      <CurrentLocationWeather />

      <FishingPoint />

      {/* 3개의 카드 섹션 */}
      <section className="py-5">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FishingPointCard />
            <NearbyFishingPointCard />
            <ActiveChatPointCard />
          </div>
        </div>
      </section>

      <BoatCardSection />

      <section className="py-4">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <BoatReservationSection />
            <FishSection />
          </div>
        </div>
      </section>
      <FishingGroupSection />

      {user?.isAddInfo === false && (
        // TODO 추후 동현님 Modal 과 연동
        <Dialog defaultOpen={true}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>추가 정보를 등록해주세요</DialogTitle>
              <DialogDescription>
                회원님의 추가 정보를 입력하고
                <br />
                미끼미끼의 서비스를 더욱 알차게 이용해보세요!
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button className="cursor-pointer" onClick={handleMoveRegister}>
                등록하기
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </main>
  );
}
