import { useStore } from "effector-react";
import { $StatusNamesStore } from "../models/Tasks";

export const useStatuses = () => {
	return useStore($StatusNamesStore);
};
