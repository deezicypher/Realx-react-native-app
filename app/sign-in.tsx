import { google, onboarding } from '@/constants/images'
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'

const Signin = () => {

  const handleLogin = () => {

  }

  return (
    <SafeAreaView className='bg-white h-full'>
      <ScrollView contentContainerClassName="h-full">
        <Image source={onboarding} className='w-full h-4/6' resizeMode='cover' />
        <View className="px-5 mt-5">
            <Text className="text-base text-center uppercase font-rubik text-black-200">
              Welcome to Realx
            </Text>
            <Text className='font-rubik-bold text-3xl mt-2 text-black-300 text-center'>
              Let's Get You Closer To {"\n"} <Text className='text-primary-300'>Your Idea Home</Text>
            </Text>
            <Text className='text-lg font-rubik text-center mt-12 text-black-200'>
              Login to Realx with Google
            </Text>

            <TouchableOpacity onPress={handleLogin} className='bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5'>
                <View className='flex flex-row items-center justify-center'>
                  <Image source={google} className='size-6' resizeMode='contain' />
                  <Text className='text-lg font-rubik-medium text-black-300 ml-2'>Continue with Google</Text>
                </View>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Signin