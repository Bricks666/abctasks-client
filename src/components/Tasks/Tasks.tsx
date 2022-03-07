import React, { FC } from "react";
import classNames from "classnames";
import { useGroupedTasks, useLoadingTasks } from "@/hooks";
import { ClassNameProps } from "@/interfaces/common";
import { LoadingWrapper } from "@/ui/LoadingWrapper";
import { LoadingIndicator } from "@/ui/LoadingIndicator";
import { TasksList } from "../TasksList";

import TasksStyle from "./Tasks.module.css";

/* Возможно стоит сделать четкие четыре колонки */
export const Tasks: FC<ClassNameProps> = ({ className }) => {
	const tasks = useGroupedTasks();
	const isLoading = useLoadingTasks();

	return (
		<section className={classNames(TasksStyle.tasks, className)}>
			<LoadingWrapper
				className={TasksStyle.loading}
				isLoading={isLoading}
				loadingIndicator={<LoadingIndicator />}
			>
				<TasksList listHeader="Ready" tasks={tasks["ready"]} key="Ready" />
				<TasksList
					listHeader="In Progress"
					tasks={tasks["inProgress"]}
					key="In progress"
				/>
				<TasksList
					listHeader="Review"
					tasks={tasks["needReview"]}
					key="Review"
				/>
				<TasksList listHeader="Done" tasks={tasks["done"]} key="Done" />
			</LoadingWrapper>
		</section>
	);
};
