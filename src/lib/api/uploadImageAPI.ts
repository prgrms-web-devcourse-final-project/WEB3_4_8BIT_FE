interface FileMeta {
  originalFileName: string;
  fileSize: number;
  contentType: string;
}

interface PresignedUrl {
  fileId: number;
  fileName: string;
  presignedUrl: string;
}

export async function uploadImagesToS3(
  files: File[],
  domain = "post"
): Promise<number[]> {
  const API_BASE_URL = "https://api.mikki.kr";

  const accessToken =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiYXV0aCI6IlVTRVIiLCJlbWFpbCI6ImNqMjE3NEBuYXZlci5jb20iLCJpYXQiOjE3NDQwMzE3MzQsImV4cCI6MTc0NDAzNTMzNH0.aMe0XkalWqVNPV3DqObQcejL26oNRRmfwEIkDY1XXnC7PmqEfiERBZeYmWRfVK8JjcoeaR6MbV5GyS1VrvBkxw";

  if (!accessToken) {
    console.error("❌ accessToken이 존재하지 않습니다.");
    throw new Error("accessToken이 없습니다. 로그인 후 다시 시도해주세요.");
  }

  const fileMetas: FileMeta[] = files.map((file) => ({
    originalFileName: file.name,
    fileSize: file.size,
    contentType: file.type,
  }));

  console.log("✅ 요청 body:", { domain, uploadFileList: fileMetas });

  try {
    // Step 1: presigned URL 요청
    const presignedRes = await fetch(
      `${API_BASE_URL}/api/v1/storage/presigned-urls`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify({ domain, uploadFileList: fileMetas }),
      }
    );

    if (!presignedRes.ok) {
      const err = await presignedRes.text();
      console.error("❌ presigned URL 요청 실패:", presignedRes.status, err);
      throw new Error("presigned URL 요청 실패");
    }

    const json = await presignedRes.json();

    if (!json?.data || !Array.isArray(json.data)) {
      throw new Error("presigned URL 응답 오류: 예상치 못한 형식");
    }

    const presignedUrls: PresignedUrl[] = json.data;
    const uploadedFileIds: number[] = [];

    // Step 2: S3에 이미지 PUT 업로드
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const { fileId, presignedUrl } = presignedUrls[i];

      console.log(`🔄 S3 업로드 시작: ${file.name}`);
      try {
        const uploadRes = await fetch(presignedUrl, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
          mode: "cors",
        });

        if (uploadRes.ok) {
          console.log(`✅ ${file.name} 업로드 성공`);
          uploadedFileIds.push(fileId);
        } else {
          const errMsg = await uploadRes.text();
          console.warn(`⚠️ ${file.name} 업로드 실패:`, errMsg);
        }
      } catch (err) {
        console.error(`❌ ${file.name} 업로드 중 오류:`, err);
        console.warn("➡️ S3 CORS 정책 문제일 수 있습니다.");
      }
    }

    // Step 3: 업로드 완료 처리
    const completeRes = await fetch(
      `${API_BASE_URL}/api/v1/storage/presigned-urls/complete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify({ fileIdList: uploadedFileIds }),
      }
    );

    if (!completeRes.ok) {
      const err = await completeRes.text();
      console.error("❌ 업로드 완료 처리 실패:", completeRes.status, err);
      throw new Error("업로드 완료 처리 실패");
    }

    console.log("🎉 업로드 완료 처리 성공");
    return uploadedFileIds;
  } catch (error) {
    console.error("❌ 이미지 업로드 중 전체 오류:", error);
    throw error;
  }
}
