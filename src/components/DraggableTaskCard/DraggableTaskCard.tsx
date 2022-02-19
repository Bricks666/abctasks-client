import React, { DragEventHandler, FC, useCallback, useState } from "react";
import classNames from "classnames";
import { ExtractProps } from "@/interfaces/common";
import { Draggable } from "../Draggable";
import { TaskCard } from "../TaskCard";

import DraggableTaskCardStyle from "./DraggableTaskCard.module.css";

export const DraggableTaskCard: FC<ExtractProps<typeof TaskCard>> = ({
	id,
	status,
	className,
	...props
}) => {
	const [isDrag, setIsDrag] = useState(false);

	const onDragStart = useCallback<DragEventHandler>(
		(evt) => {
			evt.dataTransfer.clearData();
			evt.dataTransfer.setData("status", status);
			evt.dataTransfer.setData("taskId", id.toString());
			setIsDrag(true);
		},
		[status, id]
	);
	const onDragEnd = useCallback<DragEventHandler>((evt) => {
		setIsDrag(false);
		evt.dataTransfer.clearData();
	}, []);

	const classes = classNames(
		DraggableTaskCardStyle.card,
		{
			[DraggableTaskCardStyle.dragging]: isDrag,
		},
		className
	);

	return (
		<Draggable onDragStart={onDragStart} onDragEnd={onDragEnd}>
			<TaskCard className={classes} id={id} status={status} {...props} />
		</Draggable>
	);
};
