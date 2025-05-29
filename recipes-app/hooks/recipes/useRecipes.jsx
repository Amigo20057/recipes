import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Constants from "expo-constants";

export const useRecipes = (category = null) => {
	const apiUrl = Constants.expoConfig.extra.apiUrl;
	return useQuery({
		queryKey: ["recipes", category],
		queryFn: async () => {
			if (category) {
				return await axios.get(`${apiUrl}/recipes/`, {
					params: { category },
				});
			} else {
				return await axios.get(`${apiUrl}/recipes/`);
			}
		},
		select: data => data.data,
	});
};
