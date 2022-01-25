import { useStore } from "effector-react";
import { useEffect } from "react";
import {
	$GroupedByStatusTasksStore,
	GroupedByStatusTasksStore,
	loadTasksFx,
} from "../models/Tasks/";

export const useTasks = (): GroupedByStatusTasksStore => {
	const tasks = useStore($GroupedByStatusTasksStore);

	useEffect(() => {
		loadTasksFx();
	}, []);

	return tasks;
};
