import styled from "styled-components/native";

const HeaderView = styled.View`
	width: 100%;
	height: 150px;
	padding: 15px;
`;

const HeaderTop = styled.View`
	width: 100%;
	height: 60px;
	flex-direction: row;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const HeaderAvatar = styled.View`
	width: 60px;
	height: 60px;
	background-color: #fff;
	border-radius: 100px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const HeaderAvatarImage = styled.Image.attrs({
	resizeMode: "contain",
})`
	width: 50%;
	height: 50%;
`;

const SearchContainer = styled.View`
	flex-direction: row;
	align-items: center;
	background-color: #232222;
	border-radius: 25px;
	padding: 0 10px;
	width: 250px;
	height: 40px;
`;

const HeaderSearch = styled.TextInput.attrs({
	placeholderTextColor: "#fff",
})`
	flex: 1;
	color: #fff;
`;

const HeaderSearchImg = styled.Image.attrs({
	resizeMode: "contain",
})`
	width: 17px;
	height: 17px;
	margin-left: 5px;
	tint-color: #fff;
`;

const HeaderBottom = styled.View`
	height: 10px;
`;

const HeaderCreatePost = styled.TouchableOpacity`
	width: 100%;
	height: 40px;
	background-color: #232222;
	flex-direction: row;
	align-items: center;
	border-radius: 25px;
	margin: 20px 0;
`;

const HeaderCreatePostText = styled.Text`
	color: white;
	font-weight: bold;
	font-size: 14px;
`;

const HeaderCreatePostImage = styled.Image.attrs({
	resizeMode: "contain",
})`
	width: 17px;
	height: 17px;
	tint-color: #fff;
	margin: 0 10px;
`;

export const Header = () => {
	return (
		<HeaderView>
			<HeaderTop>
				<HeaderAvatar>
					<HeaderAvatarImage
						source={require("../assets/secondAvatar.png")}
					/>
				</HeaderAvatar>
				<SearchContainer>
					<HeaderSearch placeholder='Пошук рецептів' />
					<HeaderSearchImg source={require("../assets/search.png")} />
				</SearchContainer>
			</HeaderTop>
			<HeaderBottom>
				<HeaderCreatePost onPress={() => console.log("Create Post")}>
					<HeaderCreatePostImage
						source={require("../assets/create.png")}
					/>
					<HeaderCreatePostText>Створити пост</HeaderCreatePostText>
				</HeaderCreatePost>
			</HeaderBottom>
		</HeaderView>
	);
};
