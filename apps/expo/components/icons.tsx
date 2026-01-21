import type { JSX } from "react";
import { Home, Search, Bell, List, User } from "lucide-react-native";

export type RouteName = "index" | "search" | "events" | "notifications" | "profile";

type IconProps = {
  color: string;
};

type IconComponent = (props: IconProps) => JSX.Element;

export const icons: Record<RouteName, IconComponent> = {
  index: (props) => <Home size={26} {...props} />,
  search: (props) => <Search size={26} {...props} />,
  events: (props) => <List size={26} {...props} />,
  notifications: (props) => <Bell size={26} {...props} />,
  profile: (props) => <User size={26} {...props} />,
}
