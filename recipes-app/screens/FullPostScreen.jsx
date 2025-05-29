import { useNavigation, useRoute } from "@react-navigation/native";
import Constants from "expo-constants";
import { Dimensions, ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Spinner } from "../components/UI/Spinner";
import { useRecipe } from "../hooks/recipes/useRecipe";

const screenHeight = Dimensions.get("window").height;

const Container = styled(ScrollView)`
	min-height: ${screenHeight}px;
	background-color: #373737;
`;

const PostImageContainer = styled.View`
	background-color: #232222;
	padding: 0 15px;
	width: 100%;
	height: 200px;
	align-items: center;
	justify-content: center;
	margin-bottom: 30px;
`;

const PostImage = styled.Image.attrs({
	resizeMode: "contain",
})`
	width: 100%;
	height: 200px;
`;

const PostContentContainer = styled.View`
	width: 100%;
	padding: 15px;
`;

const PostContent = styled.View`
	width: 100%;
	min-height: 50px;
	background-color: #232222;
	border-radius: 20px;
	padding: 10px;
	justify-content: center;
	margin-bottom: 15px;
`;

const PostContentText = styled.Text`
	font-size: 18px;
	color: #fff;
`;

const IngredientsContainer = styled.View`
	width: 100%;
	padding: 15px;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 10px;
`;

const Ingredient = styled.View`
	padding: 10px 15px;
	background-color: #232222;
	border-radius: 20px;
	margin-bottom: 10px;
	margin-right: 10px;
`;

const BtnsContainer = styled.View`
	width: 100%;
	height: 70px;
	align-items: center;
	justify-content: center;
`;

const Btn = styled.View`
	height: 50px;
	border-radius: 20px;
	background-color: #fff;
`;

export const FullPostScreen = () => {
	const apiUrl = Constants.expoConfig.extra.apiUrl;
	const route = useRoute();
	const { id } = route.params;
	const { data, isLoading } = useRecipe(id);
	const navigation = useNavigation();

	if (isLoading) {
		return <Spinner />;
	}

	const cleanUrl = url => {
		return url ? url.replace(/\/\.\.\//g, "/") : null;
	};

	const imageUrl = `${apiUrl}/${data.picture}`;
	const imageUrlClean = cleanUrl(imageUrl);

	const renderTags = () => {
		const ingredients = data.tags
			.split(",")
			.map(item => {
				const match = item
					.trim()
					.match(/^(.+?)\s+([\d.,]+)([а-яА-Яa-zA-Z]*)$/);
				if (match) {
					const [, name, amount, unit] = match;
					return {
						name: name.trim(),
						amount: parseFloat(amount.replace(",", ".")),
						unit: unit.trim(),
					};
				}
				return null;
			})
			.filter(Boolean);

		return ingredients.map((ingredient, index) => (
			<Ingredient key={index}>
				<PostContentText>
					{ingredient.name} {ingredient.amount} {ingredient.unit}
				</PostContentText>
			</Ingredient>
		));
	};

	return (
		<Container>
			<PostImageContainer>
				{imageUrlClean ? (
					<PostImage source={{ uri: imageUrlClean }} />
				) : (
					""
				)}
			</PostImageContainer>
			<PostContentContainer>
				<PostContentText style={{ width: "100%", marginBottom: 10 }}>
					Опис:
				</PostContentText>
				<PostContent>
					<PostContentText>{data.title}</PostContentText>
				</PostContent>
				<PostContent>
					<PostContentText>{data.categories}</PostContentText>
				</PostContent>
				<PostContent>
					<PostContentText>{data.description}</PostContentText>
				</PostContent>
				<PostContent>
					<PostContentText>
						Час приготування: {data.cookingTime}
					</PostContentText>
				</PostContent>
			</PostContentContainer>
			<IngredientsContainer>
				<PostContentText style={{ width: "100%", marginBottom: 10 }}>
					Ингредиенты:
				</PostContentText>

				{renderTags()}
			</IngredientsContainer>
			<BtnsContainer>
				<TouchableOpacity onPress={() => navigation.navigate("Home")}>
					<PostContent>
						<PostContentText>Головна</PostContentText>
					</PostContent>
				</TouchableOpacity>
			</BtnsContainer>
		</Container>
	);
};
