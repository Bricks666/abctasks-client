import React, { FC, useCallback } from "react";
import classNames from "classnames";
import { ClassNameComponent } from "../../interfaces/common";
import { SectionHeader } from "../../ui/SectionHeader";
import { ContentLayout } from "../../ui/ContentLayout";
import { Aside } from "../../ui/Aside";
import { TasksProgress } from "../../components/TasksProgress";
import { Tasks } from "../../components/Tasks";

import HomePageStyle from "./HomePage.module.css";
import { loadTasksFx } from "../../models/Tasks";

/* TODO: Вынести сайдбар в отдельный блок(в не страницы), в котором будет по роутингу меняться контент */

export const HomePage: FC<ClassNameComponent> = ({ className }) => {
	const change = useCallback(() => {
		loadTasksFx();
	}, []);
	return (
		<main>
			<ContentLayout className={classNames(HomePageStyle.layout, className)}>
				<SectionHeader className={HomePageStyle.header}>Homepage</SectionHeader>
				<Tasks className={HomePageStyle.tasks} />
				<Aside className={HomePageStyle.aside}>
					<TasksProgress />
				</Aside>
				<button onClick={change}>Change</button>
			</ContentLayout>
		</main>
	);
};
