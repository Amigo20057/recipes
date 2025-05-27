import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useComments = postId => {
	return useQuery({
		queryKey: ["comments"],
		queryFn: async () => {
			return await axios.get(
				`http://192.168.1.101:4000/comments/${postId}`
			);
		},
		select: data => data.data,
	});
};
