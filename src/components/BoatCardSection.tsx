"use client";

import React from "react";
import Link from "next/link";
import { Anchor } from "lucide-react";
import BoatCard from "@/components/BoatCard";
import {useQuery} from "@tanstack/react-query";
import {BoatFishing, getLowestPriceBoatFishing} from "@/lib/api/boatFishAPI";

export default function BoatCardSection() {
  const { data, isSuccess } = useQuery<BoatFishing[]>({
    queryKey: ['lowestPriceBoatReservations'],
    queryFn: getLowestPriceBoatFishing,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Anchor className="h-6 w-6 text-blue-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">
              가성비 선상 낚시 예약하기
            </h2>
          </div>
          <Link
            href="/boat-reservation"
            className="inline-block px-4 py-2 bg-gray-80 text-gray-20 text-sm font-medium rounded-full hover:bg-gray-60 transition-colors"
          >
            더보기
          </Link>
        </div>

        <h2 className="text-gray-20 mb-3">
          예약할 수 있는 가장 저렴한 선상 낚시 입니다
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isSuccess && data?.length > 0 && (
            data.map(item => {
              return (
                <BoatCard
                  boatData={item}
                  key={item.shipFishingPostId}
                />
              )
            })
          )}
        </div>
      </div>
    </section>
  );
}
