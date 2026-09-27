
import { useAuth } from '@/context/AuthContext'
import { Text, View } from 'react-native'

const Profile = () => {
  const {user} = useAuth()
  return (
    <View>
      <Text className='text-3xl'>Profile</Text>
      <View className='flex flex-col justify-between'>
        <Text>{user?.name}</Text>
        <Text>{user?.email}</Text>
      </View>
    </View>
  )
}

export default Profile