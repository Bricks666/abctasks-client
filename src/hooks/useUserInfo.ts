import { $User } from "@/models/User";
import { useStore } from "effector-react";

export const useUserInfo = () => {
	return useStore($User);
};
