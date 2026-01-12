import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
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
  useWindowDimensions,
} from "react-native";
import { supabase } from "../lib/supabase";
import MenuBurger from "./component/menuBurger";

export default function DetailProduct() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { width, height } = useWindowDimensions();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  
  // STATE BARU: Untuk menyimpan ukuran yang dipilih
  const [selectedSize, setSelectedSize] = useState<string>("M");

  useEffect(() => {
    if (id) fetchProductDetail();
  }, [id]);

  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setProduct(data);
    } catch (error) {
      console.error("Error fetching detail:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      setAdding(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        Alert.alert("Login Required", "Silakan login terlebih dahulu.");
        router.push("/login");
        return;
      }

      // Memasukkan data ke keranjang termasuk ukuran yang dipilih
      const { error } = await supabase.from("cart").insert([
        {
          user_id: user.id,
          product_id: product.id,
          quantity: 1,
          size: selectedSize, // Pastikan kolom 'size' ada di tabel 'cart' Anda
        },
      ]);

      if (error) throw error;
      Alert.alert("Sukses", `Produk (Size ${selectedSize}) berhasil ditambah! 🛒`);
    } catch (error: any) {
      Alert.alert("Gagal", error.message);
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  const dynamicImageHeight = height * 0.45;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
            <Ionicons name="arrow-back" size={width * 0.06} color="#000" />
          </TouchableOpacity>
          <Text style={[styles.title, { fontSize: width * 0.045 }]}>PRODUCT DETAIL</Text>
          <MenuBurger />
        </View>

        {/* Gambar Produk Responsif */}
        <View style={[styles.imageContainer, { height: dynamicImageHeight }]}>
          <Image 
            source={{ uri: product?.image_url }} 
            style={styles.image} 
            resizeMode="contain"
          />
        </View>

        {/* Info Produk */}
        <View style={styles.detailSection}>
          <View style={styles.rowTitle}>
            <Text style={[styles.productName, { fontSize: width * 0.07 }]}>
              {product?.name}
            </Text>
            
            {/* FITUR PILIH UKURAN */}
            <View style={styles.sizeRow}>
              {["S", "M", "L", "XL"].map((size) => (
                <TouchableOpacity 
                  key={size} 
                  style={[
                    styles.sizeBox, 
                    selectedSize === size && styles.sizeBoxSelected
                  ]} 
                  onPress={() => setSelectedSize(size)}
                >
                  <Text style={[
                    styles.sizeText, 
                    selectedSize === size && styles.sizeTextSelected
                  ]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Text style={[styles.price, { fontSize: width * 0.055 }]}>
            Rp {Number(product?.price).toLocaleString()}
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionLabel}>Description</Text>
          <Text style={[styles.desc, { fontSize: width * 0.038 }]}>
            {product?.description || "Deskripsi tidak ditemukan di database."}
          </Text>
          
          <View style={{ height: 120 }} />
        </View>
      </ScrollView>

      {/* Footer Button - Pill Style & Centered */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.addToCartButton, adding && { opacity: 0.7 }]} 
          onPress={handleAddToCart}
          disabled={adding}
        >
          {adding ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <View style={styles.buttonContent}>
              <Ionicons name="cart-outline" size={width * 0.05} color="#fff" style={{ marginRight: 8 }} />
              <Text style={[styles.addToCartText, { fontSize: width * 0.04 }]}>
                ADD TO CART
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: "5%",
    paddingTop: 50,
    paddingBottom: 15,
  },
  iconButton: { backgroundColor: "#f2f2f2", padding: 10, borderRadius: 12 },
  title: { fontWeight: "bold", color: "#000", letterSpacing: 1 },
  imageContainer: {
    width: "100%",
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: "90%", height: "90%" },
  detailSection: { paddingHorizontal: "6%", paddingTop: 20 },
  rowTitle: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 5 },
  productName: { fontWeight: "bold", color: "#000", flex: 1, marginRight: 10 },
  price: { color: "#444", fontWeight: "600", marginTop: 5 },
  
  // STYLING UKURAN
  sizeRow: { flexDirection: "row" },
  sizeBox: { 
    backgroundColor: "#eee", 
    width: 38, 
    height: 38, 
    justifyContent: "center", 
    alignItems: "center", 
    borderRadius: 10, 
    marginLeft: 8, 
    borderWidth: 1, 
    borderColor: "#ddd" 
  },
  sizeBoxSelected: {
    backgroundColor: "#000", // Hitam saat dipilih
    borderColor: "#000",
  },
  sizeText: { fontWeight: "bold", fontSize: 13, color: "#000" },
  sizeTextSelected: {
    color: "#fff", // Putih saat dipilih
  },

  divider: { height: 1, backgroundColor: "#eee", marginVertical: 20 },
  sectionLabel: { fontSize: 16, fontWeight: "bold", color: "#000", marginBottom: 8 },
  desc: { color: "#666", lineHeight: 24, textAlign: "justify" },
  
  footer: { 
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingVertical: 20,
    backgroundColor: "rgba(255,255,255,0.92)",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    alignItems: "center",
  },
  addToCartButton: { 
    backgroundColor: "#000",
    borderRadius: 30,
    paddingVertical: 14, 
    paddingHorizontal: 40,
    minWidth: "65%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonContent: { flexDirection: "row", alignItems: "center" },
  addToCartText: { color: "#fff", fontWeight: "bold", letterSpacing: 0.5 },
});