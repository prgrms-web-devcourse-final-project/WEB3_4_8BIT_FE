import { useRef } from "react";

export default function useDebouncedRequest<T>(
  request: () => Promise<T>,
  delay = 500
) {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const isWaiting = useRef(false);

  const trigger = () => {
    if (isWaiting.current) return;

    isWaiting.current = true;

    timer.current = setTimeout(async () => {
      try {
        await request();
      } finally {
        isWaiting.current = false;
      }
    }, delay);
  };

  return { trigger };
}
