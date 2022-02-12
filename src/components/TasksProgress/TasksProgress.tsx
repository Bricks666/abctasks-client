import React, { FC } from "react";
import classNames from "classnames";
import { ClassNameProps } from "../../interfaces/common";
import { useTasksProgress, useTasksProgressLoading } from "../../hooks";
import { TaskProgress } from "../TaskProgress";
import { ListWithLoading } from "../../ui/ListWithLoading";
import { Text } from "../../ui/Text";

import TasksProgressStyle from "./TasksProgress.module.css";

export const TasksProgress: FC<ClassNameProps> = ({ className }) => {
	const tasks = useTasksProgress();
	const isLoading = useTasksProgressLoading();

	return (
		<section className={classNames(TasksProgressStyle.wrapper, className)}>
			<Text component="h3">Tasks Progress</Text>
			<ListWithLoading
				className={TasksProgressStyle.list}
				items={tasks}
				Component={TaskProgress}
				indexedBy="id"
				isLoading={isLoading}
				loadingIndicator={<h2>Загрузка...</h2>}
			/>
		</section>
	);
};
