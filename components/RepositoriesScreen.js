import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

const RepositoriesScreen = ({ route }) => {
  const { language, timeInterval } = route.params;
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`
        );
        setRepos(response.data.items);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        console.log(repos);
      }
    };

    fetchRepositories();
  }, [language, timeInterval]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={repos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.subtitle}>
                Stars: {item.stargazers_count}
              </Text>
              <Text style={styles.subtitle}>Updated: {item.updated_at}</Text>
            </View>
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
