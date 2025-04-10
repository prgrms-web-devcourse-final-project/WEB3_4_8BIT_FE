export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[50vh] gap-4">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="text-gray-600">
        🚤 낚시 포인트 정보를 불러오는 중입니다...
      </p>
    </div>
  );
}
