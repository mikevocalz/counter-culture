import React, { useCallback } from "react";
import { Stack } from "expo-router";
import { Text } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Container } from "../../../components/Container";

export default function ScreenTwo() {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({ headerTitle: "Tab Four" });
    }, [navigation])
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Tab Four',
        }}
      />
      <Container className="flex-1 items-center bg-rose-500">
        <Text className="text-white">Tab Four</Text>
      </Container>
    </>
  );
}
