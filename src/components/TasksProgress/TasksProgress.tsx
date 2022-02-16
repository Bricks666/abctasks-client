import React, { FC } from "react";
import classNames from "classnames";
import { ClassNameProps } from "../../interfaces/common";
import { useTasksProgress, useTasksProgressLoading } from "../../hooks";
import { TaskProgress } from "../TaskProgress";
import { ListWithLoading } from "../../ui/ListWithLoading";
import { ListItem } from "../../ui/ListItem";
import { Text } from "../../ui/Text";
import { LoadingIndicator } from "../../ui/LoadingIndicator";

import TasksProgressStyle from "./TasksProgress.module.css";

export const TasksProgress: FC<ClassNameProps> = ({ className }) => {
	const tasks = useTasksProgress();
	const isLoading = useTasksProgressLoading();

	return (
		<section className={classNames(TasksProgressStyle.wrapper, className)}>
			<Text component="h3">Tasks Progress</Text>
			<ListWithLoading
				className={TasksProgressStyle.list}
				isLoading={isLoading}
				loadingIndicator={<LoadingIndicator />}
			>
				{tasks.map((task) => (
					<ListItem key={task.id}>
						<TaskProgress {...task} />
					</ListItem>
				))}
			</ListWithLoading>
		</section>
	);
};
