import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full h-[90px] bg-[rgba(0,0,0,0.6)] backdrop-blur-[6px] flex items-center justify-between fixed top-0 left-0 right-0 z-9999999">
      <div className="w-[1280px] h-full mx-auto flex items-center justify-between">
        {/* 헤더 왼쪽 */}
        <div className="flex items-center justify-between">
          <div className="mr-[65px]">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={170}
              height={46}
              className="w-auto h-auto"
            />
          </div>
          <nav>
            <ul className="flex gap-[51px]">
              <li className="text-[24px] text-[#fff] font-semibold">menu1</li>
              <li className="text-[24px] text-[#fff] font-semibold">menu2</li>
              <li className="text-[24px] text-[#fff] font-semibold">menu3</li>
              <li className="text-[24px] text-[#fff] font-semibold">menu4</li>
              <li className="text-[24px] text-[#fff] font-semibold">menu5</li>
            </ul>
          </nav>
        </div>

        {/* 헤더 오른쪽 */}
        <div>
          <strong className="text-[#fff] text-[24px] font-semibold">
            강태공님
          </strong>
        </div>
      </div>
    </header>
  );
}
