import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Sidebar({ onOpenAdd, onLogout }) {
  return (
    <View style={styles.sidebar}>
      <View>
        <Text style={styles.brandTitle}>TEACHER</Text>
        <Text style={styles.brandSubtitle}>MANAGEMENT SYSTEM</Text>

        <View style={styles.menuList}>
          {/* Menu 1: Tổng quan */}
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="grid-outline" size={18} color="#94a3b8" />
            <Text style={styles.menuText}>Tổng quan</Text>
          </TouchableOpacity>

          {/* Menu 2: Giảng viên (Active) */}
          <View style={[styles.menuItem, styles.menuItemActive]}>
            <Ionicons name="person" size={18} color="#ffffff" />
            <Text style={styles.menuTextActive}>Giảng viên</Text>
          </View>

          {/* Menu 3: Thêm giảng viên */}
          <TouchableOpacity style={styles.menuItem} onPress={onOpenAdd}>
            <Ionicons name="add-circle-outline" size={18} color="#94a3b8" />
            <Text style={styles.menuText}>Thêm giảng viên</Text>
          </TouchableOpacity>

          {/* Menu 4: Cài đặt */}
          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="settings-outline" size={18} color="#94a3b8" />
            <Text style={styles.menuText}>Cài đặt</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Nút Đăng xuất */}
      <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
        <Ionicons name="log-out-outline" size={18} color="#ef4444" />
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 240,
    backgroundColor: "#1e293b",
    paddingVertical: 28,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#ffffff",
    letterSpacing: 1.5,
  },
  brandSubtitle: {
    fontSize: 10,
    color: "#94a3b8",
    letterSpacing: 1,
    marginBottom: 32,
    fontWeight: "600",
  },
  menuList: {
    gap: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  menuItemActive: {
    backgroundColor: "#2563eb",
  },
  menuText: {
    color: "#94a3b8",
    fontSize: 14,
    marginLeft: 12,
    fontWeight: "500",
  },
  menuTextActive: {
    color: "#ffffff",
    fontWeight: "600",
    marginLeft: 12,
    fontSize: 14,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  logoutText: {
    color: "#ef4444",
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "600",
  },
});
