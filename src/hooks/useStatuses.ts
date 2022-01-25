import { useStore } from "effector-react";
import { $GroupNamesStore } from "../models/Tasks";

export const useStatuses = () => {
	return useStore($GroupNamesStore);
};
