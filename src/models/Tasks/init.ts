import { forward, guard, sample } from "effector";
import {
	$LoadingTasks,
	$Tasks,
	createTask,
	createTaskFx,
	deleteTask,
	deleteTaskFx,
	editTask,
	editTaskFx,
	loadTasks,
	loadTasksFx,
	moveTask,
} from ".";
import { getTasksApi, createTaskApi, editTaskApi, deleteTaskApi } from "@/api";
import { mayStartFxHandler } from "../handlers";
import { editTaskHandler } from "./handlers";
import { toValidTask } from "./utils";

loadTasksFx.use(getTasksApi);

createTaskFx.use(createTaskApi);
editTaskFx.use(editTaskApi);
deleteTaskFx.use(deleteTaskApi);

guard({
	clock: loadTasks,
	filter: mayStartFxHandler(loadTasksFx.pending),
	target: loadTasksFx,
});

sample({
	clock: loadTasksFx.doneData,
	fn: (response) => response.tasks.map(toValidTask),
	target: $Tasks,
});

forward({
	from: loadTasksFx.pending,
	to: $LoadingTasks,
});

guard({
	clock: createTask,
	filter: mayStartFxHandler(createTaskFx.pending),
	target: createTaskFx,
});

sample({
	source: $Tasks,
	clock: createTaskFx.doneData,
	fn: (tasks, response) => [...tasks, toValidTask(response.task)],
	target: $Tasks,
});

guard({
	clock: editTask,
	filter: mayStartFxHandler(editTaskFx.pending),
	target: editTaskFx,
});

sample({
	source: $Tasks,
	clock: editTaskFx.doneData,
	fn: editTaskHandler,
	target: $Tasks,
});

guard({
	clock: deleteTask,
	filter: mayStartFxHandler(deleteTaskFx.pending),
	target: deleteTaskFx,
});

sample({
	source: $Tasks,
	clock: deleteTaskFx.doneData,
	fn: (tasks, { taskId }) => {
		return tasks.filter((task) => task.id !== taskId);
	},
	target: $Tasks,
});

sample({
	source: $Tasks,
	clock: moveTask,
	fn: (tasks, { status, taskId, roomId }) => {
		const task = tasks.find((task) => task.id === taskId);
		if (!task) {
			throw new Error();
		}

		return {
			status,
			id: taskId,
			roomId: roomId,
			groupId: task.groupId,
			content: task.content,
		};
	},
	target: editTask,
});
