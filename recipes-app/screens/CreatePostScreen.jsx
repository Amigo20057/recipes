import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	TouchableOpacity,
	View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import styled from "styled-components/native";
import { CreatePost } from "../components/UI/CreatePost";

const TopHeader = styled.View`
	width: 100%;
	height: 200px;
	background-color: #232222;
	align-items: center;
	justify-content: center;
	border-bottom-left-radius: 20px;
	border-bottom-right-radius: 20px;
	position: relative;
`;

const TopHeaderText = styled.Text`
	font-size: 16px;
	color: #fff;
`;

const SubmitButton = styled.TouchableOpacity`
	position: absolute;
	top: 15px;
	right: 15px;
	background-color: #373737;
	padding: 10px 20px;
	border-radius: 20px;
	z-index: 100;
`;

const SubmitButtonText = styled.Text`
	color: #fff;
	font-size: 14px;
	font-weight: bold;
`;

const Input = styled.TextInput.attrs({
	placeholderTextColor: "#fff",
})`
	width: 100%;
	height: 50px;
	background-color: #232222;
	border-radius: 20px;
	padding-left: 15px;
	font-size: 16px;
	color: #fff;
	shadow-color: #000;
	shadow-offset: 6px 6px;
	shadow-opacity: 0.3;
	shadow-radius: 15px;
	elevation: 8;
`;

const TextArea = styled.TextInput.attrs({
	placeholderTextColor: "#fff",
	multiline: true,
})`
	width: 100%;
	min-height: 150px;
	background-color: #232222;
	border-radius: 20px;
	padding: 15px;
	font-size: 16px;
	color: #fff;
	text-align-vertical: top;
`;

const IngredientsContainer = styled.View`
	width: 100%;
	padding: 15px;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 10px;
`;

const Ingredient = styled.View`
	padding: 10px 15px;
	background-color: #232222;
	border-radius: 20px;
	margin-bottom: 10px;
	margin-right: 10px;
`;

const IngredientContentText = styled.Text`
	font-size: 18px;
	color: #fff;
`;

const AddIngredientBtn = styled.View`
	width: 45px;
	height: 45px;
	background-color: #232222;
	border-radius: 100px;
	align-items: center;
	justify-content: center;
`;

const AddIngredientImage = styled.Image`
	width: 20px;
	height: 20px;
`;

const CustomText = styled.Text`
	font-size: 16px;
	color: #fff;
	background-color: #232222;
	border-radius: 15px;
`;

const ErrorText = styled.Text`
	color: #f44336;
	font-size: 12px;
	margin-top: 5px;
	margin-left: 15px;
`;

