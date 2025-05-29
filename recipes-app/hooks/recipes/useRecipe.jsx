import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Constants from "expo-constants";

export const useRecipe = recipeId => {
	const apiUrl = Constants.expoConfig.extra.apiUrl;
	return useQuery({
		queryKey: ["recipe"],
		queryFn: async () => {
			return await axios.get(`${apiUrl}/recipes/${recipeId}`);
		},
		select: data => data.data,
	});
};
