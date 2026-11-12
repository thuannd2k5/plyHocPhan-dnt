import { Platform } from "react-native";

export const CLOUDINARY_CONFIG = {
  cloudName: "duaazzcqd",
  uploadPreset: "qlhocphan_preset",
};

/**
 * Hàm upload ảnh đa nền tảng (chạy được cả trên Web và iPhone/Android)
 * Hỗ trợ phương thức Base64 JSON (chuẩn nhất cho iOS để không bị lỗi FormData)
 * @param {string} fileData - Dữ liệu ảnh (chuỗi base64 hoặc đường dẫn uri)
 * @param {boolean} isBase64 - Cờ báo hiệu nếu là chuỗi base64
 * @returns {Promise<string>} - Trả về link ảnh online HTTPS
 */
export async function uploadImageToCloudinary(fileData, isBase64 = false) {
  if (!fileData) return "";

  const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`;

  // PHƯƠNG THỨC 1: Upload qua JSON Base64 (Tương thích 100% iOS, Android và Web, không bị lỗi FormData)
  if (isBase64 || fileData.startsWith("data:image")) {
    const base64String = fileData.startsWith("data:image")
      ? fileData
      : `data:image/jpeg;base64,${fileData}`;

    const res = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file: base64String,
        upload_preset: CLOUDINARY_CONFIG.uploadPreset,
      }),
    });

    const data = await res.json();
    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error(data.error?.message || "Lỗi khi upload ảnh lên Cloudinary");
    }
  }

  // PHƯƠNG THỨC 2: Nền tảng Web với URI Blob
  if (Platform.OS === "web") {
    const formData = new FormData();
    formData.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);
    const response = await fetch(fileData);
    const blob = await response.blob();
    formData.append("file", blob);

    const res = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error(data.error?.message || "Lỗi khi upload ảnh lên Cloudinary");
    }
  }

  // PHƯƠNG THỨC 3: Fallback FormData
  const formData = new FormData();
  formData.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);
  const filename = fileData.split("/").pop() || "upload.jpg";
  formData.append("file", {
    uri: fileData,
    name: filename,
    type: "image/jpeg",
  });

  const res = await fetch(uploadUrl, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (data.secure_url) {
    return data.secure_url;
  } else {
    throw new Error(data.error?.message || "Lỗi khi upload ảnh lên Cloudinary");
  }
}
