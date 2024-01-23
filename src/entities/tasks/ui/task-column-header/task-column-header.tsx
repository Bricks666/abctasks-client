import { Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';

import { CommonProps, Slots } from '@/shared/types';

import styles from './task-column-header.module.css';

export interface TaskColumnHeaderComponent extends CommonProps {
	readonly slots?: Slots<'actions'>;
}

export const TaskColumnHeader: React.FC<
	React.PropsWithChildren<TaskColumnHeaderComponent>
> = React.memo((props) => {
	const { children, className, slots, } = props;

	return (
		<header className={cn(styles.header, className)}>
			<Typography className={styles.title} variant='h6' component='h3'>
				{children}
			</Typography>
			{slots?.actions}
		</header>
	);
});
