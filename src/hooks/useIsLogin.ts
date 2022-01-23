import { $Login } from "../models/User";
import { useStore } from "effector-react";

export const useIsLogin = () => {
	return useStore($Login);
};
