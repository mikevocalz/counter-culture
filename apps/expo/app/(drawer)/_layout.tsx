import '../../global.css'
import { ComponentProps } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Platform, useWindowDimensions, Pressable, View } from 'react-native';
import Colors from '../../constants/Colors';
import { useColorScheme } from '../../components/useColorScheme';
import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { useNavigation } from '@react-navigation/native';
import Logo from '../../../../packages/app/components/logo'
import { Bell } from 'lucide-react-native';
import Badge from '../../components/Badge';
import { useRouter } from 'solito/navigation';
import { PROFILE_USERNAME } from '../../../../packages/app/lib/profile-posts';


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768; // treat tablet/dual-screen and above as large
  const navigation = useNavigation();
  const router = useRouter();
  const notificationCount = 3; // Replace with your actual notification count state

  // Check if there's a screen to go back to
  const canGoBack = navigation.canGoBack();

  return (
    <Drawer
      initialRouteName="(tabs)"
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'left',
        headerStyle: {
          backgroundColor: '#000', // Custom background color
        },
        headerTitle: () => <Logo  style={{marginTop: Platform.OS === 'android' ? -10 : -22}}
        width={Platform.OS === 'android' ? 140 : 110} 
        height={Platform.OS === 'android' ? 58 : 48} />,
        headerLeft: () => {
          if (isLargeScreen || !canGoBack) {
            return null
          }
          return <DrawerToggleButton tintColor="white" />
        },
        headerRight:()=>{
         return (
           <Pressable
             pressRetentionOffset={10}
             onPress={() => router.push('/notifications')}
             style={{ marginHorizontal: 20, marginBottom: 8, padding: 4 }}
           >
             <Bell
               size={28}
               color="white"
               fill="white"
               stroke="#a032d6"
               strokeWidth={1}
             />
             <Badge count={notificationCount} />
           </Pressable>
         )
        },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: PROFILE_USERNAME,
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
