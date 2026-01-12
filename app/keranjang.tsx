import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../lib/supabase"; // Pastikan path benar
import MenuBurger from "./component/menuBurger";

export default function Keranjang() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  // Fungsi mengambil data keranjang dari Supabase
  const fetchCart = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      // Ambil data cart dan join dengan data product
      const { data, error } = await supabase
        .from("cart")
        .select(`
          id,
          quantity,
          size,
          product_id,
          products (
            name,
            price,
            image_url
          )
        `)
        .eq("user_id", user.id);

      if (error) throw error;
      setCartItems(data || []);
    } catch (error: any) {
      console.error("Error fetching cart:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateQty = async (id: string, newQty: number) => {
    if (newQty < 1) return;
    try {
      const { error } = await supabase
        .from("cart")
        .update({ quantity: newQty })
        .eq("id", id);

      if (error) throw error;
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
      );
    } catch (error: any) {
      Alert.alert("Gagal update jumlah", error.message);
    }
  };

  const removeItem = async (id: string) => {
    try {
      const { error } = await supabase.from("cart").delete().eq("id", id);
      if (error) throw error;
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error: any) {
      Alert.alert("Gagal menghapus", error.message);
    }
  };

  const total = cartItems.reduce((sum, item) => {
    return sum + (item.products?.price * item.quantity);
  }, 0);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>My Shopping Cart</Text>
        <MenuBurger />
      </View>

      {/* Daftar item */}
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {cartItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="cart-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>Keranjang kamu kosong.</Text>
          </View>
        ) : (
          cartItems.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={{ uri: item.products?.image_url }} style={styles.image} />
              
              <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>{item.products?.name}</Text>
                {/* Menampilkan Size dari database */}
                <Text style={styles.sizeText}>Size: {item.size || "-"}</Text>
                <Text style={styles.price}>
                  Rp {item.products?.price.toLocaleString("id-ID")}
                </Text>

                <View style={styles.qtyContainer}>
                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() => updateQty(item.id, item.quantity - 1)}
                  >
                    <Text style={styles.qtyText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyValue}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() => updateQty(item.id, item.quantity + 1)}
                  >
                    <Text style={styles.qtyText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeItem(item.id)}
              >
                <Ionicons name="trash-outline" size={20} color="white" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {/* Footer */}
      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalPrice}>
              Rp {total.toLocaleString("id-ID")}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.payButton}
            onPress={() =>
              router.push({
                pathname: "/transaksi",
                params: { cart: JSON.stringify(cartItems) },
              })
            }
          >
            <Text style={styles.payText}>Bayar Sekarang</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },
  title: { fontSize: 18, fontWeight: "bold" },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 15,
    padding: 12,
    alignItems: "center",
    // Shadow untuk iOS & Android
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: { width: 80, height: 80, borderRadius: 10, backgroundColor: "#f0f0f0" },
  info: { flex: 1, marginLeft: 15 },
  name: { fontWeight: "bold", fontSize: 15, color: "#333" },
  sizeText: { color: "#777", fontSize: 13, marginVertical: 2 },
  price: { fontWeight: "600", color: "#000", marginBottom: 8 },
  qtyContainer: { flexDirection: "row", alignItems: "center" },
  qtyButton: {
    backgroundColor: "#000",
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: { color: "white", fontSize: 18, fontWeight: "bold" },
  qtyValue: { marginHorizontal: 15, fontWeight: "bold", fontSize: 14 },
  deleteButton: {
    backgroundColor: "#ff4444",
    padding: 10,
    borderRadius: 12,
  },
  emptyContainer: { flex: 1, alignItems: "center", justifyContent: "center", marginTop: 100 },
  emptyText: { marginTop: 10, color: "#888", fontSize: 16 },
  footer: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  totalLabel: { fontSize: 16, color: "#555" },
  totalPrice: { fontSize: 20, fontWeight: "bold", color: "#000" },
  payButton: {
    backgroundColor: "#000",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  payText: { color: "white", fontWeight: "bold", fontSize: 16 },
});