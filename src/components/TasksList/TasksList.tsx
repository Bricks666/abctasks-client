import React, { DragEventHandler, FC, useCallback } from "react";
import { useParams } from "react-router-dom";
import { ClassNameProps } from "@/interfaces/common";
import { TaskStatus, TaskStructure } from "@/models/Tasks/types";
import { DropZone } from "../DropZone";
import { TaskListHeader } from "../TaskListHeader";
import { moveTask } from "@/models/Tasks";
import { DraggableTaskCard } from "../DraggableTaskCard";
import { Stack } from "@mui/material";

import TasksListStyle from "./TasksList.module.css";

interface TasksListComponent extends ClassNameProps {
	readonly tasks: TaskStructure[];
	readonly columnStatus: TaskStatus;
	readonly header?: string;
}
const onDragOver: DragEventHandler<HTMLDivElement> = (evt) =>
	evt.preventDefault();

export const TasksList: FC<TasksListComponent> = ({
	tasks,
	className,
	columnStatus,
	header,
}) => {
	const { id: roomId } = useParams();
	const onDrop = useCallback<DragEventHandler>(
		(evt) => {
			const taskId = +evt.dataTransfer.getData("taskId");
			const status = +evt.dataTransfer.getData("status");
			if (status !== columnStatus && roomId != null) {
				moveTask({
					status: columnStatus.toString() as unknown as TaskStatus,
					taskId,
					roomId,
				});
			}
		},
		[roomId, columnStatus]
	);

	return (
		<DropZone className={className} onDrop={onDrop} onDragOver={onDragOver}>
			<Stack spacing={1.5}>
				<TaskListHeader
					className={TasksListStyle.header}
					columnStatus={columnStatus}
				>
					{header}
				</TaskListHeader>
				<Stack spacing={1}>
					{tasks.map((task) => (
						<DraggableTaskCard {...task} key={task.id} />
					))}
				</Stack>
			</Stack>
		</DropZone>
	);
};
