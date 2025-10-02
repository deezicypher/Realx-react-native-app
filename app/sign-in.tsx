import { google, onboarding } from '@/constants/images';
import { instance } from '@/services/api';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect } from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

WebBrowser.maybeCompleteAuthSession()

const Signin = () => {

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      if (authentication?.accessToken) {
        sendTokenToApi(authentication.accessToken);
      }
      console.log("✅ Logged in!", authentication?.accessToken);
    }
    if (response?.type === "error") {
      console.log("Auth error:", response.error);
      Alert.alert('Authentication Error', response.error?.toString() || 'Unknown error occurred');
    }
    if (response?.type === "cancel") {
      console.log("Auth cancelled by user");
    }
  }, [response]);

  const sendTokenToApi = async (accessToken: string) => {
    try {
      const res = await instance.post('google/signup', {
        access_token: accessToken,
      });

      const user = res.data.user;
      Alert.alert('Welcome', `${user.name} (${user.email})`);
      // Store user/token, navigate, etc.
    } catch (err) {
      console.error('API Error:', err);
      Alert.alert('Login failed', 'Could not log in with Google');
    }
  };
 

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

            <TouchableOpacity disabled={!request} onPress={() => promptAsync()}  className='bg-white shadow-md shadow-zinc-300 mb-5 rounded-full w-full py-4 mt-5'>
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