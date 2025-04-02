import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Calendar, Search} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";

export default function SearchBox() {
  return (
    <div className="bg-white border-[1px] rounded-xl shadow-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Label htmlFor="date" className="mb-2 block">
            날짜
          </Label>
          <div className="relative">
            <Input id="date" type="date" className="pl-10" />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>
        <div>
          <Label htmlFor="search" className="mb-2 block">
            검색어
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input id="search" type="search" className="pl-10" />
          </div>
        </div>
        <div>
          <Label htmlFor="fish-type" className="mb-2 block">
            인원수
          </Label>
          <Select>
            <SelectTrigger className="cursor-pointer">
              <SelectValue placeholder="인원 수 선택" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 8 }, (_, i) => (
                <SelectItem key={i} value={String(i + 1)}>
                  {i + 1}명
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button className="w-full bg-primary hover:bg-sub-1 cursor-pointer">
            <Search className="h-4 w-4 mr-2" /> 검색
          </Button>
        </div>
      </div>
    </div>
  )
}