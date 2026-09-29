import icons from "@/constants/icons";
import images from "@/constants/images";
import { useAuth } from "@/context/AuthContext";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const {user} = useAuth()


  return (
    <SafeAreaView className="bg-white h-full">
      <View className="px-5">
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center">
          <Image source={user?.photo ? {uri:user.photo} : images.avatar} 
          className="rounded-full size-12"/>
          <View className="flex flex-col items-start ml-2 justify-center">
            <Text className="text-xs font-rubik text-black-100">
              Good Morning
            </Text>
            <Text className="text-base font-rubik-medium text-black-300">
              {user?.name}
            </Text>
          </View>
          </View>
          <Image source={icons.bell } className="size-6" />
        </View>
     
    </View>
    </SafeAreaView>
  );
}
