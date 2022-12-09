import * as React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useUnit } from 'effector-react';
import { useMutation } from '@farfetched/react';
import { useTranslation } from 'react-i18next';
import {
	$taskStatus,
	closeCreateTaskPopup,
	createTaskMutation,
} from '@/models';
import { roomRoute } from '@/routes';
import { useParam } from '@/hooks';
import { BasePopupProps, CommonProps } from '@/types';
import { MainPopup } from '@/shared/components';
import { TaskForm, TaskFormValues } from '../TaskForm';

import styles from './CreateTaskPopup.module.css';

export interface CreateTaskPopupProps extends CommonProps, BasePopupProps {}

export const CreateTaskPopup: React.FC<CreateTaskPopupProps> = (props) => {
	const { t } = useTranslation('popups');
	const roomId = useParam(roomRoute, 'id');
	const onClose = useUnit(closeCreateTaskPopup);
	const status = useUnit($taskStatus) || 'ready';
	const createTask = useMutation(createTaskMutation);

	const onSubmit = React.useCallback<SubmitHandler<TaskFormValues>>(
		(values) => {
			createTask.start({
				...values,
				roomId: Number(roomId),
			});
		},
		[roomId]
	);

	const defaultState = React.useMemo<TaskFormValues>(
		() => ({
			content: '',
			groupId: 0,
			status,
		}),
		[status]
	);

	return (
		<MainPopup
			{...props}
			header={t('task.createTitle')}
			onClose={() => onClose()}>
			<TaskForm
				className={styles.form}
				onSubmit={onSubmit}
				defaultValues={defaultState}
				buttonText={t('actions.create', { ns: 'common' })}
			/>
		</MainPopup>
	);
};
