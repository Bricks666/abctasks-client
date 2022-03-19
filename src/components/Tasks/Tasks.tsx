import React, { FC } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useGroupedTasks, useLoadingTasks } from "@/hooks";
import { ClassNameProps } from "@/interfaces/common";
import { LoadingWrapper } from "@/ui/LoadingWrapper";
import { LoadingIndicator } from "@/ui/LoadingIndicator";
import { TasksList } from "../TasksList";

import TasksStyle from "./Tasks.module.css";

export const Tasks: FC<ClassNameProps> = ({ className }) => {
	const { t } = useTranslation("room");
	const tasks = useGroupedTasks();
	const isLoading = useLoadingTasks();

	return (
		<section className={classNames(TasksStyle.tasks, className)}>
			<LoadingWrapper
				className={TasksStyle.loading}
				isLoading={isLoading}
				loadingIndicator={<LoadingIndicator />}
			>
				<TasksList
					listHeader="Ready"
					header={t("statuses.ready")}
					tasks={tasks["ready"]}
					key="Ready"
				/>
				<TasksList
					listHeader="In Progress"
					header={t("statuses.inProgress")}
					tasks={tasks["inProgress"]}
					key="In progress"
				/>
				<TasksList
					listHeader="Review"
					header={t("statuses.review")}
					tasks={tasks["needReview"]}
					key="Review"
				/>
				<TasksList
					listHeader="Done"
					header={t("statuses.done")}
					tasks={tasks["done"]}
					key="Done"
				/>
			</LoadingWrapper>
		</section>
	);
};
