
import { settings } from '@/constants/data'
import icons from '@/constants/icons'
import images from '@/constants/images'
import { useAuth } from '@/context/AuthContext'
import { Image, ImageSourcePropType, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const SettingsItem = ({icon,title, onPress, textStyle, showArrow=true}
  :{icon:ImageSourcePropType, title:string, onPress?:()=>void, textStyle?:string, showArrow?:boolean}
) => (
  <TouchableOpacity className='flex flex-row items-center justify-between py-3'>
    <View className='flex flex-row items-center gap-3'>
      <Image source={icon} className='size-6'/>
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>
        {title}
      </Text>
    </View>
    {showArrow && <Image source={icons.rightArrow} className='size-5' />}
  </TouchableOpacity>
)

const Profile = () => {
  const {user, logout} = useAuth()
  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName='pb-40 px-7'
        >
          <View className='flex flex-row items-center justify-between mt-5'>
            <Text className='text-xl font-rubik-bold'>Profile</Text>
                <Image source={icons.bell} className='size-6' />
          </View>

          <View className='flex flex-row justify-center mt-5'>
            <View className='flex flex-col items-center relative mt-5'>
                <Image source={user?.photo ? { uri: user.photo } : images.avatar} className='size-44 rounded-full relative' />
                <TouchableOpacity className='absolute bottom-11 right-2'>
                  <Image source={icons.edit} className='size-9 '/>
                </TouchableOpacity>
                <Text className='text-2xl font-rubik-bold mt-2'>{user?.name}</Text>
            </View>
          </View>

          <View className='flex flex-col mt-10 gap-3'>
            <SettingsItem icon={icons.calendar} title='My Bookings' />
            <SettingsItem icon={icons.wallet} title='Payments' />
          </View>

          <View className='flex flex-col mt-5 border-t pt-5 border-primary-200'>
              {settings.slice(2).map((item,index) => (
                <SettingsItem key={index} {...item} />
              ))}  
          </View>

          <View className='flex flex-col mt-5 border-t pt-5 border-primary-200'>
            <SettingsItem icon={icons.logout} title='Logout' textStyle='text-danger'
            showArrow={false} onPress={logout}
            />
          </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Profile