import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { Popups, PopupsProps } from '@/widgets/page';
import { CreateTask, UpdateTask } from '@/features/tasks';
import { deviceInfoModel } from '@/entities/page';
import { popupsMap } from '@/shared/configs';
import { CommonProps } from '@/shared/types';
import { pageModel } from './model';
import styles from './page.module.css';
import { Tasks, Aside, MobileAside } from './ui';
import { TasksHeader } from './ui/tasks-header';

const popupMap: PopupsProps['popupMap'] = {
	[popupsMap.createTask]: CreateTask,
	[popupsMap.updateTask]: UpdateTask,
};

const TasksPage: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const isDesktopLarge = useUnit(deviceInfoModel.$isDesktopLarge);

	const showAside = isDesktopLarge;

	return (
		<div className={cn(styles.wrapper, className)}>
			<TasksHeader actions={!showAside ? <MobileAside /> : null} />
			<Tasks className={styles.tasks} />
			{showAside ? <Aside className={styles.aside} /> : null}
			<Popups popupMap={popupMap} />
		</div>
	);
};
pageModel.loaded();

export default TasksPage;
