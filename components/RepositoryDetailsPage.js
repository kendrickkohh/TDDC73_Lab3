import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";

const RepositoryDetailsScreen = ({ route }) => {
  const { repo } = route.params;
  const [commitsCount, setCommitsCount] = useState(null);
  const [branchesCount, setBranchesCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdditionalData = async () => {
      try {
        const commitsResponse = await axios.get(
          `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits`
        );
        const branchesResponse = await axios.get(
          `https://api.github.com/repos/${repo.owner.login}/${repo.name}/branches`
        );
        setCommitsCount(commitsResponse.data.length); // Count of commits
        setBranchesCount(branchesResponse.data.length); // Count of branches
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdditionalData();
  }, [repo]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{repo.name}</Text>
      <Text style={styles.description}>
        {repo.description || "No description available"}
      </Text>
      <Text style={styles.info}>Stars: {repo.stargazers_count}</Text>
      <Text style={styles.info}>Commits: {commitsCount}</Text>
      <Text style={styles.info}>Branches: {branchesCount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  description: { fontSize: 16, marginBottom: 20 },
  info: { fontSize: 18, marginBottom: 10 },
});

export default RepositoryDetailsScreen;
