import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function LoginScreen({ email, setEmail, password, setPassword, onLogin, loading }) {
  return (
    <View style={styles.loginContainer}>
      <View style={styles.loginCard}>
        <Text style={styles.loginTitle}>TEACHER</Text>
        <Text style={styles.loginTitleSub}>MANAGEMENT SYSTEM</Text>
        <Text style={styles.loginDesc}>Đăng nhập phân hệ Quản trị viên</Text>

        <Text style={styles.inputLabel}>Email Quản trị:</Text>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
          placeholder=""
          autoCapitalize="none"
        />

        <Text style={styles.inputLabel}>Mật khẩu:</Text>
        <TextInput
          style={styles.textInput}
          value={password}
          onChangeText={setPassword}
          placeholder=""
          secureTextEntry
        />

        <TouchableOpacity style={styles.primaryButton} onPress={onLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.primaryButtonText}>Đăng nhập</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loginCard: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 32,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#0f172a",
    letterSpacing: 1.5,
    textAlign: "center",
  },
  loginTitleSub: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748b",
    letterSpacing: 1,
    textAlign: "center",
    marginBottom: 6,
  },
  loginDesc: {
    fontSize: 14,
    color: "#475569",
    textAlign: "center",
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 6,
    marginTop: 10,
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
  primaryButton: {
    backgroundColor: "#2563eb",
    height: 46,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15,
  },
});
