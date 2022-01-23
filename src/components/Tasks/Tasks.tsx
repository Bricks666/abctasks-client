import React, { FC } from "react";
import { useLoadingTasks, useTasks } from "../../hooks";
import { OnlyClassName } from "../../interfaces/common";
import { groupBy } from "../../utils";
import { LoadingWrapper } from "../../ui/LoadingWrapper";
import { TasksList } from "../TasksList";

export const Tasks: FC<OnlyClassName> = ({ className }) => {
	const tasks = useTasks();
	const groupedTasks = groupBy(tasks, (task) => task.status);
	const isLoading = useLoadingTasks();

	return (
		<section className={className}>
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
