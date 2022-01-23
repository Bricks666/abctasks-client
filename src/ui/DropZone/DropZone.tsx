import React, { DragEventHandler, FC } from "react";

interface DropZoneComponent {
	onDrop: DragEventHandler<HTMLDivElement>;
	onDragOver: DragEventHandler<HTMLDivElement>;
}

export const DropZone: FC<DropZoneComponent> = ({
	children,
	onDrop,
	onDragOver,
}) => {
	return (
		<div onDrop={onDrop} onDragOver={onDragOver}>
			{children}
		</div>
	);
};
