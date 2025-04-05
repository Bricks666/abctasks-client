import { Typography } from '@mui/material';
import cn from 'classnames';
import { memo, type FC, type ComponentProps, useId } from 'react';
import { useTranslation } from 'react-i18next';

import type { CommonProps, Slots } from '@/shared/types';

import type { TaskStatus } from '../../models';

import styles from './styles.module.css';

type TaskColumnSlots = 'actions';

export interface TaskColumnHeaderProps
	extends CommonProps,
		ComponentProps<'header'> {
	readonly status: TaskStatus;
	readonly slots?: Slots<TaskColumnSlots>;
}

export const TaskColumnHeader: FC<TaskColumnHeaderProps> = memo((props) => {
	const { className, slots, status, ...rest } = props;
	const id = useId();
	const { t, } = useTranslation('tasks');

	const headerT = t(`statuses.${status}`);

	return (
		<header
			className={cn(styles.header, className)}
			{...rest}
			aria-labelledby={id}>
			<Typography className={styles.title} id={id} variant='h6' component='h3'>
				{headerT}
			</Typography>
			{slots?.actions}
		</header>
	);
});
