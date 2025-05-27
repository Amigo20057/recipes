import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import {
	Dimensions,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	View,
} from "react-native";
import styled from "styled-components/native";
import { Comment } from "../components/Comment";
import { Spinner } from "../components/UI/Spinner";
import { useComments } from "../hooks/comments/useComments";

const screenHeight = Dimensions.get("window").height;

const Container = styled(ScrollView)`
	min-height: ${screenHeight}px;
	background-color: #373737;
	padding: 15px;
	position: relative;
`;

const PostCommentFooter = styled.View`
	width: 100%;
	height: 70px;
	padding-left: 15px;
	background-color: #232222;
	flex-direction: row;
	align-items: center;
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
`;

const FooterCreateCommentImage = styled.Image.attrs({
	resizeMode: "contain",
})`
	width: 30px;
	height: 30px;
`;
const FooterCreateComment = styled.TextInput.attrs({
	placeholderTextColor: "#a2a2a2",
})`
	flex: 1;
	color: #fff;
	margin-left: 15px;
	font-size: 18px;
`;

export const PostCommentScreen = () => {
	const navigation = useNavigation();
	const route = useRoute();
	const { id } = route.params;
	const { title } = route.params;
	const { token } = route.params;
	const { data, isLoading } = useComments(id);
	const [text, setText] = useState("");
	const queryClient = useQueryClient();

	const createComment = useMutation({
		mutationFn: async values => {
			return await axios.post(
				`http://192.168.1.101:4000/comments/${id}`,
				values,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries(["comments"]);
		},
	});

	const submit = () => {
		if (text.trim().length === 0) return;

		createComment.mutate({ text });
		setText("");
		Keyboard.dismiss();
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={80}
		>
			<View style={{ flex: 1, backgroundColor: "#373737" }}>
				<ScrollView style={{ flex: 1, padding: 15 }}>
					{data?.map((item, index) => (
						<Comment
							text={item.comment.text}
							fullName={item.user.fullName}
							createdAt={item.comment.createdAt}
							key={index}
						/>
					))}
				</ScrollView>

				<PostCommentFooter>
					<FooterCreateCommentImage
						source={require("../assets/comment.png")}
					/>
					<FooterCreateComment
						placeholder='Комент'
						value={text}
						onChangeText={setText}
						returnKeyType='send'
						onSubmitEditing={submit}
					/>
				</PostCommentFooter>
			</View>
		</KeyboardAvoidingView>
	);
};
