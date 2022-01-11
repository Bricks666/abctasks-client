import React, { FC } from "react";
import { OnlyClassName } from "../../interfaces/common";
import { SectionHeader } from "../../components/SectionHeader";
import { ContentLayout } from "../../components/ContentLayout";
import { Aside } from "../../components/Aside";
import { TasksProgress } from "../../components/TasksProgress";
import { Tasks } from "../../components/Tasks";

export const HomePage: FC<OnlyClassName> = ({ className }) => {
	return (
		<ContentLayout className={className}>
			<SectionHeader>Homepage</SectionHeader>
			<Tasks />
			<Aside>
				<TasksProgress />
			</Aside>
		</ContentLayout>
	);
};
