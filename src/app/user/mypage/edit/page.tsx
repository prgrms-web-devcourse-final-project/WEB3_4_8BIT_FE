"use client"
import type React from "react";
import {useEffect, useState} from "react";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Separator} from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {Upload} from "lucide-react";
import {UserAPI} from "@/lib/api/userAPI";
import {User} from "@/types/user.interface";
import { toast } from "sonner";

export default function Edit() {
  const [user, setUser] = useState<User | null>(null);
  const [nickname, setNickname] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [fileId, setFileId] = useState<number | undefined>(undefined);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userData = await UserAPI.getMemberInfo();
        setUser(userData);
        setNickname(userData.nickname || "");
        setDescription(userData.description || "");
        setFileId(userData.fileId);
      } catch (error) {
        console.error("사용자 정보 로딩 중 오류 발생:", error);
        toast.error("사용자 정보를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleSaveChanges = async () => {
    try {
      // 입력 검증
      if (nickname.trim() === "") {
        toast.error("닉네임을 입력해주세요.");
        return;
      }

      const userInput = {
        nickname: nickname.trim(),
        description: description.trim(),
        ...(fileId ? { fileId } : {})
      };

      const response = await UserAPI.patchMemberInfo(userInput);

      toast.success("프로필이 성공적으로 업데이트되었습니다.");

      // 선택적: 성공 후 사용자 데이터 새로고침
      const updatedUserData = await UserAPI.getMemberInfo();
      setUser(updatedUserData);
    } catch (error) {
      console.error("프로필 업데이트 중 오류 발생:", error);
      toast.error("프로필 업데이트에 실패했습니다.");
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO 동현님 여기 작업 부탁드리겠습니다.
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">프로필 수정</h1>
      <div className="text-gray-40">프로필 정보를 수정하여 다른 낚시 애호가들에게 나를 보여주세요.</div>
      <Card>
        <CardContent>
          {/* 프로필 이미지 섹션 */}
          <div className="flex flex-col items-center mb-7">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage
                src={user?.fileUrl || "/placeholder.svg?height=96&width=96"}
                alt={user?.nickname || "User"}
              />
              <AvatarFallback>이미지</AvatarFallback>
            </Avatar>
            <div className="mb-4 text-gray-40">권장 이미지 크기: 500x500 픽셀, 최대 5MB</div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="profile-image-upload"
              onChange={handleImageUpload}
            />
            <label htmlFor="profile-image-upload">
              <Button
                variant="outline"
                size="sm"
                as="span"
                className="cursor-pointer"
              >
                <Upload className="h-4 w-4 mr-2" /> 이미지 변경
              </Button>
            </label>
          </div>

          {/* 구분선 */}
          <div className="grid justify-items-center mb-10">
            <div className="w-5/7">
              <Separator />
            </div>
          </div>

          {/* 닉네임 섹션 */}
          <div className="flex justify-center mb-6">
            <div className="w-3/5 grid gap-3">
              <div>닉네임</div>
              <Input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임을 입력해주세요"
                maxLength={20} // 닉네임 길이 제한 추가
              />
              <div className="text-gray-40">다른 사용자에게 표시될 이름입니다. (최대 20자)</div>
            </div>
          </div>

          {/* 자기소개 섹션 */}
          <div className="flex justify-center">
            <div className="w-3/5 grid gap-3">
              <div>자기소개</div>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="낚시에 대한 열정, 좋아하는 낚시 방식, 혹은 자신만의 이야기를 간단히 소개해주세요."
                rows={4}
                maxLength={300} // 자기소개 길이 제한 추가
              />
              <div className="text-gray-40">
                다른 사용자들에게 보여질 자기소개입니다.
                ({description.length}/300)
              </div>
            </div>
          </div>
        </CardContent>

        {/* 푸터 버튼 */}
        <CardFooter className="flex justify-end gap-4">
          <Button variant="outline">취소</Button>
          <Button
            onClick={handleSaveChanges}
            disabled={nickname.trim() === ""}
          >
            변경사항 저장
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}