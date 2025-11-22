import { Tabs, router    } from 'expo-router';
import TabBarIcon from '../../../components/TabBarIcon';
import { useWindowDimensions } from 'react-native';
import { Plus } from "lucide-react-native";
import CenterButton from '../../../components/CenterButton';
import TabBar from '../../../components/TabBar';

export default function TabLayout() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 768; // treat tablet/dual-screen and above as large

  return (
    <Tabs
      initialRouteName="index"
      tabBar={(props) => <TabBar {...props} isLargeScreen={isLargeScreen} />}
      screenOptions={{
        tabBarPosition: isLargeScreen ? "right" : "bottom",
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tab One",
          headerTitle: "Tab One",
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Explore",
          headerTitle: "Explore",
        }}
      />

      <Tabs.Screen
        name="center"
        listeners={{
          tabPress: (e) => {
            // e.preventDefault();
          },
        }}
        options={{
          title: "",
          headerTitle: "Center",
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
          title: "Create",
          headerTitle: "Create",
        }}
      />
      <Tabs.Screen
        name="four"
        options={{
          title: "Profile",
          headerTitle: "Profile",
        }}
      />
    </Tabs>
  );
}
