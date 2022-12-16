import { Stack, Typography } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { groupsModel } from '@/entities/groups';
import {
	SkeletonTaskProgress,
	TaskProgress,
	useProgresses
} from '@/entities/progresses';
import { getEmptyArray } from '@/shared/const';
import { CommonProps } from '@/shared/types';

import styles from './tasks-progresses.module.css';

export const TasksProgress: React.FC<CommonProps> = ({ className, }) => {
	const { t, } = useTranslation('room');
	const { data: progresses, } = useProgresses();
	const groups = useUnit(groupsModel.$groupsMap);

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
