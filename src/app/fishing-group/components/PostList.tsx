"use client";

import { PostCard } from "./PostCard";

// 테스트용 데이터
const posts = [
  {
    id: 1,
    title: "제주도 어라카이번만 동출하실 5인 구합니다",
    content:
      "제주도 서귀포시 어라카이번만에서 참돔 낚시 동출하실 분 구합니다. 숙소는 근처 펜션 예약했고, 배 예약도 완료했습니다. 장비는 개인 지참입니다.",
    date: "2025.03.30",
    location: "제주시 서귀포시",
    views: 14,
    likes: 5,
    comments: 15,
    thumbnail: "/images/test.png",
    isRecruiting: true,
    memberCount: 5,
  },
  {
    id: 2,
    title: "기장 감성돔 낚시 동출 구해요",
    content:
      "부산 기장에서 감성돔 낚시 동출하실 분 구합니다. 주말에 가려고 하는데 4인 정도 생각하고 있습니다. 초보자도 환영합니다.",
    date: "2025.03.25",
    location: "부산시 기장군",
    views: 24,
    likes: 8,
    comments: 8,
    thumbnail: "/images/test.png",
    isRecruiting: true,
    memberCount: 4,
  },
  {
    id: 3,
    title: "방파제 갑오징어 낚시 함께해요",
    content:
      "여수 방파제에서 갑오징어 낚시 하실 분 구합니다. 저녁 8시부터 새벽까지 계획하고 있습니다. 차량 있으신 분 우대합니다.",
    date: "2025.03.20",
    location: "전라남도 여수시",
    views: 32,
    likes: 12,
    comments: 12,
    thumbnail: "/images/test.png",
    isRecruiting: false,
    memberCount: 3,
  },
];

export function PostList() {
  return (
    <div className="w-full bg-white">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          content={post.content}
          date={post.date}
          location={post.location}
          views={post.views}
          likes={post.likes}
          comments={post.comments}
          thumbnail={post.thumbnail}
          isRecruiting={post.isRecruiting}
          memberCount={post.memberCount}
        />
      ))}
    </div>
  );
}
