import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { format } from "date-fns";

const RepositoriesScreen = ({ route, navigation }) => {
  const { language, timeInterval } = route.params;
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepositories = async () => {
      const currentDate = new Date();
      let formattedDate;

      // Calculate the date based on the selected timeInterval
      switch (timeInterval) {
        case "Daily":
          formattedDate = format(
            currentDate.setDate(currentDate.getDate() - 1),
            "yyyy-MM-dd"
          );

          break;
        case "Weekly":
          formattedDate = format(
            currentDate.setDate(currentDate.getDate() - 7),
            "yyyy-MM-dd"
          );
          break;
        case "Monthly":
          formattedDate = format(
            currentDate.setMonth(currentDate.getMonth() - 1),
            "yyyy-MM-dd"
          );
          break;
      }
      try {
        const encodedLanguage = encodeURIComponent(language);
        const response = await axios.get(
          `https://api.github.com/search/repositories?q=language:${encodedLanguage}+pushed:>${formattedDate}&sort=stars&order=desc`
        );
        setRepos(response.data.items);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [language, timeInterval]);

  const navigateToDetails = (repo) => {
    navigation.navigate("RepositoryDetails", { repo });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={repos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigateToDetails(item)}
              style={styles.item}
            >
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.subtitle}>
                Stars: {item.stargazers_count}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  item: { padding: 15, borderBottomWidth: 1, borderColor: "#ddd" },
  title: { fontSize: 18, fontWeight: "bold" },
  subtitle: { fontSize: 14, color: "#555" },
});

export default RepositoriesScreen;
