import { loadUserFx } from "@/models/User";
import { useStore } from "effector-react";
export const useProfileLoading = () => {
	return useStore(loadUserFx.pending);
};
