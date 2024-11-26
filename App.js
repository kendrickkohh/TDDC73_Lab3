import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen";
import RepositoriesScreen from "./components/RepositoriesScreen";
import RepositoryDetailsPage from "./components/RepositoryDetailsPage";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Repositories" component={RepositoriesScreen} />
        <Stack.Screen
          name="RepositoryDetails"
          component={RepositoryDetailsPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
