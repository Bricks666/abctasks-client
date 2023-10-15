import ReplayIcon from '@mui/icons-material/Replay';
import { Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import {
	SkeletonTaskProgress,
	TaskProgress,
	progressesModel
} from '@/entities/progresses';

import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { FriendlyList, TextWithAction } from '@/shared/ui';

import styles from './tasks-progresses.module.css';

export interface TasksProgressProps extends CommonProps {
	readonly disableBorder?: boolean;
}

export const TasksProgress: React.FC<TasksProgressProps> = (props) => {
	const { className, disableBorder, } = props;
	const { t, } = useTranslation('room');

	return (
		<FriendlyList
			className={className}
			$query={progressesModel.query}
			getKey={(item) => item.tag.id}
			ItemComponent={TaskProgress}
			SkeletonComponent={SkeletonTaskProgress}
			ErrorComponent={Error}
			emptyText='Here will be shown your task progress'
			skeletonsCount={3}
			disableBorder={disableBorder}
			slots={{
				before: (
					<Typography
						className={styles.title}
						variant='h6'
						component='h2'
						fontWeight={700}>
						{t('taskProgress.title')}
					</Typography>
				),
			}}
			classes={{
				list: styles.list,
			}}
		/>
	);
};

const Error: React.FC = () => {
	const roomId = useParam(routes.room.tasks, 'id');
	const refresh = useUnit(progressesModel.query.refresh);

	const onRetry = React.useCallback(() => {
		refresh({ roomId, });
	}, [roomId]);
	return (
		<TextWithAction
			text='Progress were not loaded. To retry?'
			onClick={onRetry}
			actionText='retry'
			icon={<ReplayIcon />}
		/>
	);
};
