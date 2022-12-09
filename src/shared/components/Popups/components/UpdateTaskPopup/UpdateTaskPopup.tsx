import { useMutation } from '@farfetched/react';
import { useGate, useUnit } from 'effector-react';
import * as React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { MainPopup } from '@/shared/ui';
import { SkeletonTaskForm } from '../SkeletonTaskForm';
import { TaskForm, TaskFormValues } from '../TaskForm';

import styles from './UpdateTaskPopup.module.css';
import { useParam } from '@/hooks';
import {
	$taskId,
	closeUpdateTaskPopup,
	getTaskQuery,
	TaskGate,
	updateTaskMutation
} from '@/models';
import { roomRoute } from '@/routes';
import { BasePopupProps, CommonProps } from '@/types';

export interface UpdateTaskPopupProps extends CommonProps, BasePopupProps {}

export const UpdateTaskPopup: React.FC<UpdateTaskPopupProps> = (props) => {
	const { t, } = useTranslation('popups');
	const roomId = useParam(roomRoute, 'id');
	const id = useUnit($taskId)!;
	const onClose = useUnit(closeUpdateTaskPopup);
	const task = useUnit(getTaskQuery.$data);
	const updateTask = useMutation(updateTaskMutation);
	useGate(TaskGate, { id, roomId: Number(roomId), });

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
			groupId: task?.groupId || 0,
			status: task?.status || 'ready',
		}),
		[task]
	);
	const loading = !task;

	return (
		<MainPopup {...props} onClose={onClose} header={t('task.updateTitle')}>
			{loading ? (
				<SkeletonTaskForm className={styles.taskForm} />
			) : (
				<TaskForm
					className={styles.taskForm}
					onSubmit={onSubmit}
					defaultValues={defaultValues}
					buttonText={t('actions.save', { ns: 'common', })}
				/>
			)}
		</MainPopup>
	);
};
