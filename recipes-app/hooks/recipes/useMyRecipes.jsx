import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useMyRecipes = token => {
	return useQuery({
		queryKey: ["my-recipes"],
		queryFn: async () => {
			return await axios.get(
				"http://192.168.1.101:4000/recipes/my/recipes",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
		},
		select: data => data.data,
	});
};
