import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
	position: absolute;
	width: 100%;
	height: 100px;
	margin-bottom: 190px;
	padding: 0 15px;
`;

const InnerBlock = styled.View`
	flex: 1;
	background-color: #000;
	border-radius: 15px;
	padding: 20px;
`;

const MenuText = styled.Text`
	font-size: 20px;
`;

export const FooterMenu = () => {
	const navigation = useNavigation();
	const queryClient = useQueryClient();

	const logout = async () => {
		await AsyncStorage.removeItem("token");
		await queryClient.clear();
		navigation.navigate("Login");
	};

	return (
		<Container>
			<InnerBlock>
				<TouchableOpacity onPress={logout}>
					<MenuText style={{ color: "#fff" }}>Вийти</MenuText>
				</TouchableOpacity>
			</InnerBlock>
		</Container>
	);
};
