import { $LoginError } from "@/models/User";
import { useStore } from "effector-react";

export const useLoginError = () => {
	return useStore($LoginError);
};
