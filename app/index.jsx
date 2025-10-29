import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20}}>Selamat Datang di Jacket4Sale</Text>

      <TouchableOpacity
        onPress={() => router.push("/home")}
        style={{
          backgroundColor: "black",
          padding: 10,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white" }}>Klik disini</Text>
      </TouchableOpacity>
    </View>
  );
}
