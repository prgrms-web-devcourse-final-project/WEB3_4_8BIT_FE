"use client";

import { useState } from "react";
import { ReplyFormProps } from "@/types/comment";

export default function ReplyForm({
  onSubmit,
  placeholder = "댓글을 입력하세요.",
  buttonText = "댓글 작성",
}: ReplyFormProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex flex-col space-y-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          className="w-full p-2 border border-gray-300 rounded-md text-gray-800 bg-white resize-none"
          rows={2}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </form>
  );
}
