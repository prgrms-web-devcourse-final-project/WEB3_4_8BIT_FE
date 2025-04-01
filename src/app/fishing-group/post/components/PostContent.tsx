"use client";

interface PostContentProps {
  content: string;
}

export default function PostContent({ content }: PostContentProps) {
  return (
    <div className="mt-6">
      <hr className="border-t border-gray-200 my-4" />
      <div className="whitespace-pre-line text-gray-700 text-base mt-4">
        {content}
      </div>
    </div>
  );
}
