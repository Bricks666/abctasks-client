import { SubscribeChangeProfileProps } from "@/api/progress";
import {
	ChangeProgressResponse,
	TasksProgressResponse,
} from "@/interfaces/response";
import { CloseConnect } from "@/packages/eventSource";
import { createDomain } from "effector-logger";
import { TaskProgressStructure } from "./types";

export const ProgressDomain = createDomain("ProgressDomain");

export const $TasksProgress = ProgressDomain.createStore<
	TaskProgressStructure[]
>([], {
	name: "TasksProgress",
});
export const $LoadingTasksProgress = ProgressDomain.createStore<boolean>(
	false,
	{
		name: "LoadingTasksProgress",
	}
);
export const $ProgressSubscribe =
	ProgressDomain.createStore<CloseConnect | null>(null, {
		name: "ProgressSubscribe",
	});

export const loadTasksProgressFx = ProgressDomain.createEffect<
	void,
	TasksProgressResponse
>("loadTasksProgress");
export const subscribeChangeProgressFx = ProgressDomain.createEffect<
	SubscribeChangeProfileProps,
	CloseConnect
>("subscribeChangeProgressFx");

export const loadTasksProgress =
	ProgressDomain.createEvent("loadTasksProgress");
export const subscribeChangeProgress = ProgressDomain.createEvent<void>(
	"subscribeChangeProgressEvent"
);
export const changeProgress = ProgressDomain.createEvent<
	ChangeProgressResponse[]
>("changeProgressEvent");
export const setUnsubscribe =
	ProgressDomain.createEvent<CloseConnect>("setUnsubscribe");
