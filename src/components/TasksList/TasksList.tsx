import classNames from "classnames";
import React, { DragEventHandler, FC } from "react";
import { OnlyClassName } from "../../interfaces/common";
import { TaskStructure } from "../../interfaces/structures";
import { DropZone } from "../DropZone";
import { List } from "../List";
import { ListWithLoading } from "../ListWithLoading";
import { SubsectionHeader } from "../SubsectionHeader";
import { TaskCard } from "../TaskCard";

interface TasksListComponent extends OnlyClassName {
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
