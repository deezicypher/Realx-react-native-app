import { useAuth } from "@/context/AuthContext";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppLayout(){
    const {isLoggedIn,loading} = useAuth()

    if (isLoggedIn) { 
        return <Redirect href="/(root)/(tabs)" />;
    }

    if(loading) {
    return (
        <SafeAreaView>
            <ActivityIndicator className="flex-1 items-center justify-center text-primary-300" size="large" /> 
        </SafeAreaView>
    )
}

return (
   <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Slot/>
      </KeyboardAvoidingView>
)
}