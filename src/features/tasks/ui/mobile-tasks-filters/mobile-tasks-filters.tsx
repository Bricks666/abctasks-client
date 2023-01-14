import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Collapse } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useToggle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { TasksFilters, TasksFiltersProps } from '../tasks-filters';

import styles from './mobile-tasks-filters.module.css';

export interface MobileTasksFiltersProps
	extends CommonProps,
		TasksFiltersProps {}

export const MobileTasksFilters: React.FC<MobileTasksFiltersProps> = (
	props
) => {
	const { className, } = props;
	const [open, { toggle, }] = useToggle();

	return (
		<div className={cn(styles.wrapper, className)}>
			<Button
				onClick={toggle}
				endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}>
				Фильтры
			</Button>
			<Collapse in={open}>
				<TasksFilters />
			</Collapse>
		</div>
	);
};
