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

export default function DetailProduct() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = Number(params.id); 

  const product = productData.find((item) => item.id === id);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", marginTop: 40 }}>
          Produk tidak ditemukan.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>PRODUCT DETAIL</Text>
        <MenuBurger />
      </View>

      {/* Gambar Produk */}
      <Image source={product.image} style={styles.image} />

      {/* Info Produk */}
      <View style={styles.detailSection}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.price}>Rp {Number(product.price).toLocaleString()}</Text>

        <View style={styles.sizeRow}>
          {["S", "M", "L", "XL"].map((size) => (
            <View key={size} style={styles.sizeBox}>
              <Text style={styles.sizeText}>{size}</Text>
            </View>
          ))}
        </View>

        {product.description.map((desc, index) => (
          <Text key={index} style={styles.desc}>
            {desc}
          </Text>
        ))}

        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>ADD TO CART</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
  iconButton: {
    backgroundColor: "#f2f2f2",
    padding: 8,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  detailSection: { padding: 16 },
  productName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
  price: {
    fontSize: 16,
    color: "#444",
    marginTop: 6,
  },
  sizeRow: {
    flexDirection: "row",
    marginTop: 12,
  },
  sizeBox: {
    backgroundColor: "#ddd",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
  },
  sizeText: { fontWeight: "600" },
  desc: {
    fontSize: 14,
    color: "#555",
    lineHeight: 10,
    marginTop: 12,
  },
  addToCartButton: {
    backgroundColor: "#000",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
  },
  addToCartText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});
