import { useStore } from "effector-react";
import { $RegistrationError } from "@/models/Auth";

export const useRegistrationError = () => {
	return useStore($RegistrationError);
};
