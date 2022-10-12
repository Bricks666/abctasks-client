import { ID } from '@/types/common';
import {
	ChangeProgressResponse,
	TasksProgressResponse,
} from '@/types/response';
import { ErrorHandlerParams } from '@/packages/eventSource';
import { instance, sseListener } from './instance';

export const getTasksProgressApi = async (
	roomId: ID
): Promise<TasksProgressResponse> => {
	const response = await instance.get(`/progress/${roomId}`);
	return response.data;
};

export interface SubscribeChangeProgressProps {
	readonly roomId: ID;
	readonly onChangeProgress: (progress: ChangeProgressResponse[]) => unknown;
	readonly onError?: (param: ErrorHandlerParams) => unknown;
}

export const subscribeChangeProgressApi = async ({
	onChangeProgress,
	onError,
	roomId,
}: SubscribeChangeProgressProps) => {
	return sseListener.connect<string>(`progress/${roomId}/subscribe`, {
		onerror: onError,
		onmessage: (evt) => onChangeProgress(JSON.parse(evt.data)),
	});
};
