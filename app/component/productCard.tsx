import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function ProductCard({ item }: any) {
  return (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>Rp {item.price.toLocaleString()}</Text>
      {item.description ? (
        <Text style={styles.desc}>{item.description}</Text>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  price: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
  },
  desc: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
});
