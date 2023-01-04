import React from "react";
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

export default function Tabs({ setCat, category }) {
  return (
    <View style={styles.tabs}>
      <TouchableOpacity
        onPress={() => setCat("js")}
        style={{
          ...styles.tab,
          backgroundColor: category === "js" ? "#0FBCF9" : "grey",
        }}
      >
        <Text style={styles.tabText}>Javascript</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setCat("react")}
        style={{
          ...styles.tab,
          backgroundColor: category === "react" ? "#0FBCF9" : "grey",
        }}
      >
        <Text style={styles.tabText}>React</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setCat("ct")}
        style={{
          ...styles.tab,
          backgroundColor: category === "ct" ? "#0FBCF9" : "grey",
        }}
      >
        <Text style={styles.tabText}>Coding Test</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tab: {
    backgroundColor: "#0FBCF9",
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: "30%",
    alignItems: "center",
  },
  tabText: {
    fontWeight: "600",
  },
});
