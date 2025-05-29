import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Constants from "expo-constants";

export const useProfile = token => {
	const apiUrl = Constants.expoConfig.extra.apiUrl;
	return useQuery({
		queryKey: ["profile"],
		queryFn: async () => {
			const response = await axios.get(`${apiUrl}/users/`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		},
		enabled: !!token,
	});
};
