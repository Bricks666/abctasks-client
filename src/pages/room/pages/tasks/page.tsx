import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { Popups, PopupsProps } from '@/widgets/page';
import {
	CreateTask,
	MobileTasksFilters,
	TasksFilters,
	UpdateTask
} from '@/features/tasks';
import { deviceInfoModel } from '@/entities/page';
import { popupsMap } from '@/shared/configs';
import { CommonProps } from '@/shared/types';
import { pageModel } from './model';
import styles from './page.module.css';
import { Tasks, TasksProgress, LastActivities } from './ui';

const popupMap: PopupsProps['popupMap'] = {
	[popupsMap.createTask]: CreateTask,
	[popupsMap.updateTask]: UpdateTask,
};

const TasksPage: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const [isMobile, isTabletHorizontal] = useUnit([
		deviceInfoModel.$isMobile,
		deviceInfoModel.$isTabletVertical
	]);
	const showMobile = isMobile || isTabletHorizontal;

	return (
		<div className={cn(styles.wrapper, className)}>
			{showMobile ? <MobileTasksFilters /> : <TasksFilters />}
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
