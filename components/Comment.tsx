import icons from '@/constants/icons'
import { ReviewRecord } from '@/types/review'
import { Image, Text, View } from 'react-native'

interface ReviewProps {
    item:ReviewRecord
}
const Comment = ({item}:ReviewProps) => {

  return (
        <View className='flex flex-col  mt-5'>
            <View className='flex flex-row items-start justify-start gap-3'>
                <Image source={{uri:item?.avatar}} className="size-14 rounded-full" />
                <Text className="text-black-300 text-base font-rubik-bold">
                    {item?.name}
                </Text>
            </View>
            <Text className='text-black-200 text-base font-rubik'>
                {item?.review}
            </Text>

            <View className='flex flex-row justify-between items-start mt-4'>
                <View className='flex flex-row items-start justify-start '>
                    <Image source={icons.heart} className='size-5' tintColor={"#0061FF"}/>
                    <Text className="text-black-300 text-sm font-rubik-medium ml-2">
                        120
                    </Text>
                </View>
                <Text className="text-black-100 text-sm font-rubik">
                {new Date(item.createdAt).toDateString()}
                </Text>
            </View>
          </View>
  )
}

export default Comment