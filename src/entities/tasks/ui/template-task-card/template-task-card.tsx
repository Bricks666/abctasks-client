import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { Task } from '@/shared/api';
import { CommonProps } from '@/shared/types';
import { DateTime } from '@/shared/ui';

import styles from './template-task-card.module.css';

export interface TemplateTaskCardProps
	extends CommonProps,
		Pick<Task, 'content' | 'createdAt' | 'status' | 'id'> {
	readonly actions: React.ReactElement;
	readonly group: React.ReactElement;
}

export const TemplateTaskCard: React.FC<TemplateTaskCardProps> = React.memo(
	(props) => {
		const { className, content, createdAt, id, status, actions, group, } = props;
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

		return (
			<Card
				className={cn(styles.card, { [styles.drag]: isDrag, }, className)}
				onDragStart={onDragStart}
				onDragEnd={onDragEnd}
				draggable
				component='article'>
				<CardHeader
					action={actions}
					title={group}
					titleTypographyProps={{ component: 'div', }}
				/>
				<CardContent>
					<Typography className={styles.content}>{content}</Typography>
					<div>
						<DateTime date={createdAt} format='MMM DD' />
						<Typography variant='body2' component='span'>
							0
						</Typography>
					</div>
				</CardContent>
			</Card>
		);
	}
);
