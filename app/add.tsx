import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ProductCard from "./component/productCard";

export default function ProductCrud() {
  const [products, setProducts] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Tambah atau update produk
  const handleSave = () => {
    if (!name || !price) return alert("Nama dan harga harus diisi!");

    const newProduct = {
      name,
      price: parseFloat(price),
      description,
    };

    if (editIndex !== null) {
      const updated = [...products];
      updated[editIndex] = newProduct;
      setProducts(updated);
      setEditIndex(null);
    } else {
      setProducts([...products, newProduct]);
    }

    // reset form
    setName("");
    setPrice("");
    setDescription("");
    setShowForm(false);
  };

  // Edit produk
  const handleEdit = (index: number) => {
    const product = products[index];
    setName(product.name);
    setPrice(product.price.toString());
    setDescription(product.description);
    setEditIndex(index);
    setShowForm(true);
  };

  // Hapus produk
  const handleDelete = (index: number) => {
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);
  };

  return (
    <View style={styles.container}>
      {/* Tombol Tambah Produk */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowForm(!showForm)}
      >
        <Text style={styles.addButtonText}>
          {showForm ? "Tutup Form" : "Tambah Produk"}
        </Text>
      </TouchableOpacity>

      {/* Form Tambah/Edit Produk */}
      {showForm && (
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Nama Produk"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Harga"
            keyboardType="numeric"
            style={styles.input}
            value={price}
            onChangeText={setPrice}
          />
          <TextInput
            placeholder="Deskripsi (opsional)"
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>
              {editIndex !== null ? "Simpan Perubahan" : "Tambah Produk"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Daftar Produk */}
      <FlatList
        data={products}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item, index }) => (
          <View style={styles.cardWrapper}>
            <ProductCard item={item} onPress={() => {}} />
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.button, styles.editButton]}
                onPress={() => handleEdit(index)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={() => handleDelete(index)}
              >
                <Text style={styles.buttonText}>Hapus</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  addButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignSelf: "center",
    marginBottom: 12,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  formContainer: {
    backgroundColor: "#f0f0f0",
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  row: {
    justifyContent: "space-between",
  },
  cardWrapper: {
    width: "48%",
    backgroundColor: "#fafafa",
    borderRadius: 10,
    padding: 8,
    marginBottom: 16,
  },
  actionButtons: {
    marginTop: 8,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
    marginBottom: 6,
  },
  editButton: {
    backgroundColor: "#ffc107",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
