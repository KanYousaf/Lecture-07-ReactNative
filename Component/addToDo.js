import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { addToDoStyles } from "./globalStyle";

export default function AddTodo({ submitHandler }) {
  const [text, setText] = useState("");

  const changeHandler = (val) => {
    setText(val);
  };

  const pressHandler = () => {
    submitHandler(text);
    setText("");
  };

  return (
    <View>
      <TextInput
        style={addToDoStyles.input}
        placeholder="new todo..."
        value={text}
        onChangeText={changeHandler}
      />
      <Button color="coral" onPress={pressHandler} title="add todo" />
    </View>
  );
}
