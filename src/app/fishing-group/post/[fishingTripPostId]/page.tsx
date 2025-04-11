import PostDetailContent from "../components/PostDetailContent";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ fishingTripPostId: string }>;
}) {
  const resolvedParams = await params;
  const postId = parseInt(resolvedParams.fishingTripPostId);
  return <PostDetailContent postId={postId} />;
}
