import { useUnit } from 'effector-react';
import * as React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { createTaskModel, TaskForm, TaskFormValues } from '@/features/tasks';
import { tasksModel } from '@/entities/tasks';
import { routes } from '@/shared/configs';
import { useParam } from '@/shared/lib';
import { BasePopupProps, CommonProps } from '@/shared/types';
import { MainPopup } from '@/shared/ui';
import { createTaskPopupModel } from '../../model';

import styles from './create-task-popup.module.css';

export interface CreateTaskPopupProps extends CommonProps, BasePopupProps {}

export const CreateTaskPopup: React.FC<CreateTaskPopupProps> = (props) => {
	const { t, } = useTranslation('popups');
	const roomId = useParam(routes.room.tasks, 'id');
	const status = useUnit(tasksModel.$status) || 'ready';
	const onClose = useUnit(createTaskPopupModel.close);
	const createTask = useUnit(createTaskModel.mutation);

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
		<MainPopup {...props} title={t('task.createTitle')} onClose={onClose}>
			<TaskForm
				className={styles.form}
				onSubmit={onSubmit}
				defaultValues={defaultState}
				buttonText={t('actions.create', { ns: 'common', })}
			/>
		</MainPopup>
	);
};
