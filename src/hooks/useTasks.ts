import { useStore } from "effector-react";
import { useEffect } from "react";
import { $Tasks, loadTasksFx, TaskStructure } from "../models/Tasks/";

export const useTasks = (): TaskStructure[] => {
	const tasks = useStore($Tasks);

	useEffect(() => {
		if (tasks.length === 0) {
			loadTasksFx();
		}
	}, [tasks.length]);

	return tasks;
};
