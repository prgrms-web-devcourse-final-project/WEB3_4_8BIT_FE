import { axiosInstance } from "./axiosInstance";

interface PresignedUrl {
  fileId: number;
  fileName: string;
  presignedUrl: string;
}

interface PresignedUrlRequest {
  domain: string;
  uploadFileList: {
    originalFileName: string;
    fileSize: number;
    contentType: string;
  }[];
}

export const uploadImagesToS3 = async (files: File[], domain: string) => {
  try {
    console.log("📤 이미지 업로드 시작");
    console.log(
      "업로드할 파일 목록:",
      files.map((f) => ({ name: f.name, size: f.size, type: f.type }))
    );

    // 1. Presigned URL 요청
    const presignedUrlRequest: PresignedUrlRequest = {
      domain,
      uploadFileList: files.map((file) => ({
        originalFileName: file.name,
        fileSize: file.size,
        contentType: file.type,
      })),
    };

    console.log("1️⃣ Presigned URL 요청:", presignedUrlRequest);
    const presignedResponse = await axiosInstance.post(
      "/storage/presigned-urls",
      presignedUrlRequest
    );
    console.log("✅ Presigned URL 응답:", presignedResponse.data);

    const presignedUrls: PresignedUrl[] = presignedResponse.data.data;
    const uploadedFileIds: number[] = [];

    // 2. 각 파일을 Presigned URL에 업로드
    console.log("2️⃣ S3 업로드 시작");
    const uploadPromises = files.map(async (file, index) => {
      const { fileId, presignedUrl } = presignedUrls[index];
      console.log(`📁 파일 업로드 중: ${file.name}`);

      // 파일 업로드
      const response = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
          "Content-Length": file.size.toString(),
        },
      });

      if (!response.ok) {
        throw new Error(
          `파일 업로드 실패: ${file.name}, 상태: ${response.status}`
        );
      }

      console.log(`✅ 파일 업로드 완료: ${file.name}, ID: ${fileId}`);
      uploadedFileIds.push(fileId);
    });

    await Promise.all(uploadPromises);
    console.log("✅ 모든 파일 업로드 완료");

    // 3. 업로드 완료 처리
    console.log("3️⃣ 업로드 완료 처리 요청", { fileIdList: uploadedFileIds });
    await axiosInstance.post("/storage/presigned-urls/complete", {
      fileIdList: uploadedFileIds,
    });
    console.log("✅ 업로드 완료 처리 성공");

    return uploadedFileIds;
  } catch (error) {
    console.error("❌ 이미지 업로드 중 오류:", error);
    throw error;
  }
};
