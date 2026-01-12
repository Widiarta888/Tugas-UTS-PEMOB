import { AuthError } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Fungsi Helper untuk Notifikasi Universal (Web & Mobile)
  const showAlert = (title: string, message: string): void => {
    if (Platform.OS === "web") {
      alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const handleLogin = async (): Promise<void> => {
    if (!email || !password) {
      showAlert("Error", "Email dan password wajib diisi");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        handleAuthError(error);
        return;
      }

      if (data.session) {
        router.replace("/home");
      }
    } catch (err) {
      showAlert("Kesalahan Sistem", "Gagal terhubung ke server.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handler Error Spesifik Supabase
  const handleAuthError = (error: AuthError): void => {
    const message = error.message.toLowerCase();
    
    if (message.includes("invalid login credentials")) {
      showAlert("Login Gagal", "Email atau password yang Anda masukkan salah.");
    } else if (message.includes("email not confirmed")) {
      showAlert("Verifikasi", "Silakan verifikasi email Anda terlebih dahulu.");
    } else {
      showAlert("Error", error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login untuk mengakses jacket4sale</Text>

        <TextInput
          style={[styles.input, loading && styles.inputDisabled]}
          placeholder="Email"
          placeholderTextColor="#999"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={(text: string) => setEmail(text)}
          editable={!loading}
        />

        <TextInput
          style={[styles.input, loading && styles.inputDisabled]}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={(text: string) => setPassword(text)}
          editable={!loading}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "MEMPROSES..." : "LOGIN"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => router.replace("/register")} 
          disabled={loading}
        >
          <Text style={styles.link}>
            Belum punya akun? <Text style={styles.linkBold}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginVertical: 8,
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#f2f2f2",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    marginBottom: 14,
    color: "#000",
  },
  inputDisabled: {
    opacity: 0.6,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#444",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  link: {
    textAlign: "center",
    marginTop: 18,
    color: "#555",
    fontSize: 13,
  },
  linkBold: {
    color: "#000",
    fontWeight: "600",
  },
});