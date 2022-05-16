import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { ClassNameProps } from "@/interfaces/common";
import { useTasksProgress, useTasksProgressLoading } from "./hooks";
import { TaskProgress } from "../TaskProgress";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { LoadingWrapper } from "@/components/LoadingWrapper";

import { Stack, Typography } from "@mui/material";

export const TasksProgress: FC<ClassNameProps> = ({ className }) => {
	const { t } = useTranslation("room");
	const progresses = useTasksProgress();
	const isLoading = useTasksProgressLoading();

	return (
		<Stack className={className} spacing={1.5}>
			<Typography component="h3" variant="h5">
				{t("taskProgress.title")}
			</Typography>
			<LoadingWrapper
				isLoading={isLoading}
				loadingIndicator={<LoadingIndicator size="small" />}
			>
				<Stack spacing={1}>
					{progresses.map((progress) => (
						<TaskProgress {...progress} key={progress.groupId} />
					))}
				</Stack>
			</LoadingWrapper>
		</Stack>
	);
};
