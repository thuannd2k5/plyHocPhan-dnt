import { auth } from "../config/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

/**
 * Đăng nhập Quản trị viên bằng Email và Password
 */
export async function loginAdmin(email, password) {
    const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
    return userCredential.user;
}

/**
 * Đăng xuất Quản trị viên
 */
export async function logoutAdmin() {
    await signOut(auth);
}