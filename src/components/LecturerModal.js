import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function LecturerModal({
  visible,
  isEditing,
  idgv,
  setIdgv,
  fullname,
  setFullname,
  sumClass,
  setSumClass,
  imageUri,
  onPickImage,
  onSave,
  onCancel,
  loading,
  isMobile,
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalCard, isMobile && { maxWidth: "100%" }]}>
          <ScrollView>
            <Text style={styles.modalTitle}>
              {isEditing ? "Chỉnh sửa giảng viên" : "Thêm giảng viên mới"}
            </Text>
            <Text style={styles.modalSub}>
              Nhập đầy đủ thông tin theo cấu trúc dữ liệu được yêu cầu
            </Text>

            {/* Layout dạng 2 cột trên Desktop (Mockup 3 & 4) */}
            <View style={isMobile ? styles.formCol : styles.formRow}>
              {/* Cột trái: Khung chọn ảnh */}
              <View style={styles.leftCol}>
                <TouchableOpacity style={styles.imagePickerCard} onPress={onPickImage}>
                  {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                  ) : (
                    <View style={styles.imagePlaceholder}>
                      <View style={styles.avatarCircle}>
                        <Ionicons name="person" size={48} color="#93c5fd" />
                      </View>
                      <Text style={styles.imagePickerText}>Chọn ảnh từ thiết bị</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>

              {/* Cột phải: Các ô nhập liệu */}
              <View style={styles.rightCol}>
                {/* 1. Mã giảng viên (IDGV) */}
                <Text style={styles.inputLabel}>Mã giảng viên (IDGV)</Text>
                <TextInput
                  style={[styles.textInput, isEditing && styles.disabledInput]}
                  placeholder="Nhập mã giảng viên"
                  value={idgv}
                  onChangeText={setIdgv}
                  editable={!isEditing}
                />

                {/* 2. Họ và tên (Fullname) */}
                <Text style={styles.inputLabel}>Họ và tên (Fullname)</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Nhập họ và tên"
                  value={fullname}
                  onChangeText={setFullname}
                />

                {/* 3. Tổng số lớp (SumClass) */}
                <Text style={styles.inputLabel}>Tổng số lớp (SumClass)</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Nhập tổng số lớp"
                  value={sumClass}
                  onChangeText={setSumClass}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <Text style={styles.noteText}>
              Ảnh được tải lên bộ lưu trữ; database chỉ lưu URL trong trường Image.
            </Text>

            {/* Nút Hủy và Lưu */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.btnCancel} onPress={onCancel} disabled={loading}>
                <Text style={styles.btnCancelText}>Hủy</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnSave} onPress={onSave} disabled={loading}>
                {loading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={styles.btnSaveText}>Lưu</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalCard: {
    width: "100%",
    maxWidth: 620,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 32,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0f172a",
  },
  modalSub: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 4,
    marginBottom: 24,
  },
  formRow: {
    flexDirection: "row",
    gap: 24,
  },
  formCol: {
    flexDirection: "column",
    gap: 16,
  },
  leftCol: {
    width: 170,
    alignItems: "center",
  },
  rightCol: {
    flex: 1,
  },
  imagePickerCard: {
    width: 160,
    height: 180,
    backgroundColor: "#f8fafc",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  imagePlaceholder: {
    alignItems: "center",
    padding: 12,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#e0f2fe",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  imagePickerText: {
    fontSize: 12,
    color: "#2563eb",
    fontWeight: "600",
    textAlign: "center",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 6,
    marginTop: 8,
  },
  textInput: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 42,
    fontSize: 14,
    color: "#0f172a",
  },
  disabledInput: {
    backgroundColor: "#f1f5f9",
    color: "#64748b",
  },
  noteText: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 20,
    fontStyle: "italic",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 24,
  },
  btnCancel: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 28,
    height: 44,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnCancelText: {
    color: "#475569",
    fontWeight: "600",
    fontSize: 14,
  },
  btnSave: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 32,
    height: 44,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btnSaveText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 14,
  },
});
