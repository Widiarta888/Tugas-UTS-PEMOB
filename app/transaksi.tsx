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
import { productData } from "./product/[id]";

export default function Transaksi() {
  const router = useRouter();
  const { cart } = useLocalSearchParams(); 
  const cartItems = cart ? JSON.parse(cart as string) : [];
  const getProductInfo = (id: number) => productData.find((p) => p.id === id);

  const total = cartItems.reduce((sum: number, item: any) => {
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
        <Text style={styles.title}>List Transaction</Text>
        <MenuBurger />
      </View>

      {/* Daftar transaksi */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {cartItems.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 40 }}>
            Tidak ada transaksi.
          </Text>
        ) : (
          cartItems.map((item: any) => {
            const product = getProductInfo(item.id);
            if (!product) return null;

            return (
              <View key={item.id} style={styles.transactionItem}>
                <Image source={product.image} style={styles.image} />
                <View style={styles.info}>
                  <Text style={styles.name}>{product.name}</Text>
                  <Text style={styles.price}>
                    Rp {product.price.toLocaleString("id-ID")}
                  </Text>
                  <View style={styles.qtyBox}>
                    <Text style={styles.qtyText}>{item.quantity}</Text>
                  </View>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* Total */}
      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.totalLabel}>Total Pembayaran</Text>
          <Text style={styles.totalValue}>
            Rp {total.toLocaleString("id-ID")}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: { fontSize: 22, fontWeight: "600", fontFamily: "serif" },
  transactionItem: {
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
  qtyBox: {
    backgroundColor: "black",
    width: 28,
    height: 28,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyText: { color: "white", fontWeight: "bold" },
  footer: {
    backgroundColor: "#d9d9d9",
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  totalLabel: { fontWeight: "bold", fontSize: 16, color: "#333" },
  totalValue: { fontWeight: "bold", fontSize: 18, marginTop: 5 },
});
