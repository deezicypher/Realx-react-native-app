import images from '@/constants/images';
import { useAuth } from '@/context/AuthContext';
import { saveAccessToken } from '@/libs/auth-storage';
import { GoogleSignin } from '@/libs/google-auth';
import instance from '@/services/api';
import { statusCodes } from '@react-native-google-signin/google-signin';
import { useRouter } from 'expo-router';
import { Alert, Image, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
  
const AuthHome = () => {
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





  return (
    <SafeAreaView className='bg-white h-full'>
      <ScrollView contentContainerClassName="pb-8" showsVerticalScrollIndicator={false}>
        <Image source={images.onboarding} style={{ height: height * (1/ 2) }} className='w-full ' resizeMode='cover' />
        <View className="px-5 mt-5">
            <Text className="text-base text-center uppercase font-rubik text-black-200">
              Welcome to Realx
            </Text>
            <Text className="font-rubik-bold text-3xl text-black-300 text-center mt-2">
            Find a place you'll
            {'\n'}
            <Text className="text-primary-300">
              love to call home.
            </Text>
            </Text>
          <Text className="font-rubik text-base text-black-200 text-center mt-4">
            Discover beautiful homes, explore properties,
            and find the perfect place for your next chapter.
          </Text>

          <TouchableOpacity
            onPress={() => router.push('/(root)/(auth)/sign-in')}
            className="h-14 rounded-2xl bg-primary-300 items-center justify-center mt-8"
          >
            <Text className="font-rubik-semibold text-base text-white">
              Sign In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(root)/(auth)/sign-up')}
            className="h-14 rounded-2xl border border-gray-200 items-center justify-center mt-4"
          >
            <Text className="font-rubik-semibold text-base text-black-300">
              Create an Account
            </Text>
          </TouchableOpacity>

   
            <TouchableOpacity onPress={signInWithGoogle}  className='bg-white shadow-md shadow-zinc-300 mb-5 rounded-full w-full py-4 mt-5 border border-gray-400'>
                <View className='flex flex-row items-center justify-center'>
                  <Image source={images.google} className='size-6' resizeMode='contain' />
                  <Text className='text-lg font-rubik-medium text-black-300 ml-2'>Continue with Google</Text>
                </View>
            </TouchableOpacity>
                   <Text className="font-rubik text-sm text-gray-400 text-center mt-6">
            Your next home could be one search away.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AuthHome