import { Pressable } from "react-native";
import type { LucideIcon } from "lucide-react-native";
import { router } from "expo-router";

type CenterButtonProps = {
  Icon: LucideIcon;
  isLargeScreen?: boolean;
};

const CenterButton = ({ Icon, isLargeScreen }: CenterButtonProps) => {
  const positionClass = isLargeScreen
    ? 'border-white border-[1px] z-50 absolute top-[80%] -left-[8px] bg-[#34a2df] w-[86px] h-[86px] rounded-2xl items-center justify-center'
    : 'border-white border-[1px] absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#34a2df] w-20 h-20 rounded-2xl items-center justify-center'

  return (
    <Pressable
      onPress={() => router.push("/modal")}
      className={positionClass}
      
    >
      <Icon size={40} color="white" />
    </Pressable>
  );
};

export default CenterButton;
