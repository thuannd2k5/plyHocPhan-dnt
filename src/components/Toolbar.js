import React from "react";
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Toolbar({ searchQuery, onSearchChange, onOpenAdd, isMobile }) {
  return (
    <View style={isMobile ? styles.toolbarCol : styles.toolbarRow}>
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="#94a3b8" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm theo mã hoặc họ tên..."
          value={searchQuery}
          onChangeText={onSearchChange}
        />
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={onOpenAdd}>
        <Ionicons name="add" size={20} color="#ffffff" />
        <Text style={styles.primaryButtonText}>Thêm giảng viên</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  toolbarRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    gap: 16,
  },
  toolbarCol: {
    flexDirection: "column",
    gap: 12,
    marginBottom: 16,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 46,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#0f172a",
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    height: 46,
    borderRadius: 10,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 6,
  },
});
