import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Constants from "expo-constants";

export const useFollowsRecipes = token => {
	console.log(token);
	const apiUrl = Constants.expoConfig.extra.apiUrl;
	return useQuery({
		queryKey: ["user-follows-recipes"],
		queryFn: async () => {
			return await axios.get(`${apiUrl}/recipes/follow/recipes`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		},
		select: data => data.data,
	});
};
