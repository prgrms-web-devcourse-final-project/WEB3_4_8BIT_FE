import KakaoMapSection from "./components/KakaoMapSection";
import FishingSpotsSection from "./components/FishingSpotsSection";
import {FloatingChatButton} from "@/components/chat/FloatingChatButton";

export default function FishingPoint() {
  return (
    <div>
      <KakaoMapSection />
      <FishingSpotsSection />
      <FloatingChatButton/>
    </div>
  );
}
