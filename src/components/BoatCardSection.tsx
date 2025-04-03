"use client";

import React from "react";
import Link from "next/link";
import { Anchor } from "lucide-react";
import BoatCard from "@/components/BoatCard";

export default function BoatCardSection() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Anchor className="h-6 w-6 text-blue-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">
              선상낚시 예약하기
            </h2>
          </div>
          <Link
            href="/boat-reservation"
            className="inline-block px-4 py-2 bg-gray-80 text-gray-20 text-sm font-medium rounded-full hover:bg-gray-60 transition-colors"
          >
            더보기
          </Link>
        </div>

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
  );
}
