"use client";

import { useSearchParams } from "next/navigation";

export default function FishingPointPage() {
  const searchParams = useSearchParams();
  const pointId = searchParams.get("pointId");
  return (
    <div>
      <h1>FishingPointPage</h1>
      <p>{pointId}</p>
    </div>
  );
}
