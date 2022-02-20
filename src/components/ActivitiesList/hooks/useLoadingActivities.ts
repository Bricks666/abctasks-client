import { loadActivitiesFx } from "@/models/Activities";
import { useStore } from "effector-react";

export const useLoadingActivities = () => {
	return useStore(loadActivitiesFx.pending);
};
