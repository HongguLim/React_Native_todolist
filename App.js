import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Br,
} from "react-native";
import styled from "@emotion/native";
import { AntDesign } from "@expo/vector-icons";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [category, setCategory] = useState("js"); // js, react, ct
  const [text, setText] = useState("");
  console.log("todos", todos);

  const newTodo = {
    id: Date.now(),
    text,
    isDone: false,
    isEdit: false,
    category,
  };

  //Add Todo
  // Input창에서 엔터 누르면 Todo 추가
  const addTodo = () => {
    setTodos((prev) => [...prev, newTodo]);
    setText("");
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <View>
        <View style={styles.header_container1}>
          <TouchableOpacity style={styles.Button}>
            <Text style={styles.ButtonText}>JavaScript</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Button}>
            <Text style={styles.ButtonText}>React</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Button}>
            <Text style={styles.ButtonText}>Coding Test</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 2,
            width: "100%",
          }}
        >
          <TextInput
            placeholder="&nbsp;&nbsp;&nbsp;&nbsp;Enter your task"
            style={styles.header_input}
            value={text}
            onChangeText={setText}
            onSubmitEditing={addTodo}
          ></TextInput>
        </View>
      </View>
      <ScrollView>
        <View>
          {todos.map((item) => {
            return (
              <View style={styles.card_container} key={item.id}>
                <Text style={styles.card_text}>{item.text}</Text>
                <View style={styles.card_button}>
                  <AntDesign name="checksquare" size={24} color="black" />
                  <AntDesign name="form" size={24} color="black" />
                  <AntDesign name="delete" size={24} color="black" />
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },

  header_container1: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  Button: {
    backgroundColor: "grey",
    height: 50,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  ButtonText: {
    color: "black",
    fontWeight: "500",
  },

  header_button: {
    backgroundColor: "grey",
    padding: 40,
    margin: 15,
    height: 20,
  },
  header_input: {
    margin: 15,
    height: 40,
    borderColor: "black",
    borderWidth: 2,
  },
  card_container: {
    backgroundColor: "lightgrey",
    marginTop: 10,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  card_button: { flexDirection: "row", marginRight: 10 },

  card_text: {
    fontWeight: "500",
    margin: "auto",
    fontSize: "17px",
  },
});
