import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';

import { Popups, PopupsProps } from '@/widgets/page';

import { CreateTask, TasksFilters, UpdateTask } from '@/features/tasks';

import { popupsMap } from '@/shared/configs';
import { deviceInfoModel } from '@/shared/models';
import { CommonProps } from '@/shared/types';
import { SectionHeader } from '@/shared/ui';

import styles from './page.module.css';
import { Tasks, Aside, MobileAside, TaskPopup } from './ui';

const popupMap: PopupsProps['popupMap'] = {
	[popupsMap.createTask]: CreateTask,
	[popupsMap.updateTask]: UpdateTask,
	[popupsMap.task]: TaskPopup,
};

const TasksPage: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const isDesktopLarge = useUnit(deviceInfoModel.$isDesktopLarge);

	const showAside = isDesktopLarge;

	return (
		<div className={cn(styles.wrapper, className)}>
			<SectionHeader
				title='Tasks'
				actions={
					<>
						{!showAside ? <MobileAside /> : null}
						<TasksFilters />
					</>
				}
			/>
			<Tasks className={styles.tasks} />
			{showAside ? <Aside className={styles.aside} /> : null}
			<Popups popupMap={popupMap} />
		</div>
	);
};

export default TasksPage;
