import { Button } from '@mui/material';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { taskModel } from '@/entities/tasks';

import { useIsSmallScreen } from '@/shared/models';
import { BasePopupProps, CommonProps } from '@/shared/types';
import { FullWidthPopup, MainPopup } from '@/shared/ui';

import { SkeletonTaskForm, TaskForm } from '../form';

import { popupControls, form, mutation } from './model';
import styles from './update-task.module.css';

export interface UpdateTaskProps extends CommonProps, BasePopupProps {}

export const UpdateTask: React.FC<UpdateTaskProps> = (props) => {
	const { t, } = useTranslation('tasks');
	const onClose = useUnit(popupControls.close);
	const { data: task, } = useUnit(taskModel.query);

	const isFullscreen = useIsSmallScreen();

	const onClick = useUnit(form.submit);
	const pending = useUnit(mutation.$pending);

	const Popup = isFullscreen ? FullWidthPopup : MainPopup;

	const loading = !task;

	const buttonText = t('actions.save', { ns: 'common', });
	const title = t('actions.update_task.title');
	const actions = isFullscreen ? (
		<Button type='submit' onClick={onClick}>
			{buttonText}
		</Button>
	) : null;

	return (
		<Popup {...props} onClose={onClose} title={title} slots={{ actions, }}>
			{loading ? (
				<SkeletonTaskForm className={styles.taskForm} />
			) : (
				<TaskForm
					className={styles.taskForm}
					titleT={title}
					buttonText={buttonText}
					$form={form}
					buttonDisabled={pending}
					hideButton={isFullscreen}
				/>
			)}
		</Popup>
	);
};
