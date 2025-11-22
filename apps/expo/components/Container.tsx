import { ReactNode } from "react";
import { SafeAreaView, View } from "react-native";

export const Container = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <View
      className={`flex-1 bg-[#051021] w-full  ${
        className ?? ""
      }`}
    >
      {children}
    </View>
  );
};
