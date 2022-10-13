import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@farfetched/react';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { getTaskQuery, updateTaskMutation } from '@/models/tasks';
import { BasePopup, CommonProps } from '@/types/common';
import { useGetParam, useGoBack, useImminentlyQuery } from '@/hooks';
import { GET_PARAMS } from '@/const';
import { MainPopup } from '@/ui/MainPopup';
import { LoadingIndicator } from '@/ui/LoadingIndicator';
import { TaskForm, TaskFormValues } from '../TaskForm';

import styles from './UpdateTaskPopup.module.css';

export interface UpdateTaskPopupProps extends CommonProps, BasePopup {}

export const UpdateTaskPopup: React.FC<UpdateTaskPopupProps> = (props) => {
	const onClose = useGoBack();
	const { t } = useTranslation('popups');
	const { id: roomId } = useParams();
	const id = Number(useGetParam(GET_PARAMS.taskId));
	const { data: task, loading } = useImminentlyQuery(
		getTaskQuery,
		{ id, roomId: Number(roomId) },
		id,
		roomId
	);
	const updateTask = useMutation(updateTaskMutation);

	const onSubmit = React.useCallback<SubmitHandler<TaskFormValues>>(
		(values) => {
			updateTask.start({
				...values,
				id,
				roomId: Number(roomId),
			});
		},
		[roomId, id]
	);

	const defaultValues = React.useMemo<TaskFormValues>(
		() => ({
			content: task?.content || '',
			groupId: task?.groupId || -1,
			status: task?.status || 'ready',
		}),
		[task]
	);

	return (
		<MainPopup {...props} onClose={onClose} header={t('task.updateTitle')}>
			{loading ? (
				<LoadingIndicator />
			) : (
				<TaskForm
					className={styles.form}
					onSubmit={onSubmit}
					roomId={Number(roomId)}
					defaultValues={defaultValues}
					buttonText={t('actions.save', { ns: 'common' })}
				/>
			)}
		</MainPopup>
	);
};
