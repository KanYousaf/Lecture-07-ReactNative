import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { mainAppStyles } from "./styles";
import Header from "./Component/header";
import TodoItem from "./Component/toDoItem";
import AddTodo from "./Component/addToDo";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [todos, setTodos] = useState([]);

  // load data from todos array
  const loadTodos = async () => {
    try {
      const todosFromStorage = await AsyncStorage.getItem("todos_key");
      if (todosFromStorage != null) {
        setTodos(JSON.parse(todosFromStorage));
      }
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect to load todos, runs once when component
  useEffect(() => {
    loadTodos();
  }, []);

  // save the todos array
  const saveTodos = async () => {
    try {
      await AsyncStorage.setItem("todos_key", JSON.stringify(todos));
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect runs every time the todos state changes and saves the todos to AsyncStorage.
  useEffect(() => {
    saveTodos();
  }, [todos]);

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      // filter() method iterate over all elements of prevTodos and returns a new array with all the elements satisying enclosed condition
      //condition: comparing current element "key" of todos array with the key parameter passed in press handler
      return prevTodos.filter((todo) => todo.key != key);
    });
  };

  const submitHandler = (text) => {
    if (text.length > 3) {
      setTodos((prevTodos) => {
        //adding new item at the beginning of prevtodos array using spread operator
        return [{ text, key: Math.random().toString() }, ...prevTodos];
      });
    } else {
      Alert.alert("OOPS", "Todo must be over 3 characters long", [
        { text: "Understood", onPress: () => console.log("alert closed") },
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        console.log("dismissed");
      }}
    >
      <View style={mainAppStyles.container}>
        <Header />
        <View style={mainAppStyles.content}>
          <AddTodo submitHandler={submitHandler} />
          <View style={mainAppStyles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={pressHandler} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
