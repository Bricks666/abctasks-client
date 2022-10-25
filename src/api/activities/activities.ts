import { ErrorHandlerParams } from '@/packages/eventSource';
import { fetcher } from '@/packages/request';
import { ID, ActivityResponse, StandardResponse } from '@/types';
import { sseListener } from '../instance';
import { Activity } from '@/models/activities/types';

const activitiesFetcher = fetcher.create({
	baseURL: 'activities',
});

export const getAll = async (roomId: number) => {
	return activitiesFetcher.get<StandardResponse<Activity[]>>({
		path: {
			url: roomId,
		},
	});
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
