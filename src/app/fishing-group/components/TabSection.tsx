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
      className="w-full mb-6"
    >
      <TabsList className="w-full flex h-12 border-b border-gray-200">
        <TabsTrigger
          value="all"
          className="flex-1 text-lg font-medium text-gray-500 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]: transition-all duration-200 hover:text-blue-600"
        >
          전체
        </TabsTrigger>
        <TabsTrigger
          value="recruiting"
          className="flex-1 text-lg font-medium text-gray-500 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]: transition-all duration-200 hover:text-blue-600"
        >
          모집중
        </TabsTrigger>
        <TabsTrigger
          value="completed"
          className="flex-1 text-lg font-medium text-gray-500 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:transition-all duration-200 hover:text-blue-600"
        >
          모집완료
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
