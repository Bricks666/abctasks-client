import * as React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useMutation } from '@farfetched/react';
import { useTranslation } from 'react-i18next';
import { createTaskMutation, TaskStatus } from '@/models/tasks';
import { useGetParam, useClosePopup } from '@/hooks';
import { BasePopupProps, CommonProps } from '@/types/common';
import { routes } from '@/const';
import { MainPopup } from '@/ui/MainPopup';
import { TaskForm, TaskFormValues } from '../TaskForm';

import styles from './CreateTaskPopup.module.css';

export interface CreateTaskPopupProps extends CommonProps, BasePopupProps {}

export const CreateTaskPopup: React.FC<CreateTaskPopupProps> = (props) => {
	const { t } = useTranslation('popups');
	const { id: roomId } = useParams();
	const onClose = useClosePopup(routes.POPUPS.createTask);
	const createTask = useMutation(createTaskMutation);
	const status =
		useGetParam<TaskStatus>(routes.GET_PARAMS.taskStatus) || 'ready';

	const onSubmit = React.useCallback<SubmitHandler<TaskFormValues>>(
		(values) => {
			createTask.start({
				...values,
				roomId: Number(roomId),
			});
			onClose();
		},
		[roomId, onClose]
	);

	const defaultState = React.useMemo<TaskFormValues>(
		() => ({
			content: '',
			groupId: -1,
			status,
		}),
		[status]
	);

	return (
		<MainPopup {...props} header={t('task.createTitle')} onClose={onClose}>
			<TaskForm
				className={styles.form}
				onSubmit={onSubmit}
				defaultValues={defaultState}
				buttonText={t('actions.create', { ns: 'common' })}
			/>
		</MainPopup>
	);
};
