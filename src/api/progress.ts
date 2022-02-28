import {
	TaskProgressResponse,
	TasksProgressResponse,
} from "@/interfaces/response";
import { ErrorHandlerParams } from "@/packages/eventSource";
import { instance, sseListener } from "./instance";

export const getTasksProgressApi = async (): Promise<TasksProgressResponse> => {
	const response = await instance.get("/progress");
	return response.data;
};

export const subscribeChangeProgressApi = async (
	onChangeProgress: (progress: TaskProgressResponse[]) => unknown,
	onError: (param: ErrorHandlerParams) => unknown
) => {
	return sseListener.connect<string>("/progress/subscribe", {
		onerror: onError,
		onmessage: (evt) => onChangeProgress(JSON.parse(evt.data)),
	});
};
