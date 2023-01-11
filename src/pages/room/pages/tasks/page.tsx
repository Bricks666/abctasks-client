import cn from 'classnames';
import * as React from 'react';
import { CommonProps } from '@/shared/types';
import { pageModel } from './model';
import styles from './page.module.css';
import { Tasks, TasksProgress, LastActivities } from './ui';

const TasksPage: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	return (
		<div className={cn(styles.tasksBlock, className)}>
			<Tasks />
			<div className={styles.aside}>
				<TasksProgress />
				<LastActivities />
			</div>
		</div>
	);
};
pageModel.loaded();

export default TasksPage;
