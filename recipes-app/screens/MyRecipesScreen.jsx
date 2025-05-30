import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { useCallback, useEffect, useState } from "react";
import { Dimensions, RefreshControl, ScrollView, View } from "react-native";
import styled from "styled-components/native";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Post } from "../components/Post";
import { ProfileMenu } from "../components/UI/ProfileMenu";
import { Spinner } from "../components/UI/Spinner";
import { useMyRecipes } from "../hooks/recipes/useMyRecipes";
import { useProfile } from "../hooks/users/useProfile";

const screenHeight = Dimensions.get("window").height;

const Container = styled(ScrollView)`
	min-height: ${screenHeight}px;
	background-color: #373737;
`;

const CustomText = styled.Text`
	font-size: 16px;
	color: #fff;
`;

export const MyRecipesScreen = () => {
	const apiUrl = Constants.expoConfig.extra.apiUrl;
	const [isOpenProfileMenu, setIsOpenProfileMenu] = useState(false);
	const [token, setToken] = useState(null);
	const {
		data: recipeData,
		isLoading: recipeDataLoading,
		refetch,
	} = useMyRecipes(token);
	const { data: profileData, isLoading: profileDataLoading } =
		useProfile(token);
	const [refreshing, setRefreshing] = useState(false);
	const navigation = useNavigation();

	const onRefresh = useCallback(async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	}, [refetch]);

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

	if (profileDataLoading && profileData) {
		return <Spinner />;
	}

	return (
		<View>
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
				<Header
					setIsOpenProfileMenu={setIsOpenProfileMenu}
					token={token}
				/>
				{isOpenProfileMenu && (
					<ProfileMenu
						name={profileData?.fullName}
						email={profileData?.email}
						isVisible={isOpenProfileMenu}
						token={token}
						followers={profileData?.followers}
						follows={profileData?.follows}
						isMyProfile={true}
					/>
				)}
				{recipeData?.length === 0 ? (
					<CustomText style={{ marginLeft: 15 }}>
						Ви ще не створили пост
					</CustomText>
				) : (
					recipeData?.map(item => (
						<Post
							token={token}
							key={item.id}
							id={item.id}
							title={item.title}
							countLikes={item.countLikes}
							countComments={item.countComments}
							createdAt={item.createdAt}
							imageUrl={`${apiUrl}/${item.picture}`}
							isLike={
								profileData?.likedPosts.includes(item.id)
									? true
									: false
							}
							follows={profileData?.follows}
							profileId={profileData?.id}
						/>
					))
				)}
			</Container>
			<Footer />
		</View>
	);
};
