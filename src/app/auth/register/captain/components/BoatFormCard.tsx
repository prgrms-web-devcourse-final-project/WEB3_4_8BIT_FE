import {Card} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import React, {useEffect, useRef, useState} from "react";
import {BoatData, BoatInfoBooleanKeys} from "@/types/user.interface";
import CheckboxWithLabel from "@/app/auth/register/captain/components/CheckBoxWithLabel";
import {Button} from "@/components/ui/button";
import DaumPostcodeEmbed from "react-daum-postcode";
import {Check, Loader2} from "lucide-react";

const facilityOptions : Array<{label : string, key : BoatInfoBooleanKeys}> = [
  { label: "휴식 공간", key: "loungeArea" },
  { label: "취사 시설", key: "kitchenFacility" },
  { label: "승객 보험 가입", key: "passengerInsurance" },
  { label: "낚시 장비 대여", key: "fishingGearRental" },
  { label: "식사 제공", key: "mealProvided" },
  { label: "주차 공간", key: "parkingAvailable" },
  { label: "낚시 의자", key: "fishingChair" },
]

declare global {
  interface Window {
    daum: any;
  }
}

export default function BoatFormCard({
  index,
  boatInfo,
  onBoatInfoChange,
  handleDeleteBoat,
} : {
  index: number;
  boatInfo: BoatData;
  onBoatInfoChange: (updatedBoat: BoatData) => void;
  handleDeleteBoat: () => void;
}) {
  const [showPostcode, setShowPostcode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markerInstance = useRef<any>(null);

  const handleInputChange = (field: keyof BoatData, value: string) => {
    onBoatInfoChange({ ...boatInfo, [field]: value });
  };

  const handleFacilityToggle = (key: BoatInfoBooleanKeys) => {
    onBoatInfoChange({ ...boatInfo, [key]: !boatInfo[key] });
  };

  const handleComplete = (data: any) => {
    const fullAddress = data.address;
    onBoatInfoChange({ ...boatInfo, departurePort: fullAddress });
    setShowPostcode(false);

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(fullAddress, function (results: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        const result = results[0];
        const coords = new window.kakao.maps.LatLng(result.y, result.x);
        mapRef.current.style.display = "block";
        mapInstance.current.relayout();
        mapInstance.current.setCenter(coords);
        markerInstance.current.setPosition(coords);
      }
    });
  };

  const handleSave = async () => {
    if (
      !boatInfo.shipName ||
      !boatInfo.shipNumber ||
      !boatInfo.passengerCapacity ||
      !boatInfo.departurePort
    ) {
      alert("모든 정보를 입력해주세요");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSaved(true);
      onBoatInfoChange({ ...boatInfo, isSaved: true });
    }, 1000);
  };


  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) return;

    window.kakao.maps.load(() => {
      const container = mapRef.current;
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780),
        level: 5,
      };
      const map = new window.kakao.maps.Map(container, options);
      const marker = new window.kakao.maps.Marker({
        position: options.center,
        map,
      });

      mapInstance.current = map;
      markerInstance.current = marker;
    });
  }, []);

  return (
    <Card className={`p-4 border rounded-lg space-y-6 relative ${isSaved ? "max-h-28 overflow-hidden" : ""}`}>
      {isSaved && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-10 mb-0">
          <div className="flex items-center text-green-600 font-medium">
            <Check className="h-5 w-5 mr-2" />
            선박 정보가 저장되었습니다!
          </div>
        </div>
      )}
      <h3 className="font-semibold">선박 정보 {index + 1}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="block mb-2 text-sm font-medium">
            선박 이름 <span className="text-red-500">*</span>
          </Label>
          <Input
            value={boatInfo.shipName}
            onChange={(e) => handleInputChange("shipName", e.target.value)}
            placeholder="예: 해양호"
          />
        </div>
        <div>
          <Label className="block mb-2 text-sm font-medium">
            선박 등록번호 <span className="text-red-500">*</span>
          </Label>
          <Input
            value={boatInfo.shipNumber}
            onChange={(e) => handleInputChange("shipNumber", e.target.value)}
            placeholder="예: 123456-789"
          />
        </div>
        <div>
          <Label className="block mb-2 text-sm font-medium">
            정원 <span className="text-red-500">*</span>
          </Label>
          <Input
            type="number"
            value={boatInfo.passengerCapacity}
            onChange={(e) => handleInputChange("passengerCapacity", e.target.value)}
            placeholder="예: 20"
          />
        </div>
        <div className="md:col-span-2">
          <Label className="block mb-2 text-sm font-medium">
            출항 위치 <span className="text-red-500">*</span>
          </Label>
          <div className="flex gap-2">
            <Input
              value={boatInfo.departurePort}
              onChange={(e) => handleInputChange("departurePort", e.target.value)}
              placeholder="주소 검색 버튼을 눌러주세요"
              disabled
            />
            <Button type="button" className="cursor-pointer" onClick={() => setShowPostcode(!showPostcode)}>
              주소 검색
            </Button>
          </div>
          {showPostcode && (
            <div className="mt-4">
              <DaumPostcodeEmbed onComplete={handleComplete} className="border-2" />
            </div>
          )}
          <div
            ref={mapRef}
            style={{ width: "100%", height: "300px", marginTop: "10px", display: "none" }}
            className="rounded-md border"
          ></div>
        </div>
      </div>
      <div className="space-y-3">
        <Label className="block text-base font-semibold mb-1">
          시설 정보 <span className="text-red-500">*</span>
        </Label>
        <div className="mb-6 mt-4">
          <Label className="block text-sm font-medium mb-1">화장실 시설</Label>
          <Select
            value={boatInfo.restroomType}
            onValueChange={(value: "PUBLIC" | "SEPARATION" | "NONE") =>
              handleInputChange("restroomType", value)
            }
          >
            <SelectTrigger className="w-64 cursor-pointer">
              <SelectValue placeholder="없음" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NONE">없음</SelectItem>
              <SelectItem value="PUBLIC">공용 화장실</SelectItem>
              <SelectItem value="SEPARATION">남녀 분리 화장실</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-6">
          {facilityOptions.map(({ label, key }) => (
            <CheckboxWithLabel
              key={key}
              label={label}
              checked={boatInfo[key]}
              onChange={() => handleFacilityToggle(key)}
            />
          ))}
        </div>
        <div className="pt-6 flex justify-end gap-4">
          <Button type="button" variant="outline" className="cursor-pointer" onClick={handleDeleteBoat}>
            취소
          </Button>
          <Button type="button" className="cursor-pointer" onClick={handleSave} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                저장중
              </>
            ) : (
              "선박 저장"
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}