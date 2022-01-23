import { useStore } from "effector-react";
import { $Authorizing } from "../models/User";

export const useIsAuthorizing = () => {
	return useStore($Authorizing);
};
