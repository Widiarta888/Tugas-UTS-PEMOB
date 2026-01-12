import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { supabase } from "../../lib/supabase";

export default function MenuBurger() {
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  const handleNavigate = (path: string): void => {
    setMenuVisible(false);
    router.push(path as any);
  };

  const handleLogout = async (): Promise<void> => {
    try {
      setMenuVisible(false); 
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        Alert.alert("Error", error.message);
      } else {
        router.replace("/login");
      }
    } catch (err) {
      Alert.alert("Error", "Terjadi kesalahan saat logout.");
      console.error(err);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setMenuVisible(true)}
      >
        <Ionicons name="menu" size={22} color="#333" />
      </TouchableOpacity>

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPressOut={() => setMenuVisible(false)}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setMenuVisible(false)}
            >
              <Ionicons name="close" size={22} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate("/home")}>
              <Text style={styles.menuText}>🏠 Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate("/katalog")}>
              <Text style={styles.menuText}>🧥 Katalog</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate("/keranjang")}>
              <Text style={styles.menuText}>🛒 Keranjang</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate("/transaksi")}>
              <Text style={styles.menuText}>💳 Transaksi</Text>
            </TouchableOpacity>

            {/* Menu Navigasi ke Halaman Admin */}
            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigate("/admin")}>
              <Text style={styles.menuText}>⚙️ Admin Panel</Text>
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={18} color="#fff" style={{marginRight: 8}} />
              <Text style={styles.logoutButtonText}>LOGOUT</Text>
            </TouchableOpacity>

          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    backgroundColor: "#f2f2f2",
    padding: 8,
    borderRadius: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  menuContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: 200,
    marginTop: 65,
    marginRight: 16,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  menuItem: {
    paddingVertical: 12,
  },
  menuText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 15,
  },
  logoutButton: {
    backgroundColor: "#ff4444",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: "#ff4444",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1,
  },
});