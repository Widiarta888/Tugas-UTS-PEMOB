import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MenuBurger() {
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  const handleNavigate = (path: string): void => {
  setMenuVisible(false);
  router.push(path as any);
};

  return (
    <>
      {/* Tombol Burger */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setMenuVisible(true)}
      >
        <Ionicons name="menu" size={22} color="#333" />
      </TouchableOpacity>

      {/* Overlay Menu */}
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

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleNavigate("/home")}
            >
              <Text style={styles.menuText}>🏠 Home</Text>
            </TouchableOpacity>

             <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleNavigate("/katalog")}
            >
              <Text style={styles.menuText}>🧥 Katalog</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleNavigate("/keranjang")}
            >
              <Text style={styles.menuText}>🛒 Keranjang</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleNavigate("/transaksi")}
            >
              <Text style={styles.menuText}>💳 Transaksi</Text>
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
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  menuContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    width: 180,
    marginTop: 60,
    marginRight: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  menuItem: {
    marginTop: 10,
  },
  menuText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000",
  },
});
