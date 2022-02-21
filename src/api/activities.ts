import { ActivitiesResponse, ActivityResponse } from "@/interfaces/response";
import { ErrorHandlerParams } from "@/packages/eventSource";
import { instance, sseListener } from "./instance";

export const getActivitiesApi = async (): Promise<ActivitiesResponse> => {
	const response = await instance.get("/activities/");

	return response.data;
};

export const subscribeNewActivitiesApi = async (
	onNewActivity: (activity: ActivityResponse) => void,
	onError?: (param: ErrorHandlerParams) => void
) => {
	return sseListener.connect<string>("activities/subscribe", {
		onmessage: (evt) => onNewActivity(JSON.parse(evt.data)),
		onerror: onError,
	});
};
