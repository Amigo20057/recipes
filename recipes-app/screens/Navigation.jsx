import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CategoriesScreen } from "./CategoriesScreen";
import { CategoryScreen } from "./CategoryScreen";
import { CreatePostScreen } from "./CreatePostScreen";
import { FullPostScreen } from "./FullPostScreen";
import { HomeScreen } from "./HomeScreen";
import { LoginScreen } from "./LoginScreen";
import { MyRecipesScreen } from "./MyRecipesScreen";
import { PostCommentScreen } from "./PostCommentScreen";
import { RegisterScreen } from "./RegisterScreen";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Register'>
				<Stack.Screen
					name='Home'
					component={HomeScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='Register'
					component={RegisterScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='Login'
					component={LoginScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='FullPost'
					component={FullPostScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='PostComment'
					component={PostCommentScreen}
					options={({ route }) => ({
						title: route.params?.title || "Коментарі",
						headerBackTitle: "-",
						headerStyle: {
							backgroundColor: "#232222",
						},
						headerTintColor: "#fff",
						headerTitleStyle: {
							fontWeight: "bold",
						},
					})}
				/>
				<Stack.Screen
					name='CreatePost'
					component={CreatePostScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='MyRecipes'
					component={MyRecipesScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='Categories'
					component={CategoriesScreen}
					options={({ route }) => ({
						title: route.params?.title || "Категорії",
						headerBackTitle: "-",
						headerStyle: {
							backgroundColor: "#232222",
						},
						headerTintColor: "#fff",
						headerTitleStyle: {
							fontWeight: "bold",
						},
					})}
				/>
				<Stack.Screen
					name='Category'
					component={CategoryScreen}
					options={({ route }) => ({
						title: route.params?.category,
						headerBackTitle: "-",
						headerStyle: {
							backgroundColor: "#232222",
						},
						headerTintColor: "#fff",
						headerTitleStyle: {
							fontWeight: "bold",
						},
					})}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};
