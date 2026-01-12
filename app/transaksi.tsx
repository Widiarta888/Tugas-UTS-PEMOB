import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MenuBurger from "./component/menuBurger";

export default function Transaksi() {
  const router = useRouter();
  const { cart } = useLocalSearchParams(); 
  
  // Mengambil data cart yang dikirim dari halaman Keranjang
  const cartItems = cart ? JSON.parse(cart as string) : [];

  // Menghitung total harga berdasarkan struktur data Supabase (item.products.price)
  const total = cartItems.reduce((sum: number, item: any) => {
    return sum + (item.products ? item.products.price * item.quantity : 0);
  }, 0);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>List Transaction</Text>
        <MenuBurger />
      </View>

      {/* Daftar transaksi */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        {cartItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Tidak ada transaksi.</Text>
          </View>
        ) : (
          cartItems.map((item: any) => (
            <View key={item.id} style={styles.transactionItem}>
              {/* Image URL dari Supabase */}
              <Image source={{ uri: item.products?.image_url }} style={styles.image} />
              
              <View style={styles.info}>
                <Text style={styles.name}>{item.products?.name}</Text>
                
                {/* Menampilkan Size yang dipilih */}
                <Text style={styles.sizeText}>Size: {item.size || "-"}</Text>
                
                <Text style={styles.price}>
                  Rp {item.products?.price.toLocaleString("id-ID")}
                </Text>
              </View>

              <View style={styles.qtyContainer}>
                <Text style={styles.qtyLabel}>Qty</Text>
                <View style={styles.qtyBox}>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Total Pembayaran */}
      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Pembayaran</Text>
            <Text style={styles.totalValue}>
              Rp {total.toLocaleString("id-ID")}
            </Text>
          </View>
          
          <TouchableOpacity style={styles.confirmButton} onPress={() => alert("Pesanan Berhasil!")}>
             <Text style={styles.confirmButtonText}>Konfirmasi Pesanan</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    padding: 5,
  },
  title: { fontSize: 20, fontWeight: "bold", color: "#000" },
  transactionItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: { width: 70, height: 70, borderRadius: 10, backgroundColor: "#f0f0f0" },
  info: { flex: 1, marginLeft: 15 },
  name: { fontWeight: "bold", fontSize: 16, color: "#333" },
  sizeText: { color: "#888", fontSize: 13, marginVertical: 2 },
  price: { color: "#000", fontWeight: "600", marginTop: 4 },
  qtyContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  qtyLabel: { fontSize: 10, color: "#888", marginBottom: 2, fontWeight: "bold" },
  qtyBox: {
    backgroundColor: "#000",
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyText: { color: "white", fontWeight: "bold", fontSize: 14 },
  emptyContainer: { alignItems: "center", marginTop: 50 },
  emptyText: { color: "#aaa", fontSize: 16 },
  footer: {
    backgroundColor: "#fff",
    padding: 25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  totalLabel: { fontWeight: "500", fontSize: 16, color: "#666" },
  totalValue: { fontWeight: "bold", fontSize: 22, color: "#000" },
  confirmButton: {
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  confirmButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 }
});