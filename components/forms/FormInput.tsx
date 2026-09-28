import {
    Text,
    TextInput,
    TextInputProps,
    View,
} from 'react-native';

type FormInputProps = TextInputProps & {
  label: string;
  error?: string;
};

const FormInput = ({
  label,
  error,
  ...props
}: FormInputProps) => {
  return (
    <View className="mt-5">
      <Text className="font-rubik-medium text-sm text-black-300 mb-2">
        {label}
      </Text>

      <TextInput
        {...props}
        className={`h-14 rounded-2xl px-4 font-rubik text-base text-black-300 bg-gray-50 border ${
          error ? 'border-red-400' : 'border-gray-200'
        }`}
        placeholderTextColor="#9CA3AF"
      />

      {error && (
        <Text className="font-rubik text-xs text-red-500 mt-2 ml-1">
          {error}
        </Text>
      )}
    </View>
  );
};

export default FormInput;