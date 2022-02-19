import classNames from "classnames";
import React, { DragEventHandler, FC, useCallback } from "react";
import { useLoadingTasks } from "@/hooks";
import { ClassNameProps } from "@/interfaces/common";
import { TaskStatus, TaskWithGroup } from "@/models/Tasks/types";
import { DropZone } from "../DropZone";
import { Grid } from "@/ui/Grid";
import { GridItem } from "@/ui/GridItem";
import { LoadingIndicator } from "@/ui/LoadingIndicator";
import { LoadingWrapper } from "@/ui/LoadingWrapper";
import { TaskListHeader } from "../TaskListHeader";
import { moveTask } from "@/models/Tasks";
import { DraggableTaskCard } from "../DraggableTaskCard";

import TasksListStyle from "./TasksList.module.css";

interface TasksListComponent extends ClassNameProps {
	readonly tasks: TaskWithGroup[];
	readonly listHeader: TaskStatus;
}
const onDragOver: DragEventHandler<HTMLDivElement> = (evt) =>
	evt.preventDefault();

export const TasksList: FC<TasksListComponent> = ({
	tasks,
	className,
	listHeader,
}) => {
	const isLoading = useLoadingTasks();
	const onDrop = useCallback<DragEventHandler>(
		(evt) => {
			const taskId = +evt.dataTransfer.getData("taskId");
			const status = evt.dataTransfer.getData("status");
			if (status !== listHeader) {
				moveTask({ status: listHeader, taskId });
			}
		},
		[listHeader]
	);

	return (
		<section className={classNames(TasksListStyle.tasks, className)}>
			<TaskListHeader className={TasksListStyle.header} columnName={listHeader}>
				{listHeader}
			</TaskListHeader>
			<DropZone onDrop={onDrop} onDragOver={onDragOver}>
				<LoadingWrapper
					isLoading={isLoading}
					loadingIndicator={<LoadingIndicator size="small" />}
				>
					<Grid>
						{tasks.map((task) => (
							<GridItem key={task.id}>
								<DraggableTaskCard {...task} />
							</GridItem>
						))}
					</Grid>
				</LoadingWrapper>
			</DropZone>
		</section>
	);
};
