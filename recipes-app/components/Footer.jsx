import { useState } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { FooterMenu } from "./UI/FooterMenu";

const FooterContainer = styled.View`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 70px;
	background-color: #000;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	z-index: 10;
`;

const FooterBtnWrapper = styled.View`
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const FooterBtns = styled.Image.attrs({
	resizeMode: "contain",
})`
	width: 25px;
	height: 25px;
`;

const FooterBtnLarge = styled.Image.attrs({
	resizeMode: "contain",
})`
	width: 40px;
	height: 40px;
`;

const FooterLabel = styled.Text`
	color: #fff;
	font-size: 10px;
	margin-top: 5px;
`;

export const Footer = () => {
	const [isOpenMenu, setIsOpenMenu] = useState(false);

	return (
		<>
			<FooterContainer>
				{isOpenMenu && <FooterMenu />}
				<FooterBtnWrapper>
					<FooterBtns
						source={require("../assets/homeActiveIcon.png")}
					/>
					<FooterLabel>Головна</FooterLabel>
				</FooterBtnWrapper>
				<FooterBtnWrapper>
					<FooterBtns source={require("../assets/book.png")} />
					<FooterLabel>Книга</FooterLabel>
				</FooterBtnWrapper>
				<TouchableOpacity onPress={() => setIsOpenMenu(prev => !prev)}>
					<FooterBtnWrapper>
						<FooterBtnLarge
							source={require("../assets/mainBtn.png")}
						/>
					</FooterBtnWrapper>
				</TouchableOpacity>

				<FooterBtnWrapper>
					<FooterBtns source={require("../assets/avatar.png")} />
					<FooterLabel>Підписки</FooterLabel>
				</FooterBtnWrapper>
				<FooterBtnWrapper>
					<FooterBtns source={require("../assets/category.png")} />
					<FooterLabel>Категорії</FooterLabel>
				</FooterBtnWrapper>
			</FooterContainer>
		</>
	);
};
