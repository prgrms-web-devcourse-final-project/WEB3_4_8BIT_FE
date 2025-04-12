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
    <div className="w-full mb-4 p-3 border border-gray-200 rounded-lg bg-white">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded-md text-sm md:text-base bg-white resize-none"
        rows={3}
      />
      <div className="flex justify-end mt-2">
        <button
          onClick={handleSubmit}
          className="px-3 py-1.5 bg-blue-500 text-white text-sm md:text-base rounded hover:bg-blue-600 cursor-pointer transition-colors"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
