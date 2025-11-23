import React, { useCallback } from "react";
import { Stack } from "expo-router";
import { Text } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Container } from "../../../components/Container";
import { H1 } from "@expo/html-elements";

export default function HomeScreen() {
  const navigation = useNavigation();

  // useFocusEffect(
  //   useCallback(() => {
  //     navigation.getParent()?.setOptions({ headerTitle: "Tab One" });
  //   }, [navigation])
  // );

  return (
    <>
  
      <Container className="flex-1 items-center bg-emerald-600">
        <H1 className="text-white font-bold">Home/Feed</H1>
      </Container>
    </>
  );
}
