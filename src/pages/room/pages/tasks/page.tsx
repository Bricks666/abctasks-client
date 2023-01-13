import cn from 'classnames';
import * as React from 'react';
import { Popups, PopupsProps } from '@/widgets/page';
import { CreateTaskPopup, UpdateTaskPopup } from '@/widgets/tasks';
import { popups } from '@/shared/configs';
import { CommonProps } from '@/shared/types';
import { pageModel } from './model';
import styles from './page.module.css';
import { Tasks, TasksProgress, LastActivities } from './ui';

const popupMap: PopupsProps['popupMap'] = {
	[popups.createTask]: CreateTaskPopup,
	[popups.updateTask]: UpdateTaskPopup,
};

const TasksPage: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	return (
		<div className={cn(styles.tasksBlock, className)}>
			<Tasks />
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
