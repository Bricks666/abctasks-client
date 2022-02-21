import React, { FC } from "react";
import classNames from "classnames";
import { useLoadingTasks, useStatuses, useTasks } from "@/hooks";
import { ClassNameProps } from "@/interfaces/common";
import { LoadingWrapper } from "@/ui/LoadingWrapper";
import { LoadingIndicator } from "@/ui/LoadingIndicator";
import { TasksList } from "../TasksList";

import TasksStyle from "./Tasks.module.css";

/* Возможно стоит сделать четкие четыре колонки */
export const Tasks: FC<ClassNameProps> = ({ className }) => {
	const tasks = useTasks();
	const statusesMap = useStatuses();
	const isLoading = useLoadingTasks();

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
			<LoadingWrapper
				className={TasksStyle.loading}
				isLoading={isLoading}
				loadingIndicator={<LoadingIndicator />}
			>
				{lists}
			</LoadingWrapper>
		</section>
	);
};
