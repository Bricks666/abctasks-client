import { Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { CommonProps } from '@/shared/types';

import styles from './task-list-header.module.css';

export interface TaskListHeaderComponent extends CommonProps {
	readonly actions: React.ReactElement;
}

export const TaskListHeader: React.FC<
	React.PropsWithChildren<TaskListHeaderComponent>
> = (props) => {
	const { children, className, actions, } = props;

	return (
		<header className={cn(styles.header, className)}>
			<Typography className={styles.title} variant='h6' component='h3'>
				{children}
			</Typography>
			{actions}
		</header>
	);
};
