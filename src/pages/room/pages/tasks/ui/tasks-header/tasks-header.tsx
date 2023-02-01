import { Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { TasksFilters } from '@/features/tasks';
import { CommonProps } from '@/shared/types';

import styles from './tasks-header.module.css';

export interface TasksHeaderProps extends CommonProps {
	readonly actions?: React.ReactNode | null;
}

export const TasksHeader: React.FC<TasksHeaderProps> = (props) => {
	const { className, actions, } = props;

	return (
		<header className={cn(styles.wrapper, className)}>
			<Typography variant='h5' component='h2' fontWeight={700}>
				Tasks
			</Typography>
			<div>
				{actions}
				<TasksFilters />
			</div>
		</header>
	);
};
