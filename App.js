import { StatusBar } from "expo-status-bar";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Tabs from "./components/Tabs";
import Todo from "./components/Todo";
import {
  onSnapshot,
  query,
  collection,
  doc,
  orderBy,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { dbService } from "./firebase";

export default function App() {
  // delete todo
  // 삭제 이모티콘 터치 시 해당 todo 삭제
  const [todos, setTodos] = useState([]);
  const [category, setCategory] = useState(""); // js, react, ct
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");

  const newTodo = {
    // id: Date.now(),
    text,
    isDone: false,
    isEdit: false,
    category,
    createdAt: Date.now(),
  };

  const addTodo = async () => {
    await addDoc(collection(dbService, "todos"), newTodo);
    setText("");
  };

  const deleteTodo = async (id) => {
    // 1. id 값을 받아서 해당 배열 요소를 제외한 나머지를 새로운 배열로 받는다.
    // 2. setTodos
    Alert.alert("Todo 삭제", "정말 삭제하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
        onPress: () => console.log("취소 클릭!"),
      },
      {
        text: "삭제",
        style: "destructive",
        onPress: async () => {
          await deleteDoc(doc(dbService, "toods", id));
        },
      },
    ]);
  };

  const setEdit = async (id) => {
    const idx = todos.findIndex((todo) => todo.id === id);
    await updateDoc(doc(dbService, "todos", id), {
      isEdit: todos[idx].isEdit,
    });
  };

  const editTodo = async (id) => {
    await updateDoc(doc(dbService, "todos", id), {
      text: editText,
      isEdit: false,
    });
  };

  const setDone = async (id) => {
    const idx = todos.findIndex((todo) => todo.id === id);
    await updateDoc(doc(dbService, "todos", id), {
      isDone: todos[idx].isDone,
    });
  };

  const setCat = async (cat) => {
    console.log("cat:", cat);
    setCategory(cat);

    await updateDoc(doc(dbService, "category", "currentCategory"), {
      category: cat,
    });
  };

  useEffect(() => {
    // 현재의 최신 todos를 AsyncStorage에 저장
    const saveTodos = async () => {
      await AsyncStorage.setItem("todos", JSON.stringify(todos));
    };
    if (todos.length > 0) saveTodos();
  }, [todos]);

  useEffect(() => {
    // 1. onSnapshot APIfㅡㄹ 이용해서 todos 콜렉션에 변경이 생길때마다
    // 2. todos 콜렉션 안의 모든 document를 불러와서 setTodos를 한다
    const q = query(
      collection(dbService, "todos"),
      orderBy("createAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const newTodos = snapshot.docs.map((doc) => {
        const newTodo = {
          id: doc.id,
          ...doc.data(), // doc.data() : { text, createdAt, ...  }
        };
        return newTodo;
      });
      setTodos(newTodos);
    });

    // 마지막 카테고리
    const getCategory = async () => {
      const snapshot = await getDoc(
        doc(dbService, "category", "currentCategory")
      );
      setCategory(snapshot.date().category);
    };
    getCategory();
  }, []);

  return (
    <SafeAreaView style={styles.safearea}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Tabs setCat={setCat} category={category} />
        <View style={styles.inputWrapper}>
          <TextInput
            onSubmitEditing={addTodo}
            onChangeText={setText}
            value={text}
            placeholder="Enter your task"
            style={styles.input}
          />
        </View>
        <ScrollView>
          {todos.map((todo) => {
            if (category === todo.category) {
              return (
                <Todo
                  editTodo={editTodo}
                  setDone={setDone}
                  setEdit={setEdit}
                  editText={editText}
                  deleteTodo={deleteTodo}
                  todo={todo}
                  key={todo.id}
                  setEditText={setEditText}
                />
              );
            }
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },

  inputWrapper: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 15,
    marginTop: 15,
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
