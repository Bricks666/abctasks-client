import React, { FC } from "react";
import classNames from "classnames";
import { Stack } from "@/ui/Stack";
import { LoadingWrapper } from "@/ui/LoadingWrapper";
import { useActivities, useLoadingActivities } from "./hooks";
import { LoadingIndicator } from "@/ui/LoadingIndicator";
import { ActivityCard } from "../ActivityCard";
import { Text } from "@/ui/Text";
import { ClassNameProps } from "@/interfaces/common";

import ActivitiesListStyle from "./ActivitiesList.module.css";

export const ActivitiesList: FC<ClassNameProps> = ({ className }) => {
	const activities = useActivities();
	const isLoading = useLoadingActivities();
	return (
		<section className={classNames(ActivitiesListStyle.container, className)}>
			<Text component="h3">Activities</Text>
			<LoadingWrapper
				isLoading={isLoading}
				loadingIndicator={<LoadingIndicator size="small" />}
			>
				<Stack>
					{activities.slice(0, 10).map((activity) => (
						<ActivityCard {...activity} key={activity.id} />
					))}
				</Stack>
			</LoadingWrapper>
		</section>
	);
};
