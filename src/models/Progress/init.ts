import { getTasksProgressApi, subscribeChangeProgressApi } from "@/api";
import { SubscribeChangeProfileProps } from "@/api/progress";
import { forward, guard, sample } from "effector";
import {
	$LoadingTasksProgress,
	$ProgressSubscribe,
	$TasksProgress,
	changeProgress,
	loadTasksProgress,
	loadTasksProgressFx,
	setUnsubscribe,
	subscribeChangeProgress,
	subscribeChangeProgressFx,
} from ".";
import { mayStartFxHandler } from "../handlers";
import { logoutFx } from "../User";
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
		onError: async ({ reconnect }) => {
			const close = await reconnect();
			setUnsubscribe(close);
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

forward({
	from: [setUnsubscribe, subscribeChangeProgressFx.doneData],
	to: $ProgressSubscribe,
});

sample({
	source: $ProgressSubscribe,
	clock: logoutFx.done,
	fn: (close) => {
		close && close();
		return null;
	},
	target: $ProgressSubscribe,
});
