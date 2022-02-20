import React, { FC } from "react";
import classNames from "classnames";
import { ClassNameProps } from "@/interfaces/common";
import { useTasksProgress, useTasksProgressLoading } from "@/hooks";
import { TaskProgress } from "../TaskProgress";
import { Text } from "@/ui/Text";
import { LoadingIndicator } from "@/ui/LoadingIndicator";
import { Stack } from "@/ui/Stack";
import { LoadingWrapper } from "@/ui/LoadingWrapper";

import TasksProgressStyle from "./TasksProgress.module.css";

export const TasksProgress: FC<ClassNameProps> = ({ className }) => {
	const progresses = useTasksProgress();
	const isLoading = useTasksProgressLoading();

	return (
		<section className={classNames(TasksProgressStyle.wrapper, className)}>
			<Text component="h3">Tasks Progress</Text>
			<LoadingWrapper
				isLoading={isLoading}
				loadingIndicator={<LoadingIndicator size="small" />}
			>
				<Stack className={TasksProgressStyle.list}>
					{progresses.map((progress) => (
						<TaskProgress {...progress} key={progress.id} />
					))}
				</Stack>
			</LoadingWrapper>
		</section>
	);
};
