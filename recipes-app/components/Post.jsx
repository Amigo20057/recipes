import styled from "styled-components/native";

const PostView = styled.View`
	padding: 15px;
	margin: 5px 13px 5px 13px;
	border-radius: 10px;
	background-color: #232222;

	elevation: 6;

	shadow-color: #000;
	shadow-offset: 6px 6px;
	shadow-opacity: 0.25;
	shadow-radius: 15px;
`;

const PostHeader = styled.View`
	width: 100%;
	margin-bottom: 20px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

const UserInfo = styled.View`
	flex-direction: row;
	align-items: center;
	flex: 1;
`;

const PostTitle = styled.Text`
	color: #fff;
	margin-left: 10px;
	font-size: 16px;
`;

const PostDateHeader = styled.Text`
	color: #fff;
	font-size: 12px;
	text-align: right;
`;

const PostImage = styled.Image.attrs({
	resizeMode: "contain",
})`
	width: 100%;
	height: 170px;
	background-color: #eee;
	border-radius: 15px;
`;

const PostUserAvatar = styled.View`
	width: 35px;
	height: 35px;
	background-color: #7f23e1;
	border-radius: 100px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const PostUserAvatarImage = styled.Image.attrs({
	resizeMode: "contain",
})`
	width: 50%;
	height: 50%;
`;

const PostFooter = styled.View`
	width: 100%;
	margin-top: 20px;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
`;

const FooterItem = styled.View`
	flex-direction: row;
	align-items: center;
`;

const FooterText = styled.Text`
	color: #fff;
	margin-left: 6px;
	font-size: 16px;
`;

const PostFooterImages = styled.Image.attrs({
	resizeMode: "contain",
})`
	width: 30px;
	height: 30px;
`;

export const Post = ({
	title,
	imageUrl,
	countLikes,
	countComments,
	countShares,
	createdAt,
}) => {
	const formatDate = dateString => {
		const date = new Date(dateString);

		const day = date.toLocaleDateString("ru-RU", {
			day: "numeric",
			month: "long",
		});
		const time = date.toLocaleTimeString("ru-RU", {
			hour: "2-digit",
			minute: "2-digit",
		});

		return `${day}\n${time}`;
	};

	const cleanUrl = url => {
		return url ? url.replace(/\/\.\.\//g, "/") : null;
	};

	const imageUrlClean = cleanUrl(imageUrl);

	return (
		<PostView>
			<PostHeader>
				<UserInfo>
					<PostUserAvatar>
						<PostUserAvatarImage
							source={require("../assets/avatar.png")}
						/>
					</PostUserAvatar>
					<PostTitle>{title}</PostTitle>
				</UserInfo>
				<PostDateHeader>{formatDate(createdAt)}</PostDateHeader>
			</PostHeader>

			{imageUrlClean ? (
				<PostImage source={{ uri: imageUrlClean }} />
			) : (
				<PostImage source={require("../assets/avatar.png")} />
			)}

			<PostFooter>
				<FooterItem>
					<PostFooterImages
						source={require("../assets/activeLike.png")}
					/>
					<FooterText>{countLikes}</FooterText>
				</FooterItem>
				<FooterItem>
					<PostFooterImages
						source={require("../assets/comments.png")}
					/>
					<FooterText>{countComments}</FooterText>
				</FooterItem>
				<FooterItem>
					<PostFooterImages
						source={require("../assets/activePen.png")}
					/>
					<FooterText>{countShares}</FooterText>
				</FooterItem>
			</PostFooter>
		</PostView>
	);
};
