"use client";

import { useState } from "react";
import { CommentFormProps } from "@/types/comment";

export default function CommentForm({
  onSubmit,
  placeholder = "댓글을 작성해주세요",
  buttonText = "등록",
}: CommentFormProps) {
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (content.trim()) {
      await onSubmit(content);
      setContent("");
    }
  };

  return (
    <div className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm">
      <label className="block text-lg font-medium text-gray-800 mb-2">
        댓글 작성
      </label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded-md text-gray-800 bg-white"
        rows={3}
      />
      <div className="flex justify-end mt-2">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
