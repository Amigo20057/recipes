import { useNavigation } from "@react-navigation/native";
import { Dimensions, ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Category } from "../components/Category";

const screenHeight = Dimensions.get("window").height;

const Container = styled(ScrollView)`
	min-height: ${screenHeight}px;
	background-color: #373737;
	padding: 15px;
	position: relative;
`;

export const CategoriesScreen = () => {
	const navigation = useNavigation();

	return (
		<Container>
			<TouchableOpacity
				onPress={() =>
					navigation.navigate("Category", { category: "Салати" })
				}
			>
				<Category
					categoryName='Салати'
					imgUri={require("../assets/categorySalad.png")}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() =>
					navigation.navigate("Category", { category: "Супи" })
				}
			>
				<Category
					categoryName='Супи'
					imgUri={require("../assets/categorySoup.png")}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() =>
					navigation.navigate("Category", { category: "Десерти" })
				}
			>
				<Category
					categoryName='Десерти'
					imgUri={require("../assets/categoryDessert.png")}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() =>
					navigation.navigate("Category", { category: "Закуски" })
				}
			>
				<Category
					categoryName='Закуски'
					imgUri={require("../assets/categorySnacks.png")}
				/>
			</TouchableOpacity>
		</Container>
	);
};
