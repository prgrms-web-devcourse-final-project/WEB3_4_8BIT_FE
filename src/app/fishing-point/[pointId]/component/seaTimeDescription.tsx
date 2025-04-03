export default function SeaTimeDescription() {
  return (
    <article className="w-full p-[16px] mt-[28px] bg-[#F9FAFB]">
      <div className="mb-[8px]">
        <h6 className="text-body-4 text-gray-30">물때 용어 설명</h6>
      </div>

      <ul className="text-body-4 text-gray-40 tracking-wide">
        <li>
          <p>
            • <strong className="text-[#2563EB]">초들물</strong>: 간조에서
            만조로 변하기 시작하는 초기 단계
          </p>
        </li>
        <li>
          <p>
            • <strong className="text-[#2563EB]">중들물</strong>: 간조에서
            만조로 변하는 중간 단계{" "}
          </p>
        </li>
        <li>
          <p>
            • <strong className="text-[#2563EB]">끝들물</strong>: 간조에서
            만조로 변하는 마지막 단계
          </p>
        </li>
        <li>
          <p>
            • <strong className="text-[#D97706]">초날물</strong>: 만조에서
            간조로 변하기 시작하는 초기 단계
          </p>
        </li>
        <li>
          <p>
            • <strong className="text-[#D97706]">중날물</strong>: 만조에서
            간조로 변하는 중간 단계
          </p>
        </li>
        <li>
          <p>
            • <strong className="text-[#D97706]">끝날물</strong>: 만조에서
            간조로 변하는 마지막 단계
          </p>
        </li>
      </ul>
    </article>
  );
}
