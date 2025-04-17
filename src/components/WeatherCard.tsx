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
  className,
}: WeatherCardProps) {
  return (
    <div className="p-[12px] bg-[#F9FAFB] rounded-[8px] box-shadow-1">
      <p className={`text-xs sm:text-base text-gray-30 mb-[4px] ${className}`}>
        {title}
      </p>
      <div className="flex items-center gap-[8px]">
        <div className={iconColor}>{icon}</div>
        <span
          className={`paperlogy-6semibold text-sm sm:text-lg ${valueColor} ${className}`}
        >
          {value}
          {unit}
        </span>
      </div>
      <div className="flex items-center gap-1 mt-1">
        <span className="text-xs sm:text-sm text-gray-500">{currentTime}</span>
        <span className="text-xs sm:text-sm text-gray-500">•</span>
        <span className="text-xs sm:text-sm text-gray-500">{currentDate}</span>
      </div>
    </div>
  );
}
