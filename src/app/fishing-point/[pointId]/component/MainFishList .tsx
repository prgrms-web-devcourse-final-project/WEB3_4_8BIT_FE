import Image from "next/image";

export default function MainFishList() {
  return (
    <div className="w-full p-[16px] mb-[32px]">
      <div className="mb-[28px]">
        <h5 className="text-title-5 mb-[6px]">대표 어종</h5>
        <p className="text-body-4 text-gray-50">
          해당 포인트에서 자주 낚이는 대표 어종이에요.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex items-center gap-[12px] p-4 rounded-lg">
          <div className="w-[56px] h-[56px] rounded-full bg-gray-70 flex items-center justify-center flex-shrink-0">
            <Image
              src="/images/fish-dummy-img1.png"
              alt="문어"
              width={36}
              height={36}
            />
          </div>
          <div className="min-w-0">
            <strong className="text-body-3 block truncate">문어</strong>
            <p className="text-body-5 text-gray-50">제철: 봄-가을</p>
            <div className="bg-[#EFF6FF] py-[4px] px-[8px] inline-block mt-1">
              <span className="text-[#1E40AF] text-body-5">100 마리+</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[12px] p-4 rounded-lg">
          <div className="w-[56px] h-[56px] rounded-full bg-gray-70 flex items-center justify-center flex-shrink-0">
            <Image
              src="/images/fish-dummy-img1.png"
              alt="문어"
              width={36}
              height={36}
            />
          </div>
          <div className="min-w-0">
            <strong className="text-body-3 block truncate">문어</strong>
            <p className="text-body-5 text-gray-50">제철: 봄-가을</p>
            <div className="bg-[#EFF6FF] py-[4px] px-[8px] inline-block mt-1">
              <span className="text-[#1E40AF] text-body-5">100 마리+</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[12px] p-4 rounded-lg">
          <div className="w-[56px] h-[56px] rounded-full bg-gray-70 flex items-center justify-center flex-shrink-0">
            <Image
              src="/images/fish-dummy-img1.png"
              alt="문어"
              width={36}
              height={36}
            />
          </div>
          <div className="min-w-0">
            <strong className="text-body-3 block truncate">문어</strong>
            <p className="text-body-5 text-gray-50">제철: 봄-가을</p>
            <div className="bg-[#EFF6FF] py-[4px] px-[8px] inline-block mt-1">
              <span className="text-[#1E40AF] text-body-5">100 마리+</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[12px] p-4 rounded-lg">
          <div className="w-[56px] h-[56px] rounded-full bg-gray-70 flex items-center justify-center flex-shrink-0">
            <Image
              src="/images/fish-dummy-img1.png"
              alt="문어"
              width={36}
              height={36}
            />
          </div>
          <div className="min-w-0">
            <strong className="text-body-3 block truncate">문어</strong>
            <p className="text-body-5 text-gray-50">제철: 봄-가을</p>
            <div className="bg-[#EFF6FF] py-[4px] px-[8px] inline-block mt-1">
              <span className="text-[#1E40AF] text-body-5">100 마리+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
