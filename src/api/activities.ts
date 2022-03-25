import { ID } from "@/interfaces/common";
import { ActivitiesResponse, ActivityResponse } from "@/interfaces/response";
import { ErrorHandlerParams } from "@/packages/eventSource";
import { instance, sseListener } from "./instance";

export const getActivitiesApi = async (
	roomId: ID
): Promise<ActivitiesResponse> => {
	const response = await instance.get(`/activities/${roomId}`);

	return response.data;
};

interface SubscribeNewActivitiesApiParams {
	roomId: ID;
	onNewActivity: (activity: ActivityResponse) => void;
	onError?: (param: ErrorHandlerParams) => void;
}

export const subscribeNewActivitiesApi = async ({
	onError,
	onNewActivity,
	roomId,
}: SubscribeNewActivitiesApiParams) => {
	return sseListener.connect<string>(`activities/${roomId}/subscribe`, {
		onmessage: (evt) => onNewActivity(JSON.parse(evt.data)),
		onerror: onError,
	});
};
