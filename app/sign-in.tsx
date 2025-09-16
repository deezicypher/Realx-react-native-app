import { onboarding } from '@/constants/images'
import React from 'react'
import { Image, ScrollView } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'

const Signin = () => {
  return (
    <SafeAreaView className='bg-white h-full'>
      <ScrollView contentContainerClassName="h-full">
        <Image source={onboarding} className='w-full h-4/6' resizeMode='cover' />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Signin