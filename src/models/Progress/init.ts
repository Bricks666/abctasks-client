import { getTasksProgressApi, subscribeChangeProgressApi } from "@/api";
import { SubscribeChangeProfileProps } from "@/api/progress";
import { forward, guard, sample } from "effector";
import {
	$LoadingTasksProgress,
	$TasksProgress,
	changeProgress,
	loadTasksProgress,
	loadTasksProgressFx,
	subscribeChangeProgress,
	subscribeChangeProgressFx,
} from ".";
import { mayStartFxHandler } from "../handlers";
import { changeProgressHandler } from "./handler";
import { toValidTaskProgress } from "./utils";

loadTasksProgressFx.use(getTasksProgressApi);
subscribeChangeProgressFx.use(subscribeChangeProgressApi);

guard({
	clock: loadTasksProgress,
	filter: sample({
		clock: loadTasksProgressFx.pending,
		fn: mayStartFxHandler,
	}),
	target: loadTasksProgressFx,
});

sample({
	clock: loadTasksProgressFx.doneData,
	fn: (taskProgressServer) =>
		taskProgressServer.tasksProgress.map(toValidTaskProgress),
	target: $TasksProgress,
});

forward({
	from: loadTasksProgressFx.pending,
	to: $LoadingTasksProgress,
});

sample({
	clock: subscribeChangeProgress,
	fn: (): SubscribeChangeProfileProps => ({
		onChangeProgress: changeProgress,
		onError: ({ reconnect }) => {
			reconnect();
		},
	}),
	target: subscribeChangeProgressFx,
});

sample({
	source: $TasksProgress,
	clock: changeProgress,
	fn: changeProgressHandler,
	target: $TasksProgress,
});
