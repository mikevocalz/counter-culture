import { Tabs } from 'expo-router';
import { useWindowDimensions } from 'react-native';
import TabBar from '../../../components/TabBar';
import { AppHeader } from 'app/components/AppHeader';

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
        header: () => <AppHeader />,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarPosition: isLargeScreen ? "right" : "bottom",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Alerts",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
