import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useRecipe = recipeId => {
	return useQuery({
		queryKey: ["recipe"],
		queryFn: async () => {
			return await axios.get(
				`http://192.168.1.101:4000/recipes/${recipeId}`
			);
		},
		select: data => data.data,
	});
};
