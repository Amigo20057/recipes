import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef } from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

const MenuContainer = styled(Animated.View)`
	width: 93%;
	overflow: hidden;
	padding: 15px;
	margin-bottom: 5px;
	background-color: #232222;
	margin: 0 auto;
	border-radius: 10px;
`;

const MenuHeaderContent = styled.View`
	width: 100%;
	height: 70px;
	flex-direction: row;
	align-items: center;
`;

const MenuAvatarView = styled.View`
	width: 50px;
	height: 50px;
	margin-right: 20px;
	background-color: #fff;
	border-radius: 100px;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const MenuAvatarImage = styled.Image.attrs({
	resizeMode: "contain",
})`
	width: 30px;
	height: 30px;
`;

const UserName = styled.Text`
	font-size: 17px;
	color: #fff;
`;

const MainContent = styled.View`
	margin-top: 15px;
	width: 100%;
	height: 100px;
	align-items: center;
`;

const UserInfo = styled.View`
	width: 90%;
	height: 35px;
	background-color: #373737;
	border-radius: 10px;
	justify-content: center;
	padding-left: 10px;
	margin-bottom: 10px;
`;

const UserInfoText = styled.Text`
	font-size: 16px;
	color: #fff;
`;

const UserButton = styled.View`
	width: 100%;
	height: 35px;
	background-color: #373737;
	border-radius: 10px;
	justify-content: center;
	padding-left: 10px;
	margin-bottom: 10px;
`;

export const ProfileMenu = ({
	name,
	email,
	isVisible,
	isSubscribes,
	authorPostId,
	follows,
	followers,
	token,
	isMyProfile = false,
}) => {
	const animatedHeight = useRef(new Animated.Value(0)).current;
	const queryClient = useQueryClient();

	useEffect(() => {
		Animated.timing(animatedHeight, {
			toValue: isVisible ? 250 : 0,
			duration: 300,
			useNativeDriver: false,
		}).start();
	}, [isVisible]);

	const subscribeMutation = useMutation({
		mutationFn: async () => {
			return await axios.post(
				`http://192.168.1.101:4000/users/subscribe/${authorPostId}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries(["profile"]);
		},
		onError: error => {
			console.log("Subscription error", error);
		},
	});

	const submit = () => {
		subscribeMutation.mutate();
	};

	return (
		<MenuContainer style={{ height: animatedHeight }}>
			<MenuHeaderContent>
				<MenuAvatarView>
					<MenuAvatarImage
						source={require("../../assets/secondAvatar.png")}
					/>
				</MenuAvatarView>
				<View>
					<UserName>{name}</UserName>
					<UserName>{email}</UserName>
				</View>
			</MenuHeaderContent>
			<MainContent>
				<UserInfo>
					<UserInfoText>Підписники: {followers.length}</UserInfoText>
				</UserInfo>
				<UserInfo>
					<UserInfoText>Підписки: {follows.length}</UserInfoText>
				</UserInfo>
				{!isMyProfile && (
					<UserInfo style={{ marginTop: 10 }}>
						<TouchableOpacity onPress={submit}>
							<UserInfoText>
								{isSubscribes ? "Відписатися" : "Підписатися"}
							</UserInfoText>
						</TouchableOpacity>
					</UserInfo>
				)}
			</MainContent>
		</MenuContainer>
	);
};
