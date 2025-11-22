import React, { useCallback } from "react";
import { Stack } from "expo-router";
import { Text } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Container } from "../../../components/Container";

export default function ScreenTwo() {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({ headerTitle: "Tab Three" });
    }, [navigation])
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Tab Three',
        }}
      />
      <Container className="flex-1 items-center bg-indigo-500">
        <Text className="text-white">Tab Three</Text>
      </Container>
    </>
  );
}