export const CreatePostScreen = () => {
	const navigation = useNavigation();
	const [imageUri, setImageUri] = useState(null);
	const [open, setOpen] = useState(false);
	const [items, setItems] = useState([
		{ label: "Салати", value: "Салати" },
		{ label: "Супи", value: "Супи" },
		{ label: "Десерти", value: "Десерти" },
		{ label: "Закуски", value: "Закуски" },
	]);
	const route = useRoute();
	const { token } = route.params;
	const [ingredients, setIngredients] = useState([]);
	const [isOpenCreateTagWindow, setIsOpenCreateTagWindow] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm({
		defaultValues: {
			title: "",
			category: null,
			description: "",
			cookingTime: "1,5ч",
		},
	});

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled && result.assets.length > 0) {
			setImageUri(result.assets[0].uri);
		}
	};

	const removeTag = indexToRemove => {
		setIngredients(
			ingredients.filter((_, index) => index !== indexToRemove)
		);
	};

	const addTag = value => {
		if (value && value.trim()) {
			setIngredients([...ingredients, value.trim()]);
		}
	};

	const renderTags = () => {
		return ingredients.map((item, index) => (
			<TouchableOpacity
				key={index}
				onLongPress={() => removeTag(index)}
				delayLongPress={500}
			>
				<Ingredient>
					<IngredientContentText>{item}</IngredientContentText>
				</Ingredient>
			</TouchableOpacity>
		));
	};

	const createPostMutation = useMutation({
		mutationFn: async formData => {
			return await axios.post(
				"http://192.168.1.101:4000/recipes/create",
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "multipart/form-data",
					},
				}
			);
		},
		onSuccess: () => {
			console.log("Пост успішно створено");
			navigation.navigate("Home");
		},
		onError: error => {
			console.error(
				"Помилка створення поста:",
				error.response?.data || error.message
			);
		},
	});

	const onSubmit = async data => {
		const formData = new FormData();

		formData.append("title", data.title);
		formData.append("categories", data.category);
		formData.append("description", data.description);
		formData.append("cookingTime", data.cookingTime);
		formData.append("tags", ingredients.join(", "));

		if (imageUri) {
			const file = {
				uri: imageUri,
				name: "photo.jpg",
				type: "image/jpeg",
			};
			formData.append("picture", file);
		}

		createPostMutation.mutate(formData);
	};

	return (
		<KeyboardAvoidingView
			style={{ flex: 1, backgroundColor: "#373737" }}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={80}
		>
			<ScrollView
				style={{ flex: 1, backgroundColor: "#373737" }}
				contentContainerStyle={{ paddingBottom: 40 }}
				keyboardShouldPersistTaps='handled'
				showsVerticalScrollIndicator={false}
			>
				<TouchableOpacity onPress={pickImage}>
					<TopHeader>
						<SubmitButton
							onPress={() => navigation.navigate("Home")}
						>
							<SubmitButtonText>Головна</SubmitButtonText>
						</SubmitButton>

						{imageUri ? (
							<Image
								source={{ uri: imageUri }}
								style={{
									width: "100%",
									height: "100%",
									borderBottomLeftRadius: 20,
									borderBottomRightRadius: 20,
								}}
								resizeMode='cover'
							/>
						) : (
							<TopHeaderText>
								Натисни, щоб завантажити фото
							</TopHeaderText>
						)}
					</TopHeader>
				</TouchableOpacity>

				<View
					style={{ marginTop: 15, paddingLeft: 15, paddingRight: 15 }}
				>
					<Controller
						control={control}
						name='title'
						rules={{
							required: "Назва обов'язкова",
							minLength: {
								value: 3,
								message: "Минимум 3 символа",
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								placeholder='Назва'
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
							/>
						)}
					/>
					{errors.title && (
						<ErrorText>{errors.title.message}</ErrorText>
					)}
				</View>

				<View
					style={{
						marginTop: 15,
						zIndex: 1000,
						paddingLeft: 15,
						paddingRight: 15,
					}}
				>
					<Controller
						control={control}
						name='category'
						rules={{ required: "Оберіть категорію" }}
						render={({ field: { onChange, value } }) => (
							<DropDownPicker
								open={open}
								value={value}
								items={items}
								setOpen={setOpen}
								setValue={callback => {
									const newValue = callback(value);
									onChange(newValue);
								}}
								setItems={setItems}
								listMode='SCROLLVIEW'
								style={{
									backgroundColor: "#232222",
									borderColor: "#444",
									borderRadius: 20,
								}}
								dropDownContainerStyle={{
									backgroundColor: "#232222",
									borderColor: "#444",
									borderRadius: 20,
								}}
								textStyle={{ color: "#fff" }}
								arrowIconStyle={{ tintColor: "#fff" }}
								placeholder='Оберіть категорію'
								onChangeValue={onChange}
							/>
						)}
					/>
					{errors.category && (
						<ErrorText>{errors.category.message}</ErrorText>
					)}
				</View>

				<View
					style={{ marginTop: 15, paddingLeft: 15, paddingRight: 15 }}
				>
					<Controller
						control={control}
						name='description'
						rules={{
							required: "Опис обов'язковий",
							minLength: {
								value: 10,
								message: "Минимум 10 символов",
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextArea
								placeholder='Опис посту...'
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
							/>
						)}
					/>
					{errors.description && (
						<ErrorText>{errors.description.message}</ErrorText>
					)}
				</View>

				<View
					style={{
						marginTop: 15,
						flexDirection: "row",
						justifyContent: "space-between",
						gap: 10,
						paddingLeft: 15,
						paddingRight: 15,
					}}
				>
					<Input
						editable={false}
						style={{ width: "60%" }}
						placeholder='Час приготування:'
					/>
					<Controller
						control={control}
						name='cookingTime'
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								style={{ width: "35%" }}
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								placeholder='1,5ч'
							/>
						)}
					/>
				</View>

				<View
					style={{
						marginTop: 15,
						flexDirection: "row",
						justifyContent: "space-between",
						gap: 10,
						paddingLeft: 15,
						paddingRight: 15,
					}}
				>
					<Input
						editable={false}
						style={{ width: "50%" }}
						placeholder='Ингридиенты:'
					/>
				</View>

				<IngredientsContainer>
					{renderTags()}
					<TouchableOpacity
						onPress={() => setIsOpenCreateTagWindow(prev => !prev)}
					>
						<AddIngredientBtn>
							<AddIngredientImage
								source={require("../assets/plus.png")}
							/>
						</AddIngredientBtn>
					</TouchableOpacity>
				</IngredientsContainer>

				<View
					style={{
						marginTop: 30,
						width: "100%",
						display: "flex",
						alignItems: "center",
					}}
				>
					<TouchableOpacity onPress={handleSubmit(onSubmit)}>
						<CustomText
							style={{
								width: "50%",
								color: "white",
								textAlign: "center",
								padding: 10,
							}}
						>
							{createPostMutation.isPending
								? "Завантаження..."
								: "Створити"}
						</CustomText>
					</TouchableOpacity>
				</View>
			</ScrollView>

			{isOpenCreateTagWindow && (
				<CreatePost
					onClose={() => setIsOpenCreateTagWindow(false)}
					onAdd={addTag}
				/>
			)}
		</KeyboardAvoidingView>
	);
};
