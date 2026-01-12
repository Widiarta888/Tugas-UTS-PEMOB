import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuBurger from "./component/menuBurger";
// Import supabase client
import { supabase } from "../lib/supabase";

export default function Katalog() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<any[]>([]); // State untuk data dari Supabase
  const [loading, setLoading] = useState(true);

  // Ambil data dari Supabase saat komponen dibuka
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter pencarian berdasarkan nama
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() =>
        router.push({
          pathname: "/detail",
          params: { id: item.id }, // Kirim ID saja agar halaman detail bisa fetch ulang data lengkap
        })
      }
    >
      {/* Menggunakan uri karena gambar dari database berbentuk link URL */}
      <Image 
        source={{ uri: item.image_url }} 
        style={styles.productImage} 
        resizeMode="cover" 
      />
      <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.productPrice}>Rp {item.price.toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#555" />
          <TextInput
            placeholder="Search Jacket"
            placeholderTextColor="#777"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Menu Burger Component */}
        <MenuBurger />
      </View>

      {/* Loading State */}
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{ marginTop: 15, paddingBottom: 20 }}
          ListEmptyComponent={
            <Text style={{ textAlign: "center", marginTop: 20, color: "#777" }}>
              Tidak ada produk ditemukan.
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    paddingHorizontal: 10,
    flex: 1,
    height: 40,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 6,
    color: "#333",
  },
  productCard: {
    backgroundColor: "#fafafa",
    borderRadius: 12,
    padding: 8,
    marginBottom: 14,
    width: "48%",
    // Menambah bayangan halus agar mirip desain Anda
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    backgroundColor: "#eee", // Placeholder saat loading gambar
  },
  productName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000",
    marginTop: 6,
  },
  productPrice: {
    fontSize: 12,
    color: "#555",
    marginTop: 3,
  },
});