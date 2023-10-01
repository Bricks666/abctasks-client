import AssessmentIcon from '@mui/icons-material/Assessment';
import LabelIcon from '@mui/icons-material/Label';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import { TabContext, TabList } from '@mui/lab';
import { Tab } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';

import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { deviceInfoModel } from '@/shared/models';
import { CommonProps } from '@/shared/types';

import styles from './tabs.module.css';

export const Tabs: React.FC<CommonProps> = React.memo(() => {
	const tab = useParam(routes.room.base, 'tab') || 'tasks';
	const id = useParam(routes.room.base, 'id');

	const [isVertical, isMobile] = useUnit([
		deviceInfoModel.$isTabletVertical,
		deviceInfoModel.$isMobile
	]);

	const showLabels = !isVertical && !isMobile;

	const onChange = React.useCallback(
		(_evt: unknown, value: string) => {
			routes.room.base.navigate({
				params: {
					id,
					tab: value,
				},
				query: {},
			});
		},
		[id]
	);

	return (
		<TabContext value={tab}>
			<TabList
				className={styles.list}
				onChange={onChange}
				variant='scrollable'
				scrollButtons='auto'>
				<Tab
					className={styles.tab}
					icon={<ListAltIcon />}
					iconPosition='start'
					label={showLabels ? 'Задачи' : null}
					value='tasks'
				/>
				<Tab
					className={styles.tab}
					icon={<LabelIcon />}
					iconPosition='start'
					label={showLabels ? 'Теги' : null}
					value='tags'
				/>
				<Tab
					className={styles.tab}
					icon={<AssessmentIcon />}
					iconPosition='start'
					label={showLabels ? 'Активности' : null}
					value='activities'
				/>
				<Tab
					className={styles.tab}
					icon={<PeopleIcon />}
					iconPosition='start'
					label={showLabels ? 'Пользователи' : null}
					value='users'
				/>
			</TabList>
		</TabContext>
	);
});