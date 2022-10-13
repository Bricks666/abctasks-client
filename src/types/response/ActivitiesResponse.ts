import { Activities, ActivitySphere } from '@/models/activities/types';

export interface ActivityResponse {
	readonly activityId: number;
	readonly login: string;
	readonly activityType: Activities;
	readonly activitySphere: ActivitySphere;
	readonly date: string;
}

export interface ActivitiesResponse {
	readonly activities: ActivityResponse[];
}
