import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
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

export default function Katalog() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item, index }: any) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() =>
        router.push({
          pathname: "/detail",
          params: {
            name: item.name,
            price: item.price,
            id: index.toString(),
          },
        })
      }
    >
      <Image source={item.image} style={styles.productImage} resizeMode="cover" />
      <Text style={styles.productName}>{item.name}</Text>
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

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ marginTop: 15, paddingBottom: 20 }}
      />

    </SafeAreaView>
  );
}

const products = [
  {
    name: "Green Olive Bomber Jacket",
    price: 200000,
    image: require("../assets/images/bomber2.png"),
  },
  {
    name: "Black Bomber Jacket",
    price: 200000,
    image: require("../assets/images/bomber1.png"),
  },
  {
    name: "Denim Jacket Dark Theme",
    price: 174000,
    image: require("../assets/images/denim2.png"),
  },
  {
    name: "Denim Jacket",
    price: 155000,
    image: require("../assets/images/denim1.png"),
  },
  {
    name: "Blue Denim Sherpa Jacket",
    price: 210000,
    image: require("../assets/images/sherpa2.png"),
  },
  {
    name: "Black Denim Sherpa Jacket",
    price: 214000,
    image: require("../assets/images/sherpa1.png"),
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
  productCard: {
    backgroundColor: "#fafafa",
    borderRadius: 12,
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
