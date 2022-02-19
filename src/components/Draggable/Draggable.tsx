import React, { DragEventHandler, FC } from "react";

interface DraggableProps {
	readonly onDragStart?: DragEventHandler;
	readonly onDragEnd?: DragEventHandler;
	readonly onDragEnter?: DragEventHandler;
	readonly onDragLeave?: DragEventHandler;
}

export const Draggable: FC<DraggableProps> = ({ children, ...handlers }) => {
	return (
		<div draggable {...handlers}>
			{children}
		</div>
	);
};
