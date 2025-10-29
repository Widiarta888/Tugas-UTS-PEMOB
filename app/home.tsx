import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuBurger from "./component/menuBurger";

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
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
       <MenuBurger/>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View style={styles.bannerContainer}>
          <ImageBackground
            source={require("../assets/banner.png")}
            style={styles.bannerBackground}
            imageStyle={{ borderRadius: 15 }}
          >
            <View style={styles.bannerOverlay} />
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>NEW COLLECTION</Text>
              <Text style={styles.bannerSubtitle}>
                Discount 30% for the first transaction
              </Text>
              <TouchableOpacity style={styles.bannerButton} onPress={()=> router.push("/katalog")}>
                <Text style={styles.bannerButtonText}>Check Product</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        {/* Top Seller Section */}
        <View style={styles.topSellerRow}>
          <Text style={styles.topSellerTitle}>Top Seller</Text>
          <TouchableOpacity onPress={() => router.push("/katalog")}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Product Grid (pakai filteredProducts) */}
        <View style={styles.productGrid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item, index) => (
              <TouchableOpacity key={index} style={styles.productCard}>
                <Image
                  source={item.image}
                  style={styles.productImage}
                  resizeMode="cover"
                />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>
                  Rp {item.price.toLocaleString()}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <View style={{ marginTop: 40, alignItems: "center", width: "100%" }}>
              <Ionicons name="alert-circle-outline" size={40} color="#999" />
              <Text style={{ marginTop: 10, color: "#999" }}>
                Produk tidak ditemukan
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      
    </SafeAreaView>
  );
}

const products = [
  {
    name: "Sherpa Jacket Denim Series",
    price: 160000,
    image: require("../assets/images/sherpa1.png"),
  },
  {
    name: "Sky Dragon Sukajan Jacket",
    price: 280000,
    image: require("../assets/images/sukajan4.png"),
  },
  {
    name: "Burning Phoenix Sukajan Jacket",
    price: 319000,
    image: require("../assets/images/sukajan8.png"),
  },
  {
    name: "Green Olive Bomber Jacket",
    price: 200000,
    image: require("../assets/images/bomber2.png"),
  },
];

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
  menuButton: {
    backgroundColor: "#f2f2f2",
    padding: 8,
    borderRadius: 10,
  },
  bannerContainer: {
    marginTop: 20,
    borderRadius: 15,
    overflow: "hidden",
    height: 150,
  },
  bannerBackground: {
    flex: 1,
    justifyContent: "center",
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(82, 82, 82, 0.35)",
  },
  bannerContent: {
    paddingHorizontal: 20,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  bannerSubtitle: {
    fontSize: 13,
    color: "#f0f0f0",
    marginTop: 5,
  },
  bannerButton: {
    backgroundColor: "#000",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  bannerButtonText: {
    color: "#fff",
    fontSize: 13,
  },
  topSellerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
  },
  topSellerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  viewAllText: {
    fontSize: 13,
    color: "#777",
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  productCard: {
    backgroundColor: "#fafafa",
    borderRadius: 10,
    padding: 8,
    marginBottom: 14,
    width: "48%",
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  productName: {
    fontSize: 13,
    fontWeight: "500",
    color: "#000",
    marginTop: 6,
  },
  productPrice: {
    fontSize: 12,
    color: "#555",
    marginTop: 3,
  },
});
