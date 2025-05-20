import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useProfile = () => {
	return useQuery({
		queryKey: ["profile"],
		queryFn: async () => {
			return await axios.get("http://192.168.1.101:4000/users/");
		},
		select: data => data.data,
	});
};
