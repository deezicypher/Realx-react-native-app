import { Card, FeaturedCard } from "@/components/Cards";
import Filter from "@/components/Filter";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { useAuth } from "@/context/AuthContext";
import instance from '@/services/api';
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const {user} = useAuth()
  const params = useLocalSearchParams<{query?:string, filter?:string}>()

  const getLatestProperties = async () => {
    const res = await instance.get('/properties');
    return res.data;
  }
  const {data: latestProperties,isLoading: latestPropertiesLoading} = useQuery({ queryKey: ['latest-properties'], queryFn: getLatestProperties })
  
  const getProperties = async () => {
    const res = await instance.get(`/properties?query=${params.query},limit=6,filter=${params.filter}`);
    return res.data;
  }

  const {data: properties,isLoading, refetch} = useQuery({ queryKey: ['properties'], queryFn: getProperties })


  const handleCardPress = (id:string) => {
    router.push(`/properties/${id}`)
  }
  

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList 
      data={properties}
      renderItem={({ item }) => <Card item={item} onPress={() => handleCardPress(item.id)}/>}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerClassName="pb-32" 
      columnWrapperClassName="flex gap-5 px-5"
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
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
      <FlatList data={latestProperties}
        renderItem={({item}) => <FeaturedCard item={item} onPress={() => handleCardPress(item.id)}/>}
        keyExtractor={(item) => item.id}
        bounces={true}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="flex gap-5 mt-5"
        />

     </View>

      <View className="flex flex-row items-center justify-between">
        <Text className="text-xl font-rubik-bold text-black-300">
          Our Recommendation 
        </Text>
        <TouchableOpacity>
          <Text className="text-base font-rubik-bold text-primary-300" >See All</Text>
        </TouchableOpacity>
      </View>
      <Filter/>
 
        </View>
      }

      />

 




    </SafeAreaView>
  );
}
