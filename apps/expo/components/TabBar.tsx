import { Platform, Pressable, View } from "react-native";
import TabBarIcon from "./TabBarIcon";
import CenterButton from "./CenterButton";
import { Menu, Plus } from "lucide-react-native";
import { DrawerToggleButton } from "@react-navigation/drawer";

const TabBar = ({ state, descriptors, navigation, isLargeScreen }) => {
  const primaryColor = "#a032d6";
  const greyColor = "#fff";

  const orderedRoutes = [...state.routes].sort((a, b) => {
    const order = isLargeScreen 
      ? ["index", "two", "three", "four", "center"]
      : ["index", "two", "center", "three", "four"];
    const aIndex = order.indexOf(a.name);
    const bIndex = order.indexOf(b.name);
    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  return (
    <>
    <View style={isLargeScreen ? {
      position: 'absolute',
      right: 6,
      top: '5%',
      height: '90%',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#000',
      width: 72,
      paddingVertical: 16,
      paddingHorizontal: 8,
      borderRadius: 16,
      borderBottomLeftRadius: 16,
      borderCurve: 'continuous',
      shadowColor: '#fff',
      shadowOffset: {width: .5, height: .5},
      elevation: .5,
      shadowRadius: 2,
      shadowOpacity: 0.1,
    } : {
      position: 'absolute', 
      bottom: Platform.OS === 'ios' ? 25 : 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#000',
      marginHorizontal: 8,
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderRadius: 16,
      borderCurve: 'continuous',
      shadowColor: '#fff',
      shadowOffset: {width: .5, height: .5},
      elevation: .5,
      shadowRadius: 2,
      shadowOpacity: 0.1,
      left: 0,
      right: 0,
    }}>
      {isLargeScreen && (
        <View style={{ alignItems: 'center', paddingTop: 200, justifyContent: 'flex-start', flex: 1, gap: 24 }}>
          {orderedRoutes.filter(route => route.name !== "center").map((route) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                  ? options.title
                  : route.name;

            if (["_sitemap", "+not-found"].includes(route.name)) return null;

            const routeIndex = state.routes.findIndex(r => r.key === route.key);
            const isFocused = state.index === routeIndex;

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

            return (
              <View key={route.name}>
                <TabBarIcon
                  onPress={onPress}
                  onLongPress={onLongPress}
                  isFocused={isFocused}
                  routeName={route.name}
                  color={isFocused ? primaryColor : greyColor}
                  label={label}
                  isVertical={true}
                />
              </View>
            );
          })}
        </View>
      )}
      {isLargeScreen && orderedRoutes.find(r => r.name === "center") && (
        <View style={{ alignItems: "center", position: 'absolute', bottom: '10%', alignSelf: 'center' }}>
          <CenterButton Icon={Plus} isLargeScreen={isLargeScreen} />
        </View>
      )}
      {!isLargeScreen && orderedRoutes.map((route, index) => {
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
              <CenterButton Icon={Plus} isLargeScreen={isLargeScreen} />
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
