import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Alert,
  Platform,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

// Dịch vụ Backend
import {
  getAllGiangVien,
  addGiangVien,
  updateGiangVien,
  deleteGiangVien,
} from "./src/services/giangVienService";
import { uploadImageToCloudinary } from "./src/config/cloudinary";
import { loginAdmin, logoutAdmin } from "./src/services/authService";

// Các Components giao diện theo cấu trúc module
import Sidebar from "./src/components/Sidebar";
import StatCards from "./src/components/StatCards";
import Toolbar from "./src/components/Toolbar";
import LecturerTable from "./src/components/LecturerTable";
import LecturerCardList from "./src/components/LecturerCardList";
import LecturerModal from "./src/components/LecturerModal";
import LoginScreen from "./src/components/LoginScreen";

export default function App() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  // 1. Quản lý trạng thái xác thực Admin
  const [currentUser, setCurrentUser] = useState(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // 2. Dữ liệu Giảng viên
  const [giangViens, setGiangViens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // 3. Modal Thêm / Sửa
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState(null);

  // Form Fields (Đúng 4 trường dữ liệu)
  const [idgv, setIdgv] = useState("");
  const [fullname, setFullname] = useState("");
  const [sumClass, setSumClass] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [savingLoading, setSavingLoading] = useState(false);

  // Tự động tải dữ liệu khi Admin đã đăng nhập
  useEffect(() => {
    if (currentUser) {
      loadData();
    }
  }, [currentUser]);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getAllGiangVien();
      setGiangViens(data);
    } catch (error) {
      showAlert("Lỗi", "Không thể tải dữ liệu: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (title, message) => {
    if (Platform.OS === "web") {
      window.alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  // Đăng nhập Admin
  const handleLogin = async () => {
    if (!authEmail.trim() || !authPassword) {
      showAlert("Thông báo", "Vui lòng nhập đầy đủ Email và Mật khẩu!");
      return;
    }
    try {
      setAuthLoading(true);
      const user = await loginAdmin(authEmail, authPassword);
      setCurrentUser(user);
    } catch (error) {
      showAlert("Đăng nhập thất bại", error.message);
    } finally {
      setAuthLoading(false);
    }
  };

  // Đăng xuất Admin
  const handleLogout = async () => {
    await logoutAdmin();
    setCurrentUser(null);
    setGiangViens([]);
  };

  // Chọn ảnh từ thiết bị (Hỗ trợ Base64 cho iOS)
  const handlePickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      showAlert("Thông báo", "Cần cấp quyền truy cập thư viện ảnh để tiếp tục!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: true, // Kích hoạt lấy dữ liệu Base64
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
      setImageBase64(result.assets[0].base64 || "");
    }
  };

  // Mở modal thêm mới
  const handleOpenAdd = () => {
    setIsEditing(false);
    setSelectedDocId(null);
    setIdgv("");
    setFullname("");
    setSumClass("");
    setImageUri("");
    setImageBase64("");
    setModalVisible(true);
  };

  // Mở modal chỉnh sửa
  const handleOpenEdit = (gv) => {
    setIsEditing(true);
    setSelectedDocId(gv._docId);
    setIdgv(gv.IDGV);
    setFullname(gv.Fullname);
    setSumClass(String(gv.SumClass));
    setImageUri(gv.Image);
    setImageBase64("");
    setModalVisible(true);
  };

  // Lưu Giảng viên (Thêm hoặc Sửa)
  const handleSave = async () => {
    if (!idgv.trim() || !fullname.trim()) {
      showAlert("Lỗi", "Vui lòng nhập Mã giảng viên và Họ tên!");
      return;
    }

    // Kiểm tra tính duy nhất của Mã giảng viên khi thêm mới (Tránh trùng / ghi đè)
    if (!isEditing) {
      const isDuplicate = giangViens.some(
        (item) => item.IDGV.trim().toLowerCase() === idgv.trim().toLowerCase()
      );
      if (isDuplicate) {
        showAlert(
          "Trùng mã giảng viên",
          `Mã giảng viên "${idgv.trim()}" đã tồn tại trên hệ thống! Vui lòng chọn mã khác.`
        );
        return;
      }
    }

    try {
      setSavingLoading(true);

      // Nếu có ảnh mới: Ưu tiên upload dạng Base64 để tương thích mượt mà 100% trên iPhone
      let finalImageUrl = imageUri;
      if (imageBase64) {
        finalImageUrl = await uploadImageToCloudinary(imageBase64, true);
      } else if (
        imageUri &&
        (imageUri.startsWith("file:") ||
          imageUri.startsWith("blob:") ||
          imageUri.startsWith("data:"))
      ) {
        finalImageUrl = await uploadImageToCloudinary(imageUri);
      }

      // Đóng gói ĐÚNG 4 TRƯỜNG theo quy chuẩn đề thi
      const lecturerData = {
        IDGV: idgv.trim(),
        Fullname: fullname.trim(),
        Image: finalImageUrl || "",
        SumClass: Number(sumClass) || 0,
      };

      if (isEditing) {
        await updateGiangVien(selectedDocId, lecturerData);
        showAlert("Thành công", "Đã cập nhật thông tin giảng viên!");
      } else {
        await addGiangVien(lecturerData);
        showAlert("Thành công", "Đã thêm giảng viên mới thành công!");
      }

      setModalVisible(false);
      loadData();
    } catch (error) {
      showAlert("Lỗi khi lưu", error.message);
    } finally {
      setSavingLoading(false);
    }
  };

  // Xóa giảng viên với hộp thoại xác nhận
  const handleDelete = (gv) => {
    const confirmDelete = () => {
      deleteGiangVien(gv._docId)
        .then(() => {
          showAlert("Thành công", `Đã xóa giảng viên ${gv.Fullname}`);
          loadData();
        })
        .catch((err) => showAlert("Lỗi", err.message));
    };

    if (Platform.OS === "web") {
      if (window.confirm(`Bạn có chắc chắn muốn xóa giảng viên ${gv.Fullname} (${gv.IDGV})?`)) {
        confirmDelete();
      }
    } else {
      Alert.alert(
        "Xác nhận xóa",
        `Bạn có chắc chắn muốn xóa giảng viên ${gv.Fullname} (${gv.IDGV})?`,
        [
          { text: "Hủy", style: "cancel" },
          { text: "Xóa", style: "destructive", onPress: confirmDelete },
        ]
      );
    }
  };

  // Lọc tìm kiếm theo Mã hoặc Tên
  const filteredList = giangViens.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.IDGV.toLowerCase().includes(q) ||
      item.Fullname.toLowerCase().includes(q)
    );
  });

  // Tính số liệu cho các thẻ thống kê
  const totalLecturers = giangViens.length;
  const totalClasses = giangViens.reduce((acc, cur) => acc + (cur.SumClass || 0), 0);

  // MÀN HÌNH ĐĂNG NHẬP NẾU CHƯA XÁC THỰC
  if (!currentUser) {
    return (
      <LoginScreen
        email={authEmail}
        setEmail={setAuthEmail}
        password={authPassword}
        setPassword={setAuthPassword}
        onLogin={handleLogin}
        loading={authLoading}
      />
    );
  }

  // MÀN HÌNH CHÍNH (DASHBOARD)
  return (
    <View style={styles.mainContainer}>
      {/* Sidebar trên Web / Ẩn trên Mobile */}
      {!isMobile && <Sidebar onOpenAdd={handleOpenAdd} onLogout={handleLogout} />}

      <ScrollView style={styles.contentArea}>
        {/* Header trên Mobile */}
        {isMobile ? (
          <View style={styles.mobileHeader}>
            <View>
              <Text style={styles.mobileHeaderTitle}>Giảng viên</Text>
              <Text style={styles.mobileHeaderSub}>Danh sách giảng viên</Text>
            </View>
            <TouchableOpacity onPress={handleLogout} style={styles.mobileLogoutBtn}>
              <Ionicons name="log-out-outline" size={24} color="#ef4444" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ marginBottom: 24 }}>
            <Text style={styles.pageTitle}>Quản lý giảng viên</Text>
            <Text style={styles.pageSubtitle}>
              Theo dõi và quản lý thông tin giảng viên trong hệ thống
            </Text>
          </View>
        )}

        {/* 3 Thẻ thống kê số liệu */}
        <StatCards
          totalLecturers={totalLecturers}
          totalClasses={totalClasses}
          filteredCount={filteredList.length}
          isMobile={isMobile}
        />

        {/* Thanh tìm kiếm & Nút thêm */}
        <Toolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenAdd={handleOpenAdd}
          isMobile={isMobile}
        />

        {/* Bảng dữ liệu Web hoặc Danh sách thẻ Mobile */}
        {loading ? (
          <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 40 }} />
        ) : filteredList.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="file-tray-outline" size={48} color="#94a3b8" />
            <Text style={styles.emptyText}>Chưa có dữ liệu giảng viên nào.</Text>
          </View>
        ) : isMobile ? (
          <LecturerCardList
            data={filteredList}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
          />
        ) : (
          <LecturerTable
            data={filteredList}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
          />
        )}
      </ScrollView>

      {/* Modal Thêm / Sửa Giảng viên */}
      <LecturerModal
        visible={modalVisible}
        isEditing={isEditing}
        idgv={idgv}
        setIdgv={setIdgv}
        fullname={fullname}
        setFullname={setFullname}
        sumClass={sumClass}
        setSumClass={setSumClass}
        imageUri={imageUri}
        onPickImage={handlePickImage}
        onSave={handleSave}
        onCancel={() => setModalVisible(false)}
        loading={savingLoading}
        isMobile={isMobile}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f8fafc",
  },
  contentArea: {
    flex: 1,
    padding: 28,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
  },
  pageSubtitle: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 4,
  },
  mobileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  mobileHeaderTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0f172a",
  },
  mobileHeaderSub: {
    fontSize: 13,
    color: "#64748b",
  },
  mobileLogoutBtn: {
    padding: 6,
  },
  emptyContainer: {
    paddingVertical: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 12,
  },
});
