import { useEffect } from "react";
import { useStoreMap } from "effector-react";
import { loadTasksProgressFx } from "../effects";
import { TaskProgressStructure } from "../interfaces/structures";
import { $TasksProgressStore } from "../stores";

export const useTasksProgress = (): TaskProgressStructure[] => {
	const tasksProgress = useStoreMap(
		$TasksProgressStore,
		(state) => state.tasksProgress
	);

	useEffect(() => {
		loadTasksProgressFx();
	}, [tasksProgress.length]);

	return tasksProgress;
};
