import { Activities } from "@/models/Activities/types";

export interface ActivityResponse {
	readonly activityId: number;
	readonly activistId: number;
	readonly activityType: Activities;
	readonly addedAt: string;
}

export interface ActivitiesResponse {
	readonly activities: ActivityResponse[];
}
