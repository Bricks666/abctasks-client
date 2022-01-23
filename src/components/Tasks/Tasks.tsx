import React, { FC } from "react";
import classNames from "classnames";
import { useLoadingTasks, useTasks } from "../../hooks";
import { ClassNameComponent } from "../../interfaces/common";
import { groupBy } from "../../utils";
import { LoadingWrapper } from "../../ui/LoadingWrapper";
import { TasksList } from "../TasksList";

import TasksStyle from "./Tasks.module.css";

export const Tasks: FC<ClassNameComponent> = ({ className }) => {
	const tasks = useTasks();
	const groupedTasks = groupBy(tasks, (task) => task.status);
	const isLoading = useLoadingTasks();

	return (
		<section className={classNames(TasksStyle.tasks, className)}>
			<LoadingWrapper
				isLoading={isLoading}
				loadingIndicator={<h2>Загрузка...</h2>}
			>
				{Object.entries(groupedTasks).map(([title, tasks]) => (
					<TasksList listHeader={title} tasks={tasks} key={title} />
				))}
			</LoadingWrapper>
		</section>
	);
};
