import React, { FC } from "react";
import { useTasks } from "../../hooks";
import { OnlyClassName } from "../../interfaces/common";
import { groupBy } from "../../utils";
import { TasksList } from "../TasksList";

export const Tasks: FC<OnlyClassName> = ({ className }) => {
	const tasks = useTasks();
	const groupedTasks = groupBy(tasks, (task) => task.status);
	console.log(groupedTasks);
	return (
		<section className={className}>
			{Object.entries(groupedTasks).map(([title, tasks]) => (
				<TasksList listHeader={title} tasks={tasks} key={title} />
			))}
		</section>
	);
};
