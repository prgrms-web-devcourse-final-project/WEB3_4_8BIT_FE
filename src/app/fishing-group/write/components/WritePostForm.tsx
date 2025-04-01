"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function WritePostForm() {
  return (
    <div className="bg-white rounded-lg p-8">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/fishing-group"
          className="text-gray-500 hover:text-gray-700"
        >
          ← 목록으로 돌아가기
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold mb-2">낚시 동출 모집 글쓰기</h1>
      <p className="text-gray-500 mb-8">
        함께 낚시를 즐길 동료를를 모집하세요.
      </p>

      {/* Form */}
      <form className="space-y-6">
        {/* Title input */}
        <div className="space-y-2">
          <label htmlFor="title" className="block font-medium">
            제목
          </label>
          <Input
            id="title"
            placeholder="제목을 입력하세요"
            className="w-full"
          />
        </div>

        {/* Location input */}
        <div className="space-y-2">
          <label htmlFor="location" className="block font-medium">
            낚시 날짜
          </label>
          <Input
            id="location"
            placeholder="날짜를 선택하세요"
            className="w-full"
          />
        </div>

        {/* Fishing spot input */}
        <div className="space-y-2">
          <label htmlFor="fishingSpot" className="block font-medium">
            낚시 포인트
          </label>
          <Input
            id="fishingSpot"
            placeholder="낚시 포인트를 선택하세요"
            className="w-full"
          />
        </div>

        {/* Member count */}
        <div className="space-y-2">
          <label htmlFor="memberCount" className="block font-medium">
            모집 인원
          </label>
          <Input
            id="memberCount"
            type="number"
            defaultValue={2}
            min={2}
            className="w-24"
          />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <label htmlFor="content" className="block font-medium">
            내용
          </label>
        </div>

        {/* Notice */}
        <div className="bg-blue-50 p-4 rounded-lg space-y-2 text-sm text-blue-600">
          <p>동출 참여시 주의사항</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>모든 참여자가 동의한 내용만 게시해 주세요.</li>
            <li>허위 정보는 제재대상이 됩니다.</li>
            <li>게시글 작성자는 책임감을 가져주세요.</li>
          </ul>
        </div>

        {/* Image upload */}
        <div className="space-y-2">
          <p className="font-medium">이미지 첨부 (선택사항)</p>
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-500">
              이미지를 드래그하여 업로드하거나 클릭하여 파일을 선택하세요.
            </p>
            <Button variant="outline" className="mt-4">
              파일 선택
            </Button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline">취소</Button>
          <Button>등록하기</Button>
        </div>
      </form>
    </div>
  );
}
