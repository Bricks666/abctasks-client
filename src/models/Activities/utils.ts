import { ActivityResponse } from "@/interfaces/response";
import { ActivityStructure } from "./types";

export const toValidActivity = (
	activity: ActivityResponse
): ActivityStructure => {
	return {
		id: activity.activityId,
		activistId: activity.activistId,
		activity: activity.activityType,
	};
};
