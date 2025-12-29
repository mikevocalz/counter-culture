import { useMemo, useRef, useState } from "react";
import { Pressable, ViewStyle } from "react-native";
import type { LucideIcon } from "lucide-react-native";
import { useRouter } from "solito/navigation";
import AnimatedGlow, {
  type GlowEvent,
  type PresetConfig,
  glowPresets,
} from "react-native-animated-glow";

type CenterButtonProps = {
  Icon: LucideIcon;
  isLargeScreen?: boolean;
  onPress?: () => void;
};

const CenterButton = ({ Icon, isLargeScreen, onPress }: CenterButtonProps) => {
  const router = useRouter();
  const [glowState, setGlowState] = useState<GlowEvent>("default");
  const isHovered = useRef(false);
  const radiusByState = useMemo<Record<GlowEvent, number>>(
    () => ({
      default: 12,
      hover: 14,
      press: 10,
    }),
    []
  );

  const glowPreset = useMemo<PresetConfig>(
    () => {
      const base = glowPresets.oceanSunset;
      const smallGlow = isLargeScreen ? 12 : 10;
      const largeGlow = isLargeScreen ? 16 : 14;

      return {
        ...base,
        states: [
          {
            ...base.states[0],
            preset: {
              ...base.states[0].preset,
              cornerRadius: radiusByState.default,
              outlineWidth: 7,
              borderColor: [
                "rgba(255, 124, 171, 1)",
                "rgba(63, 100, 199, 1)",
                "rgba(240, 115, 46, 1)",
              ],
              backgroundColor: "#5a4ff9",
              glowLayers: [
                {
                  glowPlacement: "inside",
                  colors: ["#f82fc6", "#5a4ff9", "#ff923e"],
                  glowSize: smallGlow,
                  opacity: 0.16,
                  speedMultiplier: 0.9,
                  coverage: 0.3,
                },
                {
                  glowPlacement: "inside",
                  colors: [
                    "rgba(255, 89, 213, 1)",
                    "rgba(63, 89, 255, 1)",
                    "rgba(255, 164, 0, 1)",
                  ],
                  glowSize: largeGlow,
                  opacity: 0.26,
                  speedMultiplier: 0.7,
                  coverage: 0.4,
                },
              ],
            },
          },
          {
            name: "hover",
            transition: 180,
            preset: {
              cornerRadius: radiusByState.hover,
              outlineWidth: 10,
              glowLayers: [
                { glowSize: smallGlow + 2, opacity: 0.18 },
                { glowSize: largeGlow + 3, opacity: 0.26 },
              ],
            },
          },
          {
            name: "press",
            transition: 90,
            preset: {
              cornerRadius: radiusByState.press,
              outlineWidth: 9,
              glowLayers: [
                { glowSize: smallGlow - 1, opacity: 0.36, speedMultiplier: 1.05 },
                { glowSize: largeGlow - 1, opacity: 0.34 },
              ],
            },
          },
        ],
      };
    },
    [isLargeScreen, radiusByState]
  );

  const containerStyle: ViewStyle = isLargeScreen
    ? {
        width: 56,
        height: 56,
      }
    : {
        position: "absolute" as const,
        bottom: -14,
        left: "50%" as const,
        transform: [{ translateX: -30 }],
        width: 60,
        height: 60,
      };

  return (
    <AnimatedGlow
      preset={glowPreset}
      activeState={glowState}
      style={[
        containerStyle,
        {
          borderRadius: radiusByState[glowState],
          shadowColor: "#000",
          shadowOpacity: 0.5,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 16,
        },
      ]}
    >
      <Pressable
        onPress={onPress ?? (() => router.push("/modal"))}
        onPressIn={() => setGlowState("press")}
        onPressOut={() => setGlowState(isHovered.current ? "hover" : "default")}
        onHoverIn={() => {
          isHovered.current = true;
          if (glowState !== "press") setGlowState("hover");
        }}
        onHoverOut={() => {
          isHovered.current = false;
          if (glowState !== "press") setGlowState("default");
        }}
        className="h-full w-full items-center justify-center bg-zinc-50"
        style={[
          {
            borderRadius: radiusByState[glowState],
            elevation: 12,
            shadowColor: "#000",
            shadowOpacity: 0.3,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 },
          },
        ]}
      >
        <Icon size={isLargeScreen ? 24 : 28} color="#000" strokeWidth={4} stroke="#000" />
      </Pressable>
    </AnimatedGlow>
  );
};

export default CenterButton;
