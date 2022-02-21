import React, { FC } from "react";
import classNames from "classnames";
import { ClassNameProps } from "@/interfaces/common";
import { ContentLayout } from "@/ui/ContentLayout";
import { TasksProgress } from "@/components/TasksProgress";
import { Tasks } from "@/components/Tasks";
import { usePageTitle } from "@/hooks";
import { ActivitiesList } from "@/components/ActivitiesList";
import { Stack } from "@/ui/Stack";

import HomePageStyle from "./HomePage.module.css";

export const HomePage: FC<ClassNameProps> = ({ className }) => {
	usePageTitle("Homepage");
	return (
		<main>
			<ContentLayout className={classNames(HomePageStyle.layout, className)}>
				<Tasks className={HomePageStyle.tasks} />
				<Stack className={HomePageStyle.aside}>
					<TasksProgress />
					<ActivitiesList />
				</Stack>
			</ContentLayout>
		</main>
	);
};
