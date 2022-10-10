import * as React from 'react';

export interface DraggableProps {
	readonly onDragStart?: React.DragEventHandler;
	readonly onDragEnd?: React.DragEventHandler;
	readonly onDragEnter?: React.DragEventHandler;
	readonly onDragLeave?: React.DragEventHandler;
}

export const Draggable: React.FC<React.PropsWithChildren<DraggableProps>> =
	React.memo(function Draggable({ children, ...handlers }) {
		return (
			<div draggable {...handlers}>
				{children}
			</div>
		);
	});
