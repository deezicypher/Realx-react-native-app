import icons from '@/constants/icons';
import { PropertyRecord } from '@/types/property';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface Props {
    onPress?: () => void;
    item: PropertyRecord;
}

export const FeaturedCard  = ({onPress, item}: Props) => {
  return (
    <TouchableOpacity  
        onPress={onPress} 
        className='flex flex-col items-start w-60 h-80 relative'
    >
        <Image source={{ uri: item.image }} className="size-full flex-col rounded-2xl"/>
        <View className='absolute rounded-2xl inset-0 bg-black/35' />

        <View className='flex flex-row items-center bg-white/90 px-3 py-1.5 
        rounded-full absolute top-5 right-5'>
            <Image source={icons.star} className='size-3.5' />
            <Text className='text-xs font-rubik-bold text-primary-300 ml-1'>{item.rating}</Text>
        </View>
            
        <View className='flex flex-col items-start absolute bottom-5 inset-x-5'>
            <Text className='text-xl font-rubik-extrabold text-white' 
            numberOfLines={1}>
                {item.name}
            </Text>
            <Text className='text-base font-rubik text-white'>
                {item.address}
            </Text>

            <View className='flex flex-row items-center justify-between w-full'>
                <Text className='text-xl font-rubik-extrabold text-white'>
                    ${item.price.toLocaleString()}
                </Text>
                <Image source={icons.heart} className='size-5' />
            </View>
        </View>
    </TouchableOpacity>
  )
}

export const Card = ({onPress,item:{image, name, price, rating,address}}:Props) => {
    return (
        <TouchableOpacity onPress={onPress} className='flex-1 w-full mt-4 px-3 py-4 rounded-lg
         bg-white shadow-lg shadow-black-100/70 relative'>
            
        <View className='flex flex-row items-center bg-white/90 px-2 py-1 
        rounded-full absolute top-5 right-5 z-50'>
            <Image source={icons.star} className='size-2.5' />
            <Text className='text-xs font-rubik-bold text-primary-300 ml-1'>{rating}</Text>
        </View>
        <Image source={{ uri: image }} className='w-full h-40 rounded-lg' />
        <View className='flex flex-col mt-2'>
            <Text className='text-xl font-rubik-bold text-black-300' 
            numberOfLines={1}>
                {name}
            </Text>
            <Text className='text-xs font-rubik text-black-200'>
                {address}
            </Text>

            <View className='flex flex-row items-center justify-between mt-2'>
                <Text className='text-base font-rubik-bold text-primary-300'>
                    ${price.toLocaleString()}
                </Text>
                <Image source={icons.heart} className='size-5 mr-2' tintColor="#191d31" />
            </View>
        </View>

        </TouchableOpacity>
    )
}