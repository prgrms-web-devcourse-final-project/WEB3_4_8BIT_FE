import { useUserStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

export const useCheckAuth = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const router = useRouter();

  const checkAuth = useCallback(() => {
    if (!isLoggedIn()) {
      toast.error("로그인이 필요한 서비스입니다.");
      router.push("/auth/login");
      return false;
    }
    return true;
  }, [isLoggedIn, router]);

  return checkAuth;
};
