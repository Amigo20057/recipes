import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useRecipes = (category = null) => {
	return useQuery({
		queryKey: ["recipes", category],
		queryFn: async () => {
			if (category) {
				return await axios.get(`http://192.168.1.101:4000/recipes/`, {
					params: { category },
				});
			} else {
				return await axios.get(`http://192.168.1.101:4000/recipes/`);
			}
		},
		select: data => data.data,
	});
};
