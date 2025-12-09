import { ReactNode } from "react";
import { SafeAreaView, View, ViewStyle } from "react-native";

export const Container = ({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: ViewStyle;
}) => {
  return (
    <View
      className={`flex-1 bg-stone-950 items-center w-full  ${
        className ?? ""
      }`}
      style={style}
    >
      {children}
    </View>
  );
};
