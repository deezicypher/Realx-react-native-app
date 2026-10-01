import FormInput from '@/components/forms/FormInput';
import PasswordInput from '@/components/forms/PasswordInput';
import images from '@/constants/images';
import { useAuth } from '@/context/AuthContext';
import { saveAccessToken } from '@/libs/auth-storage';
import { GoogleSignin } from '@/libs/google-auth';
import { SigninForm, signinSchema } from '@/schemas/auth.schema';
import instance from '@/services/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { statusCodes } from '@react-native-google-signin/google-signin';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

const Signin = () => {
  const { user, refreshUser } = useAuth();
  const router = useRouter();
  const { height } = useWindowDimensions();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninForm>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signInWithEmail = async (data: SigninForm) => {
    try {
      const response = await instance.post('/auth/login', {
        email: data.email.toLowerCase(),
        password: data.password,
      });

      await saveAccessToken(response.data.accessToken);
      await refreshUser();
    } catch (error: any) {
      console.error('❌ Email Login Error:', error.message);

      const message =
        error?.response?.data?.message ||
        'Unable to sign in. Please check your credentials.';

      Alert.alert('Sign In Failed', message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      await GoogleSignin.signOut()

      const response = await GoogleSignin.signIn();

      if (response.type !== 'success') {
        return;
      }

      const { idToken } = response.data;

      if (!idToken) {
        Alert.alert(
          'Login Failed',
          'Google did not return an ID token. Please try again.',
        );
        return;
      }

      const res = await instance.post('/auth/google', {
        idToken,
      });

      await saveAccessToken(res.data.accessToken);
      await refreshUser();
    } catch (error: any) {
      console.error('❌ Google Sign-In Error:', error.message);

      if (error?.code === statusCodes.IN_PROGRESS) {
        return;
      }

      if (error?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert(
          'Google Play Services Required',
          'Please update or enable Google Play Services and try again.',
        );
        return;
      }

      Alert.alert(
        'Google Login Failed',
        error?.response?.data?.message ||
          error?.message ||
          'Something went wrong while signing in with Google.',
      );
    }
  };



  return (
    <SafeAreaView className="flex-1 bg-white">

      <KeyboardAwareScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{
          paddingBottom: 40
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        extraScrollHeight={100}
        extraHeight={100}
      >
        <Image
          source={images.onboarding}
          style={{ height: height * 0.40 }}
          className="w-full"
          resizeMode="cover"
        />

        <View className="px-6 pt-7">
          <Text className="font-rubik-medium text-sm uppercase tracking-wider text-black-200">
            Welcome back
          </Text>

          <Text className="font-rubik-bold text-3xl text-black-300 mt-2">
            Sign in to Realx
          </Text>

          <Text className="font-rubik text-base text-black-200 mt-2">
            Find your next place to call home.
          </Text>

          {/* Email */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            )}
          />

          {/* Password */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <PasswordInput
                label="Password"
                value={value}
                onChangeText={onChange}
                error={errors.password?.message}
              />
            )}
          />

          {/* Forgot password */}
          <TouchableOpacity
            onPress={() => {
              // Add forgot password route later
            }}
            className="self-end mt-3"
          >
            <Text className="font-rubik-medium text-sm text-primary-300">
              Forgot password?
            </Text>
          </TouchableOpacity>

          {/* Sign in */}
          <TouchableOpacity
            onPress={handleSubmit(signInWithEmail)}
            disabled={isSubmitting}
            className="h-14 rounded-2xl bg-primary-300 items-center justify-center mt-6"
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="font-rubik-semibold text-base text-white">
                Sign In
              </Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center my-7">
            <View className="flex-1 h-[1px] bg-gray-200" />

            <Text className="font-rubik text-sm text-gray-400 mx-4">
              OR
            </Text>

            <View className="flex-1 h-[1px] bg-gray-200" />
          </View>

          {/* Google */}
          <TouchableOpacity
            onPress={signInWithGoogle}
            disabled={isSubmitting}
            className="h-14 rounded-2xl border border-gray-200 bg-white items-center justify-center"
          >
            <View className="flex-row items-center">
              <Image
                source={images.google}
                className="size-5"
                resizeMode="contain"
              />

              <Text className="font-rubik-medium text-base text-black-300 ml-3">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>

          {/* Signup */}
          <View className="flex-row justify-center mt-7">
            <Text className="font-rubik text-sm text-black-200">
              Don't have an account?{' '}
            </Text>

            <TouchableOpacity
              onPress={() =>
                router.push('/(root)/(auth)/sign-up')
              }
            >
              <Text className="font-rubik-semibold text-sm text-primary-300">
                Create account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>

    </SafeAreaView>
  );
};

export default Signin;