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

const RepositoriesScreen = ({ route, navigation }) => {
  const { language, timeInterval } = route.params;
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`
        );
        // const allRepos = response.data.items;
        // const filteredRepos = filterByTimeInterval(
        //   allRepos,
        //   timeInterval,
        //   "updated_at"
        // );
        // setRepos(filteredRepos);
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

// const getIntervalStartDate = (timeInterval) => {
//   const now = new Date();
//   const intervalStart = new Date();
//   switch (timeInterval) {
//     case "Daily":
//       intervalStart.setDate(now.getDate() - 1); // 1 day ago
//       break;
//     case "Weekly":
//       intervalStart.setDate(now.getDate() - 7); // 7 days ago
//       break;
//     case "Monthly":
//       intervalStart.setMonth(now.getMonth() - 1); // 1 month ago
//       break;
//     default:
//       throw new Error("Invalid timeInterval value"); // Handle unexpected values
//   }
//   return intervalStart;
// };

// // Function to filter repositories by time interval
// const filterByTimeInterval = (
//   repositories,
//   timeInterval,
//   filterBy = "updated_at"
// ) => {
//   const now = new Date();
//   const intervalStart = getIntervalStartDate(timeInterval);

//   return repositories.filter((repo) => {
//     const date = new Date(repo[filterBy]);
//     return date >= intervalStart && date <= now; // Include repositories within the interval
//   });
// };
