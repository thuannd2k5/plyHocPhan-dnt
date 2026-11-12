import { Platform } from "react-native";

export const CLOUDINARY_CONFIG = {
    cloudName: "duaazzcqd",
    uploadPreset: "qlhocphan_preset",
};

/**
 * Hàm upload ảnh đa nền tảng (chạy được cả trên Web và iPhone/Android)
 * @param {string} uri - Đường dẫn ảnh được chọn từ thư viện
 * @returns {Promise<string>} - Trả về link ảnh online (https://res.cloudinary.com/...)
 */
export async function uploadImageToCloudinary(uri) {
    if (!uri) return "";

    const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`;
    const formData = new FormData();
    formData.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);

    if (Platform.OS === "web") {
        // Trên nền tảng WEB: Chuyển đường dẫn blob sang đối tượng Blob chuẩn của trình duyệt
        const response = await fetch(uri);
        const blob = await response.blob();
        formData.append("file", blob);
    } else {
        // Trên nền tảng DI ĐỘNG (iOS / Android): Đóng gói file object theo chuẩn React Native
        const filename = uri.split("/").pop() || "upload.jpg";
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image/jpeg`;
        formData.append("file", {
            uri: Platform.OS === "ios" ? uri.replace("file://", "") : uri,
            name: filename,
            type: type,
        });
    }

    // Gửi request POST lên Cloudinary
    const res = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
    });

    const data = await res.json();
    if (data.secure_url) {
        return data.secure_url; // Link ảnh HTTPS an toàn để lưu vào Firestore
    } else {
        throw new Error(data.error?.message || "Lỗi khi upload ảnh lên Cloudinary");
    }
}