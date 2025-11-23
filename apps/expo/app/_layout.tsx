import "../global.css";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "../components/useColorScheme";
import * as ScreenOrientation from "expo-screen-orientation";
import { Provider } from "app/provider";

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
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });


  useEffect(() => {
    ScreenOrientation.unlockAsync();
  }, []);
  

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return(
      <Provider>
        <RootLayoutNav />
      </Provider>
  ) 
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={DarkTheme}>
      <Stack screenOptions={{
        contentStyle: {backgroundColor: "#000"}}}>
        <Stack.Screen name="(drawer)" options={{ headerShown: false, contentStyle: {backgroundColor: "#000"} }} />
        <Stack.Screen name="modal" options={{ presentation: "modal", contentStyle: {backgroundColor: "#000"} }} />
      </Stack>
    </ThemeProvider>
  );
}
