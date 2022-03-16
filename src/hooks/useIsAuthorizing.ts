import { useStore } from "effector-react";
import { $Authorizing } from "../models/Auth";

export const useIsAuthorizing = () => {
	return useStore($Authorizing);
};
