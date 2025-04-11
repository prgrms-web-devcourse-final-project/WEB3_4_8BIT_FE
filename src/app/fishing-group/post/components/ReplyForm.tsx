"use client";

import { useState } from "react";

interface ReplyFormProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
  buttonText?: string;
}

export default function ReplyForm({
  onSubmit,
  placeholder = "답글을 입력하세요.",
  buttonText = "답글 작성",
}: ReplyFormProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content.trim());
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded-md text-gray-800 bg-white"
        rows={2}
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!content.trim()}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
}
