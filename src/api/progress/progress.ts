import { fetcher } from '@/packages/request';
import { ID } from '@/types/common';
import {
	ChangeProgressResponse,
	TasksProgressResponse,
} from '@/types/response';
import { ErrorHandlerParams } from '@/packages/eventSource';
import { sseListener } from '../instance';

const progressFetcher = fetcher.create({
	baseURL: 'progress',
});

export const getAll = async (
	roomId: number
): Promise<TasksProgressResponse> => {
	return progressFetcher.get({
		path: {
			url: roomId,
		},
	});
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
