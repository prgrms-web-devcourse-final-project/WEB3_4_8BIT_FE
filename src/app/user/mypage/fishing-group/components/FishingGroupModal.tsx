import { Calendar1, Check, Users, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal";
import React, { useState } from "react";
import { UserWrittenGroupFishing } from "@/types/user.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserAPI } from "@/lib/api/userAPI";
import {
  getParticipants,
  ParticipantInfo,
  patchAcceptParticipant,
  patchRefuseParticipant,
} from "@/lib/api/fishingTripRecruitmentAPI";

interface FishingGroupModalProps {
  data: UserWrittenGroupFishing;
  isAuthor: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function FishingGroupModal({
  data,
  isAuthor,
  isOpen,
  setIsOpen,
}: FishingGroupModalProps) {
  const { data: approvedUsers, isSuccess: isApprovedSuccess } = useQuery<
    ParticipantInfo[]
  >({
    queryKey: ["participants", "APPROVED"],
    queryFn: () => getParticipants(data.fishingTripPostId, "APPROVED"),
  });

  const { data: pendingUsers, isSuccess: isPendingSuccess } = useQuery<
    ParticipantInfo[]
  >({
    queryKey: ["participants", "PENDING"],
    queryFn: () => getParticipants(data.fishingTripPostId, "PENDING"),
  });

  const { data: rejectedUsers, isSuccess: isRejectedSuccess } = useQuery<
    ParticipantInfo[]
  >({
    queryKey: ["participants", "REJECTED"],
    queryFn: () => getParticipants(data.fishingTripPostId, "REJECTED"),
  });

  const queryClient = useQueryClient();

  const mutationReject = useMutation({
    mutationFn: (recruitmentId: number) => {
      return patchRefuseParticipant(recruitmentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participants"] });
    },
  });

  const mutationAccept = useMutation({
    mutationFn: (recruitmentId: number) => {
      return patchAcceptParticipant(recruitmentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participants"] });
    },
  });

  const handleAccept = (id: number) => {
    mutationAccept.mutate(id);
  };

  const handleReject = (id: number) => {
    mutationReject.mutate(id);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h5 className="text-xl font-semibold">참여자 관리</h5>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar1 className="w-4 h-4" />
              <span className="text-sm">{data.subject}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-4 h-4" />
              <span className="text-sm">
                참여자 {data.currentCount}/{data.recruitmentCount}명
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="waiting" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="waiting">
              대기 중({pendingUsers?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="approved">
              승인됨({approvedUsers?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              거절됨({rejectedUsers?.length || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="waiting" className="mt-4">
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {pendingUsers?.map((user) => (
                <div
                  key={user.fishingTripRecruitmentId}
                  className="flex items-start gap-4 p-4 border border-amber-200 rounded-lg bg-amber-50"
                >
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h6 className="font-medium text-gray-900">
                        {user.nickname}
                      </h6>
                      <Badge
                        variant="outline"
                        className="bg-amber-200 text-amber-800 border-none"
                      >
                        대기중
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      경험: {user.fishingLevel}
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      {user.introduction}
                    </p>
                    <p className="text-xs text-gray-500">
                      신청일: {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {isAuthor && (
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-white bg-green-600 hover:bg-green-700 gap-1"
                        onClick={() =>
                          handleAccept(user.fishingTripRecruitmentId)
                        }
                      >
                        <Check className="w-4 h-4" />
                        승인
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-200 hover:bg-red-50 gap-1"
                        onClick={() =>
                          handleReject(user.fishingTripRecruitmentId)
                        }
                      >
                        <X className="w-4 h-4" />
                        거절
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="approved" className="mt-4">
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {approvedUsers?.map((user) => (
                <div
                  key={user.fishingTripRecruitmentId}
                  className="flex items-start gap-4 p-4 border border-green-200 rounded-lg bg-green-50"
                >
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h6 className="font-medium text-gray-900">
                        {user.nickname}
                      </h6>
                      <Badge
                        variant="outline"
                        className="bg-green-200 text-green-800 border-none"
                      >
                        승인됨
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      경험: {user.fishingLevel}
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      {user.introduction}
                    </p>
                    <p className="text-xs text-gray-500">
                      신청일: {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {isAuthor && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50 gap-1 flex-shrink-0"
                      onClick={() =>
                        handleReject(user.fishingTripRecruitmentId)
                      }
                    >
                      <X className="w-4 h-4" />
                      승인 취소
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rejected" className="mt-4">
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {rejectedUsers?.map((user) => (
                <div
                  key={user.fishingTripRecruitmentId}
                  className="flex items-start gap-4 p-4 border border-red-200 rounded-lg bg-red-50"
                >
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h6 className="font-medium text-gray-900">
                        {user.nickname}
                      </h6>
                      <Badge
                        variant="outline"
                        className="bg-red-200 text-red-800 border-none"
                      >
                        거절됨
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      경험: {user.fishingLevel}
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      {user.introduction}
                    </p>
                    <p className="text-xs text-gray-500">
                      신청일: {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {isAuthor && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-600 border-green-200 hover:bg-green-50 gap-1 flex-shrink-0"
                      onClick={() =>
                        handleAccept(user.fishingTripRecruitmentId)
                      }
                    >
                      <Check className="w-4 h-4" />
                      다시 승인
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Modal>
  );
}
