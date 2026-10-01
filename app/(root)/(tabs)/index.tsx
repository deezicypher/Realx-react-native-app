import { Card, FeaturedCard } from "@/components/Cards";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { useAuth } from "@/context/AuthContext";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const {user} = useAuth()


  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="pb-40" className="px-5">
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
     <Search/>

     <View className="my-10">
      <View className="flex flex-row items-center justify-between">
        <Text className="text-xl font-rubik-bold text-black-300">
          Featured
        </Text>
        <TouchableOpacity>
          <Text className="text-base font-rubik-bold text-primary-300" >See All</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row gap-5 mt-5">
        <FeaturedCard />
        <FeaturedCard />
        <FeaturedCard />
     </View>
     </View>

      <View className="flex flex-row items-center justify-between">
        <Text className="text-xl font-rubik-bold text-black-300">
          Our Recommendation 
        </Text>
        <TouchableOpacity>
          <Text className="text-base font-rubik-bold text-primary-300" >See All</Text>
        </TouchableOpacity>
      </View>
     <View className="flex flex-row mt-5">
        <Card/>
        <Card/>
  
     </View>

    </ScrollView>
    </SafeAreaView>
  );
}
