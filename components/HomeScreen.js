import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
  const [language, setLanguage] = useState("");
  const [timeInterval, setTimeInterval] = useState(""); // default

  const navigateToRepositories = () => {
    navigation.navigate("Repositories", { language, timeInterval });
  };

  return (
    <View style={styles.container}>
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
});

export default HomeScreen;
