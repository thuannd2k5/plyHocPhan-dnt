import { db } from "../config/firebase";
import {
    collection,
    getDocs,
    getDoc,
    doc,
    setDoc,
    deleteDoc,
    updateDoc
} from "firebase/firestore";

const COLLECTION_NAME = "GiangVien";

/**
 * Lấy toàn bộ danh sách Giảng viên từ Firestore
 */
export async function getAllGiangVien() {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const list = [];
    querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        list.push({
            _docId: docSnap.id,
            // ĐÚNG 4 TRƯỜNG DỮ LIỆU ĐỀ THI YÊU CẦU:
            IDGV: String(data.IDGV || ""),
            Fullname: String(data.Fullname || ""),
            Image: String(data.Image || ""),
            SumClass: Number(data.SumClass || 0),
        });
    });
    return list;
}

/**
 * Thêm mới một Giảng viên vào Firestore
 * Có kiểm tra trùng mã IDGV: Nếu mã đã tồn tại sẽ báo lỗi, không ghi đè
 */
export async function addGiangVien({ IDGV, Fullname, Image, SumClass }) {
    const cleanId = String(IDGV).trim();
    const docRef = doc(db, COLLECTION_NAME, cleanId);

    // Kiểm tra xem mã giảng viên đã tồn tại chưa
    const existingDoc = await getDoc(docRef);
    if (existingDoc.exists()) {
        throw new Error(`Mã giảng viên "${cleanId}" đã tồn tại trên hệ thống! Vui lòng chọn mã khác.`);
    }

    const payload = {
        IDGV: cleanId,
        Fullname: String(Fullname).trim(),
        Image: String(Image || "").trim(),
        SumClass: Number(SumClass) || 0,
    };

    await setDoc(docRef, payload);
    return payload;
}

/**
 * Cập nhật thông tin Giảng viên
 */
export async function updateGiangVien(docId, { IDGV, Fullname, Image, SumClass }) {
    const docRef = doc(db, COLLECTION_NAME, docId);
    const payload = {
        IDGV: String(IDGV).trim(),
        Fullname: String(Fullname).trim(),
        Image: String(Image || "").trim(),
        SumClass: Number(SumClass) || 0,
    };
    await updateDoc(docRef, payload);
    return payload;
}

/**
 * Xóa một Giảng viên khỏi Firestore
 */
export async function deleteGiangVien(docId) {
    const docRef = doc(db, COLLECTION_NAME, docId);
    await deleteDoc(docRef);
}
