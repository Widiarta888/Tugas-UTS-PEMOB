import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList, Image,
    StyleSheet,
    Text,
    TextInput, TouchableOpacity,
    View
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function AdminPanel() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  
  // State untuk Form
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    setProducts(data || []);
  };

  const handleAddProduct = async () => {
    if (!name || !price || !image) {
      Alert.alert("Error", "Isi semua data penting!");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("products").insert([
      { name, price: parseInt(price), image_url: image, description: desc }
    ]);

    if (error) {
      Alert.alert("Gagal", error.message);
    } else {
      Alert.alert("Sukses", "Produk berhasil ditambahkan");
      setName(""); setPrice(""); setImage(""); setDesc("");
      fetchProducts(); // Refresh list
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    Alert.alert("Hapus", "Yakin ingin menghapus produk ini?", [
      { text: "Batal" },
      { text: "Hapus", style: "destructive", onPress: async () => {
        await supabase.from("products").delete().eq("id", id);
        fetchProducts();
      }}
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MANAGE PRODUCTS</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={products}
        ListHeaderComponent={
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Tambah Produk Baru</Text>
            <TextInput style={styles.input} placeholder="Nama Jaket" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Harga (Angka)" keyboardType="numeric" value={price} onChangeText={setPrice} />
            <TextInput style={styles.input} placeholder="Link Gambar (URL)" value={image} onChangeText={setImage} />
            <TextInput style={[styles.input, { height: 80 }]} placeholder="Deskripsi" multiline value={desc} onChangeText={setDesc} />
            
            <TouchableOpacity style={styles.addButton} onPress={handleAddProduct} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.addButtonText}>SIMPAN PRODUK</Text>}
            </TouchableOpacity>
          </View>
        }
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Image source={{ uri: item.image_url }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>Rp {item.price.toLocaleString()}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: { flexDirection: "row", justifyContent: "space-between", padding: 20, paddingTop: 50, backgroundColor: "#fff" },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  formCard: { backgroundColor: "#fff", margin: 15, padding: 20, borderRadius: 15, elevation: 3 },
  formTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 15 },
  input: { backgroundColor: "#f9f9f9", borderRadius: 10, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: "#eee" },
  addButton: { backgroundColor: "#000", padding: 15, borderRadius: 10, alignItems: "center", marginTop: 10 },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  productItem: { flexDirection: "row", backgroundColor: "#fff", marginHorizontal: 15, marginBottom: 10, padding: 10, borderRadius: 12, alignItems: "center" },
  itemImage: { width: 50, height: 50, borderRadius: 8 },
  itemInfo: { flex: 1, marginLeft: 15 },
  itemName: { fontWeight: "bold", fontSize: 14 },
  itemPrice: { color: "#666", fontSize: 12 }
});