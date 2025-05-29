import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import styled from "styled-components/native";
import { Post } from "../components/Post";
import { Spinner } from "../components/UI/Spinner";
import { useRecipes } from "../hooks/recipes/useRecipes";
import { useProfile } from "../hooks/users/useProfile";

const screenHeight = Dimensions.get("window").height;

const Container = styled(ScrollView)`
	min-height: ${screenHeight}px;
	background-color: #373737;
`;

export const CategoryScreen = () => {
	const [token, setToken] = useState(null);
	const route = useRoute();
	const { category } = route.params;
	const { data: profileData, isLoading: profileDataLoading } =
		useProfile(token);
	const {
		data: recipeData,
		isLoading: recipeDataLoading,
		refetch,
	} = useRecipes(category);
	const { data: dataPostAuthor, isLoading: postAuthorLoading } = useQuery({
		queryKey: ["recipe-user-profile"],
		queryFn: async () => {
			return await axios.get(
				`http://192.168.1.101:4000/users/profile/${id}`
			);
		},
		select: data => data.data,
	});

	useEffect(() => {
		const checkToken = async () => {
			const storedToken = await AsyncStorage.getItem("token");
			if (!storedToken) {
				navigation.navigate("Login");
			} else {
				setToken(storedToken);
			}
		};
		checkToken();
	}, []);

	if (profileDataLoading || recipeDataLoading || !profileData) {
		return <Spinner />;
	}
	return (
		<View>
			<Container contentContainerStyle={{ paddingBottom: 60 }}>
				{recipeData?.map(item => (
					<Post
						token={token}
						key={item.id}
						id={item.id}
						title={item.title}
						countLikes={item.countLikes}
						countComments={item.countComments}
						createdAt={item.createdAt}
						imageUrl={`http://192.168.1.101:4000/${item.picture}`}
						isLike={profileData?.likedPosts.includes(item.id)}
						follows={profileData?.follows}
						profileId={profileData?.id}
					/>
				))}
			</Container>
		</View>
	);
};
