import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" /> 
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="katalog" />
      <Stack.Screen name="detail" />
      <Stack.Screen name="admin/index" />
    </Stack>
  );
}