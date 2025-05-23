import { StatusBar, View } from "react-native";
import { Navigation } from "./screens/Navigation";

export default function App() {
	return (
		<View style={{ flex: 1 }}>
			<Navigation />
			<StatusBar hidden={true} />
		</View>
	);
}
