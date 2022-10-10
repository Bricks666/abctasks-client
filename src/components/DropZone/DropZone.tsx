import * as React from 'react';
import { CommonProps } from '@/interfaces/common';

export interface DropZoneProps extends CommonProps {
	readonly onDrop: React.DragEventHandler<HTMLDivElement>;
	readonly onDragOver: React.DragEventHandler<HTMLDivElement>;
}

export const DropZone: React.FC<React.PropsWithChildren<DropZoneProps>> = ({
	children,
	onDrop,
	onDragOver,
	className,
}) => {
	return (
		<div className={className} onDrop={onDrop} onDragOver={onDragOver}>
			{children}
		</div>
	);
};
