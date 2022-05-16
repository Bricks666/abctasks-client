import React, { FC } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { LoadingWrapper } from "@/components/LoadingWrapper";
import { useActivities, useLoadingActivities } from "./hooks";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { ActivityCard } from "../ActivityCard";
import { ClassNameProps } from "@/interfaces/common";
import { Stack, Typography } from "@mui/material";

import ActivitiesListStyle from "./ActivitiesList.module.css";

export const ActivitiesList: FC<ClassNameProps> = ({ className }) => {
	const { t } = useTranslation("room");
	const activities = useActivities();
	const isLoading = useLoadingActivities();
	return (
		<Stack className={classNames(ActivitiesListStyle.container, className)}>
			<Typography component="h3" variant="h5">
				{t("activities.title")}
			</Typography>
			<LoadingWrapper
				isLoading={isLoading}
				loadingIndicator={<LoadingIndicator size="small" />}
			>
				<Stack spacing={1}>
					{activities.slice(0, 10).map((activity) => (
						<ActivityCard {...activity} key={activity.id} />
					))}
				</Stack>
			</LoadingWrapper>
		</Stack>
	);
};
