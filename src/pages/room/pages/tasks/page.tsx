import cn from 'classnames';
import * as React from 'react';
import { Popups, PopupsProps } from '@/widgets/page';
import { CreateTask, UpdateTask } from '@/features/tasks';
import { popupsMap } from '@/shared/configs';
import { CommonProps } from '@/shared/types';
import { pageModel } from './model';
import styles from './page.module.css';
import { Tasks, TasksProgress, LastActivities } from './ui';
import { TasksHeader } from './ui/tasks-header';

const popupMap: PopupsProps['popupMap'] = {
	[popupsMap.createTask]: CreateTask,
	[popupsMap.updateTask]: UpdateTask,
};

const TasksPage: React.FC<CommonProps> = (props) => {
	const { className, } = props;

	return (
		<div className={cn(styles.wrapper, className)}>
			<TasksHeader />
			<Tasks className={styles.tasks} />
			<div className={styles.aside}>
				<TasksProgress />
				<LastActivities />
			</div>
			<Popups popupMap={popupMap} />
		</div>
	);
};
pageModel.loaded();

export default TasksPage;
