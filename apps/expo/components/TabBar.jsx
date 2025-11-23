import { Platform, Pressable, View } from "react-native";
import React from "react";
import TabBarIcon from "./TabBarIcon";
import CenterButton from "./CenterButton";
import { Menu, Plus } from "lucide-react-native";
import { DrawerToggleButton } from "@react-navigation/drawer";

const TabBar = ({ state, descriptors, navigation, isLargeScreen }) => {
  const primaryColor = "#a032d6";
  const greyColor = "#fff";

  const orderedRoutes = [...state.routes].sort((a, b) => {
    const order = ["index", "two", "center", "three", "four"];
    const aIndex = order.indexOf(a.name);
    const bIndex = order.indexOf(b.name);
    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  return (
    <>
    <View style={{
      position: 'absolute', 
      bottom:Platform.OS === 'ios' ? 25 : 35,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#000',
      marginHorizontal: 15,
      paddingVertical: 15,
      paddingHorizontal: 15,
      borderRadius: 25,
      borderCurve: 'continuous',
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 10},
      shadowRadius: 10,
      shadowOpacity: 0.1,
      left: 0,
      right: 0,
    }}>
      {orderedRoutes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        if (["_sitemap", "+not-found"].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        if (route.name === "center") {
          return (
            <View key={route.name} style={{ flex: 1, alignItems: "center" }}>
              <CenterButton Icon={Plus} isLargeScreen={false} />
            </View>
          );
        }

        return (
          <TabBarIcon
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? primaryColor : greyColor}
            label={label}
          />
        )
      })}
    </View>
    </>
  );
};

export default TabBar;
