import * as React from 'react';
import classNames from 'classnames';
import { ExtractProps } from '@/interfaces/common';
import { Draggable } from '../Draggable';
import { TaskCard } from '../TaskCard';

import DraggableTaskCardStyle from './DraggableTaskCard.module.css';

export const DraggableTaskCard: React.FC<ExtractProps<typeof TaskCard>> = ({
	id,
	status,
	className,
	...props
}) => {
	const [isDrag, setIsDrag] = React.useState(false);

	const onDragStart = React.useCallback<React.DragEventHandler>(
		(evt) => {
			evt.dataTransfer.clearData();
			evt.dataTransfer.setData('status', status.toString());
			evt.dataTransfer.setData('taskId', id.toString());
			setIsDrag(true);
		},
		[status, id]
	);
	const onDragEnd = React.useCallback<React.DragEventHandler>((evt) => {
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
