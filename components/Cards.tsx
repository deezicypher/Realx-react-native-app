import icons from '@/constants/icons';
import images from '@/constants/images';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    onPress?: () => void;
}

export const FeaturedCard  = ({onPress}: Props) => {
  return (
    <TouchableOpacity 
        onPress={onPress} 
        className='flex flex-col items-start w-60 h-80 relative'
    >
        <Image source={images.japan} className="size-full flex-col rounded-2xl"/>
        <View className='absolute rounded-2xl inset-0 bg-black/35' />

        <View className='flex flex-row items-center bg-white/90 px-3 py-1.5 
        rounded-full absolute top-5 right-5'>
            <Image source={icons.star} className='size-3.5' />
            <Text className='text-xs font-rubik-bold text-primary-300 ml-1'>4.4</Text>
        </View>
            
        <View className='flex flex-col items-start absolute bottom-5 inset-x-5'>
            <Text className='text-xl font-rubik-extrabold text-white' 
            numberOfLines={1}>
                Nature, Apartment
            </Text>
            <Text className='text-base font-rubik text-white'>
                Tokyo, Japan
            </Text>

            <View className='flex flex-row items-center justify-between w-full'>
                <Text className='text-xl font-rubik-extrabold text-white'>
                    $4,500
                </Text>
                <Image source={icons.heart} className='size-5' />
            </View>
        </View>
    </TouchableOpacity>
  )
}

export const Card = ({onPress}:Props) => {
    return (
        <TouchableOpacity onPress={onPress} className='flex-1 w-full mt-4 px-3 py-4 rounded-lg
         bg-white shadow-lg shadow-black-100/70 relative'>
            
        <View className='flex flex-row items-center bg-white/90 px-2 py-1 
        rounded-full absolute top-5 right-5 z-50'>
            <Image source={icons.star} className='size-2.5' />
            <Text className='text-xs font-rubik-bold text-primary-300 ml-1'>4.4</Text>
        </View>
        <Image source={images.newYork} className='w-full h-40 rounded-lg' />
        <View className='flex flex-col mt-2'>
            <Text className='text-xl font-rubik-bold text-black-300' 
            numberOfLines={1}>
                Modern Studio
            </Text>
            <Text className='text-xs font-rubik text-black-200'>
                5th Avenue, NewYork
            </Text>

            <View className='flex flex-row items-center justify-between mt-2'>
                <Text className='text-base font-rubik-bold text-primary-300'>
                    $4,500
                </Text>
                <Image source={icons.heart} className='size-5 mr-2' tintColor="#191d31" />
            </View>
        </View>

        </TouchableOpacity>
    )
}