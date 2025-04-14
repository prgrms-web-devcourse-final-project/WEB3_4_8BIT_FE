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
    // 1. Presigned URL 요청
    const presignedUrlRequest: PresignedUrlRequest = {
      domain,
      uploadFileList: files.map((file) => ({
        originalFileName: file.name,
        fileSize: file.size,
        contentType: file.type,
      })),
    };

    const presignedResponse = await axiosInstance.post(
      "/storage/presigned-urls",
      presignedUrlRequest
    );

    const presignedUrls: PresignedUrl[] = presignedResponse.data.data;
    const uploadedFileIds: number[] = [];

    // 2. 각 파일을 Presigned URL에 업로드
    const uploadPromises = files.map(async (file, index) => {
      const { fileId, presignedUrl } = presignedUrls[index];

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

      uploadedFileIds.push(fileId);
    });

    await Promise.all(uploadPromises);

    // 3. 업로드 완료 처리
    await axiosInstance.post("/storage/presigned-urls/complete", {
      fileIdList: uploadedFileIds,
    });

    return uploadedFileIds;
  } catch (error) {
    console.error("❌ 이미지 업로드 중 오류:", error);
    throw error;
  }
};
