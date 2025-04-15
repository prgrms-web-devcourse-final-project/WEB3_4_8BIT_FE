"use client";

import { Card } from "@/components/ui/card";
import { getCaptainBoatInfo } from "@/lib/api/getCaptainInfo";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle, XCircle } from "lucide-react";

export default function ShipInfoPage() {
  const { data: shipInfoData, isLoading: isShipInfoLoading } = useQuery({
    queryKey: ["shipInfo"],
    queryFn: () => getCaptainBoatInfo(),
  });

  if (isShipInfoLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="md:col-span-3 space-y-6">
      <h1 className="text-2xl font-bold">선박정보</h1>

      {shipInfoData!.data.length > 0 ? (
        shipInfoData!.data.map((ship) => (
          <Card className="p-6 space-y-5" key={ship.shipId}>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-bold">{ship.shipName}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  선박 정보를 관리하세요
                </p>
              </div>
              {/* <Link href="/captain/ship-info/edit">
                <Pencil className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
              </Link> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-700">
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-black border-b pb-2">
                  기본 정보
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-gray-500">선박 이름</span>
                  <span className="font-medium">{ship.shipName}</span>
                  <span className="text-gray-500">등록 번호</span>
                  <span className="font-medium">{ship.shipNumber}</span>
                  <span className="text-gray-500">출항지</span>
                  <span className="font-medium">{ship.portName}</span>
                  <span className="text-gray-500">상세 주소</span>
                  <span className="font-medium">{ship.departurePort}</span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-black border-b pb-2">
                  시설 정보
                </h3>
                <div className="space-y-1">
                  <Facility label="휴식 공간" value={ship.loungeArea} />
                  <Facility label="식사 제공" value={ship.mealProvided} />
                  <Facility
                    label="낚시 용품 대여 여부"
                    value={ship.fishingGearRental}
                  />
                  <Facility label="조리 시설" value={ship.kitchenFacility} />
                  <Facility label="의자 제공" value={ship.fishingChair} />
                  <Facility label="주차 여부" value={ship.parkingAvailable} />
                  <Facility label={ship.restroomType} value={true} />
                  <Facility label="보험 여부" value={ship.passengerInsurance} />
                </div>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <div>선박 정보가 없습니다.</div>
      )}
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
