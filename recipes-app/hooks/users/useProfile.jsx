import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useProfile = token => {
	return useQuery({
		queryKey: ["profile"],
		queryFn: async () => {
			const response = await axios.get(
				"http://192.168.1.101:4000/users/",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		},
		enabled: !!token,
	});
};
