import ReplayIcon from '@mui/icons-material/Replay';
import { Stack, Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import {
	SkeletonTaskProgress,
	TaskProgress,
	useProgresses
} from '@/entities/progresses';

import { getEmptyArray, routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { TextWithAction } from '@/shared/ui';

import styles from './tasks-progresses.module.css';

export interface TasksProgressProps extends CommonProps {}

export const TasksProgress: React.FC<TasksProgressProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('room');
	const roomId = useParam(routes.room.tasks, 'id');
	const progresses = useProgresses();

	let children: React.ReactElement | null = null;
	const isLoading = progresses.pending && !progresses.data.length;
	const isProgressesError = !!progresses.error;

	if (isProgressesError) {
		const onRetry = () => {
			progresses.start({ roomId, });
		};
		children = (
			<TextWithAction
				text='Progress were not loaded. To retry?'
				onClick={onRetry}
				actionText='retry'
				icon={<ReplayIcon />}
			/>
		);
	} else {
		children = (
			<Stack className={styles.list} spacing={1.5}>
				{isLoading
					? getEmptyArray(2).map((_, i) => <SkeletonTaskProgress key={i} />)
					: progresses.data.map((progress) => {
						return (
							<TaskProgress
								{...progress}
								{...progress.tag}
								key={progress.tag.id}
							/>
						);
					  })}
			</Stack>
		);
	}

	return (
		<Stack
			className={cn(styles.wrapper, className)}
			spacing={1.5}
			component='section'>
			<Typography
				className={styles.title}
				variant='h6'
				component='h2'
				fontWeight={700}>
				{t('taskProgress.title')}
			</Typography>
			{children}
		</Stack>
	);
};
