import { useState } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const Container = styled.View`
	position: absolute;
	top: 0;
	left: 0;
	width: ${screenWidth}px;
	height: ${screenHeight}px;
	background-color: rgba(0, 0, 0, 0.5);
	justify-content: center;
	align-items: center;
	z-index: 9999;
`;

const FormContainer = styled.View`
	width: 90%;
	max-width: 350px;
	padding: 20px;
	background-color: #232222;
	border-radius: 20px;
	elevation: 10;
	shadow-color: #000;
	shadow-opacity: 0.3;
	shadow-radius: 10px;
	shadow-offset: 0px 5px;
`;

const HintText = styled.Text`
	color: #fff;
	font-size: 16px;
	margin-bottom: 15px;
	text-align: center;
`;

const Input = styled.TextInput.attrs({
	placeholderTextColor: "#aaa",
})`
	width: 100%;
	height: 50px;
	background-color: #373737;
	border-radius: 20px;
	padding-left: 15px;
	padding-right: 15px;
	font-size: 16px;
	color: #fff;
	border: 1px solid #444;
`;

const ButtonContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	margin-top: 20px;
	gap: 10px;
`;

const Button = styled.TouchableOpacity`
	flex: 1;
	height: 45px;
	background-color: #4caf50;
	border-radius: 20px;
	justify-content: center;
	align-items: center;
`;

const CancelButton = styled.TouchableOpacity`
	flex: 1;
	height: 45px;
	background-color: #f44336;
	border-radius: 20px;
	justify-content: center;
	align-items: center;
`;

const ButtonText = styled.Text`
	color: #fff;
	font-size: 16px;
	font-weight: bold;
`;

export const CreatePost = ({ onClose, onAdd }) => {
	const [ingredientText, setIngredientText] = useState("");

	const handleAdd = () => {
		if (ingredientText.trim()) {
			onAdd && onAdd(ingredientText.trim());
			setIngredientText("");
			onClose && onClose();
		}
	};

	const handleCancel = () => {
		setIngredientText("");
		onClose && onClose();
	};

	return (
		<Container>
			<FormContainer>
				<HintText>Введіть інгредієнт:</HintText>
				<Input
					placeholder='наприклад: Молоко 150мл'
					value={ingredientText}
					onChangeText={setIngredientText}
					autoFocus={true}
				/>
				<ButtonContainer>
					<CancelButton onPress={handleCancel}>
						<ButtonText>Скасувати</ButtonText>
					</CancelButton>
					<Button onPress={handleAdd}>
						<ButtonText>Додати</ButtonText>
					</Button>
				</ButtonContainer>
			</FormContainer>
		</Container>
	);
};
