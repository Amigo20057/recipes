import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./HomeScreen";
import { LoginScreen } from "./LoginScreen";
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
			</Stack.Navigator>
		</NavigationContainer>
	);
};
