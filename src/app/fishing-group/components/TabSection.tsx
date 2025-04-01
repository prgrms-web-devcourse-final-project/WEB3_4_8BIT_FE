"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabSection() {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="w-full grid grid-cols-3 h-12 ">
        <TabsTrigger
          value="all"
          className="text-base rounded-none border-0 data-[state=active]:border-b-2 data-[state=active]:border-[#3795FF] data-[state=active]:text-[#3795FF] font-medium"
        >
          전체
        </TabsTrigger>
        <TabsTrigger
          value="recruiting"
          className="text-base rounded-none border-0 data-[state=active]:border-b-2 data-[state=active]:border-[#3795FF] data-[state=active]:text-[#3795FF] font-medium"
        >
          모집중
        </TabsTrigger>
        <TabsTrigger
          value="completed"
          className="text-base rounded-none border-0 data-[state=active]:border-b-2 data-[state=active]:border-[#3795FF] data-[state=active]:text-[#3795FF] font-medium"
        >
          모집완료
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
