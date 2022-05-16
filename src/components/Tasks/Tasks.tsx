import React, { FC, useMemo } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useGroupedTasks, useLoadingTasks } from "@/hooks";
import { ClassNameProps } from "@/interfaces/common";
import { LoadingWrapper } from "@/components/LoadingWrapper";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { TasksList } from "../TasksList";
import { TaskStatus, TaskStructure } from "@/models/Tasks/types";

import TasksStyle from "./Tasks.module.css";

interface Column {
	readonly headerCode: string;
	readonly tasks: TaskStructure[];
	readonly status: TaskStatus;
}

export const Tasks: FC<ClassNameProps> = ({ className }) => {
	const { t } = useTranslation("room");
	const tasks = useGroupedTasks();
	const isLoading = useLoadingTasks();

	const columns = useMemo<Column[]>(
		() => [
			{
				headerCode: "ready",
				tasks: tasks["ready"],
				status: TaskStatus.READY,
			},
			{
				headerCode: "inProgress",
				tasks: tasks["inProgress"],
				status: TaskStatus.IN_PROGRESS,
			},
			{
				headerCode: "review",
				tasks: tasks["needReview"],
				status: TaskStatus.REVIEW,
			},
			{
				headerCode: "done",
				tasks: tasks["done"],
				status: TaskStatus.DONE,
			},
		],
		[tasks]
	);

	return (
		<section className={classNames(TasksStyle.tasks, className)}>
			<LoadingWrapper
				className={TasksStyle.loading}
				isLoading={isLoading}
				loadingIndicator={<LoadingIndicator />}
			>
				{columns.map(({ headerCode, status, tasks }) => (
					<TasksList
						tasks={tasks}
						columnStatus={status}
						header={t(`statuses.${headerCode}`)}
						key={headerCode}
					/>
				))}
			</LoadingWrapper>
		</section>
	);
};
