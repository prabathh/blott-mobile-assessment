import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "@/components/SplashScreen";
import { useUserData, useSplash } from "@/hooks";

export default function RootLayout() {
  const { userData, loading, clearUserData } = useUserData();
  const router = useRouter();
  const isReady = useSplash();

  useEffect(() => {
    if (isReady && !loading) {
      router.replace(userData ? "/Dashboard" : ("/LegalName" as any));
    }
    // NOTE: Uncomment this line to clear user data for the testing
    // clearUserData()
  }, [isReady, loading, userData]);

  if (!isReady || loading) {
    return <SplashScreen />;
  }

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(screens)/LegalName" />
        <Stack.Screen name="(screens)/Notification" />
        <Stack.Screen name="(screens)/Dashboard" />
      </Stack>
    </SafeAreaProvider>
  );
}
