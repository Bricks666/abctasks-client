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
import { Scrollable, TextWithAction } from '@/shared/ui';

import styles from './tasks.module.css';

export const Tasks: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('tasks');
	const roomId = useParam(routes.room.tasks, 'id');
	const tasks = useUnit({
		loaded: tasksInRoomModel.loaded.$flag,
		error: tasksInRoomModel.query.$error,
		start: tasksInRoomModel.query.start,
	});
	const columns = useUnit(tasksInRoomModel.$tasksColumns);

	const isLoading = !tasks.loaded;
	const isError = !!tasks.error;

	if (isError) {
		const onRetry = () => {
			tasks.start({ roomId, });
		};

		const text = t('actions.retry_tasks.text');
		const actionText = t('actions.retry', { ns: 'common', });

		return (
			<TextWithAction
				className={className}
				actionText={actionText}
				text={text}
				onClick={onRetry}
				icon={<ReplayIcon />}
			/>
		);
	}

	return (
		<Scrollable
			className={cn(styles.wrapper, className)}
			direction='horizontal'
			component='section'>
			{columns.map(({ status, tasks, hasActions, }) => (
				<TaskColumn
					tasks={tasks}
					isLoading={isLoading}
					columnStatus={status}
					header={t(`statuses.${status}`)}
					hasActions={hasActions}
					key={status}
				/>
			))}
		</Scrollable>
	);
};
