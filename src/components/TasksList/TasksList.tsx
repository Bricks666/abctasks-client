import classNames from "classnames";
import React, { DragEventHandler, FC } from "react";
import { useLoadingTasks } from "../../hooks";
import { ClassNameComponent } from "../../interfaces/common";
import { TaskWithGroup } from "../../models/Tasks";
import { DropZone } from "../../ui/DropZone";
import { ListWithLoading } from "../../ui/ListWithLoading";
import { SubsectionHeader } from "../../ui/SubsectionHeader";
import { TaskCard } from "../TaskCard";

import TasksListStyle from "./TasksList.module.css";

interface TasksListComponent extends ClassNameComponent {
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
			<SubsectionHeader>{listHeader}</SubsectionHeader>
			<DropZone onDrop={onDrop} onDragOver={onDragOver}>
				<ListWithLoading
					className={TasksListStyle.list}
					items={tasks}
					indexedBy="id"
					Component={TaskCard}
					isLoading={isLoading}
					loadingIndicator={<h2>Загрузка...</h2>}
				/>
			</DropZone>
		</section>
	);
};
