import { useMutation } from '@farfetched/react';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
	SkeletonTaskForm,
	TaskForm,
	TaskFormValues,
	updateTaskModel
} from '@/features/tasks';
import { tasksModel, useTask } from '@/entities/tasks';
import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { BasePopupProps, CommonProps } from '@/shared/types';
import { MainPopup } from '@/shared/ui';
import { updateTaskPopupModel } from '../../model';

import styles from './UpdateTaskPopup.module.css';

export interface UpdateTaskPopupProps extends CommonProps, BasePopupProps {}

export const UpdateTaskPopup: React.FC<UpdateTaskPopupProps> = (props) => {
	const { t, } = useTranslation('popups');
	const roomId = useParam(routes.room, 'id');
	const id = useUnit(tasksModel.$selectedTaskId)!;
	const onClose = useUnit(updateTaskPopupModel.close);
	const { data: task, } = useTask(id, roomId);
	const updateTask = useMutation(updateTaskModel.updateTaskMutation);

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
