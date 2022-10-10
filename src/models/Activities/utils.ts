import { ActivityResponse } from '@/interfaces/response';
import { ActivityStructure } from './types';

export const toValidActivity = (
	activity: ActivityResponse
): ActivityStructure => {
	return {
		id: activity.activityId,
		activist: activity.login,
		activity: activity.activityType,
		sphere: activity.activitySphere,
		date: activity.date,
	};
};
