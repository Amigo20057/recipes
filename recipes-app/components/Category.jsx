import { Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
	width: 100%;
	min-height: 200px;
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

const ContainerImageCategory = styled.View`
	width: 100%;
	height: 150px;
	padding-top: 5px;
`;

const ImageCategory = styled.Image.attrs({
	resizeMode: "cover",
})`
	width: 100%;
	height: 100%;
	border-radius: 15px;
`;

export const Category = ({ categoryName, imgUri }) => {
	return (
		<Container>
			<Text style={{ color: "#fff", fontSize: 18 }}>{categoryName}</Text>
			<ContainerImageCategory>
				<ImageCategory source={imgUri} />
			</ContainerImageCategory>
		</Container>
	);
};
