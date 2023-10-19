import ReplayIcon from '@mui/icons-material/Replay';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { TaskColumn } from '@/widgets/tasks';

import { tasksInRoomModel } from '@/entities/tasks';

import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { TextWithAction } from '@/shared/ui';

import styles from './tasks.module.css';

export const Tasks: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('task');
	const roomId = useParam(routes.room.tasks, 'id');
	const tasks = useUnit({
		pending: tasksInRoomModel.query.$pending,
		stale: tasksInRoomModel.query.$stale,
		error: tasksInRoomModel.query.$error,
		start: tasksInRoomModel.query.start,
	});
	const columns = useUnit(tasksInRoomModel.$tasksColumns);

	const isLoading = tasks.pending && !tasks.stale;
	const isError = !!tasks.error;

	if (isError) {
		const onRetry = () => {
			tasks.start({ roomId, });
		};

		return (
			<TextWithAction
				className={className}
				actionText='retry'
				text='Tasks were not loaded. To retry?'
				onClick={onRetry}
				icon={<ReplayIcon />}
			/>
		);
	}

	return (
		<section className={cn(styles.wrapper, className)}>
			{columns.map(({ status, tasks, hasActions, }) => (
				<TaskColumn
					roomId={roomId}
					tasks={tasks}
					isLoading={isLoading}
					columnStatus={status}
					header={t(`statuses.${status}`)}
					hasActions={hasActions}
					key={status}
				/>
			))}
		</section>
	);
};
