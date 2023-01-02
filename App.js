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
  Alert,
} from "react-native";
import styled from "@emotion/native";
import { AntDesign } from "@expo/vector-icons";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [category, setCategory] = useState("js"); // js, react, ct
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  console.log("edittext", editText);

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

  // Set Done
  // 완료 토글링
  const setDone = (q) => {
    // 1. id를 매개변수로 받는다.
    // 2. id에 해당하는 배열의 요소를 찾는다.
    // 3. 그 배열의 요소의 isDone값을 토글링 한 후에 setTodos.
    // 얕은복사하기
    const newTodos = [...todos];
    const idx = newTodos.findIndex((todo) => {
      return todo.id === q;
    });
    newTodos[idx].isDone = !newTodos[idx].isDone;
    setTodos(newTodos);
  };

  //delete todo
  //삭제 이모티콘 터치 시 해당 todo 삭제
  // filter는 immutable메소드라서 item에 영향을 못미침 그래서 얕은복사를 하지 않아도 됨
  const deleteTodo = function (id) {
    Alert.alert("Todo 삭제", "정말 삭제하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
        onPress: () => {
          return console.log("취소 클릭");
        },
      },
      {
        text: "삭제",
        style: "destructive",
        onPress: () => {
          setTodos((prev) => {
            return prev.filter((item) => {
              item.id !== id;
            });
          });
        },
      },
    ]);
  };

  //Edit todo
  // isEdit값을 토글(setDone이랑 로직이 비슷함)
  const setEdit = (q) => {
    const newTodos = [...todos];
    const idx = newTodos.findIndex((todo) => {
      return todo.id === q;
    });
    newTodos[idx].isEdit = !newTodos[idx].isEdit;
    setTodos(newTodos);
  };

  const editTodo = (id) => {
    // 1. id값을 받아서 해당 배열의 요소를 찾는다. idx찾기
    // 2. todos[idx].text = editText
    // 얕은복사
    const newTodos = [...todos];
    const idx = newTodos.findIndex((todo) => todo.id === id);
    newTodos[idx].text = editText;
    newTodos[idx].isEdit = false;
    setTodos(newTodos);
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <View>
        <View style={styles.header_container1}>
          <TouchableOpacity
            style={{
              ...styles.Button,
              backgroundColor: category === "js" ? "#0FBCF9" : "grey",
            }}
            onPress={() => setCategory("js")}
          >
            <Text style={styles.ButtonText}>JavaScript</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.Button,
              backgroundColor: category === "react" ? "#0FBCF9" : "grey",
            }}
            onPress={() => setCategory("react")}
          >
            <Text style={styles.ButtonText}>React</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.Button,
              backgroundColor: category === "ct" ? "#0FBCF9" : "grey",
            }}
            onPress={() => setCategory("ct")}
          >
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
          {todos
            .filter((item) => {
              return item.category === category;
            })
            .map((item) => {
              return (
                <View style={styles.card_container} key={item.id}>
                  {item.isEdit ? (
                    <TextInput
                      onSubmitEditing={() => {
                        editTodo(todo.id);
                      }}
                      onChange={setEditText}
                      value={editText}
                      style={{ backgroundColor: "white", flex: 1 }}
                    />
                  ) : (
                    <Text
                      style={{
                        ...styles.card_text,
                        textDecorationLine: item.isDone
                          ? "line-through"
                          : "none",
                      }}
                    >
                      &nbsp;&nbsp;&nbsp;&nbsp;{item.text}
                    </Text>
                  )}

                  <View style={styles.card_button}>
                    <TouchableOpacity onPress={() => setDone(item.id)}>
                      <AntDesign name="checksquare" size={24} color="black" />
                    </TouchableOpacity>
                    <Text>&nbsp;&nbsp;</Text>
                    <TouchableOpacity
                      //상태값 변화
                      onPress={() => setEdit(item.id)}
                    >
                      <AntDesign name="form" size={24} color="black" />
                    </TouchableOpacity>
                    <Text>&nbsp;&nbsp;</Text>
                    <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                      <AntDesign name="delete" size={24} color="black" />
                    </TouchableOpacity>
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
