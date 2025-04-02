import { ReactNode } from "react";
import BannerSection from "./components/BannerSection";

export default function FishingPointLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      <BannerSection />
      {children}
    </div>
  );
}
