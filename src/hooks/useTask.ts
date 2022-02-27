import { useTasks } from ".";

export const useTask = (taskId: number | string | null) => {
	const tasks = useTasks();

	if (!taskId || !tasks.length) {
		return null;
	}

	return tasks.find((task) => task.id === +taskId) || null;
};
