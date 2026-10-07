import { Card } from "@/components/Cards";
import Filter from "@/components/Filter";
import NoResult from "@/components/NoResult";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import instance from '@/services/api';
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Explore = () => {
   const params = useLocalSearchParams<{query?:string, filter?:string}>()

  const getProperties = async () => { 
    
    const res = await instance.get(`/properties/search?query=${params.query}&limit=20&filter=${params.filter}`);
    return res.data;
  }

  const {data: properties,isLoading, refetch} = useQuery({ queryKey: ['properties'], queryFn: getProperties })


  const handleCardPress = (id:string) => {
    router.push(`/properties/${id}`)
  }

  useEffect(() => {
    refetch()
  }, [params.query, params.filter])
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
      ListEmptyComponent={
        isLoading? <ActivityIndicator size="large" className="text-primary-300"/>
        :
        <NoResult/>
      }
      onRefresh={refetch}
      refreshing={isLoading}
      ListHeaderComponent={
       <View className="px-5">
        <View className="flex flex-row w-full items-center justify-between mt-5">
          <TouchableOpacity onPress={() => router.back()}>
            <Image source={icons.backArrow} className="size-6"/>
          </TouchableOpacity>
          <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">Explore Properties</Text>
          <Image source={icons.bell} className="size-6"/>
        </View>
        <Search/>
        <View className="mt-5">
          <Filter/>
          <Text className="mt-5 font-rubik-bold text-black-300  text-xl">Found {properties?.length} properties</Text>
        </View>
       </View>
      }

      />

 




    </SafeAreaView>
  )
}

export default Explore