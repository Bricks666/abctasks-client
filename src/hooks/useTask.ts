import { useTasksWithGroups } from ".";
import { TaskWithGroup } from "../models/Tasks";

export const useTask = (
	taskId: number | string | null
): TaskWithGroup | null => {
	const tasks = useTasksWithGroups();

	return !tasks.length || !taskId
		? null
		: tasks.find((task) => task.id === +taskId) || null;
};
