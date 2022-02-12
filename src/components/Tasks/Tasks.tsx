import React, { FC } from "react";
import classNames from "classnames";
import { useStatuses, useTasks } from "../../hooks";
import { ClassNameProps } from "../../interfaces/common";
import { TasksList } from "../TasksList";

import TasksStyle from "./Tasks.module.css";

/* Возможно стоит сделать четкие четыре колонки */
export const Tasks: FC<ClassNameProps> = ({ className }) => {
	const tasks = useTasks();
	const statusesMap = useStatuses();

	const lists = Object.entries(tasks).map(([statusName, tasks]) => {
		return (
			<TasksList
				listHeader={statusesMap[statusName as keyof typeof statusesMap]}
				tasks={tasks}
				key={statusName}
			/>
		);
	});

	return (
		<section className={classNames(TasksStyle.tasks, className)}>
			{lists}
		</section>
	);
};
