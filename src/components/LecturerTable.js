import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

// Bảng màu pastel nhẹ nhàng cho avatar giống trong ảnh mockup đề thi
const AVATAR_COLORS = [
  { bg: "#dbeafe", text: "#1d4ed8" }, // Xanh dương nhạt
  { bg: "#ffedd5", text: "#c2410c" }, // Cam đào nhạt
  { bg: "#dcfce7", text: "#15803d" }, // Xanh lá bạc hà
  { bg: "#f3e8ff", text: "#7e22ce" }, // Tím nhạt
];

export default function LecturerTable({ data, onEdit, onDelete }) {
  const getAvatarStyle = (index) => {
    return AVATAR_COLORS[index % AVATAR_COLORS.length];
  };

  return (
    <View style={styles.tableCard}>
      {/* Hàng tiêu đề */}
      <View style={styles.tableHeaderRow}>
        <Text style={[styles.thText, { flex: 1 }]}>ẢNH</Text>
        <Text style={[styles.thText, { flex: 1.5 }]}>MÃ GIẢNG VIÊN</Text>
        <Text style={[styles.thText, { flex: 3 }]}>HỌ VÀ TÊN</Text>
        <Text style={[styles.thText, { flex: 1.5 }]}>TỔNG SỐ LỚP</Text>
        <Text style={[styles.thText, { flex: 1.5, textAlign: "right" }]}>THAO TÁC</Text>
      </View>

      {/* Dữ liệu từng dòng */}
      {data.map((item, index) => {
        const color = getAvatarStyle(index);
        return (
          <View key={item._docId} style={styles.tableDataRow}>
            {/* Cột 1: Ảnh */}
            <View style={{ flex: 1 }}>
              {item.Image ? (
                <Image source={{ uri: item.Image }} style={styles.avatarImage} />
              ) : (
                <View style={[styles.avatarPlaceholder, { backgroundColor: color.bg }]}>
                  <Text style={[styles.avatarInitial, { color: color.text }]}>
                    {item.Fullname ? item.Fullname.trim().charAt(0).toUpperCase() : "G"}
                  </Text>
                </View>
              )}
            </View>

            {/* Cột 2: Mã giảng viên */}
            <Text style={[styles.tdText, { flex: 1.5, color: "#64748b" }]}>{item.IDGV}</Text>

            {/* Cột 3: Họ và tên */}
            <Text style={[styles.tdText, { flex: 3, fontWeight: "700" }]}>{item.Fullname}</Text>

            {/* Cột 4: Tổng số lớp */}
            <Text style={[styles.tdText, { flex: 1.5 }]}>{item.SumClass}</Text>

            {/* Cột 5: Thao tác (Sửa / Xóa) */}
            <View style={[styles.actionRow, { flex: 1.5, justifyContent: "flex-end" }]}>
              <TouchableOpacity style={styles.btnEdit} onPress={() => onEdit(item)}>
                <Text style={styles.btnEditText}>Sửa</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnDelete} onPress={() => onDelete(item)}>
                <Text style={styles.btnDeleteText}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tableCard: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    overflow: "hidden",
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#f8fafc",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  thText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#64748b",
    letterSpacing: 0.5,
  },
  tableDataRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  tdText: {
    fontSize: 14,
    color: "#0f172a",
  },
  avatarImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  avatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitial: {
    fontWeight: "bold",
    fontSize: 18,
  },
  actionRow: {
    flexDirection: "row",
    gap: 8,
  },
  btnEdit: {
    backgroundColor: "#eff6ff",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  btnEditText: {
    color: "#2563eb",
    fontWeight: "600",
    fontSize: 13,
  },
  btnDelete: {
    backgroundColor: "#fef2f2",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  btnDeleteText: {
    color: "#ef4444",
    fontWeight: "600",
    fontSize: 13,
  },
});
