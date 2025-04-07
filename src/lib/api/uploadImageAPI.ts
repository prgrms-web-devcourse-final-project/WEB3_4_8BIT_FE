interface FileMeta {
    originalFileName: string;
    fileSize: number;
    contentType: string;
  }
  
  interface PresignedUrl {
    fileId: number;
    url: string;
  }
  
  export async function uploadImagesToS3(
    files: File[],
    domain = "post"
  ): Promise<number[]> {
    const fileMetas: FileMeta[] = files.map((file) => ({
      originalFileName: file.name,
      fileSize: file.size,
      contentType: file.type,
    }));
  
    const API_BASE_URL = "https://api.mikki.kr";
  
    // presigned URL 리스트 요청
    const presignedRes = await fetch(
      `${API_BASE_URL}/api/v1/storage/presigned-urls`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain,
          uploadFileList: fileMetas,
        }),
      }
    );
  
    if (!presignedRes.ok) {
      throw new Error("❌ presigned URL 요청 실패");
    }
  
    const json = await presignedRes.json();
  
    if (!json?.data || !Array.isArray(json.data)) {
      console.error("❌ presigned URL 응답 형식이 올바르지 않음:", json);
      throw new Error("presigned URL 응답 오류");
    }
  
    const presignedUrls: PresignedUrl[] = json.data;
  
    if (presignedUrls.length !== files.length) {
      throw new Error("❌ presigned URL 수와 파일 수가 일치하지 않음");
    }
  
    const uploadedFileIds: number[] = [];
  
    // 각 presigned URL로 이미지 PUT 업로드
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const { fileId, url } = presignedUrls[i];
  
      const uploadRes = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });
  
      if (uploadRes.ok) {
        uploadedFileIds.push(fileId);
      } else {
        console.error(`❌ ${file.name} 업로드 실패`);
      }
    }
  
    // 업로드 완료 처리 API 호출
    const completeRes = await fetch(
      `${API_BASE_URL}/api/v1/storage/presigned-urls/complete`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileIdList: uploadedFileIds }),
      }
    );
  
    if (!completeRes.ok) {
      throw new Error("❌ 업로드 완료 처리 실패");
    }
  
    return uploadedFileIds;
  }
  