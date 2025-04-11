import {Calendar1, Check, Users, X} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import Modal from "@/components/Modal";
import React, {useState} from "react";

const userInfo = [
  {
    id: 1,
    name: "김옥지",
    experience: "중급",
    description: "기장에서 거주하고 있습니다. 같이 가고 싶어요",
    applyDate: "2025-04-05",
    status: "approved",
  },
  {
    id: 2,
    name: "강태공",
    experience: "초급",
    description:
      "서울에 사는 30살 중반입니다. 매번 꽝치다가 이번 기회에 제대로 배우고 싶어요.",
    applyDate: "2025-04-05",
    status: "waiting",
  },
  {
    id: 3,
    name: "빵빵이",
    experience: "초급",
    description: "초보자 친구들 모여서 같이 가고 싶어요",
    applyDate: "2025-04-05",
    status: "waiting",
  },
  {
    id: 4,
    name: "김노엠",
    experience: "고급",
    description: "낚시 경력 30년, 초보자 친구들 모여서 같이 가고 싶어요",
    applyDate: "2025-04-05",
    status: "waiting",
  },
  {
    id: 5,
    name: "이돈돈",
    experience: "중금",
    description: "선상낚시와 갯바위 찌낚시를 주력으로 하고 있습니다.",
    applyDate: "2025-04-05",
    status: "rejected",
  },
  {
    id: 6,
    name: "제갈제니",
    experience: "고급",
    description: "낚시 경력 30년, 초보자 친구들 모여서 같이 가고 싶어요",
    applyDate: "2025-04-05",
    status: "waiting",
  },
];

interface FishingGroupModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function FishingGroupModal({ isOpen, setIsOpen }: FishingGroupModalProps) {
  const [userInfoData, setUserInfoData] = useState(userInfo);

  const formatStatus = (status: "waiting" | "approved" | "rejected") => {
    if (status === "waiting") {
      return "대기 중";
    } else if (status === "approved") {
      return "승인됨";
    } else if (status === "rejected") {
      return "거절됨";
    }
  };

  const handleChangeTab = (data: any, status: string) => {
    setUserInfoData((prevUsers) => {
      return prevUsers.map((user) =>
        user.id === data.id ? { ...user, status: status } : user
      );
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="mb-[8px]">
        <h5 className="text-title-4 mb-[4px]">참여자 관리</h5>
        <div className="flex items-center gap-2 text-gray-50">
          <Calendar1 className="w-[14px] h-[14px]" />
          <span className="text-body-2 text-body-4">
              기장 학리 방파제 감성돔 낚시 모임
            </span>
        </div>
        <div className="flex items-center gap-2 text-gray-50">
          <Users className="w-[14px] h-[14px]" />
          <span className="text-body-2 text-body-4">참여자 4/6명</span>
        </div>
      </div>

      <Tabs defaultValue="waiting" className="w-full">
        <TabsList>
          <TabsTrigger value="waiting">
            대기 중(
            {userInfoData.filter((user) => user.status === "waiting").length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            승인됨(
            {userInfoData.filter((user) => user.status === "approved").length}
            )
          </TabsTrigger>
          <TabsTrigger value="rejected">
            거절됨(
            {userInfoData.filter((user) => user.status === "rejected").length}
            )
          </TabsTrigger>
        </TabsList>
        <TabsContent value="waiting">
          <div className="flex flex-col gap-4 p-[16px] h-[439px] overflow-y-auto">
            {userInfoData
              .filter((user) => user.status === "waiting")
              .map((user) => (
                <div
                  key={user.id}
                  className="flex justify-between gap-2 border border-amber-200 rounded-[8px] p-[16px]"
                >
                  <div>
                    <div className="w-[40px] h-[40px] bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="flex flex-col w-[80%]">
                    <div className="flex items-center gap-4">
                      <h6 className=" text-gray-30 text-title-5">
                        {user.name}
                      </h6>
                      <Badge
                        variant="outline"
                        className="bg-amber-200 text-amber-800 border-none"
                      >
                        {formatStatus(
                          user.status as "waiting" | "approved" | "rejected"
                        )}
                      </Badge>
                    </div>
                    <p className="text-body-4 text-gray-50">
                      경험: {user.experience}
                    </p>
                    <p className="text-body-4 text-gray-30 mb-[4px]">
                      {user.description}
                    </p>
                    <p className="text-body-5 text-gray-50">
                      신청일: {user.applyDate}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-white bg-[#16A34A] gap-3"
                      onClick={() => handleChangeTab(user, "approved")}
                    >
                      <Check className="w-[14px] h-[14px]" />
                      승인
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-[#dd4e4e] border-[#FEDDDD]"
                      onClick={() => handleChangeTab(user, "rejected")}
                    >
                      <X className="w-[14px] h-[14px]" />
                      거절
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="approved">
          <div className="flex flex-col gap-4 p-[16px] h-[439px] overflow-y-auto">
            {userInfoData
              .filter((user) => user.status === "approved")
              .map((user) => (
                <div
                  key={user.id}
                  className="flex justify-between gap-2 border border-[#DCFCE7] rounded-[8px] p-[16px]"
                >
                  <div>
                    <div className="w-[40px] h-[40px] bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="flex flex-col w-[80%]">
                    <div className="flex items-center gap-4">
                      <h6 className=" text-gray-30 text-title-5">
                        {user.name}
                      </h6>
                      <Badge
                        variant="outline"
                        className="bg-[#DCFCE7] text-[#166534] border-none"
                      >
                        {formatStatus(
                          user.status as "waiting" | "approved" | "rejected"
                        )}
                      </Badge>
                    </div>
                    <p className="text-body-4 text-gray-50">
                      경험: {user.experience}
                    </p>
                    <p className="text-body-4 text-gray-30 mb-[4px]">
                      {user.description}
                    </p>
                    <p className="text-body-5 text-gray-50">
                      신청일: {user.applyDate}
                    </p>
                  </div>
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-[#dd4e4e] border-[#FEDDDD] gap-3"
                      onClick={() => handleChangeTab(user, "waiting")}
                    >
                      승인 취소
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="rejected">
          <div className="flex flex-col gap-4 p-[16px] h-[439px] overflow-y-auto">
            {userInfoData
              .filter((user) => user.status === "rejected")
              .map((user) => (
                <div
                  key={user.id}
                  className="flex justify-between gap-2 border border-[#FEE2E2] rounded-[8px] p-[16px]"
                >
                  <div>
                    <div className="w-[40px] h-[40px] bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="flex flex-col w-[80%]">
                    <div className="flex items-center gap-4">
                      <h6 className=" text-gray-30 text-title-5">
                        {user.name}
                      </h6>
                      <Badge
                        variant="outline"
                        className="bg-[#FEE2E2] text-[#B91C1C] border-none"
                      >
                        {formatStatus(
                          user.status as "waiting" | "approved" | "rejected"
                        )}
                      </Badge>
                    </div>
                    <p className="text-body-4 text-gray-50">
                      경험: {user.experience}
                    </p>
                    <p className="text-body-4 text-gray-30 mb-[4px]">
                      {user.description}
                    </p>
                    <p className="text-body-5 text-gray-50">
                      신청일: {user.applyDate}
                    </p>
                  </div>
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-gray-40 border-gray-70 gap-3"
                      onClick={() => handleChangeTab(user, "waiting")}
                    >
                      다시 승인
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </Modal>
  )
}