import { useStoreMap } from "effector-react";
import { $Tasks, TaskStructure } from "../models/Tasks";

export const useTask = (
	taskId: number | string | null
): TaskStructure | null => {
	return (
		useStoreMap($Tasks, (tasks) =>
			taskId === null ? null : tasks.find((task) => task.id === +taskId)
		) || null
	);
};
