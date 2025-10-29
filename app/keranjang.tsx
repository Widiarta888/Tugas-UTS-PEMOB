import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MenuBurger from "./component/menuBurger";
import { productData } from "./product/[id]";

export default function Keranjang() {
  const router = useRouter();

  const [cartItems, setCartItems] = useState([
    { id: 1, quantity: 1 },
    { id: 5, quantity: 2 },
  ]);

  const getProductInfo = (id: number) => productData.find((p) => p.id === id);

  const increaseQty = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => {
    const product = getProductInfo(item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

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
      <ScrollView>
        {cartItems.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 40 }}>
            Keranjang kamu kosong.
          </Text>
        ) : (
          cartItems.map((item) => {
            const product = getProductInfo(item.id);
            if (!product) return null;

            return (
              <View key={item.id} style={styles.cartItem}>
                <Image source={product.image} style={styles.image} />
                <View style={styles.info}>
                  <Text style={styles.name}>{product.name}</Text>
                  <Text style={styles.price}>
                    Rp {product.price.toLocaleString("id-ID")}
                  </Text>

                  <View style={styles.qtyContainer}>
                    <TouchableOpacity
                      style={styles.qtyButton}
                      onPress={() => decreaseQty(item.id)}
                    >
                      <Text style={styles.qtyText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyValue}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.qtyButton}
                      onPress={() => increaseQty(item.id)}
                    >
                      <Text style={styles.qtyText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => removeItem(item.id)}
                >
                  <Ionicons name="trash" size={22} color="white" />
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* Total & Tombol Bayar */}
      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalPrice}>
              Rp {total.toLocaleString("id-ID")}
            </Text>
          </View>

          <TouchableOpacity
             style={styles.payButton} onPress={() =>
            router.push({
                pathname: "/transaksi",
                params: { cart: JSON.stringify(cartItems) }, // kirim data cart ke halaman transaksi
    })
  }
>
  <Text style={styles.payText}>Bayar</Text>
</TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f3f3" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: { fontSize: 20, fontWeight: "600", fontFamily: "serif" },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#ddd",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
  },
  image: { width: 70, height: 70, borderRadius: 10 },
  info: { flex: 1, marginLeft: 10 },
  name: { fontWeight: "bold", fontSize: 14 },
  price: { color: "black", marginVertical: 4 },
  qtyContainer: { flexDirection: "row", alignItems: "center" },
  qtyButton: {
    backgroundColor: "black",
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  qtyText: { color: "white", fontSize: 16 },
  qtyValue: { marginHorizontal: 10, fontWeight: "bold" },
  deleteButton: {
    backgroundColor: "black",
    padding: 8,
    borderRadius: 8,
  },
  footer: {
    backgroundColor: "#d9d9d9",
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "gray",
    padding: 12,
    borderRadius: 12,
  },
  totalText: { fontWeight: "bold", color: "white" },
  totalPrice: { fontWeight: "bold", color: "white" },
  payButton: {
    marginTop: 12,
    backgroundColor: "black",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  payText: { color: "white", fontWeight: "bold" },
});
