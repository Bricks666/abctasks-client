import { useStoreMap } from "effector-react";
import { useEffect } from "react";
import { loadTasksFx } from "../effects";
import { TaskStructure } from "../interfaces/structures";
import { $TasksStore } from "../stores";

export const useTasks = (): TaskStructure[] => {
	const tasks = useStoreMap($TasksStore, (state) => state.tasks);

	useEffect(() => {
		if (tasks.length === 0) {
			loadTasksFx();
		}
	}, [tasks.length]);

	return tasks;
};
