import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CardProps,
	Typography
} from '@mui/material';
import cn from 'classnames';
import { type FC, memo, useId } from 'react';

import type { CommonProps, Slots } from '@/shared/types';
import { DateTime } from '@/shared/ui';

import type { Task } from '../../models';

import styles from './styles.module.css';

type TaskCardSlots = 'actions' | 'tags' | 'userAvatar';
type RequiredTaskCardSlots = Exclude<TaskCardSlots, 'actions'>;

export interface TaskCardTemplateProps
	extends CommonProps,
		Pick<Task, 'title' | 'description' | 'createdAt'>,
		Omit<CardProps, 'title'> {
	readonly slots: Slots<TaskCardSlots, RequiredTaskCardSlots>;
}

export const TaskCardTemplate: FC<TaskCardTemplateProps> = memo((props) => {
	const { className, createdAt, slots, title, description, ...rest } = props;
	const id = useId();
	const { actions, tags, userAvatar, } = slots;

	return (
		<Card
			className={cn(styles.card, className)}
			variant='outlined'
			component='article'
			aria-labelledby={id}
			{...rest}>
			<CardHeader
				className={styles.header}
				action={actions}
				title={
					<Typography id={id} variant='h5' component='p'>
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
});
