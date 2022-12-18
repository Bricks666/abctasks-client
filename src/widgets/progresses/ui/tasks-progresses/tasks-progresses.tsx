import { Stack, Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useGroupsMap } from '@/entities/groups';
import {
	SkeletonTaskProgress,
	TaskProgress,
	useProgresses
} from '@/entities/progresses';
import { getEmptyArray, routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';

import styles from './tasks-progresses.module.css';

export interface TasksProgressProps extends CommonProps {}

export const TasksProgress: React.FC<TasksProgressProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('room');
	const roomId = useParam(routes.room, 'id');
	const { data: progresses, } = useProgresses(roomId);
	const { data: groups, } = useGroupsMap(roomId);

	const isLoading = !groups || !progresses;

	return (
		<Stack
			className={cn(styles.wrapper, className)}
			spacing={1.5}
			component='section'>
			<Typography className={styles.title} variant='body2' component='h2'>
				{t('taskProgress.title')}
			</Typography>
			<Stack className={styles.list} spacing={1.5}>
				{isLoading
					? getEmptyArray(2).map((_, i) => <SkeletonTaskProgress key={i} />)
					: progresses.map((progress) => {
						const group = groups[progress.groupId];
						if (!group) {
							return null;
						}
						return (
							<TaskProgress {...progress} {...group} key={progress.groupId} />
						);
					  })}
			</Stack>
		</Stack>
	);
};
