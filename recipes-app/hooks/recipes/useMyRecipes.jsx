import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Constants from "expo-constants";

export const useMyRecipes = token => {
	const apiUrl = Constants.expoConfig.extra.apiUrl;
	return useQuery({
		queryKey: ["my-recipes"],
		queryFn: async () => {
			return await axios.get(`${apiUrl}/recipes/my/recipes`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		},
		select: data => data.data,
	});
};
