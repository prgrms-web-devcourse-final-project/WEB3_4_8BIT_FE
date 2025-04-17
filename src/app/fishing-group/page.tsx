"use client";

import { useState } from "react";
import Image from "next/image";
import { HotPost } from "./components/HotPost";
import { TabSection } from "./components/TabSection";
import { SearchBar } from "./components/SearchBar";
import { PostList } from "./components/PostList";
import { PostFilter } from "./components/TabSection";

export default function FishingGroupPage() {
  const [activeFilter, setActiveFilter] = useState<PostFilter>("all");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");

  const handleSearch = (searchTerm: string) => {
    setSearchKeyword(searchTerm);
  };

  const handleRegionChange = (regionId: string) => {
    setSelectedRegion(regionId);
  };

  return (
    <>
      <div className="w-full h-[500px] relative overflow-hidden">
        <Image
          src="/images/banner.jpg"
          alt="낚시 배너"
          fill
          className="object-cover brightness-75 scale-105 transition-transform duration-10000 hover:scale-110"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center">
            <div className="relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-[#bdd4fe] to-[#4a7ede] rounded-full"></div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 pl-8 tracking-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                <span className="inline-block animate-fade-in-up">
                  함께하는
                </span>{" "}
                <span className="text-[#bdd4fe] drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)] inline-block animate-fade-in-up animation-delay-200">
                  낚시 동출
                </span>
              </h1>
            </div>
            <div className="relative pl-8">
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl leading-loose drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]">
                <span className="inline-block animate-fade-in-up animation-delay-300">
                  전국 어디든 낚시 메이트를 찾아 떠나는 여정!
                </span>{" "}
                <br />
                <span className="text-[#9abbf9] font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)] inline-block animate-fade-in-up animation-delay-400">
                  오늘의 출조
                </span>
                <span className="italic drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)] inline-block animate-fade-in-up animation-delay-500">
                  , 혼자가 아닌 우리의 시간으로.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2"></div>
          <HotPost />
        </div>

        <div className="bg-white rounded-2xl p-5">
          <TabSection onFilterChange={setActiveFilter} />
          <SearchBar
            handleSearch={handleSearch}
            onRegionChange={handleRegionChange}
          />
        </div>

        <div className="bg-white rounded-2xl p-6">
          <PostList
            filter={activeFilter}
            searchKeyword={searchKeyword}
            selectedRegion={selectedRegion}
          />
        </div>
      </div>
    </>
  );
}
