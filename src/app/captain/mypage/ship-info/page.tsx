"use client";

import { CaptainSidebar } from "../components/SideBar";
import { Card } from "@/components/ui/card";
import { Pencil, CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ShipInfo {
  name: string;
  registrationNumber: string;
  origin: string;
  capacity: number;
  facilities: {
    restingSpace: boolean;
    food: boolean;
    equipmentRental: boolean;
    restroom: boolean;
    cctv: boolean;
    parking: boolean;
    fishingChairs: boolean;
  };
  images: string[];
}

const ship: ShipInfo = {
  name: "해양호",
  registrationNumber: "123-456-789",
  origin: "부산",
  capacity: 10,
  facilities: {
    restingSpace: true,
    food: true,
    equipmentRental: true,
    restroom: true,
    cctv: false,
    parking: false,
    fishingChairs: true,
  },
  images: ["/images/test.png", "/images/test.png", "/images/test.png"],
};

export default function ShipInfoPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
      <CaptainSidebar />

      <div className="md:col-span-3 space-y-6">
        <h1 className="text-2xl font-bold">선박정보</h1>

        <Card className="p-6 space-y-5">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-bold">{ship.name}</h2>
              <p className="text-sm text-gray-500 mt-1">
                선박 정보를 관리하세요
              </p>
            </div>
            <Link href="/captain/ship-info/edit">
              <Pencil className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-700">
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-black border-b pb-2">
                기본 정보
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-500">선박 이름</span>
                <span className="font-medium">{ship.name}</span>
                <span className="text-gray-500">등록 번호</span>
                <span className="font-medium">{ship.registrationNumber}</span>
                <span className="text-gray-500">출항지</span>
                <span className="font-medium">{ship.origin}</span>
                <span className="text-gray-500">정원</span>
                <span className="font-medium">{ship.capacity}명</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-semibold text-black border-b pb-2">
                시설 정보
              </h3>
              <div className="space-y-1">
                <Facility
                  label="휴식 공간"
                  value={ship.facilities.restingSpace}
                />
                <Facility label="식사 제공" value={ship.facilities.food} />
                <Facility
                  label="낚시 용품 대여 여부"
                  value={ship.facilities.equipmentRental}
                />
                <Facility label="조리 시설" value={ship.facilities.restroom} />
                <Facility label="감시 카메라" value={ship.facilities.cctv} />
                <Facility label="주차 여부" value={ship.facilities.parking} />
                <Facility
                  label="낚시 의자"
                  value={ship.facilities.fishingChairs}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ship.images.map((url, idx) => (
              <div
                key={idx}
                className="w-full h-50 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center"
              >
                <Image
                  src={url}
                  alt={`ship-image-${idx}`}
                  width={300}
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Facility({ label, value }: { label: string; value: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {value ? (
        <CheckCircle className="text-green-500 w-4 h-4" />
      ) : (
        <XCircle className="text-red-500 w-4 h-4" />
      )}
      <span>{label}</span>
    </div>
  );
}
