import { MapPin } from "lucide-react";

interface MapCardProps {
  fishPointName: string;
}

export default function MapCard({ fishPointName }: MapCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md mt-4">
      <div className="flex items-start gap-3">
        <div>
          <div className="text-lg font-bold mb-2">지도</div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-500" />
            <div className="font-medium">{fishPointName}</div>
          </div>
          <div
            id="map"
            style={{ width: "100%", height: "200px", marginTop: "8px" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
