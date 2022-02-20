import { ActivitiesResponse, ActivityResponse } from "@/interfaces/response";
import { SSEListener } from "@/packages/eventSource";
import { instance, accessToken, baseURL } from "./instance";

export const getActivitiesApi = async (): Promise<ActivitiesResponse> => {
	const response = await instance.get("/activities/");

	return response.data;
};

export const subscribeNewActivitiesApi = async (
	onNewActivity: (activity: ActivityResponse) => void
) => {
	/* Доделать слушатель, чтобы можно было вынести создание в отдельный файл */
	const sseListener = new SSEListener({
		baseURL,
		headers: {
			Authorization: accessToken,
		},
	});
	return sseListener.connect<string>("activities/subscribe", {
		onmessage: (evt) => onNewActivity(JSON.parse(evt.data)),
	});
};
