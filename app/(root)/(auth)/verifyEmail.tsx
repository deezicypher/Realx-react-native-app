import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VerifyEmail() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 justify-center">
        {/* Success Icon */}
        <View className="items-center mb-8">
          <View className="w-24 h-24 rounded-full bg-primary-300/10 items-center justify-center">
            <View className="w-16 h-16 rounded-full bg-primary-300 items-center justify-center">
              <Text className="text-white text-3xl font-rubik-bold">
                ✓
              </Text>
            </View>
          </View>
        </View>

        {/* Heading */}
        <View className="items-center">
          <Text className="text-3xl font-rubik-bold text-black-300 text-center">
            Account created 🎉
          </Text>

          <Text className="text-base font-rubik text-black-200 text-center mt-4 leading-6">
            We've sent a verification link to your email.
            Verify your email before signing in.
          </Text>
        </View>

        {/* Email Icon / Hint */}
        <View className="bg-gray-50 rounded-2xl p-5 mt-8">
          <Text className="text-center text-sm font-rubik-medium text-black-300">
            Check your inbox
          </Text>

          <Text className="text-center text-sm font-rubik text-black-200 mt-2 leading-5">
            If you don't see the email, check your spam or junk folder.
          </Text>
        </View>

        {/* Continue */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.replace('/(root)/(auth)/sign-in')}
          className="h-14 rounded-2xl bg-primary-300 items-center justify-center mt-8"
        >
          <Text className="text-white font-rubik-semibold text-base">
            Continue to Sign In
          </Text>
        </TouchableOpacity>

        {/* Bottom text */}
        <View className="items-center mt-6">
          <Text className="text-sm font-rubik text-black-200">
            Already verified your email?
          </Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.replace('/(root)/(auth)/sign-in')}
          >
            <Text className="text-sm font-rubik-semibold text-primary-300 mt-1">
              Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}