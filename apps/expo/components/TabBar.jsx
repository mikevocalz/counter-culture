import { Pressable, View } from "react-native";
import React from "react";
import TabBarIcon from "./TabBarIcon";
import CenterButton from "./CenterButton";
import { Menu, Plus } from "lucide-react-native";
import { DrawerToggleButton } from "@react-navigation/drawer";

const TabBar = ({ state, descriptors, navigation, isLargeScreen }) => {
  const primaryColor = "#0891b2";
  const greyColor = "#737373";

  const containerClassName = isLargeScreen
    ? "!z-50 absolute !right-2 !top-3  w-[54px] flex-col items-center bg-transparent !h-[80%] justify-between"
    : "absolute bottom-6 left-3 right-3 bg-transparent";

  const tabsWrapperClassName = isLargeScreen
    ? "flex-1 flex-col bg-zinc-900 w-[72px] rounded-2xl shadow-lg"
    : "flex-row items-center justify-between bg-white rounded-3xl py-4 px-4 shadow-lg";

    const wrapperClassName = isLargeScreen
    ? "flex-1 w-full items-center justify-center !h-[calc(80%/5)]"
    : "flex-1";

  return (
    <>
    <View className={containerClassName}>
   

      <View className={tabsWrapperClassName}>
      {state.routes.map((route, index) => {
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

        // On mobile, render the center route as a CenterButton in-line,
        // but give it a flex-1 slot like other tabs
        if (!isLargeScreen && route.name === "center") {
          return (
            <View key={route.name} className="flex-1 items-center">
              <CenterButton Icon={Plus} isLargeScreen={false} />
            </View>
          );
        }

        // On large screens, skip the center route from the vertical list;
        // it will be handled by the separate CenterButton below.
        if (isLargeScreen && route.name === "center") return null;

        return isLargeScreen ? (
          <View key={route.name} className={wrapperClassName}>
            <TabBarIcon
              onPress={onPress}
              onLongPress={onLongPress}
              isFocused={isFocused}
              routeName={route.name}
              color={isFocused ? primaryColor : greyColor}
              label={label}
            />
          </View>
        ) : (
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
      
      {isLargeScreen && (
        <CenterButton Icon={Plus} isLargeScreen={isLargeScreen} />
      )}

   
      
    </View>

       {isLargeScreen && (
        <Pressable
          onPress={() => navigation.openDrawer()}
          className="z-50 absolute right-2 bottom-2 w-[72px] h-[72px] aspect-square bg-zinc-900 rounded-xl  items-center justify-center"
        >
             <DrawerToggleButton
             size={30}
                      tintColor={'#fff'}
                    />
        </Pressable>
      )}
      </>
  );
};

export default TabBar;
