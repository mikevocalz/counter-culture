import { Tabs } from 'expo-router';
import { Platform, useWindowDimensions } from 'react-native';
import { Plus } from "lucide-react-native";
import CenterButton from '../../../components/CenterButton';
import TabBar from '../../../components/TabBar';
import Logo from '../../../components/Logo';
import { useRouter } from 'solito/navigation';
import { AppHeader } from 'app/components/AppHeader';

export default function TabLayout() {
  const { width } = useWindowDimensions();
  const router = useRouter();
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
        header: () => <AppHeader />,
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
          title: "Events"
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
              onPress={() => router.push("/modal")}
              Icon={Plus}
              {...props}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: "Alerts"
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
