import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useRecipes = () => {
	return useQuery({
		queryKey: ["recipes"],
		queryFn: async () => {
			return await axios.get("http://192.168.1.101:4000/recipes/");
		},
		select: data => data.data,
	});
};
