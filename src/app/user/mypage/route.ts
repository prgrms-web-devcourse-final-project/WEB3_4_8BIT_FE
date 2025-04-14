import { revalidateTag } from "next/cache";

export async function POST() {
  revalidateTag("reviews");
  return Response.json({ revalidated: true });
}
