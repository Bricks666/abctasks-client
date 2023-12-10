import ReplayIcon from '@mui/icons-material/Replay';
import { Typography } from '@mui/material';
import cn from 'classnames';
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
	const { t, } = useTranslation('room-tasks');

	const title = t('blocks.tasks_progress.title');
	const emptyText = t('blocks.tasks_progress.empty_text');

	return (
		<FriendlyList
			className={cn(styles.wrapper, className)}
			$query={progressesModel.query}
			getKey={(item) => item.tag.id}
			ItemComponent={TaskProgress}
			SkeletonComponent={SkeletonTaskProgress}
			ErrorComponent={Error}
			emptyText={emptyText}
			skeletonsCount={3}
			disableBorder={disableBorder}
			slots={{
				before: (
					<Typography variant='h6' component='h2' fontWeight={700}>
						{title}
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
	const { t, } = useTranslation('room-tasks');

	const roomId = useParam(routes.room.tasks, 'id');
	const start = useUnit(progressesModel.query.start);

	const onRetry = React.useCallback(() => {
		start({ roomId, });
	}, [roomId]);

	const text = t('actions.retry_progress.text');
	const actionText = t('actions.retry', { ns: 'common', });

	return (
		<TextWithAction
			text={text}
			onClick={onRetry}
			actionText={actionText}
			icon={<ReplayIcon />}
		/>
	);
};
