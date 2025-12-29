import "../global.css";
 import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ChevronLeft } from 'lucide-react-native';
import { Pressable } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "../components/useColorScheme";
import * as ScreenOrientation from "expo-screen-orientation";
import { Provider } from "app/provider";
import Splash from "../components/Splash";
import { useRouter } from "solito/navigation";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  })

  useEffect(() => {
    ScreenOrientation.unlockAsync()
  }, [])

  const [riveDone, setRiveDone] = useState(false) // ✅ ADD THIS

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
    // <Splash onFinish={() => setRiveDone(true)} />
  }

  return (
    <Provider>
      <RootLayoutNav />
    </Provider>
  )
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  //const navigation = useNavigation();

  return (
    <ThemeProvider value={DarkTheme}>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: '#000' },
        }}
      >
        <Stack.Screen
          name="(drawer)"
          options={{
            headerShown: false,
            contentStyle: { backgroundColor: '#000' },
          }}
        />
        <Stack.Screen
          name="modal"
          options={{
            presentation: 'fullScreenModal',
            headerShown: true,
            headerBackVisible: false,
            headerTransparent: false,
            headerBlurEffect: 'none',
            title: '',
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTitleStyle: {
              color: '#fff',
            },
            headerLeft: () => (
              <Pressable
                onPress={() => router.back()}
                style={{
                  width: 44,
                  height: 44,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 4,
                }}
              >
                <ChevronLeft size={24} color="#fff" />
              </Pressable>
            ),
            contentStyle: { backgroundColor: '#000' },
            animation: 'fade_from_bottom',
            animationDuration: 300,
            gestureEnabled: true,
            fullScreenGestureEnabled: true,
            gestureDirection: 'horizontal',
          }}
        />
        <Stack.Screen
          name="notifications"
          options={{
            presentation: 'modal',
            headerShown: true,
            headerBackVisible: false,
            headerTransparent: false,
            headerBlurEffect: 'none',
            title: '',
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTitleStyle: {
              color: '#fff',
            },
            headerLeft: () => (
              <Pressable
                onPress={() => router.back()}
                style={{
                  width: 44,
                  height: 44,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 4,
                }}
              >
                <ChevronLeft size={24} color="#fff" />
              </Pressable>
            ),
            contentStyle: { backgroundColor: '#000' },
            animation: 'fade_from_bottom',
            animationDuration: 300,
            gestureEnabled: true,
            fullScreenGestureEnabled: true,
            gestureDirection: 'horizontal',
          }}
        />
      </Stack>
    </ThemeProvider>
  )
}
