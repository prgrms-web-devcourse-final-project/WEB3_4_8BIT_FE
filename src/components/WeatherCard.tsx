import { WeatherCardProps } from "@/types/weatherTypes";

export default function WeatherCard({
  title,
  value,
  unit,
  icon,
  iconColor,
  currentTime,
  currentDate,
  valueColor = "text-primary",
}: WeatherCardProps) {
  return (
    <div className="p-[12px] bg-[#F9FAFB] rounded-[8px] box-shadow-1">
      <p className="text-body-4 text-gray-30 mb-[4px]">{title}</p>
      <div className="flex items-center gap-[8px]">
        <div className={iconColor}>{icon}</div>
        <span className={`paperlogy-6semibold text-body-1 ${valueColor}`}>
          {value}
          {unit}
        </span>
      </div>
      <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
        <span>{currentTime}</span>
        <span>•</span>
        <span>{currentDate}</span>
      </div>
    </div>
  );
}
