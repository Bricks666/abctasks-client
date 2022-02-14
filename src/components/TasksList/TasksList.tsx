import classNames from "classnames";
import React, { DragEventHandler, FC } from "react";
import { useLoadingTasks } from "../../hooks";
import { ClassNameProps } from "../../interfaces/common";
import { TaskWithGroup } from "../../models/Tasks";
import { DropZone } from "../../ui/DropZone";
import { Grid } from "../../ui/Grid";
import { GridItem } from "../../ui/GridItem";
import { LoadingIndicator } from "../../ui/LoadingIndicator";
import { LoadingWrapper } from "../../ui/LoadingWrapper";
import { TaskCard } from "../TaskCard";
import { TaskListHeader } from "../TaskListHeader";

import TasksListStyle from "./TasksList.module.css";

interface TasksListComponent extends ClassNameProps {
	readonly tasks: TaskWithGroup[];
	readonly listHeader: string;
}
const onDrop: DragEventHandler<HTMLDivElement> = (evt) => console.log(evt);
const onDragOver: DragEventHandler<HTMLDivElement> = (evt) => console.log(evt);

export const TasksList: FC<TasksListComponent> = ({
	tasks,
	className,
	listHeader,
}) => {
	const isLoading = useLoadingTasks();

	return (
		<section className={classNames(TasksListStyle.tasks, className)}>
			<TaskListHeader columnName={listHeader}>{listHeader}</TaskListHeader>
			<DropZone onDrop={onDrop} onDragOver={onDragOver}>
				<LoadingWrapper
					isLoading={isLoading}
					loadingIndicator={<LoadingIndicator size="small" />}
				>
					<Grid>
						{tasks.map((task) => (
							<GridItem key={task.id}>
								<TaskCard {...task} />
							</GridItem>
						))}
					</Grid>
				</LoadingWrapper>
			</DropZone>
		</section>
	);
};
