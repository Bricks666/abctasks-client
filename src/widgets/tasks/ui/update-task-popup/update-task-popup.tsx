import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { SkeletonTaskForm, TaskForm } from '@/features/tasks';
import { useTask } from '@/entities/tasks';
import { getParams, routes } from '@/shared/configs';
import { useParam, useQueryParam } from '@/shared/lib';
import { BasePopupProps, CommonProps } from '@/shared/types';
import { MainPopup } from '@/shared/ui';
import { updateTaskPopupModel } from '../../model';

import styles from './update-task-popup.module.css';

export interface UpdateTaskPopupProps extends CommonProps, BasePopupProps {}

export const UpdateTaskPopup: React.FC<UpdateTaskPopupProps> = (props) => {
	const { t, } = useTranslation('popups');
	const roomId = useParam(routes.room.tasks, 'id');
	const id = Number(useQueryParam(getParams.taskId, null));
	const onClose = useUnit(updateTaskPopupModel.close);
	const { data: task, } = useTask(id, roomId);

	const loading = !task;

	return (
		<MainPopup {...props} onClose={onClose} title={t('task.updateTitle')}>
			{loading ? (
				<SkeletonTaskForm className={styles.taskForm} />
			) : (
				<TaskForm
					className={styles.taskForm}
					buttonText={t('actions.save', { ns: 'common', })}
				/>
			)}
		</MainPopup>
	);
};
