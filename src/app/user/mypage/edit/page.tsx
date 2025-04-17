"use client";
import type React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";
import { UserAPI } from "@/lib/api/userAPI";
import { User } from "@/types/user.interface";
import { toast } from "sonner";
import { uploadImagesToS3 } from "@/lib/api/uploadImageAPI";

export default function Edit() {
  const [user, setUser] = useState<User | null>(null);
  const [nickname, setNickname] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [fileId, setFileId] = useState<number | undefined>(undefined);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isImageChanged, setIsImageChanged] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const userData = await UserAPI.getMemberInfo();
        setUser(userData);
        setNickname(userData.nickname || "");
        setDescription(userData.description || "");
        setFileId(userData.fileId);
      } catch (error) {
        console.error("사용자 정보 로딩 중 오류 발생:", error);
        toast.error("사용자 정보를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
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

      setIsLoading(true);

      // 이미지가 변경된 경우 업로드
      let newFileId = fileId;
      if (isImageChanged && selectedFile) {
        const uploadedFileIds = await uploadImagesToS3(
          [selectedFile],
          "profile"
        );
        if (uploadedFileIds && uploadedFileIds.length > 0) {
          newFileId = uploadedFileIds[0];
        }
      }

      const userInput = {
        nickname: nickname.trim(),
        description: description.trim(),
        ...(newFileId ? { fileId: newFileId } : {}),
      };

      await UserAPI.patchMemberInfo(userInput);

      toast.success("프로필이 성공적으로 업데이트되었습니다.");

      // 성공 후 사용자 데이터 새로고침
      const updatedUserData = await UserAPI.getMemberInfo();
      setUser(updatedUserData);

      // 상태 초기화
      setPreviewImage(null);
      setSelectedFile(null);
      setIsImageChanged(false);
    } catch (error) {
      console.error("프로필 업데이트 중 오류 발생:", error);
      toast.error("프로필 업데이트에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const file = event.target.files[0];

      // 파일 크기 검증 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("파일 크기는 5MB를 초과할 수 없습니다.");
        return;
      }

      // 파일 타입 검증
      if (!file.type.startsWith("image/")) {
        toast.error("이미지 파일만 업로드 가능합니다.");
        return;
      }

      // 미리보기 이미지 설정
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      // 선택된 파일 저장
      setSelectedFile(file);
      setIsImageChanged(true);

    } catch (error) {
      console.error("이미지 선택 중 오류 발생:", error);
      toast.error("이미지 선택에 실패했습니다.");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">프로필 수정</h1>
      <div className="text-gray-40">
        프로필 정보를 수정하여 다른 낚시 애호가들에게 나를 보여주세요.
      </div>
      <Card>
        <CardContent>
          {/* 프로필 이미지 섹션 */}
          <div className="flex flex-col items-center mb-7">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage
                src={
                  previewImage ||
                  user?.fileUrl ||
                  "/placeholder.svg?height=96&width=96"
                }
                alt={user?.nickname || "User"}
              />
              <AvatarFallback>이미지</AvatarFallback>
            </Avatar>
            <div className="mb-4 text-gray-40">
              권장 이미지 크기: 500x500 픽셀, 최대 5MB
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="profile-image-upload"
              onChange={handleImageUpload}
            />
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              disabled={isLoading}
              onClick={() =>
                document.getElementById("profile-image-upload")?.click()
              }
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  업로드 중...
                </span>
              ) : (
                <span className="flex items-center">
                  <Upload className="h-4 w-4 mr-2" /> 이미지 변경
                </span>
              )}
            </Button>
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
              <div className="text-gray-40">
                다른 사용자에게 표시될 이름입니다. (최대 20자)
              </div>
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
                다른 사용자들에게 보여질 자기소개입니다. ({description.length}
                /300)
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
            className="cursor-pointer"
          >
            변경사항 저장
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
