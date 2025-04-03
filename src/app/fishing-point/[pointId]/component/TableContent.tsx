import { TableCell, TableRow } from "@/components/ui/table";
import { DailyWeather } from "@/types/weatherTypes";
import {
  getWeatherIcon,
  getWeatherText,
  getUVIColor,
  formatTemperature,
} from "@/utils/weatherStatusFormater";

export default function TableContent({
  day,
  dayData,
}: {
  day: string;
  dayData: DailyWeather;
}) {
  return (
    <TableRow>
      <TableCell>{day}</TableCell>
      <TableCell>
        <div className="flex flex-col">
          {getWeatherIcon(dayData.weather[0]?.main)}
          <p className="text-body-5">
            {getWeatherText(dayData.weather[0]?.main)}
          </p>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <p className="text-[#EF4444] text-body-3">
            {formatTemperature(dayData.temp.max)}°
          </p>
          <p className="text-primary text-body-3">
            {dayData.temp.min ? formatTemperature(dayData.temp.min) : "--"}°
          </p>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <p className="text-[#1D4ED8] text-body-3">
            {Math.round(dayData.pop)}%
          </p>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <p className="text-[#F97316] text-body-3">
            {Math.round(dayData.wind_speed)} m/s
          </p>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <p className="text-[#EF4444] text-body-3">
            {formatTemperature(dayData.feels_like.day)}°
          </p>
          <p className="text-primary text-body-3">
            {dayData.feels_like.morn
              ? formatTemperature(dayData.feels_like.morn)
              : "--"}
            °
          </p>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <p className={`${getUVIColor(dayData.uvi)} text-body-3`}>
            {Math.round(dayData.uvi)}
          </p>
        </div>
      </TableCell>
    </TableRow>
  );
}
