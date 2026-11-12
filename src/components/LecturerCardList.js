import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AVATAR_COLORS = [
  { bg: "#dbeafe", text: "#1d4ed8" },
  { bg: "#ffedd5", text: "#c2410c" },
  { bg: "#dcfce7", text: "#15803d" },
  { bg: "#f3e8ff", text: "#7e22ce" },
];

export default function LecturerCardList({ data, onEdit, onDelete }) {
  return (
    <View style={{ marginTop: 8 }}>
      {data.map((item, index) => {
        const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
        return (
          <View key={item._docId} style={styles.mobileCard}>
            <View style={styles.mobileCardHeader}>
              {/* Avatar */}
              {item.Image ? (
                <Image source={{ uri: item.Image }} style={styles.avatarImage} />
              ) : (
                <View style={[styles.avatarPlaceholder, { backgroundColor: color.bg }]}>
                  <Text style={[styles.avatarInitial, { color: color.text }]}>
                    {item.Fullname ? item.Fullname.trim().charAt(0).toUpperCase() : "G"}
                  </Text>
                </View>
              )}

              {/* Thông tin */}
              <View style={{ marginLeft: 14, flex: 1 }}>
                <Text style={styles.mobileCardName}>{item.Fullname}</Text>
                <Text style={styles.mobileCardInfo}>
                  {item.IDGV} • {item.SumClass} lớp
                </Text>
              </View>

              {/* Mũi tên giống Mockup 5 */}
              <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
            </View>

            {/* Nút hành động */}
            <View style={styles.actionRow}>
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
  mobileCard: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  mobileCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitial: {
    fontWeight: "bold",
    fontSize: 20,
  },
  mobileCardName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
  },
  mobileCardInfo: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 2,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    paddingTop: 10,
  },
  btnEdit: {
    backgroundColor: "#eff6ff",
    paddingVertical: 6,
    paddingHorizontal: 16,
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
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  btnDeleteText: {
    color: "#ef4444",
    fontWeight: "600",
    fontSize: 13,
  },
});
