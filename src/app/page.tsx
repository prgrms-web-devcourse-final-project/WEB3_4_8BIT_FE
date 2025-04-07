"use client";

import React, {useEffect} from "react";
import ActiveChatPointCard from "@/components/ActiveChatPointCard";
import FishingPoint from "@/components/FishingPoint";
import FishingPointCard from "@/components/FishingPointCard";
import NearbyFishingPointCard from "@/components/NearbyFishingPointCard";
import BoatCardSection from "@/components/BoatCardSection";
import FishSection from "@/components/FishSection";
import BoatReservationSection from "@/components/BoatReservationSection";
import FishingGroupSection from "@/components/FishingGroupSection";
import {useQuery} from "@tanstack/react-query";
import {UserAPI} from "@/lib/api/userAPI";
import {useUserStore} from "@/stores/userStore";
import {User} from "@/types/user.interface";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import CurrentLocationWeather from "@/components/CurrentLocationWeather";

export default function Home() {
  const setUser = useUserStore(state => state.setUser);
  const user = useUserStore(state => state.user);
  const router = useRouter()

  const { data, isError, isSuccess } = useQuery<User | null>({
    queryKey: ['userInfo'],
    queryFn: UserAPI.prototype.getMemberInfo,
    staleTime : 1000 * 60 * 5,
  })

  const handleMoveRegister = () => {
    router.push('/auth/register');
  }

  useEffect(function setUserDataZustand() {
    if (isError) {
      alert("error"); // TODO 추후 에러 처리 필요
      return;
    }

    if(isSuccess && data) {
      const tempData = {...data, isAddInfo : false};
      console.log(tempData);
      setUser(tempData);
      return;
    }
  }, [isSuccess, setUser, data, isError])

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

      <CurrentLocationWeather />

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

      <BoatCardSection />

      <section className="py-12">
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
                <br/>
                미끼미끼의 서비스를 더욱 알차게 이용해보세요!
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button className="cursor-pointer" onClick={handleMoveRegister}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </main>
  );
}
