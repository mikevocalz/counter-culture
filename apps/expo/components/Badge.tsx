import { View, Text, Pressable } from 'react-native';

interface BadgeProps {
  count: number;
  maxCount?: number;
  size?: number;
  backgroundColor?: string;
  textColor?: string;
  position?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
}

export default function Badge({
  count,
  maxCount = 99,
  size = 20,
  backgroundColor = '#a032d6',
  textColor = 'white',
  position = { top: -6, right: -6 },
}: BadgeProps) {
  if (count <= 0) return null

  const displayText = count > maxCount ? `${maxCount}+` : count.toString()

  return (
    <Pressable
      className="absolute justify-center items-center px-1"
      style={{
        backgroundColor,
        minWidth: size,
        height: size,
        borderRadius: size / 2,
        ...position,
      }}
    >
      <Text
        className="font-bold"
        style={{
          color: textColor,
          fontSize: size * 0.6,
        }}
      >
        {displayText}
      </Text>
    </Pressable>
  )
}
