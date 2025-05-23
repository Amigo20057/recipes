import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
	Dimensions,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";

const screenHeight = Dimensions.get("window").height;

const Container = styled.ScrollView.attrs(() => ({
	contentContainerStyle: {
		flexGrow: 1,
		alignItems: "center",
		paddingVertical: 80,
		paddingHorizontal: 15,
	},
}))`
	flex: 1;
	background-color: #373737;
`;

const Logo = styled.Image.attrs({
	resizeMode: "contain",
})`
	width: 150px;
	height: 50px;
`;

const BtnsNavigation = styled.View`
	margin-top: 40px;
	width: 250px;
	height: 40px;
	flex-direction: row;
	justify-content: space-between;
`;

const LinkWrapper = styled.View`
	position: relative;
	align-items: center;
`;

const LinkBtn = styled.Text`
	font-size: 20px;
	font-weight: 200;
	color: #fff;
`;

const Underline = styled.View`
	position: absolute;
	bottom: 10px;
	height: 0.5px;
	width: 100%;
	background-color: #fff;
`;

const Form = styled.View`
	width: 250px;
	margin-top: 40px;
`;

const FormInputContainer = styled.View`
	flex-direction: row;
	align-items: center;
	background-color: #232222;
	border-radius: 25px;
	padding: 0 10px;
	height: 40px;
	margin-bottom: 10px;
`;

const FormInput = styled.TextInput.attrs({
	placeholderTextColor: "#fff",
})`
	flex: 1;
	color: #fff;
	font-size: 16px;
	font-weight: 300;
`;

const SendBtn = styled.TouchableOpacity`
	margin-top: 40px;
	width: 250px;
	height: 50px;
	background-color: #232222;
	border-radius: 25px;
	align-items: center;
	justify-content: center;
`;

const ButtonText = styled.Text`
	font-size: 18px;
	color: #fff;
`;

const TextError = styled.Text`
	color: red;
	font-size: 14px;
	margin-bottom: 10px;
`;

const InputImage = styled.Image.attrs({
	resizeMode: "contain",
})`
	width: 20px;
	height: 20px;
	margin-right: 10px;
`;

export const RegisterScreen = () => {
	const [errorMessage, setErrorMessage] = useState();
	const navigation = useNavigation();
	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			fullName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const password = watch("password");

	const registerMutation = useMutation({
		mutationFn: async values => {
			const { confirmPassword, ...payload } = values;
			const response = await axios.post(
				"http://192.168.1.101:4000/auth/register",
				payload
			);
			const token = response.data.token;
			if (!token) {
				throw new Error("Token not received");
			}
			await AsyncStorage.setItem("token", token);
		},
		onSuccess: () => {
			navigation.navigate("Home");
		},
		onError: error => {
			setErrorMessage("Некоректний емейл або пароль");
		},
	});

	const onSubmit = data => {
		registerMutation.mutate(data);
	};

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<Container keyboardShouldPersistTaps='handled'>
					<Logo source={require("../assets/logo.png")} />
					<BtnsNavigation>
						<LinkWrapper>
							<LinkBtn>Реєстрація</LinkBtn>
							<Underline />
						</LinkWrapper>
						<LinkWrapper>
							<LinkBtn
								onPress={() => navigation.navigate("Login")}
							>
								Увійти
							</LinkBtn>
						</LinkWrapper>
					</BtnsNavigation>
					<Form>
						<FormInputContainer>
							<InputImage
								source={require("../assets/fullNameIcon.png")}
							/>
							<Controller
								control={control}
								name='fullName'
								rules={{ required: true }}
								render={({ field: { onChange, value } }) => (
									<FormInput
										placeholder="Повне Ім'я"
										value={value}
										onChangeText={onChange}
									/>
								)}
							/>
						</FormInputContainer>

						<FormInputContainer>
							<InputImage
								source={require("../assets/emailIcon.png")}
							/>
							<Controller
								control={control}
								name='email'
								rules={{
									required: "Обовʼязково",
									pattern: {
										value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
										message: "Невірний email",
									},
								}}
								render={({ field: { onChange, value } }) => (
									<FormInput
										placeholder='Електронна пошта'
										keyboardType='email-address'
										autoCapitalize='none'
										value={value}
										onChangeText={onChange}
									/>
								)}
							/>
						</FormInputContainer>
						{errors.email && (
							<TextError>{errors.email.message}</TextError>
						)}

						<FormInputContainer>
							<InputImage
								source={require("../assets/passwordIcon.png")}
							/>
							<Controller
								control={control}
								name='password'
								rules={{
									required: "Обовʼязково",
									minLength: {
										value: 5,
										message: "Мінімум 5 символів",
									},
								}}
								render={({ field: { onChange, value } }) => (
									<FormInput
										placeholder='Пароль'
										secureTextEntry={true}
										value={value}
										onChangeText={onChange}
									/>
								)}
							/>
						</FormInputContainer>
						{errors.password && (
							<TextError>{errors.password.message}</TextError>
						)}

						<FormInputContainer>
							<InputImage
								source={require("../assets/passwordIcon.png")}
							/>
							<Controller
								control={control}
								name='confirmPassword'
								rules={{
									required: "Обовʼязково",
									validate: value =>
										value === password ||
										"Паролі не співпадають",
								}}
								render={({ field: { onChange, value } }) => (
									<FormInput
										placeholder='Підтвердження пароля'
										secureTextEntry={true}
										value={value}
										onChangeText={onChange}
									/>
								)}
							/>
						</FormInputContainer>
						{errors.confirmPassword && (
							<TextError>
								{errors.confirmPassword.message}
							</TextError>
						)}

						{errorMessage && <TextError>{errorMessage}</TextError>}

						<SendBtn onPress={handleSubmit(onSubmit)}>
							<ButtonText>Зареєструватися</ButtonText>
						</SendBtn>
					</Form>
				</Container>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};
