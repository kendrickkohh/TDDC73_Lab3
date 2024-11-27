import React, { useState } from "react";
import { View, TextInput, Text, Button, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const HomeScreen = ({ navigation }) => {
  const [language, setLanguage] = useState("");
  const [timeInterval, setTimeInterval] = useState("");
  const [isLanguageFocus, setIsLanguageFocus] = useState(false);
  const [isTimeFocus, setIsTimeFocus] = useState(false);

  const navigateToRepositories = () => {
    navigation.navigate("Repositories", { language, timeInterval });
  };

  const languagesData = [
    { label: "JavaScript", value: "JavaScript" },
    { label: "Python", value: "Python" },
    { label: "Java", value: "Java" },
    { label: "C", value: "C" },
    { label: "C++", value: "C++" },
    { label: "Ruby", value: "Ruby" },
    { label: "Go", value: "Go" },
    { label: "PHP", value: "PHP" },
    { label: "TypeScript", value: "TypeScript" },
    { label: "Swift", value: "Swift" },
    { label: "Rust", value: "Rust" },
    { label: "Kotlin", value: "Kotlin" },
    { label: "R", value: "R" },
    { label: "Shell", value: "Shell" },
    { label: "HTML", value: "HTML" },
    { label: "CSS", value: "CSS" },
    { label: "C#", value: "C#" },
    { label: "Objective-C", value: "Objective-C" },
    { label: "Dart", value: "Dart" },
    { label: "Scala", value: "Scala" },
    { label: "Elixir", value: "Elixir" },
    { label: "Haskell", value: "Haskell" },
    { label: "Lua", value: "Lua" },
    { label: "Perl", value: "Perl" },
    { label: "Julia", value: "Julia" },
    { label: "VHDL", value: "VHDL" },
    { label: "Assembly Language", value: "Assembly Language" },
    { label: "F#", value: "F#" },
    { label: "MATLAB", value: "MATLAB" },
    { label: "GraphQL", value: "GraphQL" },
  ];

  const timeData = [
    { label: "Daily", value: "Daily" },
    { label: "Weekly", value: "Weekly" },
    { label: "Monthly", value: "Monthly" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TDDC73 Lab 3</Text>
      <Dropdown
        style={[styles.dropdown, isLanguageFocus && { borderColor: "blue" }]}
        data={languagesData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isLanguageFocus ? "Select programming language" : "..."}
        searchPlaceholder="Search..."
        value={language}
        onFocus={() => setIsLanguageFocus(true)}
        onBlur={() => setIsLanguageFocus(false)}
        onChange={(item) => {
          setLanguage(item.value);
          setIsLanguageFocus(false);
        }}
      />

      <Dropdown
        style={[styles.dropdown, isTimeFocus && { borderColor: "blue" }]}
        data={timeData}
        search
        labelField="label"
        valueField="value"
        placeholder={!isTimeFocus ? "Select time interval" : "..."}
        searchPlaceholder="Search..."
        value={timeInterval}
        onFocus={() => setIsTimeFocus(true)}
        onBlur={() => setIsTimeFocus(false)}
        onChange={(item) => {
          setTimeInterval(item.value);
          setIsTimeFocus(false);
        }}
      />
      <Button title="Find Repositories" onPress={navigateToRepositories} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  languageList: {
    fontSize: 14,
    color: "#555",
    marginBottom: 15,
    textAlign: "center",
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f5f5f5",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    margin: 8,
  },
});

export default HomeScreen;
