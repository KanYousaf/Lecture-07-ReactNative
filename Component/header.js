import React from "react";
import { View, Text } from "react-native";
import { headerStyles } from "./globalStyle";

export default function Header() {
  return (
    <View style={headerStyles.header}>
      <Text style={headerStyles.title}>My Todos</Text>
    </View>
  );
}
