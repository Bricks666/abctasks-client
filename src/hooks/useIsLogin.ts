import { $Login } from "../models/Auth";
import { useStore } from "effector-react";

export const useIsLogin = () => {
	return useStore($Login);
};
