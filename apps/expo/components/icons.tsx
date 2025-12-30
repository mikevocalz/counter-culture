import type { JSX } from "react";
import { Home,Search,Bell, PlusCircle, List, User } from "lucide-react-native";

export type RouteName = "index" | "two" | "center" | "three" | "four";

type IconProps = {
  color: string;
};

type IconComponent = (props: IconProps) => JSX.Element;

export const icons: Record<RouteName, IconComponent> = {
  index: (props) => <Home size={26} {...props} />,
  two: (props) => <List size={26} {...props} />,
  center: (props) => <PlusCircle size={26} {...props} />,
  three: (props) => <Bell size={26} {...props} />,
  four: (props) => <User size={26} {...props} />,
}