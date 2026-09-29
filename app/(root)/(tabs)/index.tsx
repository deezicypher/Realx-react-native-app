import { useAuth } from "@/context/AuthContext";
import { Link, Redirect } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const {user,logout} = useAuth()

    if (!user) {
    return <Redirect href="/(root)/(auth)" />;
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className=" text-3xl  font-rubik">Welcome to Realx</Text>
      <Link href="/(root)/(auth)/sign-in">
  <Text>Sign In</Text>
</Link>


<Pressable onPress={logout} className="bg-red-800 px-6 py-2 mt-10 rounded-md">
      <Text className="text-white">
        Logout
        </Text>
</Pressable>
    </View>
  );
}
