import { forward, guard, sample } from 'effector';
import { progressApi } from '@/api';
import {
	$LoadingTasksProgress,
	$TasksProgress,
	changeProgress,
	loadTasksProgress,
	loadTasksProgressFx,
	resetProgress,
	subscribeChangeProgress,
	subscribeChangeProgressFx,
} from '.';
import { mayStartFxHandler } from '../handlers';
import { changeProgressHandler } from './handler';
import { toValidTaskProgress } from './utils';

loadTasksProgressFx.use(progressApi.getAll);
subscribeChangeProgressFx.use(async ({ closeRef, ...config }) => {
	closeRef.current = await progressApi.subscribeChangeProgressApi(config);
});

guard({
	clock: loadTasksProgress,
	filter: mayStartFxHandler(loadTasksProgressFx.pending),
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
	fn: (data) => ({
		onChangeProgress: changeProgress,
		onError: () => subscribeChangeProgress(data),
		...data,
	}),
	target: subscribeChangeProgressFx,
});

sample({
	source: $TasksProgress,
	clock: changeProgress,
	fn: changeProgressHandler,
	target: $TasksProgress,
});

sample({
	clock: resetProgress,
	fn: () => [],
	target: $TasksProgress,
});
