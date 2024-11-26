import React, { useState } from "react";
import { View, TextInput, Text, Button, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
  const [language, setLanguage] = useState("");
  const [timeInterval, setTimeInterval] = useState(""); // default

  const navigateToRepositories = () => {
    navigation.navigate("Repositories", { language, timeInterval });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.languageList}>
        Programming languages: JavaScript, Python, Java, C, C++, Ruby, Go, PHP,
        TypeScript, Swift, Rust, Kotlin, R, Shell, HTML, CSS, C#, Objective-C,
        Dart, Scala, Elixir, Haskell, Lua, Perl, Julia, VHDL, Assembly Language,
        F#, MATLAB, GraphQL.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter programming language"
        value={language}
        onChangeText={setLanguage}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter time interval (daily/weekly/monthly)"
        value={timeInterval}
        onChangeText={setTimeInterval}
      />
      <Button title="Find Repositories" onPress={navigateToRepositories} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 20, padding: 10 },
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
});

export default HomeScreen;
