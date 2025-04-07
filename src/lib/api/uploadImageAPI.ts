interface FileMeta {
  originalFileName: string;
  fileSize: number;
  contentType: string;
}

interface PresignedUrl {
  fileId: number;
  url: string;
}

/**
 * S3 이미지 업로드 함수
 * @param files - 업로드할 파일 배열
 * @param domain - 업로드 도메인 (기본: "post")
 * @returns fileId 리스트
 */
export async function uploadImagesToS3(
  files: File[],
  domain = "post"
): Promise<number[]> {
  const API_BASE_URL = "https://api.mikki.kr";

  // ✅ localStorage에서 accessToken 가져오기
  const accessToken =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiYXV0aCI6IlVTRVIiLCJlbWFpbCI6ImNqMjE3NEBuYXZlci5jb20iLCJpYXQiOjE3NDQwMDU1MTQsImV4cCI6MTc0NDAwOTExNH0.RcZUHw1QXfhRh0Fik2LprZ719xSOaKMQHTgUahgokKWh7733AldZKsnS-zAW4iveY8TM1IxWMUR6vWvy1uXLRA";

  if (!accessToken) {
    console.error("❌ accessToken이 존재하지 않습니다.");
    throw new Error("accessToken이 없습니다. 로그인 후 다시 시도해주세요.");
  }

  const fileMetas: FileMeta[] = files.map((file) => ({
    originalFileName: file.name,
    fileSize: file.size,
    contentType: file.type,
  }));

  // 1. Presigned URL 요청
  const presignedRes = await fetch(
    `${API_BASE_URL}/api/v1/storage/presigned-urls`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        domain,
        uploadFileList: fileMetas,
      }),
    }
  );

  if (!presignedRes.ok) {
    const err = await presignedRes.text();
    console.error("❌ presigned URL 요청 실패:", presignedRes.status, err);
    throw new Error("presigned URL 요청 실패");
  }

  const json = await presignedRes.json();

  if (!json?.data || !Array.isArray(json.data)) {
    console.error("❌ presigned URL 응답 형식 오류:", json);
    throw new Error("presigned URL 응답 오류");
  }

  const presignedUrls: PresignedUrl[] = json.data;
  const uploadedFileIds: number[] = [];

  // 2. 이미지 업로드
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const { fileId, url } = presignedUrls[i];

    const uploadRes = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (uploadRes.ok) {
      uploadedFileIds.push(fileId);
    } else {
      console.error(`❌ ${file.name} 업로드 실패`);
    }
  }

  // 3. 업로드 완료 처리
  const completeRes = await fetch(
    `${API_BASE_URL}/api/v1/storage/presigned-urls/complete`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ fileIdList: uploadedFileIds }),
    }
  );

  if (!completeRes.ok) {
    const err = await completeRes.text();
    console.error("❌ 업로드 완료 처리 실패:", completeRes.status, err);
    throw new Error("업로드 완료 처리 실패");
  }

  return uploadedFileIds;
}
