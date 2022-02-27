import { TaskResponse } from "@/interfaces/response";
import { TaskStructure } from "./types";
import { toValidTask } from "./utils";

export const editTaskHandler = (
	tasks: TaskStructure[],
	{ task }: { task: TaskResponse }
) => {
	const validTask = toValidTask(task);

	return tasks.map((task) => (task.id === validTask.id ? validTask : task));
};
