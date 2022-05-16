import React, { DragEventHandler, FC, memo } from "react";
import { ClassNameProps } from "@/interfaces/common";
import { Box } from "@mui/material";

interface DropZoneProps extends ClassNameProps {
	onDrop: DragEventHandler<HTMLDivElement>;
	onDragOver: DragEventHandler<HTMLDivElement>;
}

export const DropZone: FC<DropZoneProps> = memo(function DropZone({
	children,
	onDrop,
	onDragOver,
	className,
}) {
	return (
		<Box className={className} onDrop={onDrop} onDragOver={onDragOver}>
			{children}
		</Box>
	);
});
