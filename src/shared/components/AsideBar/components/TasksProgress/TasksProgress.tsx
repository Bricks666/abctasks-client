import { useQuery } from '@farfetched/react';
import { Stack, Typography } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { getEmptyArray } from '@/shared/const';
import { $GroupsMap, getProgressQuery } from '@/shared/models';
import { CommonProps } from '@/shared/types';
import { SkeletonTaskProgress, TaskProgress } from './components';

import styles from './TasksProgress.module.css';

export const TasksProgress: React.FC<CommonProps> = ({ className, }) => {
	const { t, } = useTranslation('room');
	const { data: progresses, } = useQuery(getProgressQuery);
	const groups = useUnit($GroupsMap);

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
