import React, { FC } from "react";
import classNames from "classnames";
import { ClassNameProps } from "@/interfaces/common";
import { Text } from "@/ui/Text";
import { ContentLayout } from "@/ui/ContentLayout";
import { Aside } from "@/ui/Aside";
import { TasksProgress } from "@/components/TasksProgress";
import { Tasks } from "@/components/Tasks";

import HomePageStyle from "./HomePage.module.css";

/* TODO: Вынести сайдбар в отдельный блок(в не страницы), в котором будет по роутингу меняться контент */

export const HomePage: FC<ClassNameProps> = ({ className }) => {
	return (
		<main>
			<ContentLayout className={classNames(HomePageStyle.layout, className)}>
				<Text className={HomePageStyle.header} component="h2" paddings>
					Homepage
				</Text>
				<Tasks className={HomePageStyle.tasks} />
				<Aside className={HomePageStyle.aside}>
					<TasksProgress />
				</Aside>
			</ContentLayout>
		</main>
	);
};
