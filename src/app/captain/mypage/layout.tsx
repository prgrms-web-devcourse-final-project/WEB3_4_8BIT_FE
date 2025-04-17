"use client";

import { ReactNode } from "react";
import { CaptainSidebar } from "./components/SideBar";
import { useQuery } from "@tanstack/react-query";
import { getCaptainInfo } from "@/lib/api/getCaptainInfo";

export default function CaptainMyPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { data: captainData, isLoading: isCaptainLoading } = useQuery({
    queryKey: ["captain"],
    queryFn: () => getCaptainInfo(),
  });

  if (isCaptainLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="md:col-span-1">
        <CaptainSidebar captainData={captainData!} />
      </div>
      <div className="md:col-span-3 space-y-6">{children}</div>
    </div>
  );
}
