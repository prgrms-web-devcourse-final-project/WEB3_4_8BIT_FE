"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export type PostFilter = "all" | "recruiting" | "completed";

interface TabSectionProps {
  onFilterChange: (filter: PostFilter) => void;
}

export function TabSection({ onFilterChange }: TabSectionProps) {
  const [activeTab, setActiveTab] = useState<PostFilter>("all");

  const handleTabChange = (value: string) => {
    const filter = value as PostFilter;
    setActiveTab(filter);
    onFilterChange(filter);
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className="w-full mb-8"
    >
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
