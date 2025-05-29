import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Constants from "expo-constants";

export const useComments = postId => {
	const apiUrl = Constants.expoConfig.extra.apiUrl;
	return useQuery({
		queryKey: ["comments"],
		queryFn: async () => {
			return await axios.get(`${apiUrl}/comments/${postId}`);
		},
		select: data => data.data,
	});
};
