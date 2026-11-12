import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function StatCards({ totalLecturers, totalClasses, filteredCount, isMobile }) {
  return (
    <View style={isMobile ? styles.statsCol : styles.statsRow}>
      {/* Thẻ 1: Tổng giảng viên */}
      <View style={styles.statCard}>
        <Text style={styles.statLabel}>TỔNG GIẢNG VIÊN</Text>
        <Text style={styles.statValue}>{totalLecturers}</Text>
        <Text style={styles.statNote}>+ {totalLecturers} trong hệ thống</Text>
      </View>

      {/* Thẻ 2: Tổng số lớp */}
      <View style={styles.statCard}>
        <Text style={styles.statLabel}>TỔNG SỐ LỚP</Text>
        <Text style={styles.statValue}>{totalClasses}</Text>
        <Text style={styles.statNote}>Đang được phụ trách</Text>
      </View>

      {/* Thẻ 3: Đang hiển thị */}
      <View style={styles.statCard}>
        <Text style={styles.statLabel}>ĐANG HIỂN THỊ</Text>
        <Text style={styles.statValue}>{filteredCount}</Text>
        <Text style={styles.statNote}>Dữ liệu từ Firestore</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 24,
  },
  statsCol: {
    flexDirection: "column",
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 22,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748b",
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 36,
    fontWeight: "900",
    color: "#0f172a",
    marginVertical: 4,
  },
  statNote: {
    fontSize: 12,
    color: "#16a34a",
    fontWeight: "500",
  },
});
