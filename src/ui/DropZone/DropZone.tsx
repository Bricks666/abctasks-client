import React, { DragEventHandler, FC, memo } from "react";

interface DropZoneComponent {
	onDrop: DragEventHandler<HTMLDivElement>;
	onDragOver: DragEventHandler<HTMLDivElement>;
}

export const DropZone: FC<DropZoneComponent> = memo(
	({ children, onDrop, onDragOver }) => {
		return (
			<div onDrop={onDrop} onDragOver={onDragOver}>
				{children}
			</div>
		);
	}
);
