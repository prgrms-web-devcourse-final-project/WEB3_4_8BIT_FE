import { ReactNode } from "react";
import BannerSection from "./components/BannerSection";
import ServerKaKaoMapSection from "./components/ServerKaKaoMapSection";
import GoToBack from "@/components/GoToback";

export default function FishingPointLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <BannerSection />
      <GoToBack text="뒤로가기" />

      <ServerKaKaoMapSection />
      {children}
    </div>
  );
}
