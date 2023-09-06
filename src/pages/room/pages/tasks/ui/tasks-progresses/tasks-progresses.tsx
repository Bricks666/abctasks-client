import { Stack, Typography } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import {
	SkeletonTaskProgress,
	TaskProgress,
	useProgresses
} from '@/entities/progresses';
import { useTagsMap } from '@/entities/tags';

import { getEmptyArray, routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { RetryLoadingSlat } from '@/shared/ui';

import styles from './tasks-progresses.module.css';

export interface TasksProgressProps extends CommonProps {}

export const TasksProgress: React.FC<TasksProgressProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('room');
	const roomId = useParam(routes.room.tasks, 'id');
	const progresses = useProgresses();
	const tags = useTagsMap();

	let children: React.ReactElement | null = null;
	const isLoading =
		tags.pending || (progresses.pending && !progresses.data.length);
	const isGroupsError = !!tags.error;
	const isProgressesError = !!progresses.error;

	if (isGroupsError) {
		/*
    Или вынести каждый такой элемент в отдельный виджет,
    который будет принимать номер комнаты
    */
		const onRetry = () => {
			tags.start(roomId);
		};
		children = (
			<RetryLoadingSlat
				content='Groups were not loaded. To retry?'
				onRetry={onRetry}
				buttonText='retry'
			/>
		);
	} else if (isProgressesError) {
		const onRetry = () => {
			progresses.start({ roomId, });
		};
		children = (
			<RetryLoadingSlat
				content='Progress were not loaded. To retry?'
				onRetry={onRetry}
				buttonText='retry'
			/>
		);
	} else {
		children = (
			<Stack className={styles.list} spacing={1.5}>
				{isLoading
					? getEmptyArray(2).map((_, i) => <SkeletonTaskProgress key={i} />)
					: progresses.data.map((progress) => {
						const tag = tags.data[progress.tagId];
						if (!tag) {
							return null;
						}
						return (
							<TaskProgress {...progress} {...tag} key={progress.tagId} />
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
