import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardProps,
	Typography
} from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { Task } from '@/shared/api';
import { CommonProps } from '@/shared/types';
import { DateTime } from '@/shared/ui';

import styles from './template-task-card.module.css';

export interface TemplateTaskCardProps
	extends CommonProps,
		Pick<Task, 'title' | 'description' | 'createdAt' | 'status' | 'id'>,
		Omit<CardProps, keyof Task> {
	readonly actions: React.ReactElement | null;
	readonly tags: React.ReactElement | React.ReactElement[] | null;
	readonly draggable: boolean;
}

export const TemplateTaskCard: React.FC<TemplateTaskCardProps> = React.memo(
	(props) => {
		const {
			className,
			createdAt,
			id,
			status,
			actions,
			tags,
			title,
			description,
			draggable,
		} = props;
		const [isDrag, setIsDrag] = React.useState(false);

		/**
		 * Может стоит вынести на уровень карты, а не шаблона
		 */
		const onDragStart = React.useCallback<React.DragEventHandler>(
			(evt) => {
				evt.dataTransfer.clearData();
				evt.dataTransfer.setData('status', status.toString());
				evt.dataTransfer.setData('taskId', id.toString());
				setIsDrag(true);
			},
			[status, id]
		);

		const onDragEnd = React.useCallback<React.DragEventHandler>(() => {
			setIsDrag(false);
		}, []);

		return (
			<Card
				className={cn(styles.card, { [styles.drag]: isDrag, }, className)}
				onDragStart={onDragStart}
				onDragEnd={onDragEnd}
				variant='outlined'
				draggable={draggable}
				component='article'>
				<CardHeader
					className={styles.header}
					action={actions}
					title={
						<Typography variant='h5' component='h3'>
							{title}
						</Typography>
					}
					subheader={tags}
					disableTypography
				/>
				<CardContent className={styles.content}>
					<Typography className={styles.description} variant='body1'>
						{description}
					</Typography>
				</CardContent>
				<CardActions>
					<DateTime date={createdAt} format='HH:mm DD MMM' />
					<Typography variant='body2' component='span'>
						0
					</Typography>
				</CardActions>
			</Card>
		);
	}
);
