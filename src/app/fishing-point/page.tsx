import ServerKaKaoMapSection from "./components/ServerKaKaoMapSection";
import FishingSpotsSection from "./components/FishingSpotsSection";
import { FloatingChatButton } from "@/components/chat/FloatingChatButton";

export default function FishingPoint() {
  return (
    <div>
      <ServerKaKaoMapSection />
      <FishingSpotsSection />
      <FloatingChatButton />
    </div>
  );
}
