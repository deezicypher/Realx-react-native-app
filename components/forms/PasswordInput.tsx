import { useState } from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

type PasswordInputProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  error?: string;
  placeholder?: string;
};

const PasswordInput = ({
  label,
  value,
  onChangeText,
  error,
  placeholder = 'Enter your password',
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="mt-5">
      <Text className="font-rubik-medium text-sm text-black-300 mb-2">
        {label}
      </Text>

      <View className="relative">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          className={`h-14 rounded-2xl px-4 pr-16 font-rubik text-base text-black-300 bg-gray-50 border ${
            error ? 'border-red-400' : 'border-gray-200'
          }`}
        />

        <TouchableOpacity
          onPress={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-0 h-14 justify-center"
        >
          <Text className="font-rubik-medium text-sm text-primary-300">
            {showPassword ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>
      </View>

      {error && (
        <Text className="font-rubik text-xs text-red-500 mt-2 ml-1">
          {error}
        </Text>
      )}
    </View>
  );
};

export default PasswordInput;