import { ID } from '@/types/common';
import { ActivityResponse, StandardResponse } from '@/types/response';
import { ErrorHandlerParams } from '@/packages/eventSource';
import { instance, sseListener } from './instance';
import { Activity } from '@/models/activities/types';

export const getAll = async (roomId: ID) => {
	const response = await instance.get<StandardResponse<Activity[]>>(
		`/activities/${roomId}`
	);
	return response.data;
};

export interface SubscribeNewActivitiesApiParams {
	roomId: ID;
	onNewActivity: (activity: ActivityResponse) => void;
	onError?: (param: ErrorHandlerParams) => void;
}

export const subscribeCreate = async ({
	onError,
	onNewActivity,
	roomId,
}: SubscribeNewActivitiesApiParams) => {
	return sseListener.connect<string>(`activities/${roomId}/subscribe`, {
		onmessage: (evt) => onNewActivity(JSON.parse(evt.data)),
		onerror: onError,
	});
};
