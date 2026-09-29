import FormInput from '@/components/forms/FormInput';
import PasswordInput from '@/components/forms/PasswordInput';
import { google, onboarding } from '@/constants/images';
import { useAuth } from '@/context/AuthContext';
import { saveAccessToken } from '@/libs/auth-storage';
import { GoogleSignin } from '@/libs/google-auth';
import {
  SignupForm,
  signupSchema,
} from '@/schemas/auth.schema';
import instance from '@/services/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { statusCodes } from '@react-native-google-signin/google-signin';
import { Redirect, useRouter } from 'expo-router';
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

const Signup = () => {
  const { user, refreshUser } = useAuth();
  const router = useRouter();
  const { height } = useWindowDimensions();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    },
  });

  const signupWithEmail = async (data: SignupForm) => {
    try {
      const response = await instance.post('/auth/register', {
        name: data.name.trim(),
        email: data.email.toLowerCase(),
        password: data.password,
      });

      Alert.alert(
        'Account Created 🎉',
        response.data?.msg ||
          'Please check your email to activate your account.',
        [
          {
            text: 'Continue',
            onPress: () => {
              router.replace('/(root)/(auth)/sign-in');
            },
          },
        ],
      );
    } catch (error: any) {
      console.error('❌ Signup Error:', error);

      const message =
        error?.response?.data?.message ||
        'Unable to create your account. Please try again.';

      const readableMessage = Array.isArray(message)
        ? message.join('\n')
        : message;

      Alert.alert(
        'Registration Failed',
        readableMessage,
      );
    }
  };

  const signUpWithGoogle = async () => {
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
          'Signup Failed',
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
      console.error('❌ Google Signup Error:', error);

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
        'Google Signup Failed',
        error?.response?.data?.message ||
          error?.message ||
          'Something went wrong while creating your account.',
      );
    }
  };

  if (user) {
    return <Redirect href="/(root)/(tabs)" />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAwareScrollView
        className="flex-1"
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
          source={onboarding}
          style={{ height: height * 0.30 }}
          className="w-full"
          resizeMode="cover"
        />

        <View className="px-6 pt-7">
          <Text className="font-rubik-medium text-sm uppercase tracking-wider text-black-200">
            Get started
          </Text>

          <Text className="font-rubik-bold text-3xl text-black-300 mt-2">
            Create your account
          </Text>

          <Text className="font-rubik text-base text-black-200 mt-2">
            Start your journey to finding your ideal home.
          </Text>

          {/* Name */}
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                label="Full name"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.name?.message}
                placeholder="Enter your full name"
                autoCapitalize="words"
              />
            )}
          />

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
                placeholder="Create a password"
              />
            )}
          />

          {/* Confirm Password */}
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <PasswordInput
                label="Confirm password"
                value={value}
                onChangeText={onChange}
                error={errors.confirmPassword?.message}
                placeholder="Confirm your password"
              />
            )}
          />

          {/* Terms */}
          <Controller
            control={control}
            name="termsAccepted"
            render={({ field: { value, onChange } }) => (
              <View className="mt-6">
                <TouchableOpacity
                  onPress={() => onChange(!value)}
                  className="flex-row items-center"
                >
                  <View
                    className={`size-5 rounded-md border items-center justify-center ${
                      value
                        ? 'bg-primary-300 border-primary-300'
                        : 'border-gray-300'
                    }`}
                  >
                    {value && (
                      <Text className="text-white text-xs font-rubik-bold">
                        ✓
                      </Text>
                    )}
                  </View>

                  <Text className="font-rubik text-sm text-black-200 ml-3 flex-1">
                    I agree to the Terms of Service and Privacy Policy.
                  </Text>
                </TouchableOpacity>

                {errors.termsAccepted && (
                  <Text className="font-rubik text-xs text-red-500 mt-2 ml-1">
                    {errors.termsAccepted.message}
                  </Text>
                )}
              </View>
            )}
          />

          {/* Create account */}
          <TouchableOpacity
            onPress={handleSubmit(signupWithEmail)}
            disabled={isSubmitting}
            className="h-14 rounded-2xl bg-primary-300 items-center justify-center mt-6"
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="font-rubik-semibold text-base text-white">
                Create Account
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
            onPress={signUpWithGoogle}
            disabled={isSubmitting}
            className="h-14 rounded-2xl border border-gray-200 bg-white items-center justify-center"
          >
            <View className="flex-row items-center">
              <Image
                source={google}
                className="size-5"
                resizeMode="contain"
              />

              <Text className="font-rubik-medium text-base text-black-300 ml-3">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>

          {/* Login */}
          <View className="flex-row justify-center mt-7">
            <Text className="font-rubik text-sm text-black-200">
              Already have an account?{' '}
            </Text>

            <TouchableOpacity
              onPress={() =>
                router.replace('/(root)/(auth)/sign-in')
              }
            >
              <Text className="font-rubik-semibold text-sm text-primary-300">
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Signup;