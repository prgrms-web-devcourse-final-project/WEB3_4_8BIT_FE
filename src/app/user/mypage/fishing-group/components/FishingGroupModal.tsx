import {Calendar1, Check, Users, X} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import Modal from "@/components/Modal";
import React, {useState} from "react";
import {UserWrittenGroupFishing} from "@/types/user.interface";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {UserAPI} from "@/lib/api/userAPI";
import {
  getParticipants,
  ParticipantInfo,
  patchAcceptParticipant,
  patchRefuseParticipant
} from "@/lib/api/fishingTripRecruitmentAPI";

interface FishingGroupModalProps {
  data : UserWrittenGroupFishing;
  isAuthor : boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function FishingGroupModal({ data, isAuthor, isOpen, setIsOpen }: FishingGroupModalProps) {
  const { data: approvedUsers, isSuccess: isApprovedSuccess } = useQuery<ParticipantInfo[]>({
    queryKey: ['participants', 'APPROVED'],
    queryFn: () => getParticipants(data.fishingTripPostId, 'APPROVED'),
  });

  const { data: pendingUsers, isSuccess: isPendingSuccess } = useQuery<ParticipantInfo[]>({
    queryKey: ['participants', 'PENDING'],
    queryFn: () => getParticipants(data.fishingTripPostId, 'PENDING'),
  });

  const { data: rejectedUsers, isSuccess: isRejectedSuccess } = useQuery<ParticipantInfo[]>({
    queryKey: ['participants', 'REJECTED'],
    queryFn: () => getParticipants(data.fishingTripPostId, 'REJECTED'),
  });

  const queryClient = useQueryClient();

  const mutationReject = useMutation({
    mutationFn : (recruitmentId : number) => {
      return patchRefuseParticipant(recruitmentId)
    },
    onSuccess : () => {
      queryClient.invalidateQueries({ queryKey: ['participants'] })
    }
  })

  const mutationAccept = useMutation({
    mutationFn : (recruitmentId : number) => {
      return patchAcceptParticipant(recruitmentId)
    },
    onSuccess : () => {
      queryClient.invalidateQueries({ queryKey: ['participants'] })
    }
  })

  const handleAccept = (id: number) => {
    mutationAccept.mutate(id);
  };

  const handleReject = (id : number) => {
    mutationReject.mutate(id);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="mb-[8px]">
        <h5 className="text-title-4 mb-[4px]">참여자 관리</h5>
        <div className="flex items-center gap-2 text-gray-50">
          <Calendar1 className="w-[14px] h-[14px]" />
          <span className="text-body-2 text-body-4">
            {data.subject}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-50">
          <Users className="w-[14px] h-[14px]" />
          <span className="text-body-2 text-body-4">참여자 {data.currentCount}/{data.recruitmentCount}명</span>
        </div>
      </div>

      <Tabs defaultValue="waiting" className="w-full">
        <TabsList>
          <TabsTrigger value="waiting">
            대기 중({pendingUsers?.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            승인됨({approvedUsers?.length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            거절됨({rejectedUsers?.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="waiting">
          <div className="flex flex-col gap-4 p-[16px] h-[439px] overflow-y-auto">
            {pendingUsers?.map((user) => (
                <div
                  key={user.fishingTripRecruitmentId}
                  className="flex justify-between gap-2 border border-amber-200 rounded-[8px] p-[16px]"
                >
                  <div>
                    <div className="w-[40px] h-[40px] bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="flex flex-col w-[80%]">
                    <div className="flex items-center gap-4">
                      <h6 className=" text-gray-30 text-title-5">
                        {user.nickname}
                      </h6>
                      <Badge
                        variant="outline"
                        className="bg-amber-200 text-amber-800 border-none"
                      >
                        대기중
                      </Badge>
                    </div>
                    <p className="text-body-4 text-gray-50">
                      경험: {user.fishingLevel}
                    </p>
                    <p className="text-body-4 text-gray-30 mb-[4px]">
                      {user.introduction}
                    </p>
                    <p className="text-body-5 text-gray-50">
                      신청일: {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2 w-[76px]">
                    {isAuthor && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-white bg-[#16A34A] gap-3 cursor-pointer"
                          onClick={() => handleAccept(user.fishingTripRecruitmentId)}
                        >
                          <Check className="w-[14px] h-[14px]" />
                          승인
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-[#dd4e4e] border-[#FEDDDD] cursor-pointer"
                          onClick={() => handleReject(user.fishingTripRecruitmentId)}
                        >
                          <X className="w-[14px] h-[14px]" />
                          거절
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="approved">
          <div className="flex flex-col gap-4 p-[16px] h-[439px] overflow-y-auto">
            {approvedUsers?.map((user) => (
                <div
                  key={user.fishingTripRecruitmentId}
                  className="flex justify-between gap-2 border border-[#DCFCE7] rounded-[8px] p-[16px]"
                >
                  <div>
                    <div className="w-[40px] h-[40px] bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="flex flex-col w-[80%]">
                    <div className="flex items-center gap-4">
                      <h6 className=" text-gray-30 text-title-5">
                        {user.nickname}
                      </h6>
                      <Badge
                        variant="outline"
                        className="bg-[#DCFCE7] text-[#166534] border-none"
                      >
                        승인됨
                      </Badge>
                    </div>
                    <p className="text-body-4 text-gray-50">
                      경험: {user.fishingLevel}
                    </p>
                    <p className="text-body-4 text-gray-30 mb-[4px]">
                      {user.introduction}
                    </p>
                    <p className="text-body-5 text-gray-50">
                      신청일: {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="w-[76px]">
                    {isAuthor && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-[#dd4e4e] border-[#FEDDDD] gap-3 cursor-pointer"
                        onClick={() => handleReject(user.fishingTripRecruitmentId)}
                      >
                        승인 취소
                      </Button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="rejected">
          <div className="flex flex-col gap-4 p-[16px] h-[439px] overflow-y-auto">
            {rejectedUsers?.map((user) => (
              <div
                key={user.fishingTripRecruitmentId}
                className="flex justify-between gap-2 border border-[#FEE2E2] rounded-[8px] p-[16px]"
              >
                <div>
                  <div className="w-[40px] h-[40px] bg-gray-200 rounded-full"></div>
                </div>
                <div className="flex flex-col w-[80%]">
                  <div className="flex items-center gap-4">
                    <h6 className=" text-gray-30 text-title-5">
                      {user.nickname}
                    </h6>
                    <Badge
                      variant="outline"
                      className="bg-[#FEE2E2] text-[#B91C1C] border-none"
                    >
                      거절됨
                    </Badge>
                  </div>
                  <p className="text-body-4 text-gray-50">
                    경험: {user.fishingLevel}
                  </p>
                  <p className="text-body-4 text-gray-30 mb-[4px]">
                    {user.introduction}
                  </p>
                  <p className="text-body-5 text-gray-50">
                    신청일: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="w-[76px]">
                  {isAuthor && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-gray-40 border-gray-70 gap-3 cursor-pointer"
                      onClick={() => handleAccept(user.fishingTripRecruitmentId)}
                    >
                      다시 승인
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Modal>
  )
}