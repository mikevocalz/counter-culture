import React ,{ ComponentProps } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useWindowDimensions } from 'react-native';

import Colors from '../../constants/Colors';
import { useColorScheme } from '../../components/useColorScheme';
import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from "@react-navigation/drawer";


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768; // treat tablet/dual-screen and above as large

    //const navigation = useNavigation();

  return (
    <Drawer
      initialRouteName="(tabs)"
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "left",
        headerLeft: () => {
         if(isLargeScreen){
          return null
         }
         return (
           <DrawerToggleButton
             tintColor={Colors[colorScheme ?? "light"].text}
           />
         );
        },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "User",
          headerTitle: "User",
        }} // This is the name of the page and must match the url from root
      />
      <Drawer.Screen
        name="one" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Home",
          title: "Home",
        }}
      />
      <Drawer.Screen
        name="two" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Two",
          title: "Two",
        }}
      />
      {/* <Drawer.Screen
        name="user/[id]" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "User",
          title: "overview",
        }}
      /> */}
    </Drawer>
  );
}
