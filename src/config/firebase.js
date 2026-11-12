import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Thay thế các giá trị bên dưới bằng firebaseConfig bạn đã lưu ở Bước 3
const firebaseConfig = {
    apiKey: "AIzaSyDZt6b4aZqj2qBy-S-hmw6pTZyjdrO5iJ4",
    authDomain: "danentang-fd9df.firebaseapp.com",
    projectId: "danentang-fd9df",
    storageBucket: "danentang-fd9df.firebasestorage.app",
    messagingSenderId: "1015850605107",
    appId: "1:1015850605107:web:24d0787a3259c09c3f6146",
    measurementId: "G-T63NG0GKTC"
};

// Khởi tạo Firebase App (ngăn chặn khởi tạo trùng lặp khi Hot Reload)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Khởi tạo Cơ sở dữ liệu Firestore và Dịch vụ xác thực Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;