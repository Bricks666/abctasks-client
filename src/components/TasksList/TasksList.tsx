import React, { DragEventHandler, FC, useCallback } from "react";
import { ClassNameProps } from "@/interfaces/common";
import { TaskStatus, TaskStructure } from "@/models/Tasks/types";
import { DropZone } from "../DropZone";
import { TaskListHeader } from "../TaskListHeader";
import { moveTask } from "@/models/Tasks";
import { DraggableTaskCard } from "../DraggableTaskCard";
import { Stack } from "@/ui/Stack";

import TasksListStyle from "./TasksList.module.css";

interface TasksListComponent extends ClassNameProps {
	readonly tasks: TaskStructure[];
	readonly listHeader: TaskStatus;
}
const onDragOver: DragEventHandler<HTMLDivElement> = (evt) =>
	evt.preventDefault();

export const TasksList: FC<TasksListComponent> = ({
	tasks,
	className,
	listHeader,
}) => {
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
		<Stack className={className} space="l">
			<TaskListHeader className={TasksListStyle.header} columnName={listHeader}>
				{listHeader}
			</TaskListHeader>
			<DropZone
				className={TasksListStyle.dropZone}
				onDrop={onDrop}
				onDragOver={onDragOver}
			>
				<Stack>
					{tasks.map((task) => (
						<DraggableTaskCard {...task} key={task.id} />
					))}
				</Stack>
			</DropZone>
		</Stack>
	);
};
