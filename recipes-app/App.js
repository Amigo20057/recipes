import { useCallback, useState } from "react";
import {
	Dimensions,
	RefreshControl,
	ScrollView,
	StatusBar,
	View,
} from "react-native";
import styled from "styled-components/native";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { Spinner } from "./components/UI/Spinner";
import { useRecipes } from "./hooks/recipes/useRecipes";

const screenHeight = Dimensions.get("window").height;

const Container = styled(ScrollView)`
	min-height: ${screenHeight}px;
	background-color: #373737;
`;

export default function App() {
	const {
		data: recipeData,
		isLoading: recipeDataLoading,
		refetch,
	} = useRecipes();
	const { data: profileData, isLoading: profileDataLoading } = useRecipes();
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	}, [refetch]);

	if (profileDataLoading) {
		return <Spinner />;
	}

	return (
		<View style={{ flex: 1 }}>
			<Container
				contentContainerStyle={{ paddingBottom: 60 }}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						colors={["#ffffff"]}
						tintColor='#ffffff'
					/>
				}
			>
				<Header />
				{profileData?.map(item => (
					<Post
						key={item.id}
						title={item.title}
						countLikes={item.countLikes}
						countComments={item.countComments}
						countShares={item.countShares}
						createdAt={item.createdAt}
						imageUrl={`http://192.168.1.101:4000/${item.picture}`}
					/>
				))}
			</Container>
			<Footer />
			<StatusBar hidden={true} />
		</View>
	);
}
