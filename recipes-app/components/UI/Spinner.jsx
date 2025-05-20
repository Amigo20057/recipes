import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const SpinnerWrapper = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: #373737;
`;

export const Spinner = () => {
	return (
		<SpinnerWrapper>
			<ActivityIndicator size='large' color='#ffffff' />
		</SpinnerWrapper>
	);
};
