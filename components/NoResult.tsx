import images from "@/constants/images"
import { Image, Text, View } from "react-native"

const NoResult = () => {
  return (
    <View className="flex items-center my-5">
        <Image source={images.noresult} className="w-3/4 h-80" resizeMode="contain" />
        <Text className="text-2xl font-rubik-bold text-black-300 mt-5">
            No Results Found
        </Text>
        <Text className="text-base text-center font-rubik text-black-200 mt-2">
            Try adjusting your search or filter to find what you're looking for.
        </Text>
    </View>
  )
}

export default NoResult