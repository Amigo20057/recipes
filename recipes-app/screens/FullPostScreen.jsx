import { Dimensions, ScrollView, Text } from "react-native";
import styled from "styled-components/native";

const screenHeight = Dimensions.get("window").height;

const Container = styled(ScrollView)`
	min-height: ${screenHeight}px;
	background-color: #373737;
`;

export const FullPostScreen = () => {
	return (
		<Container>
			<Text>HELLO WORLD</Text>
		</Container>
	);
};
