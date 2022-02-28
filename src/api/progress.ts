import {
	ChangeProgressResponse,
	TasksProgressResponse,
} from "@/interfaces/response";
import { ErrorHandlerParams } from "@/packages/eventSource";
import { instance, sseListener } from "./instance";

export const getTasksProgressApi = async (): Promise<TasksProgressResponse> => {
	const response = await instance.get("/progress");
	return response.data;
};

export interface SubscribeChangeProfileProps {
	readonly onChangeProgress: (progress: ChangeProgressResponse[]) => unknown;
	readonly onError: (param: ErrorHandlerParams) => unknown;
}

export const subscribeChangeProgressApi = async ({
	onChangeProgress,
	onError,
}: SubscribeChangeProfileProps) => {
	return sseListener.connect<string>("progress/subscribe", {
		onerror: onError,
		onmessage: (evt) => onChangeProgress(JSON.parse(evt.data)),
	});
};
