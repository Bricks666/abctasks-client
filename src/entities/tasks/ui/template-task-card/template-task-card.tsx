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
import { CommonProps, Slots } from '@/shared/types';
import { DateTime } from '@/shared/ui';

import styles from './template-task-card.module.css';

export interface TemplateTaskCardProps
	extends CommonProps,
		Pick<Task, 'title' | 'description' | 'createdAt' | 'status' | 'id'>,
		Omit<CardProps, keyof Task> {
	readonly slots: Slots<'actions' | 'tags' | 'userAvatar'>;
}

export const TemplateTaskCard: React.FC<TemplateTaskCardProps> = React.memo(
	(props) => {
		const { className, createdAt, slots, title, description, ...rest } = props;

		const { actions, tags, userAvatar, } = slots;

		return (
			<Card
				className={cn(styles.card, className)}
				variant='outlined'
				component='article'
				{...rest}>
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
				<CardActions className={styles.actions}>
					{userAvatar}
					<DateTime date={createdAt} format='HH:mm DD MMM' />
				</CardActions>
			</Card>
		);
	}
);
