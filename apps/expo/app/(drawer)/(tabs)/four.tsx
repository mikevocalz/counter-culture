import React, { useCallback } from "react";
import { Stack } from "expo-router";
import { Text } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Container } from "../../../components/Container";
import { H1 } from "@expo/html-elements";

export default function ScreenTwo() {
  const navigation = useNavigation();


  return (
    <>
 
      <Container className="flex-1 items-center bg-rose-500">
        <H1 className="text-white font-bold">Profile Screen</H1>
      </Container>
    </>
  );
}
