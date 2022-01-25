import React, { FC } from "react";
import classNames from "classnames";
import { ClassNameComponent } from "../../interfaces/common";
import { useTasksProgress, useTasksProgressLoading } from "../../hooks";
import { TaskProgress } from "../TaskProgress";
import { ListWithLoading } from "../../ui/ListWithLoading";
import { SubsectionHeader } from "../../ui/SubsectionHeader";

import TasksProgressStyle from "./TasksProgress.module.css";

export const TasksProgress: FC<ClassNameComponent> = ({ className }) => {
	const tasks = useTasksProgress();
	const isLoading = useTasksProgressLoading();

	return (
		<section className={classNames(TasksProgressStyle.wrapper, className)}>
			<SubsectionHeader>Tasks Progress</SubsectionHeader>
			<ListWithLoading
				className={TasksProgressStyle.list}
				items={tasks}
				Component={TaskProgress}
				indexedBy={"group"}
				isLoading={isLoading}
				loadingIndicator={<h2>Загрузка...</h2>}
			/>
		</section>
	);
};
