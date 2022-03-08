import { useStore } from "effector-react";
import { $RegistrationError } from "@/models/User";

export const useRegistrationError = () => {
	return useStore($RegistrationError);
};
