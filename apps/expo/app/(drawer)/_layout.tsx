import React ,{ ComponentProps } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Platform, useWindowDimensions, Pressable } from 'react-native';
import Colors from '../../constants/Colors';
import { useColorScheme } from '../../components/useColorScheme';
import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from "@react-navigation/drawer";
import Logo from '../../../../packages/app/components/logo'
import { Bell } from 'lucide-react-native';


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
        headerTitleAlign: 'left',
        headerStyle: {
          backgroundColor: '#000', // Custom background color
        },
        //title: "",
        headerTitle: () => <Logo  style={{marginTop: Platform.OS === 'android' ? -10 : -20}}
        width={Platform.OS === 'android' ? 140 : 130} height={Platform.OS === 'android' ? 58 : 58} />,
        headerRight:()=>{
         return(
          <Pressable onPress={()=>{}} style={{marginHorizontal: 20, marginBottom: 8}}>
            <Bell size={28} color="white" fill="white" stroke='red' strokeWidth={1} />
          </Pressable>
         )
        },
        headerLeft: () => {
          if (isLargeScreen) {
            return null
          }
          return (
            // <DrawerToggleButton
            //   tintColor={Colors[colorScheme ?? 'light'].text}
            // />
            null
          )
        },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'User',
          //headerTitle: "User",
        }} // This is the name of the page and must match the url from root
      />
      <Drawer.Screen
        name="one" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'Home',
          title: 'Home',
        }}
      />
      <Drawer.Screen
        name="two" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: 'Two',
          title: 'Two',
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
  )
}
