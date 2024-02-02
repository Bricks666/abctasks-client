import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Popups, PopupsProps } from '@/widgets/page';

import {
	ConfirmRemoveTask,
	CreateTask,
	TasksFilters,
	UpdateTask
} from '@/features/tasks';

import { roomModel } from '@/entities/rooms';

import { popupsMap } from '@/shared/configs';
import { usePageTitle } from '@/shared/lib';
import { deviceInfoModel } from '@/shared/models';
import { CommonProps } from '@/shared/types';
import { SectionHeader, Show } from '@/shared/ui';

import styles from './page.module.css';
import { Tasks, Aside, MobileAside } from './ui';

const popupMap: PopupsProps['popupMap'] = {
	[popupsMap.createTask]: CreateTask,
	[popupsMap.updateTask]: UpdateTask,
	[popupsMap.removeTask]: ConfirmRemoveTask,
};

const TasksPage: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('room-tasks');
	const isDesktopLarge = useUnit(deviceInfoModel.$isDesktopLarge);
	const room = useUnit(roomModel.query.$data);

	const title = t('title');
	const showAside = isDesktopLarge;

	const pageTitle = `${room?.name ?? ''} - ${title}`;

	usePageTitle(pageTitle);

	return (
		<div className={cn(styles.wrapper, className)}>
			<SectionHeader
				title={title}
				actions={
					<>
						<TasksFilters />
						<Show show={!showAside}>
							<MobileAside />
						</Show>
					</>
				}
			/>
			<Tasks className={styles.tasks} />
			<Show show={showAside}>
				<Aside className={styles.aside} />
			</Show>
			<Popups popupMap={popupMap} />
		</div>
	);
};

export default TasksPage;
