import { google, onboarding } from '@/constants/images';
import { useAuth } from '@/context/AuthContext';
import { saveAccessToken } from '@/libs/auth-storage';
import { GoogleSignin } from '@/libs/google-auth';
import instance from '@/services/api';
import { statusCodes } from '@react-native-google-signin/google-signin';
import { Redirect, useRouter } from 'expo-router';
import { Alert, Image, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
  
const Signin = () => {
  const {user} = useAuth();

  const router = useRouter();

  const {refreshUser} = useAuth();

  const {height} = useWindowDimensions();

  const signInWithGoogle = async () => {
    try {
      // Make sure Google Play Services are available.
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      await GoogleSignin.signOut();

      // Open the native Google Sign-In flow.
      const response = await GoogleSignin.signIn();

      if (response.type !== "success") { 
        console.log("Google Sign-In cancelled"); 
        return; 
      } 
   
      const {  idToken } = response.data;
      

      if (!idToken) { 
        Alert.alert( "Login failed", "Google did not return an ID token. Please try again." ); 
        return; 
      }

      // Send the Google ID token to your backend.
      const res = await instance.post("auth/google", { idToken }); 
  
      // Store your backend token/session.
      await saveAccessToken(res.data.accessToken);
      await refreshUser()

     // Navigate to the main Realx app.
      // router.push('/(root)/(tabs)/profile')


    } catch (error:any) {
      console.error("❌ Google Sign-In Error:", error);
       if (error?.code === statusCodes.IN_PROGRESS) { 
        console.log("Google Sign-In is already in progress."); 
        return; 
      } if (error?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          Alert.alert(
            "Google Play Services Required",
            "Please update or enable Google Play Services and try again."
           ); 
          return; 
        } 
        Alert.alert( "Google Login Failed", error?.message || "Something went wrong while signing in with Google." ); 
      }
    };


  if (user) {
    return <Redirect href="/(root)/(tabs)" />;
  }


  return (
    <SafeAreaView className='bg-white h-full'>
      <ScrollView contentContainerClassName="pb-8" showsVerticalScrollIndicator={false}>
        <Image source={onboarding} style={{ height: height * (1/ 2) }} className='w-full ' resizeMode='cover' />
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

            <TouchableOpacity onPress={signInWithGoogle}  className='bg-white shadow-md shadow-zinc-300 mb-5 rounded-full w-full py-4 mt-5 border border-gray-400'>
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