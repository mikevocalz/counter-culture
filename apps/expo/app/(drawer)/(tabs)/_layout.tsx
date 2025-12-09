import { Tabs, router    } from 'expo-router';
import { Platform, useWindowDimensions } from 'react-native';
import { Plus } from "lucide-react-native";
import CenterButton from '../../../components/CenterButton';
import TabBar from '../../../components/TabBar';
import Logo from '../../../components/Logo';

export default function TabLayout() {
  const { width } = useWindowDimensions();
  // Keep native phone/tablet bottoms bars; only go vertical on wide web layouts.
  const isLargeScreen = width >= 1024;

  return (
    <Tabs
      initialRouteName="index"
      tabBar={
      (props) => <TabBar isLargeScreen={isLargeScreen} {...props} />
      }
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarPosition: isLargeScreen ? "right" : "bottom",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tab One",
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Search"
        }}
      />

      <Tabs.Screen
        name="center"
        listeners={{
          tabPress: (e) => {
             e.preventDefault();
          },
        }}
        options={{
          title: "",
          tabBarButton: (props) => (
            <CenterButton
              onPress={() => router.push("/modal")} // adjust path
              Icon={Plus}
              {...props}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: "Events"
        }}
      />
      <Tabs.Screen
        name="four"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
