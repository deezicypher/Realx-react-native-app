import { useAuth } from "@/context/AuthContext";
import { Link, Redirect } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const {user,logout} = useAuth()

    if (!user) {
    return <Redirect href="/sign-in" />;
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
      <Link href="/sign-in">
  <Text>Sign In</Text>
</Link>
<Link href="/explore">
  <Text>Explore</Text>
</Link>
<Link href="/profile">
  <Text>Profile</Text>
</Link>
<Link href="/properties/1">
  <Text>Property</Text>
</Link>

<Pressable onPress={logout} className="bg-red-800 px-6 py-2 mt-10 rounded-md">
      <Text className="text-white">
        Logout
        </Text>
</Pressable>
    </View>
  );
}
