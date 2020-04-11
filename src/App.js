import React from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from "./services/api";

export default function App() {
  const [repositories, setReposiories] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const { data } = await api.get("/repositories");
      setReposiories(data);
    })();
  }, []);

  async function handleLikeRepository(id) {
    // Implement "Like Repository" functionality
  }

  const renderItem = (item) => (
    <>
      <View style={styles.repositoryContainer}>
        <Text style={styles.repository}>{item.tilte}</Text>

        <View style={styles.techsContainer}>
          item.map(({techs}) => (<Text style={styles.tech}>{techs}</Text>
          ))
        </View>

        <View style={styles.likesContainer}>
          <Text
            style={styles.likeText}
            testID={`repository-likes-${item.id}`
          >
            {item.likes} curtidas
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLikeRepository(item.id)}
          testID={`like-button-${item.id}`}
        >
          <Text style={styles.buttonText}>Curtir</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => renderItem}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
