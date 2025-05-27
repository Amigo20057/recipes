import { View } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
	width: 100%;
	min-height: 150px;
	padding: 10px;
	background-color: #232222;
	border-radius: 10px;

	margin-bottom: 15px;

	elevation: 6;

	shadow-color: #000;
	shadow-offset: 6px 6px;
	shadow-opacity: 0.25;
	shadow-radius: 15px;
`;

const TopContent = styled.View`
	width: 100%;
	height: 50px;
	flex-direction: row;
	align-items: center;
	margin-bottom: 5px;
`;

const CommentUserAvatar = styled.View`
	width: 35px;
	height: 35px;
	background-color: #7f23e1;
	border-radius: 100px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 10px;
`;

const CommentAvatarImage = styled.Image.attrs({
	resizeMode: "contain",
})`
	width: 50%;
	height: 50%;
	position: relative;
`;

const FullNameText = styled.Text`
	font-size: 16px;
	color: #fff;
`;

const MainText = styled.Text`
	font-size: 15px;
	color: #fff;
`;

const CommentDateHeader = styled.Text`
	color: #fff;
	font-size: 12px;
	text-align: right;
`;

export const Comment = ({ text, fullName, createdAt }) => {
	const formatDate = dateString => {
		const date = new Date(dateString);

		const day = date.toLocaleDateString("uk-UA", {
			day: "numeric",
			month: "long",
		});
		const time = date.toLocaleTimeString("uk-UA", {
			hour: "2-digit",
			minute: "2-digit",
		});

		return `${day}\n${time}`;
	};

	return (
		<Container>
			<TopContent>
				<CommentUserAvatar>
					<CommentAvatarImage
						source={require("../assets/avatar.png")}
					/>
				</CommentUserAvatar>
				<FullNameText>{fullName}</FullNameText>
				<View style={{ flex: 1 }} />
				<CommentDateHeader>{formatDate(createdAt)}</CommentDateHeader>
			</TopContent>
			<MainText>{text}</MainText>
		</Container>
	);
};
