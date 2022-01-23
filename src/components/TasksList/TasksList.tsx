import classNames from "classnames";
import React, { DragEventHandler, FC } from "react";
import { ClassNameComponent } from "../../interfaces/common";
import { TaskStructure } from "../../models/Tasks";
import { DropZone } from "../../ui/DropZone";
import { List } from "../../ui/List";
import { SubsectionHeader } from "../../ui/SubsectionHeader";
import { TaskCard } from "../TaskCard";

interface TasksListComponent extends ClassNameComponent {
	tasks: TaskStructure[];
	listHeader: string;
}
const onDrop: DragEventHandler<HTMLDivElement> = (evt) => console.log(evt);
const onDragOver: DragEventHandler<HTMLDivElement> = (evt) => console.log(evt);

export const TasksList: FC<TasksListComponent> = ({
	tasks,
	className,
	listHeader,
}) => {
	return (
		<section className={classNames(className)}>
			<SubsectionHeader>{listHeader}</SubsectionHeader>
			<DropZone onDrop={onDrop} onDragOver={onDragOver}>
				<List items={tasks} indexedBy="id" Component={TaskCard} />
			</DropZone>
		</section>
	);
};
