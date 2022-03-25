import { SubscribeChangeProfileProps } from "@/api/progress";
import { ID } from "@/interfaces/common";
import {
	ChangeProgressResponse,
	TasksProgressResponse,
} from "@/interfaces/response";
import { CloseConnect } from "@/packages/eventSource";
import { createDomain } from "effector-logger";
import { TaskProgressStructure } from "./types";

export const ProgressDomain = createDomain("ProgressDomain");

export const $TasksProgress = ProgressDomain.store<TaskProgressStructure[]>(
	[],
	{
		name: "TasksProgress",
	}
);
export const $LoadingTasksProgress = ProgressDomain.store<boolean>(false, {
	name: "LoadingTasksProgress",
});
export const $ProgressSubscribe = ProgressDomain.store<CloseConnect | null>(
	null,
	{
		name: "ProgressSubscribe",
	}
);

export const loadTasksProgressFx = ProgressDomain.effect<
	ID,
	TasksProgressResponse
>("loadTasksProgress");
export const subscribeChangeProgressFx = ProgressDomain.effect<
	SubscribeChangeProfileProps,
	CloseConnect
>("subscribeChangeProgressFx");

export const loadTasksProgress = ProgressDomain.event<ID>("loadTasksProgress");
export const subscribeChangeProgress = ProgressDomain.event<ID>(
	"subscribeChangeProgressEvent"
);
export const changeProgress = ProgressDomain.event<ChangeProgressResponse[]>(
	"changeProgressEvent"
);
export const setUnsubscribe =
	ProgressDomain.event<CloseConnect>("setUnsubscribe");
