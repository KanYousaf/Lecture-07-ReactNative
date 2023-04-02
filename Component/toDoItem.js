import React from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { toDoItemStyles } from "./globalStyle";

export default function TodoItem({ item, pressHandler }) {
  return (
    <Pressable onPress={() => pressHandler(item.key)}>
      <View style={toDoItemStyles.item}>
        <MaterialIcons name="delete" size={18} color="#333" />
        <Text style={toDoItemStyles.itemText}>{item.text}</Text>
      </View>
    </Pressable>
  );
}
